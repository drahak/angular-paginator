AngularJS paginator
==================

Installation & setup
--------------------
Add dependency to your angular module.

```js
angular.module('myAwesomeApp', ['drahak.paginator']);
```

Paginator has two files: source and template so you can easily replace the template with your own. Just load it to template cache as `drahak/paginator.html`.

Directive
---------
Use `paginator` directive either as element or attribute. You can use attributes `page` (defaults to 1), `perPage` (defaults to 15) and `totalCount` (required) to set paginator values and `pageChange` event e.g. to load data on page change.

```html
<paginator page="{{ page }}" per-page="{{ perPage }}" total-count="{{ totalCount }}" page-change="changePage($page)">
</paginator>
```

you can use a few internal values in `pageChange` attribute:
`$page` (Number) - current page number
`$isFirst` (Boolean) - is current page the first page
`$isLast` (Boolean) - is current page the last page
`$paginator` (Paginator) - `Paginator` object