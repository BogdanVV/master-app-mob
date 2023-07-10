module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'object-curly-spacing': ['error', 'always'],
    'prettier/prettier': [
      'error',
      { semi: false, bracketSpacing: true, bracketSameLine: false },
    ],
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-unstable-nested-components': 'off',
  },
}
