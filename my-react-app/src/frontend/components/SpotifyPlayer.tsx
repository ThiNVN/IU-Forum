import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  const [currentPage, setCurrentPage] = useState(1);
  const playlistsPerPage = 5;

  // Helper to manage marquee state for each playlist
  const [marqueeStates, setMarqueeStates] = useState<{ [id: string]: { shouldMarquee: boolean; transX: string } }>({});
  const marqueeRefs = useRef<{ [id: string]: { outer: HTMLDivElement | null; inner: HTMLDivElement | null } }>({});

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
      setCurrentPage(1); // Reset to first page when reloading
    } catch (err) {
      setError('Failed to fetch playlists');
    }
  }, [accessToken]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPlaylists();
    }
  }, [isAuthenticated, fetchPlaylists]);

  // Calculate pagination
  const totalPages = Math.ceil(playlists.length / playlistsPerPage);
  const startIndex = (currentPage - 1) * playlistsPerPage;
  const endIndex = startIndex + playlistsPerPage;
  const currentPlaylists = playlists.slice(startIndex, endIndex);

  // Marquee effect for playlist names that are too long
  useEffect(() => {
    const intervals: { [id: string]: number } = {};
    playlists.forEach((playlist) => {
      const id = playlist.id;
      const refs = marqueeRefs.current[id];
      if (!refs || !refs.outer || !refs.inner) return;
      const outerWidth = refs.outer.offsetWidth;
      const innerWidth = refs.inner.scrollWidth;
      const shouldMarquee = innerWidth > outerWidth;
      setMarqueeStates((prev) => ({
        ...prev,
        [id]: { shouldMarquee, transX: '0px' },
      }));
      if (shouldMarquee) {
        let start = Date.now();
        const distance = innerWidth - outerWidth;
        const duration = Math.max(10000, distance * 15);

        intervals[id] = window.setInterval(() => {
          const elapsed = Date.now() - start;
          const progress = (elapsed % (duration * 2)) / duration;
          
          // Calculate position based on progress
          let position: number;
          if (progress < 1) {
            // First half: scroll forward
            position = -distance * progress;
          } else {
            // Second half: scroll backward
            position = -distance * (2 - progress);
          }

          setMarqueeStates((prev) => ({
            ...prev,
            [id]: {
              shouldMarquee: true,
              transX: `${position}px`,
            },
          }));
        }, 16);
      }
    });
    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, [playlists]);

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
        <div className="header-buttons">
          <button
            onClick={fetchPlaylists}
            className='reload-btn'
            title='Reload Playlists'
          >
            ↻
          </button>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setAccessToken(null);
              window.localStorage.removeItem('access_token');
              window.localStorage.removeItem('refresh_token');
              window.localStorage.removeItem('expires_in');
            }}
            className='disconnect-btn'
            title='Disconnect Spotify'
          >
            ⚡
          </button>
        </div>
      </div>
      <div className="playlists-container">
        {currentPlaylists.length > 0 ? (
          currentPlaylists.map((playlist) => {
            if (!marqueeRefs.current[playlist.id]) {
              marqueeRefs.current[playlist.id] = { outer: null, inner: null };
            }
            const marqueeState = marqueeStates[playlist.id] || { shouldMarquee: false, transX: '0px' };
            return (
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
                  <div
                    className="marquee-outer"
                    ref={el => { marqueeRefs.current[playlist.id].outer = el || null; }}
                  >
                    <div
                      className="marquee-inner"
                      ref={el => { marqueeRefs.current[playlist.id].inner = el || null; }}
                      style={marqueeState.shouldMarquee ? { transform: `translateX(${marqueeState.transX})` } : {}}
                    >
                      <h4>{playlist.name}</h4>
                    </div>
                  </div>
                  <p>{playlist.tracks?.total || 0} tracks</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-playlists">
            <p>No playlists found</p>
            <small>Create a playlist on Spotify to see it here</small>
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="page-btn"
          >
            ←
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="page-btn"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default SpotifyPlayer; 
