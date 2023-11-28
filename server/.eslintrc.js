// module.exports = {
//   parser: '@typescript-eslint/parser',
//   extends: ['plugin:prettier/recommended', 'prettier', 'eslint:recommended'],
//   plugins: ['@typescript-eslint'],
//   parserOptions: {
//     // ecmaVersion: 2022,
//     sourceType: 'module',
//     project: 'tsconfig.json',
//     tsconfigRootDir : __dirname,
//   },
//   root: true,
//   env: {
//     es6: true,
//     node: true,
//   },
//   rules: {
//     'no-var': 'error',
//     semi: 'error',
//     indent: ['error', 2, { SwitchCase: 1 }],
//     'no-multi-spaces': 'error',
//     'space-in-parens': 'error',
//     'no-multiple-empty-lines': 'error',
//     // 'prefer-const': 'error',
//   },
// };

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', '.prettierrc', 'dist'],
  rules: {
    'no-var': 'error',
    'no-multiple-empty-lines': 'error',
    'no-multi-spaces': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-namespace': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn'
  },
};
