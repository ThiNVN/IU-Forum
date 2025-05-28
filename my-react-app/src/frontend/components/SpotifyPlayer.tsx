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
  // clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID || '0d17f03638cc482e9b2f26e51dc37e7e',
  // clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET || '1db631eca33d46daa76476b7c8a85f4f',
  redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI || 'https://127.0.0.1:3000/callback'
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
      redirectUri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
      actualRedirectUri: redirectUri
    });
  }, [redirectUri]);

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
          'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          // client_id: clientId,
          // client_secret: clientSecret,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Token fetch failed:', errorData);
        throw new Error(`Failed to fetch access token: ${errorData.error_description || errorData.error}`);
      }

      const data: TokenResponse = await response.json();
      setAccessToken(data.access_token);
      return data.access_token;
    } catch (err) {
      setError(`Failed to get access token: ${err instanceof Error ? err.message : 'Unknown error'}`);
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

        // Validate redirect URI format
    if (!redirectUri.startsWith('http://') && !redirectUri.startsWith('https://')) {
      setError('Invalid redirect URI format. Must start with http:// or https://');
      return;
    }

    try {
      const spotifyApi = SpotifyApi.withUserAuthorization(
        clientId,
        redirectUri,
        ['user-read-playback-state', 
          'user-modify-playback-state', 
          'user-read-currently-playing',
          'streaming',
          'user-read-email',
          'user-read-private'
      ]);
      setSdk(spotifyApi);
      console.log('Spotify SDK initialized with redirect URI:', redirectUri);
    } catch (err) {
      setError(`Failed to initialize Spotify SDK: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error('Spotify SDK initialization error:', err);
    }
  }, [clientId, redirectUri]);

  // Check authentication and get current playback
  useEffect(() => {
    if (!sdk) return;

    const checkAuth = async () => {
      try {
                // Check if we're returning from Spotify auth
                const urlParams = new URLSearchParams(window.location.search);
                const code = urlParams.get('code');
                const error = urlParams.get('error');
        
                if (error) {
                  setError(`Spotify authentication error: ${error}`);
                  return;
                }
        
                if (code) {
                  // Clear the URL parameters after successful auth
                  window.history.replaceState({}, document.title, window.location.pathname);
                }

        const user = await sdk.currentUser.profile();
        if (user) {
          setIsAuthenticated(true);
          setError(null);
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
      if (playback && playback.item) {
        setPlaybackState(playback);
        setCurrentTrack(playback.item as Track);
        setIsPlaying(playback.is_playing);
      } else {
        setCurrentTrack(null);
        setIsPlaying(false);
      }
    } catch (err) {
      console.error('Failed to get playback state:', err);
      if (err instanceof Error && err.message.includes('NO_ACTIVE_DEVICE')) {
        setError('No active device found. Please check your Spotify app.');
      }
    }
  }, [sdk, isAuthenticated]);
  // Poll for playback updates
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(getCurrentPlayback, 3000);
    return () => clearInterval(interval);
  }, [isAuthenticated, getCurrentPlayback]);

  const handleLogin = async () => {
    if (!sdk) {
      setError('Spotify SDK not initialized');
      return;
    }

    try {
      setError(null);
      console.log('Attempting to authenticate with redirect URI:', redirectUri);
      await sdk.authenticate();
      setIsAuthenticated(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown authentication error'; 
      setError(`Failed to authenticate with Spotify: ${errorMessage}`);
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
      setTimeout(getCurrentPlayback, 500);
    } catch (err) {
      console.error('Failed to toggle playback:', err);
      if(err instanceof Error && err.message.includes('NO_ACTIVE_DEVICE')) {
        setError('No active device found. Please start playing music on Spotify first.');
      }
    }
  };

  const handleNext = async () => {
    if (!sdk || !isAuthenticated) return;

    try {
      await sdk.player.skipToNext('');
      setTimeout(getCurrentPlayback, 1000);
    } catch (err) {
      console.error('Failed to skip to next track:', err);
      if(err instanceof Error && err.message.includes('NO_ACTIVE_DEVICE')) {
        setError('No active device found. Please start playing music on Spotify first.');
      }
    }
  };

  const handlePrevious = async () => {
    if (!sdk || !isAuthenticated) return;

    try {
      await sdk.player.skipToPrevious('');
      setTimeout(getCurrentPlayback, 1000);
    } catch (err) {
      console.error('Failed to skip to previous track:', err);
      if(err instanceof Error && err.message.includes('NO_ACTIVE_DEVICE')) {
        setError('No active device found. Please start playing music on Spotify first.');
      }
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
        {error.includes('redirect URI') && (
          <div className ="error-help">
            <p> <strong>To fix this:</strong></p>
            <ol>
              <li>Go to your Spotify App Dashboard</li>
              <li>Add this redirect URI: <code>{redirectUri}</code></li>
              <li>Make sure to save the settings</li>
            </ol>
          </div>
        )}
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
          <p>Connect your Spotify account to control music playback</p>
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

  return (
    <div className="spotify-player">
      <div className="spotify-header">
        <h3>🎵 Now Playing</h3>
        <button
        onClick={()=>setIsAuthenticated(false)}
        className='disconnect-btn'
        title='Disconnect'
        >
          ↻
        </button>
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
            <p className='album-name' title={currentTrack.album?.name}>
              {currentTrack.album?.name}
            </p>
          </div>
        </div>
      ) : (
        <div className="no-track">
          <p>No track currently playing</p>
          <small>Start playing music on any Spotify device</small>
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

      {playbackState && currentTrack && (
        <div className="progress-info">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${((playbackState.progress_ms || 0) / (currentTrack.duration_ms || 1)) * 100}%` 
              }}
            ></div>
          </div>
          <div className="time-info">
            <span className="current-time">
              {formatTime(playbackState.progress_ms || 0)}
            </span>
            <span className="total-time">
              {formatTime(currentTrack.duration_ms || 0)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotifyPlayer; 