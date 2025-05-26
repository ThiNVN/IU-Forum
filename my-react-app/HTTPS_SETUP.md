# HTTPS Setup Guide

This guide will help you set up HTTPS for both your React frontend and Express backend in development.

## Quick Setup

1. **Copy environment file:**
   ```bash
   cp env.example .env
   ```

2. **Generate SSL certificates for backend:**
   ```bash
   npm run generate-ssl
   ```

3. **Start the applications:**
   ```bash
   # Start React app with HTTPS
   npm start

   # Start backend server (in another terminal)
   npm run dev
   ```

## What Changed

### Frontend (React)
- ✅ React dev server now runs on `https://localhost:3000`
- ✅ Added `HTTPS=true` environment variable
- ✅ Updated Spotify redirect URI to use HTTPS

### Backend (Express)
- ✅ Backend supports both HTTP and HTTPS
- ✅ CORS configured for both `http://localhost:3000` and `https://localhost:3000`
- ✅ Auto-detects SSL certificates and uses HTTPS when available
- ✅ Falls back to HTTP if no SSL certificates found

## Manual SSL Certificate Generation

If the automatic script doesn't work, you can generate certificates manually:

### Option 1: Using OpenSSL
```bash
# Create ssl directory
mkdir -p src/Backend/ssl

# Generate private key
openssl genrsa -out src/Backend/ssl/key.pem 2048

# Generate certificate
openssl req -new -x509 -key src/Backend/ssl/key.pem -out src/Backend/ssl/cert.pem -days 365 -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
```

### Option 2: Using mkcert (Recommended)
```bash
# Install mkcert (if not already installed)
# Windows: choco install mkcert
# macOS: brew install mkcert
# Linux: Check mkcert GitHub for installation instructions

# Install local CA
mkcert -install

# Generate certificates
mkdir -p src/Backend/ssl
mkcert -key-file src/Backend/ssl/key.pem -cert-file src/Backend/ssl/cert.pem localhost 127.0.0.1
```

## Browser Security Warnings

When using self-signed certificates, browsers will show security warnings. This is normal for development:

1. **Chrome/Edge:** Click "Advanced" → "Proceed to localhost (unsafe)"
2. **Firefox:** Click "Advanced" → "Accept the Risk and Continue"
3. **Safari:** Click "Show Details" → "visit this website"

## Spotify Configuration

Don't forget to update your Spotify app settings:

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Select your app
3. Update redirect URIs from `http://localhost:3000` to `https://localhost:3000`

## Scripts Available

- `npm start` - Start React app with HTTPS
- `npm run start:http` - Start React app with HTTP (fallback)
- `npm run dev` - Start backend server
- `npm run generate-ssl` - Generate SSL certificates

## Troubleshooting

### "HTTPS=true not working"
- Make sure you have the `.env` file with `HTTPS=true`
- For Windows users:
  - The package.json script has been updated to use `set HTTPS=true&&` syntax
  - If still having issues, try running: `set HTTPS=true && npm start`
- For Unix/Mac users:
  - Try setting it directly: `HTTPS=true npm start`

### "Backend SSL not working"
- Check if certificates exist in `src/Backend/ssl/`
- Run `npm run generate-ssl` to generate them
- Backend will fall back to HTTP if certificates are missing

### "Browser shows security warning"
- This is normal for self-signed certificates
- Use mkcert for trusted local certificates
- Or accept the security warning for development

### "CORS errors"
- Backend is configured for both HTTP and HTTPS origins
- Make sure both frontend and backend are running
- Check browser console for specific CORS errors 