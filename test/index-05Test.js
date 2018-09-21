const chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
global.expect = chai.expect;
chai.use(chaiAsPromised);

const fs = require('file-system');
const jsdom = require('mocha-jsdom');
const path = require('path');

const validator = require('html-validator');

const file = 'index-05.html';

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

	it('contains an html tag', () => {
		expect(html, `No opening 'html' tag was found ${file}`).to.include(
			'<html>'
		);
		expect(html, `No opening 'html' tag was found ${file}`).to.include(
			'</html>'
		);

		expect(
			document.querySelector('html').outerHTML,
			"No 'html' tag was found"
		).to.contain('html');
	});

	describe('head tag', () => {
		it(`is present in ${file}`, () => {
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

		it(`contains a meta tag for character set`, () => {
			let tags = document.querySelectorAll('meta');
			let metaTag = Array.prototype.find.call(
				tags,
				tag => !!tag.getAttribute('charset')
			);
			expect(metaTag.outerHTML, 'Character set meta tag not found').to.contain(
				'meta'
			);
			expect(
				metaTag,
				'Character set meta tag has incorrect value set for `charset` attribute'
			)
				.to.have.attr('charset')
				.match(/(utf-8|UTF-8)/);
		});

		it(`contains a meta tag for website description`, () => {
			let tags = document.querySelectorAll('meta');
			let metaTag = Array.prototype.find.call(
				tags,
				tag => !!tag.getAttribute('name')
			);
			expect(metaTag.outerHTML, 'Description meta tag not found').to.contain(
				'meta'
			);
			expect(
				metaTag,
				'Meta tag for site description should have a name attribute set to "description"'
			)
				.to.have.attr('name')
				.match(/description/);
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
	});

	describe('body tag', () => {
		let body;

		before(() => {
			body = document.querySelector('body');
		});

		it('contains a body tag', () => {
			expect(html, `No opening 'body' tag was found ${file}`).to.include(
				'<body>'
			);
			expect(html, `No opening 'body' tag was found ${file}`).to.include(
				'</body>'
			);

			expect(body.outerHTML, "No 'body' tag was found").to.contain('body');
		});

		it('contains a valid `div` tag', () => {
			expect(body.innerHTML, "No 'div' tag was found within 'body'").to.contain(
				'div'
			);
		});

		it('contains a valid `p` tag', () => {
			expect(body.innerHTML, "No 'p' tag was found within 'body'").to.contain(
				'p'
			);
		});
	});
});
