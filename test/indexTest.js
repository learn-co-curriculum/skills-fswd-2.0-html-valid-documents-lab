describe('index.html', () => {
	it('contains an `p` nested inside a `div`', () => {
		expect(
			document.querySelectorAll('body').length,
			'No `body` tag was found'
		).to.be.above(0);
		expect(
			document.querySelector('body').outerHTML,
			'No `h1` tag was found inside `body`'
		).to.match(/<h1>[\s\S]*?<\/h1>/);
	});

	it('contains an `li` tag nested inside a `ul`', () => {
		expect(
			document.querySelectorAll('ul').length,
			'No `ul` tag was found'
		).to.be.above(0);
		expect(
			document.querySelector('ul').outerHTML,
			'No `li` tag was found inside a `ul`'
		).to.match(/<li>[\s\S]*?<\/li>/);
	});

	it('contains a `span` tag inside a `main` tag', () => {
		expect(
			document.querySelectorAll('main').length,
			'No `main` tag was found'
		).to.be.above(0);
		expect(
			document.querySelector('main').outerHTML,
			'No `span` tag was found inside a `main` tag'
		).to.match(/<span>[\s\S]*?<\/span>/);
	});

	it('contains a `header` tag inside an `article` tag', () => {
		expect(
			document.querySelectorAll('article').length,
			'No `article` tag was found'
		).to.be.above(0);
		expect(
			document.querySelector('article').outerHTML,
			'No `header` tag was found inside a `article` tag'
		).to.match(/<header>[\s\S]*?<\/header>/);
	});

	it('contains an `h4` tag inside a `aside` tag', () => {
		expect(
			document.querySelectorAll('aside').length,
			'No `aside` tag was found'
		).to.be.above(0);
		expect(
			document.querySelector('aside').outerHTML,
			'No `h4` tag was found inside a `aside` tag'
		).to.match(/<h4>[\s\S]*?<\/h4>/);
	});

	it('contains a `strong` tag and an `em` tag inside a `p` tag', () => {
		expect(
			document.querySelectorAll('p').length,
			'No `p` tag was found'
		).to.be.above(0);
		expect(
			document.querySelector('p').outerHTML,
			'No `strong` tag was found inside a `p` tag'
		).to.match(/<strong>[\s\S]*?<\/strong>/);
		expect(
			document.querySelector('p').outerHTML,
			'No `em` tag was found inside a `p` tag'
		).to.match(/<em>[\s\S]*?<\/em>/);
	});

	it('contains a `summary` tag inside a `details` tag', () => {
		expect(
			document.querySelectorAll('details').length,
			'No `details` tag was found'
		).to.be.above(0);
		expect(
			document.querySelector('details').outerHTML,
			'No `summary` tag was found inside a `details` tag'
		).to.match(/<summary>[\s\S]*?<\/summary>/);
	});

	it('contains a `q` tag inside a `div` tag', () => {
		expect(
			document.querySelectorAll('div').length,
			'No `div` tag was found'
		).to.be.above(0);
		expect(
			document.querySelector('div').outerHTML,
			'No `q` tag was found inside a `div` tag'
		).to.match(/<q>[\s\S]*?<\/q>/);
	});

	it('contains a `del` tag and an `ins` tag inside an `address` tag', () => {
		expect(
			document.querySelectorAll('address').length,
			'No `address` tag was found'
		).to.be.above(0);
		expect(
			document.querySelector('address').outerHTML,
			'No `del` tag was found inside a `address` tag'
		).to.match(/<del>[\s\S]*?<\/del>/);
		expect(
			document.querySelector('address').outerHTML,
			'No `ins` tag was found inside a `address` tag'
		).to.match(/<ins>[\s\S]*?<\/ins>/);
	});

	it('contains a `mark` tag inside an `h3` tag inside a `section` tag', () => {
		expect(
			document.querySelectorAll('section').length,
			'No `section` tag was found'
		).to.be.above(0);
		expect(
			document.querySelector('section').outerHTML,
			'No `h3` tag was found inside a `section` tag'
		).to.match(/<h3>[\s\S]*?<\/h3>/);
		expect(
			document.querySelector('h3').outerHTML,
			'No `mark` tag was found inside a `h3` tag'
		).to.match(/<mark>[\s\S]*?<\/mark>/);
		expect(
			document.querySelector('section').outerHTML,
			'Create a `mark` tag inside an `h3` tag inside an `section` tag'
		).to.match(/<mark>[\s\S]*?<\/mark>/);
		expect(
			document.querySelector('section').outerHTML,
			'The `mark` is not nested correctly within `h3`'
		).to.match(/<h3>[\s\S]*?<mark>[\s\S]*?<\/mark>[\s\S]*?<\/h3>/);
	});
});
