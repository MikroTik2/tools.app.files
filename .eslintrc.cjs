/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  overrides: [
    {
      files: [
        'e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'
      ],
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  globals: {
    module: 'readonly',
  },
  rules: {
    'no-undef': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/multi-word-component-names': 'off',
  }
};
