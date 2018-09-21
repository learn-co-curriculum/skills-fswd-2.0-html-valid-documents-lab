const chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
global.expect = chai.expect;
chai.use(chaiAsPromised);

const fs = require('file-system');
const jsdom = require('mocha-jsdom');
const path = require('path');

const validator = require('html-validator');

const file = 'index-06.html';

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

	it('does not contain a written html tag', () => {
		expect(
			html,
			`The 'html' opening and closing tags are optional, remove them from ${file} to pass this test`
		).to.not.match(/<html[\s\S]*\/html>/);
	});

	describe('head tag', () => {
		it(`is not written in ${file}`, () => {
			expect(html, `An opening 'head' tag was found ${file}`).to.not.include(
				'<head>'
			);
			expect(html, `An closing 'head' tag was found ${file}`).to.not.include(
				'</head>'
			);
		});

		it(`meta tag for character set is still present`, () => {
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

		it(`meta tag for website description is still present`, () => {
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

		it('title tag is still present', () => {
			expect(html, `No opening 'title' tag was found ${file}`).to.include(
				'<title>'
			);
			expect(html, `Closing 'title' tags are not optional.`).to.include(
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

		it(`is not written in ${file}`, () => {
			expect(html, `An opening 'body' tag was found in ${file}`).to.not.include(
				'<body>'
			);
			expect(html, `An opening 'body' tag was found in ${file}`).to.not.include(
				'</body>'
			);
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
