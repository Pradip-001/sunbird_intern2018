"use strict";angular.module("playerApp").controller("ConceptPickerController",["$scope","$rootScope","$timeout","searchService","toasterService",function(e,t,n,c,o){e.loadConceptTree=function(){e.conceptLoader=o.loader("",t.messages.stmsg.m0049),t.concepts?e.loadDomains(!1,t.concepts):t.getConcept(0,200,e.loadDomains)},e.loadDomains=function(n,s){if(n&&!0===n)o.error(t.messages.fmsg.m0015);else{t.concepts=s;var i=[],r={filters:{objectType:["Dimension","Domain"]}};c.search(r).then(function(n){n.result&&_.isArray(n.result.domains)&&(_.forEach(n.result.domains,function(c){var o={};o.id=c.identifier,o.name=c.name;var s=[];_.forEach(e.getChild(c.identifier,n.result.dimensions),function(n){var c={};c.id=n.id,c.name=n.name,c.nodes=e.getChild(n.id,t.concepts),s.push(c)}),o.nodes=s,i.push(o)}),t.conceptData=i,e.conceptLoader.showLoader=!1,e.initConceptBrowser())})}},e.initConceptBrowser=function(){e.selectedConcepts=e.selectedConcepts||[],e.contentConcepts=_.map(e.selectedConcepts,"identifier"),e.pickerMessage=e.contentConcepts.length+" concepts selected",$(".tree-picker-selector").val(e.pickerMessage),n(function(){$(".tree-picker-selector").treePicker({data:t.conceptData,name:"Concepts",picked:e.contentConcepts,onSubmit:function(n){$(".tree-picker-selector").val(n.length+" concepts selected"),_.defer(function(){e.$apply()}),e.contentConcepts=[],_.forEach(n,function(t){e.contentConcepts.push({identifier:t.id,name:t.name})}),e.selectedConcepts=e.contentConcepts,t.$broadcast("selectedConcepts",{selectedConcepts:e.selectedConcepts})},nodeName:"conceptSelector_treePicker",minSearchQueryLength:1})},500)},e.getChild=function(t,n){var c=[];return _.forEach(n,function(o){if(void 0!==o.parent&&o.parent[0]===t){var s={};s.id=o.identifier,s.name=o.name,s.selectable="selectable",s.nodes=e.getChild(o.identifier,n),c.push(s)}}),_.uniqBy(c,"id")},t.conceptData?e.initConceptBrowser():e.loadConceptTree(),e.isSearchPage&&t.$on("selectedConceptsFromSearch",function(t,n){e.selectedConcepts=n.selectedConcepts,e.initConceptBrowser()})}]);