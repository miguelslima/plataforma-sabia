module.exports = {
	presets: ['next/babel'],
	plugins: [
		[
			'i18next-extract',
			{
				locales: ['pt', 'en'],
				outputPath: './public/static/locales/{{locale}}/{{ns}}.json',
			},
		],
		[
			'styled-components',
			{
				ssr: true,
			},
		],
	],
};
