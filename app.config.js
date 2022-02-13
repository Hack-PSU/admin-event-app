// import 'dotenv/config'

export default {
  "expo": {
    "name": "admin-app",
    "slug": "admin-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0,
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "staging": {
        "apiKey": process.env.STAGING_API_KEY,
        "authDomain": process.env.STAGING_AUTH_DOMAIN,
        "databaseUrl": process.env.STAGING_DB_URL,
        "projectId": process.env.STAGING_PROJECT_ID,
        "storageBucket": process.env.STAGING_STORAGE_BUCKET,
        "messagingSenderId": process.env.STAGING_MESSAGING_SENDER_ID,
        "appId": process.env.STAGING_APP_ID
      }
    }
  }
}
