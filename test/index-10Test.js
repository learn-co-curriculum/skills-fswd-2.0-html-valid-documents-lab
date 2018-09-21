const chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
global.expect = chai.expect;
chai.use(chaiAsPromised);

const fs = require('file-system');
const jsdom = require('mocha-jsdom');
const path = require('path');

const validator = require('html-validator');

const file = 'index-10.html';

let html = fs.readFileSync(path.resolve(__dirname, '..', file), 'utf-8');

function asyncValidation() {
	const options = {
		data: html,
		format: 'text'
	};

	return expect(
		new Promise(resolve => {
			validator(options)
				.then(data => {
					data.match(
						/The document validates according to the specified schema\(s\)/
					)
						? resolve(true)
						: resolve(data.slice(0, data.indexOf('\n')));
				})
				.catch(error => {
					resolve(error);
				});
		}),
		'Document Invalid'
	).to.eventually.equal(true);
}

// 1
describe(file, () => {
	jsdom({ html, skipWindowCheck: true });

	before(() => {
		chai.use(require('chai-dom'));
	});

	it('is a valid HTML document', () => {
		return asyncValidation();
	});
});
