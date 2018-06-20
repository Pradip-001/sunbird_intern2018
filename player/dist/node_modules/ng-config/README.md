# ng-config

[![Build Status][travis-image]][travis-url]

[travis-url]: https://travis-ci.org/tlvince/ng-config
[travis-image]: https://travis-ci.org/tlvince/ng-config.svg?branch=master

> Generate Angular constants from POJO

## Usage

`ng-config` returns a single function that takes an optional `options` object
and returns a string.

Example:

```js
var fs = require('fs');
var ngConfig = require('ng-config');
var options = {
  constants: {
    hello: 'world'
  }
};

var config = ngConfig(options);

console.log(config);
// =>
// 'use strict';
// angular.module('config', [])
//   .constant('hello', 'world');

fs.writeFileSync('app/config.js', config);
```

The module name and template are customisable. See the source the current
defaults.

## See also

* Need streams? [gulp-ng-constant][]
* Need Grunt support? [grunt-ng-constant][]

[gulp-ng-constant]: https://github.com/guzart/gulp-ng-constant
[grunt-ng-constant]: https://github.com/werk85/grunt-ng-constant

## Author

© 2014 Tom Vincent <git@tlvince.com>

## License

Licensed under the [MIT license](http://tlvince.mit-license.org).
