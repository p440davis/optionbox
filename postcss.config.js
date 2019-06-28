module.exports = {
	plugins: [
		require('stylelint'),
		require('@csstools/postcss-sass'),
		require('postcss-preset-env'),
		require('cssnano')
	],
};
