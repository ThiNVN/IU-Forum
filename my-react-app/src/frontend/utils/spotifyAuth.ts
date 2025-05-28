// PKCE and Spotify Auth Utilities

export const generateRandomString = (length: number): string => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = window.crypto.getRandomValues(new Uint8Array(length));
  return Array.from(values).map(x => possible[x % possible.length]).join('');
};

export const sha256 = async (plain: string): Promise<ArrayBuffer> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
};

export const base64encode = (input: ArrayBuffer): string => {
  // Convert ArrayBuffer to Uint8Array for compatibility
  const uint8Array = new Uint8Array(input);
  // Convert Uint8Array to a regular array for spreading
  const charArray = Array.from(uint8Array);
  return btoa(String.fromCharCode(...charArray))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

export const getStoredToken = (): string | null => {
  return window.localStorage.getItem('access_token');
};

export const getStoredRefreshToken = (): string | null => {
  return window.localStorage.getItem('refresh_token');
};

export const getTokenExpiry = (): number | null => {
  const expires = window.localStorage.getItem('expires_in');
  return expires ? parseInt(expires, 10) : null;
};

export const isTokenExpired = (): boolean => {
  const expiresIn = getTokenExpiry();
  return !expiresIn || Date.now() > expiresIn;
};

export const storeTokenData = (data: any) => {
  window.localStorage.setItem('access_token', data.access_token);
  if (data.refresh_token) {
    window.localStorage.setItem('refresh_token', data.refresh_token);
  }
  window.localStorage.setItem('expires_in', (Date.now() + data.expires_in * 1000).toString());
};

export const exchangeCodeForToken = async (
  code: string,
  clientId: string,
  redirectUri: string,
  clientSecret?: string
): Promise<any> => {
  const codeVerifier = window.localStorage.getItem('code_verifier');
  if (!codeVerifier) throw new Error('No code_verifier found');

  const headers: Record<string, string> = { 'Content-Type': 'application/x-www-form-urlencoded' };
  let body: URLSearchParams;

  if (clientSecret) {
    // Use HTTP Basic Auth header for confidential clients
    headers['Authorization'] = 'Basic ' + btoa(`${clientId}:${clientSecret}`);
    body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    });
  } else {
    // PKCE (no client secret)
    body = new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    });
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers,
    body,
  });
  const data = await response.json();
  storeTokenData(data);
  return data;
};

export const refreshAccessToken = async (
  clientId: string,
  clientSecret?: string
): Promise<any> => {
  const refresh_token = getStoredRefreshToken();
  if (!refresh_token) throw new Error('No refresh_token found');

  const headers: Record<string, string> = { 'Content-Type': 'application/x-www-form-urlencoded' };
  let body: URLSearchParams;

  if (clientSecret) {
    headers['Authorization'] = 'Basic ' + btoa(`${clientId}:${clientSecret}`);
    body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    });
  } else {
    body = new URLSearchParams({
      client_id: clientId,
      grant_type: 'refresh_token',
      refresh_token,
    });
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers,
    body,
  });
  const data = await response.json();
  storeTokenData(data);
  return data;
}; 