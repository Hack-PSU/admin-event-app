import 'dotenv/config'

export default {
  "expo": {
    "name": "admin-app",
    "slug": "admin-app",
    "version": "1.0.0",
    "owner": "hackpsu",
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
      "assets/images/*",
      "assets/lottie/*",
      "assets/fonts/*"
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
    extra: {
      staging: process.env.STAGING === 'true',
      config: {
        staging: {
          apiKey: process.env.STAGING_API_KEY,
          authDomain: process.env.STAGING_AUTH_DOMAIN,
          databaseUrl: process.env.STAGING_DB_URL,
          projectId: process.env.STAGING_PROJECT_ID,
          storageBucket: process.env.STAGING_STORAGE_BUCKET,
          messagingSenderId: process.env.STAGING_MESSAGING_SENDER_ID,
          appId: process.env.STAGING_APP_ID,
          baseURL: process.env.STAGING_BASE_URL,
          notificationBaseURL: process.env.STAGING_NOTIFICATION_BASE_URL
        },
        prod: {
          apiKey: process.env.PROD_API_KEY,
          authDomain: process.env.PROD_AUTH_DOMAIN,
          databaseUrl: process.env.PROD_DB_URL,
          projectId: process.env.PROD_PROJECT_ID,
          storageBucket: process.env.PROD_STORAGE_BUCKET,
          messagingSenderId: process.env.PROD_MESSAGING_SENDER_ID,
          appId: process.env.PROD_APP_ID,
          baseURL: process.env.PROD_BASE_URL,
          notificationBaseURL: process.env.PROD_NOTIFICATION_BASE_URL
        }
      }
    }
  }
}
