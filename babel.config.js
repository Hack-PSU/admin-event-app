module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
      'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            "components": "./src/components",
            "routes": "./src/routes",
            "types": "./src/types",
            "assets": "./assets",
            'store': "./src/store"
          }
        },
      ],
      [
      'react-native-reanimated/plugin'
      ]
    ]
  };
};
