"use strict";angular.module("playerApp").filter("noteListFilter",function(){return function(e,r){if(r){var n=angular.lowercase(r);return e.filter(function(e){return angular.lowercase(e.title).includes(n)||angular.lowercase(e.note).includes(n)})}return e}});