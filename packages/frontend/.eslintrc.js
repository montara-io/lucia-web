module.exports = {
  extends: ['react-app', 'react-app/jest'],
  rules: {
    'import/no-anonymous-default-export': 'off',
  },
  overrides: [
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
};
