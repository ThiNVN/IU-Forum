import React, { useState, useEffect, useCallback } from 'react';
import { SpotifyApi, Track, PlaybackState, SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import '../styles/SpotifyPlayer.css';
import {
  generateRandomString,
  sha256,
  base64encode,
  getStoredToken,
  isTokenExpired,
  exchangeCodeForToken,
  refreshAccessToken,
  storeTokenData
} from '../utils/spotifyAuth';

interface SpotifyPlayerProps {
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
}

const scope = 'user-read-private user-read-email playlist-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing streaming';

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({
  clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID || '0d17f03638cc482e9b2f26e51dc37e7e',
  clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET || '',
  redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI || 'https://127.0.0.1:3000/callback',
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<SimplifiedPlaylist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<SimplifiedPlaylist | null>(null);
  const [showEmbed, setShowEmbed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // PKCE login flow
  const handleLogin = async () => {
    const codeVerifier = generateRandomString(64);
    window.localStorage.setItem('code_verifier', codeVerifier);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    });
    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  };

  // Handle callback and token exchange
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      exchangeCodeForToken(code, clientId, redirectUri, clientSecret || undefined)
        .then((data) => {
          setAccessToken(data.access_token);
          setIsAuthenticated(true);
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch((err) => {
          setError('Failed to authenticate with Spotify');
          setIsAuthenticated(false);
        });
    } else {
      // Check for existing token
      const token = getStoredToken();
      if (token && !isTokenExpired()) {
        setAccessToken(token);
        setIsAuthenticated(true);
      } else if (token && isTokenExpired()) {
        refreshAccessToken(clientId, clientSecret || undefined)
          .then((data) => {
            setAccessToken(data.access_token);
            setIsAuthenticated(true);
          })
          .catch(() => {
            setIsAuthenticated(false);
            setAccessToken(null);
          });
      } else {
        setIsAuthenticated(false);
        setAccessToken(null);
      }
    }
  }, [clientId, clientSecret, redirectUri]);

  // Fetch user's playlists
  const fetchPlaylists = useCallback(async () => {
    if (!accessToken) return;
    try {
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();
      setPlaylists(data.items || []);
    } catch (err) {
      setError('Failed to fetch playlists');
    }
  }, [accessToken]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPlaylists();
    }
  }, [isAuthenticated, fetchPlaylists]);

  const handlePlaylistSelect = (playlist: SimplifiedPlaylist) => {
    setSelectedPlaylist(playlist);
    setShowEmbed(true);
  };

  if (error) {
    return (
      <div className="spotify-player error">
        <p>⚠️ {error}</p>
        <button onClick={() => setError(null)} className='retry-btn'>
          Try Again
        </button>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="spotify-player">
        <div className="spotify-login">
          <h3>🎵 Spotify Player</h3>
          <p>Connect your Spotify account to access your playlists</p>
          <div className='redirect-info'>
            <small>Redirect URI: {redirectUri}</small>
          </div>
          <button onClick={handleLogin} className="spotify-login-btn">
            Connect Spotify
          </button>
        </div>
      </div>
    );
  }

  if (showEmbed && selectedPlaylist) {
    return (
      <div className="spotify-player">
        <div className="spotify-header">
          <h3>🎵 {selectedPlaylist.name}</h3>
          <button
            onClick={() => setShowEmbed(false)}
            className='back-btn'
            title='Back to Playlists'
          >
            ←
          </button>
        </div>
        <iframe
          title={`Spotify Embed: ${selectedPlaylist.name}`}
          src={`https://open.spotify.com/embed/playlist/${selectedPlaylist.id}?utm_source=generator&theme=0`}
          width="100%"
          height="360"
          style={{ border: 'none', borderRadius: '12px' }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="spotify-player">
      <div className="spotify-header">
        <h3>🎵 Your Playlists</h3>
        <button
          onClick={() => {
            setIsAuthenticated(false);
            setAccessToken(null);
            window.localStorage.removeItem('access_token');
            window.localStorage.removeItem('refresh_token');
            window.localStorage.removeItem('expires_in');
          }}
          className='disconnect-btn'
          title='Disconnect'
        >
          ↻
        </button>
      </div>
      <div className="playlists-container">
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="playlist-item"
              onClick={() => handlePlaylistSelect(playlist)}
            >
              {playlist.images?.[0] && (
                <img
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  className="playlist-cover"
                />
              )}
              <div className="playlist-info">
                <h4>{playlist.name}</h4>
                <p>{playlist.tracks?.total || 0} tracks</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-playlists">
            <p>No playlists found</p>
            <small>Create a playlist on Spotify to see it here</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotifyPlayer; 
