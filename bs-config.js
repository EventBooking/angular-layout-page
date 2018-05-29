'use strict';

module.exports = {
	files: [
		'demo/**/*'
	],
	proxy: {
		target: 'http://localhost:3000'
	},
	port: 5000,
	ui: {
		port: 5001
	},
	open: false,
    host: '0.0.0.0'
};
