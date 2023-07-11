module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@types': './src/types',
          '@store': './src/store',
          '@utils': './src/utils',
          '@forms': './src/forms',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
