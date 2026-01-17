// oauth-config.js - OAuth Configuration for RoadMap-HUB
// ⚠️ IMPORTANT: Replace these with your actual credentials!

const OAuthConfig = {
  // ============================================
  // GOOGLE OAUTH CONFIGURATION
  // Get yours at: https://console.cloud.google.com/
  // ============================================
  google: {
    clientId: '1:969108481662:web:0cefac8628e6bd522eda2.apps.googleusercontent.com',
    // Instructions:
    // 1. Go to Google Cloud Console
    // 2. Create a new project or select existing
    // 3. Go to APIs & Services > Credentials
    // 4. Create OAuth 2.0 Client ID
    // 5. Add authorized JavaScript origins (your domain)
    // 6. Copy the Client ID here
  },

  // ============================================
  // GITHUB OAUTH CONFIGURATION
  // Get yours at: https://github.com/settings/developers
  // ============================================
  github: {
    clientId: 'YOUR_GITHUB_CLIENT_ID',
    // Instructions:
    // 1. Go to GitHub Settings > Developer Settings
    // 2. Click "OAuth Apps" > "New OAuth App"
    // 3. Set Homepage URL to your domain
    // 4. Set Authorization callback URL to your domain/callback
    // 5. Copy the Client ID here
    redirectUri: window.location.origin + '/callback.html',
  },

  // ============================================
  // LINKEDIN OAUTH CONFIGURATION
  // Get yours at: https://www.linkedin.com/developers/
  // ============================================
  linkedin: {
    clientId: 'YOUR_LINKEDIN_CLIENT_ID',
    // Instructions:
    // 1. Go to LinkedIn Developers
    // 2. Create a new app
    // 3. Add Sign In with LinkedIn product
    // 4. Set OAuth 2.0 redirect URLs
    // 5. Copy the Client ID here
    redirectUri: window.location.origin + '/callback.html',
    scope: 'r_liteprofile r_emailaddress',
  },

  // ============================================
  // FIREBASE CONFIGURATION (Recommended - Handles All OAuth)
  // Get yours at: https://console.firebase.google.com/
  // ============================================
  firebase: {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
    // Instructions:
    // 1. Go to Firebase Console
    // 2. Create a new project
    // 3. Go to Project Settings > General
    // 4. Scroll to "Your apps" and add a web app
    // 5. Copy the config object here
    // 6. Enable Authentication and add Google, GitHub, Microsoft providers
  },

  // Use Firebase for OAuth? (Recommended - easier setup)
  useFirebase: false, // Set to true after configuring Firebase
};

// Make config globally available
window.OAuthConfig = OAuthConfig;