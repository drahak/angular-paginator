(function() {
	'use strict';

	angular.module('drahak.paginator').run(['$templateCache', function($templateCache) {
		$templateCache.put('drahak/paginator.html',
			'<ul class="pagination">' +
				'<li><a data-ng-click="paginator.first()">&laquo;</a></li>' +
				'<li><a data-ng-click="paginator.prev()">&lsaquo;</a></li>' +
				'<li data-ng-repeat="page in steps" data-ng-class="{ active: paginator.page == page }">' +
					'<a data-ng-click="paginator.page = page">{{ page }}</a>' +
				'</li>' +
				'<li><a data-ng-click="paginator.next()">&rsaquo;</a></li>' +
				'<li><a data-ng-click="paginator.last()">&raquo;</a></li>' +
			'</ul> ');
	}]);
})();