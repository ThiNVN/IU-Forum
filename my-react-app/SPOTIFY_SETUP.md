# Spotify Player Setup Guide

This guide will help you set up the Spotify player integration in the sidebar.

## Prerequisites

1. A Spotify account (free or premium)
2. A Spotify Developer account

## Setup Steps

### 1. Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create an App"
4. Fill in the app details:
   - App name: "IU Forum Player" (or any name you prefer)
   - App description: "Music player for IU Forum"
   - Website: `https://localhost:3000` (for development)
   - Redirect URI: `https://localhost:3000`
5. Accept the terms and create the app

### 2. Get Your Client ID

1. In your newly created app dashboard, you'll see your **Client ID**
2. Copy this Client ID - you'll need it for the next step

### 3. Configure Environment Variables

1. Create a `.env` file in the root of the `my-react-app` directory
2. Add the following content:

```env
REACT_APP_SPOTIFY_CLIENT_ID=your_actual_client_id_here
REACT_APP_SPOTIFY_REDIRECT_URI=https://localhost:3000
```

3. Replace `your_actual_client_id_here` with the Client ID you copied from step 2
4. Save the file

### 4. Update Redirect URIs (Important!)

1. Go back to your Spotify app dashboard
2. Click "Edit Settings"
3. In the "Redirect URIs" section, add:
   - `https://localhost:3000` (for development)
   - Your production domain when you deploy (e.g., `https://yourdomain.com`)
4. Save the settings

### 5. Restart Your Development Server

After creating the `.env` file, restart your React development server:

```bash
npm start
```

## How It Works

The Spotify player in the sidebar will:

1. Show a "Connect Spotify" button when not authenticated
2. Redirect you to Spotify for authorization when you click the button
3. Display the currently playing track with album art
4. Provide basic playback controls (play/pause, next, previous)
5. Show playback progress

## Required Spotify Scopes

The player requests these permissions:
- `user-read-playback-state` - To see what's currently playing
- `user-modify-playback-state` - To control playback (play/pause/skip)
- `user-read-currently-playing` - To get current track information

## Troubleshooting

### "Client ID not provided" Error
- Make sure your `.env` file is in the correct location (`my-react-app/.env`)
- Ensure the variable name is exactly `REACT_APP_SPOTIFY_CLIENT_ID`
- Restart your development server after creating/modifying the `.env` file

### "Invalid redirect URI" Error
- Check that your redirect URI in the Spotify app settings matches exactly: `https://localhost:3000`
- Make sure there are no trailing slashes or extra characters

### "Authentication failed" Error
- Verify your Client ID is correct
- Check that your Spotify app is not in development mode restrictions
- Ensure you're using the correct Spotify account

### Player Not Showing Current Track
- Make sure you have an active Spotify session (playing music on any device)
- The player shows what's currently playing across all your Spotify devices
- Try playing a song on Spotify and wait a few seconds for it to update

## Security Notes

- Never commit your `.env` file to version control
- Add `.env` to your `.gitignore` file
- Only share your Client ID, never share your Client Secret (not needed for this integration)
- Use environment variables for production deployment

## Features

- 🎵 Real-time display of currently playing track
- 🖼️ Album artwork display
- ⏯️ Play/pause control
- ⏭️ Next/previous track controls
- ⏱️ Playback progress display
- 📱 Responsive design
- 🎨 Beautiful Spotify-themed UI

Enjoy your music while browsing the IU Forum! 🎶 