AngularJS paginator [![Build status](https://api.travis-ci.org/drahak/angular-paginator.png)](https://travis-ci.org/drahak/angular-paginator)
===================

Installation & setup
--------------------
Add dependency to your angular module.

```js
angular.module('myAwesomeApp', ['drahak.paginator']);
```

Paginator has two files: source and template so you can easily replace the template with your own. Just load it to template cache as `drahak/paginator.html`.

Directive
---------
Use `paginator` directive either as element or attribute. You can use attributes `page` (defaults to 1), `limit` (defaults to 15) and `total` (required) to set paginator values and `change` event e.g. to load data on page change.

```html
<paginator page="{{ page }}" limit="{{ perPage }}" total="{{ totalCount }}" change="changePage($page)">
</paginator>
```

you can use a few internal values in `change` attribute:
`$page` (Number) - current page number
`$isFirst` (Boolean) - is current page the first page
`$isLast` (Boolean) - is current page the last page
`$paginator` (Paginator) - `Paginator` object