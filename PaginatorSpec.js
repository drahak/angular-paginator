describe('Paginator service', function() {

	var paginator;
	beforeEach(module('drahak.paginator'));
	beforeEach(inject(function(Paginator) {
		paginator = Paginator(1, 15, 86);
	}));

	it('has all data to render paginator', function() {
		expect(paginator.page).toBe(1);
		expect(paginator.limit).toBe(15);
		expect(paginator.total).toBe(86);
	});

	it('counts total number of pages', function() {
		var pages = paginator.count();
		expect(pages).toBe(6);
	});

	it('moves paginator to last page', function() {
		var last = paginator.last();
		expect(last).toBe(6);
		expect(paginator.page).toBe(6);
	});

	it('moves paginator to first page', function() {
		var first = paginator.first();
		expect(first).toBe(1);
		expect(paginator.page).toBe(1);
	});

	it('returns null for previous page if paginator current page is 1', function() {
		var page = paginator.prev();
		expect(page).toBe(null);
	});

	it('returns null for next page if paginator current page is the last page', function() {
		paginator.page = 6;
		var page = paginator.next();
		expect(page).toBe(null);
	});

	it('moves paginator to next page', function() {
		var page = paginator.next();
		expect(page).toBe(2);
		expect(paginator.page).toBe(2);
	});

	it('moves paginator to previous page', function() {
		paginator.page = 2;
		var page = paginator.prev();
		expect(page).toBe(1);
		expect(paginator.page).toBe(1);
	});

	it('returns all pages in array', function() {
		var pages = paginator.pages();
		expect(pages).toEqual([1, 2, 3, 4, 5, 6]);
	});

	it('checks if current page is the last page', function() {
		paginator.page = 6;
		var isLast = paginator.isLast();
		expect(isLast).toBeTruthy();
	});

	it('checks if current page is the first page', function() {
		var isFirst = paginator.isFirst();
		expect(isFirst).toBeTruthy();
	});

});