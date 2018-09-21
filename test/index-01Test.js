const chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
global.expect = chai.expect;
chai.use(chaiAsPromised);

const fs = require('file-system');
const jsdom = require('mocha-jsdom');
const path = require('path');

const validator = require('html-validator');

const file = 'index-01.html';

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

describe(file, () => {
	jsdom({ html, skipWindowCheck: true });

	before(() => {
		chai.use(require('chai-dom'));
	});

	it('is a valid HTML document', () => {
		return asyncValidation();
	});

	it('contains a title tag', () => {
		expect(html, `No opening 'title' tag was found ${file}`).to.include(
			'<title>'
		);
		expect(html, `No closing 'title' tag was found ${file}`).to.include(
			'</title>'
		);

		expect(
			document.querySelector('title').outerHTML,
			"No 'title' tag was found"
		).to.contain('title');
	});

	it('contains only doctype and title tags', () => {
		expect(document.body.innerHTML).to.equal('');
		expect(html, `An opening 'html' tag was found in ${file}`).to.not.include(
			'<html>'
		);
		expect(html, `An opening 'html' tag was found in ${file}`).to.not.include(
			'</html>'
		);
		expect(html, `An opening 'head' tag was found in ${file}`).to.not.include(
			'<head>'
		);
		expect(html, `An opening 'head' tag was found in ${file}`).to.not.include(
			'</head>'
		);
		expect(html, `An opening 'body' tag was found in ${file}`).to.not.include(
			'<body>'
		);
		expect(html, `An opening 'body' tag was found in ${file}`).to.not.include(
			'</body>'
		);
	});
});
