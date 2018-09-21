const chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
global.expect = chai.expect;
chai.use(chaiAsPromised);

const fs = require('file-system');
const jsdom = require('mocha-jsdom');
const path = require('path');

const validator = require('html-validator');

const file = 'index-03.html';

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

	it('contains a head tag', () => {
		expect(html, `No opening 'head' tag was found ${file}`).to.include(
			'<head>'
		);
		expect(html, `No closing 'head' tag was found ${file}`).to.include(
			'</head>'
		);

		expect(
			document.querySelector('head').outerHTML,
			`No 'head' tag was found`
		).to.contain('head');
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

	it('contains a body tag', () => {
		expect(html, `No opening 'body' tag was found ${file}`).to.include(
			'<body>'
		);
		expect(html, `No opening 'body' tag was found ${file}`).to.include(
			'</body>'
		);

		expect(
			document.querySelector('body').outerHTML,
			"No 'body' tag was found"
		).to.contain('body');
	});
});
