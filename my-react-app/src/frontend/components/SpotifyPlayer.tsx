import React, { useState, useEffect, useCallback } from 'react';
import { SpotifyApi, Track, PlaybackState } from '@spotify/web-api-ts-sdk';
import '../styles/SpotifyPlayer.css';

interface SpotifyPlayerProps {
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({
  clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID || '',
  clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET || '',
  redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI || 'https://localhost:3000'
}) => {
  const [sdk, setSdk] = useState<SpotifyApi | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackState, setPlaybackState] = useState<PlaybackState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Debug log for environment variables
  useEffect(() => {
    console.log('Environment variables:', {
      clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
      redirectUri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI
    });
  }, []);

  // Fetch access token
  const fetchAccessToken = useCallback(async () => {
    if (!clientId || !clientSecret) {
      setError('Spotify credentials not provided');
      return;
    }

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch access token');
      }

      const data: TokenResponse = await response.json();
      setAccessToken(data.access_token);
      return data.access_token;
    } catch (err) {
      setError('Failed to get access token');
      console.error('Token fetch error:', err);
      return null;
    }
  }, [clientId, clientSecret]);

  // Initialize Spotify SDK
  useEffect(() => {
    if (!clientId) {
      setError('Spotify Client ID not provided');
      console.error('Missing Client ID:', { clientId, envClientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID });
      return;
    }

    try {
      const spotifyApi = SpotifyApi.withUserAuthorization(
        clientId,
        redirectUri,
        ['user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing']
      );
      setSdk(spotifyApi);
    } catch (err) {
      setError('Failed to initialize Spotify SDK');
      console.error('Spotify SDK initialization error:', err);
    }
  }, [clientId, redirectUri]);

  // Check authentication and get current playback
  useEffect(() => {
    if (!sdk) return;

    const checkAuth = async () => {
      try {
        const user = await sdk.currentUser.profile();
        if (user) {
          setIsAuthenticated(true);
          getCurrentPlayback();
        }
      } catch (err) {
        setIsAuthenticated(false);
        console.error('Authentication check failed:', err);
      }
    };

    checkAuth();
  }, [sdk]);

  const getCurrentPlayback = useCallback(async () => {
    if (!sdk || !isAuthenticated) return;

    try {
      const playback = await sdk.player.getPlaybackState();
      if (playback) {
        setPlaybackState(playback);
        setCurrentTrack(playback.item as Track);
        setIsPlaying(playback.is_playing);
      }
    } catch (err) {
      console.error('Failed to get playback state:', err);
    }
  }, [sdk, isAuthenticated]);

  // Poll for playback updates
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(getCurrentPlayback, 5000);
    return () => clearInterval(interval);
  }, [isAuthenticated, getCurrentPlayback]);

  const handleLogin = async () => {
    if (!sdk) return;

    try {
      await sdk.authenticate();
      setIsAuthenticated(true);
    } catch (err) {
      setError('Failed to authenticate with Spotify');
      console.error('Authentication error:', err);
    }
  };

  const handlePlayPause = async () => {
    if (!sdk || !isAuthenticated) return;

    try {
      if (isPlaying) {
        await sdk.player.pausePlayback('');
      } else {
        await sdk.player.startResumePlayback('');
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.error('Failed to toggle playback:', err);
    }
  };

  const handleNext = async () => {
    if (!sdk || !isAuthenticated) return;

    try {
      await sdk.player.skipToNext('');
      setTimeout(getCurrentPlayback, 1000);
    } catch (err) {
      console.error('Failed to skip to next track:', err);
    }
  };

  const handlePrevious = async () => {
    if (!sdk || !isAuthenticated) return;

    try {
      await sdk.player.skipToPrevious('');
      setTimeout(getCurrentPlayback, 1000);
    } catch (err) {
      console.error('Failed to skip to previous track:', err);
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (error) {
    return (
      <div className="spotify-player error">
        <p>⚠️ {error}</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="spotify-player">
        <div className="spotify-login">
          <h3>🎵 Spotify Player</h3>
          <p>Connect your Spotify account to control music playback</p>
          <button onClick={handleLogin} className="spotify-login-btn">
            Connect Spotify
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="spotify-player">
      <div className="spotify-header">
        <h3>🎵 Now Playing</h3>
      </div>
      
      {currentTrack ? (
        <div className="track-info">
          {currentTrack.album?.images?.[0] && (
            <img 
              src={currentTrack.album.images[0].url} 
              alt={currentTrack.album.name}
              className="album-art"
            />
          )}
          <div className="track-details">
            <p className="track-name" title={currentTrack.name}>
              {currentTrack.name}
            </p>
            <p className="artist-name" title={currentTrack.artists?.[0]?.name}>
              {currentTrack.artists?.[0]?.name}
            </p>
          </div>
        </div>
      ) : (
        <div className="no-track">
          <p>No track currently playing</p>
        </div>
      )}

      <div className="playback-controls">
        <button onClick={handlePrevious} className="control-btn" title="Previous">
          ⏮️
        </button>
        <button onClick={handlePlayPause} className="control-btn play-pause" title={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button onClick={handleNext} className="control-btn" title="Next">
          ⏭️
        </button>
      </div>

      {playbackState && (
        <div className="progress-info">
          <span className="time">
            {formatTime(playbackState.progress_ms || 0)} / {formatTime(currentTrack?.duration_ms || 0)}
          </span>
        </div>
      )}
    </div>
  );
};

export default SpotifyPlayer; 