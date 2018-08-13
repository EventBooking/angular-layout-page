'use strict';

module.exports = {
	files: [
		'demo/**/*'
	],
	// This fails for lite-server (but is correct for browsersync itself)
	// proxy: {
	// 	target: 'http://localhost:3000'
	// },
	port: 5000,
	ui: {
		port: 5001
	},
	open: true,
    host: '0.0.0.0'
};
