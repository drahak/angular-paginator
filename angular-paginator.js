(function() {
	'use strict';

	var paginator = angular.module('drahak.paginator', []);
	paginator.value('paginatorVisibleRadius', 4);
	paginator.value('paginatorLimit', 15);

	paginator.factory('Paginator', function() {

		/**
		 * @param {Number} page
		 * @param {Number} limit of items per page
		 * @param {Number} total count of items in paginator
		 * @constructor
		 */
		var Paginator = function(page, limit, total) {
			this.page = page;
			this.limit = limit;
			this.total = total;
		};

		/**
		 * Counts total number of pages
		 * @returns {Number}
		 */
		Paginator.prototype.count = function() {
			return Math.ceil(this.total / this.limit);
		};

		/**
		 * Moves paginator to next page
		 * @returns {Number}
		 */
		Paginator.prototype.next = function() {
			if (this.page >= this.count()) {
				return null;
			}
			return ++this.page;
		};

		/**
		 * Moves paginator to previous page
		 * @returns {Number}
		 */
		Paginator.prototype.prev = function() {
			if (this.page <= 1) {
				return null;
			}
			return --this.page;
		};

		/**
		 * Moves paginator to last page
		 * @returns {Number}
		 */
		Paginator.prototype.last = function() {
			return this.page = this.count();
		};

		/**
		 * Moves paginator to first page
		 * @returns {Number}
		 */
		Paginator.prototype.first = function() {
			return this.page = 1;
		};

		/**
		 * Checks if current page is the first page
		 * @returns {Boolean}
		 */
		Paginator.prototype.isFirst = function() {
			return this.page === 1;
		};

		/**
		 * Checks if current page is the last page
		 * @returns {Boolean}
		 */
		Paginator.prototype.isLast = function() {
			return this.page === this.count();
		};

		/**
		 * Returns all paginator pages
		 * @returns {Array.<Number>}
		 */
		Paginator.prototype.pages = function() {
			var pages = [];
			for (var i = 1; i <= this.count(); i++) {
				pages.push(i);
			}
			return pages;
		};

		return function(page, limit, total) {
			return new Paginator(page, limit, total);
		};
	});

	paginator.directive('paginator', ['$parse', 'Paginator', 'paginatorVisibleRadius', 'paginatorLimit',
		function($parse, Paginator, paginatorVisibleRadius, paginatorLimit) {

			return {
				scope: {
					page: '@',
					limit: '@',
					total: '@'
				},
				restrict: 'AE',
				templateUrl: 'drahak/paginator.html',
				link: function(scope, element, attrs) {
					var invoker = attrs.change && $parse(attrs.change);

					scope.paginator = Paginator(scope.page, scope.limit, scope.total);

					var reducePages = function(pages) {
						var range = [];
						var paginator = scope.paginator;
						var top = Math.min(paginator.count(), paginator.page + paginatorVisibleRadius);
						var bottom = Math.max(1, paginator.page - paginatorVisibleRadius);
						for (var i = bottom; i <= top; i++) range.push(i);
						return range;
					};

					scope.$watch('paginator.page', function(page) {
						scope.steps = reducePages(scope.paginator.pages());
						if (!invoker) return page;

						invoker(scope.$parent, {
							$page: page,
							$paginator: scope.paginator,
							$isFirst: scope.paginator.isFirst(),
							$isLast: scope.paginator.isLast()
						});
						return page;
					});

					scope.$watch('paginator.total', function() {
						var pages = scope.paginator.pages();
						if (pages.length < 2) {
							scope.steps = pages;
						} else {
							scope.steps = reducePages(pages);
						}
					});

					// Watch attributes for change
					attrs.$observe('page', function(page) {
						scope.paginator.page = parseInt(page) || 1;
					});
					attrs.$observe('limit', function(limit) {
						scope.paginator.limit = parseInt(limit) || paginatorLimit;
					});
					attrs.$observe('total', function(total) {
						scope.paginator.total = parseInt(total);
					});
				}
			}
		}]);

})();