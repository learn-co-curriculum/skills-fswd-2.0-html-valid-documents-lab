const chai = require('chai');
global.expect = chai.expect;
const fs = require('file-system');
const jsdom = require('mocha-jsdom');
const path = require('path');
const babel = require('babel-core');

const html = fs.readFileSync(
	path.resolve(__dirname, '..', 'index.html'),
	'utf-8'
);

jsdom({
	html
});
