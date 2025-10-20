# Vercel Deployment Setup

## Required Environment Variables

To successfully deploy this application on Vercel, you MUST configure the following environment variables:

### 🔴 Critical (Required for app to function):

1. **`NEXT_PUBLIC_BASE_URL`**
   - Your backend API URL
   - Example: `https://api.yourdomain.com`
   - Without this, the app will fail to load

2. **`NEXT_PUBLIC_SECRET_KEY`**
   - API authentication secret key
   - Example: `your-secret-api-key-here`

3. **`NEXT_PUBLIC_HOST_SOCKET`**
   - WebSocket server host
   - Example: `socket.yourdomain.com`

4. **`NEXT_PUBLIC_WSS_PORT`**
   - WebSocket server port
   - Example: `6001`

### 🟡 Optional (Has defaults but recommended to set):

5. **`NEXT_PUBLIC_GOOGLE_CLIENT_ID`**
   - Google OAuth Client ID (for Google login)
   - Example: `123456789-abcdefg.apps.googleusercontent.com`

6. **`NEXT_PUBLIC_APP_NAME`**
   - Application name
   - Default: `Tradexpro Exchange`

7. **`NEXT_PUBLIC_FAVICON`**
   - Favicon path
   - Default: `/favicon.ico`

8. **`NEXT_PUBLIC_SEO_TITLE`**
   - SEO page title
   - Default: `Tradexpro - Crypto Trading Platform`

9. **`NEXT_PUBLIC_SEO_DES`**
   - SEO meta description
   - Default: `Professional cryptocurrency exchange platform`

10. **`NEXT_PUBLIC_SEO_KEYWORDS`**
    - SEO keywords
    - Default: `crypto,trading,exchange,bitcoin,cryptocurrency`

## How to Add Environment Variables in Vercel:

1. Go to https://vercel.com/dashboard
2. Select your project (`trdprx`)
3. Click on **Settings**
4. Click on **Environment Variables**
5. Add each variable:
   - **Key**: Variable name (e.g., `NEXT_PUBLIC_BASE_URL`)
   - **Value**: Your value
   - **Environment**: Select `Production`, `Preview`, and `Development`
6. Click **Save**
7. **Redeploy** your application for changes to take effect

## Current Status:

❌ Environment variables are NOT configured
⚠️ The app will show 500 errors until you add the required variables

## Need Help?

Contact your backend administrator for the correct API URL and SECRET_KEY values.

