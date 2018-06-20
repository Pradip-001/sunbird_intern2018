'use strict';
angular.module('<%= module %>', [])<% Object.keys(constants).forEach(function(key) { %>
  .constant('<%= key %>', <%= JSON.stringify(constants[key]) %>)<% }); %>;
