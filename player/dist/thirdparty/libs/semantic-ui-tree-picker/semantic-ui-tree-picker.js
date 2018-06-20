var conceptModal;(function(){$.fn.treePicker=function(e){var n,i,a,c,t,d,s,l,r,o,u,h,p,m,v,k,f,g,C,b,y,S,w,x;return x=$(this),p=[],u=[],b={},0==$("#"+e.nodeName).length||$("#"+e.nodeName).remove(),l=$("<div id="+e.nodeName+' class="ui tree-picker small modal">\n  <div class="header">\n    '+e.name+'\n\n    <div class="ui menu">\n      <a class="active tree item">\n        <i class="list icon"></i> Concepts\n      </a>\n      <a class="picked item">\n        <i class="checkmark icon"></i> Selected Concepts <span class="count"></span>\n      </a>\n    </div>\n  </div>\n  <div class="ui search form">\n    <div class="field">\n      <div class="ui icon input">\n        <input type="text" placeholder="Search">\n        <i class="search icon"></i>\n      </div>\n    </div>\n  </div>\n  <div class="content">\n    <div class="ui active inverted dimmer"><div class="ui text loader">Loading data</div></div>\n    <div class="tree-tab">\n      <div style="height: 400px"></div>\n    </div>\n\n    <div class="search-tab">\n    </div>\n\n    <div class="picked-tab">\n    </div>\n  </div>\n  <div class="actions">\n    <a class="pick-search"><i class="checkmark icon"></i> Choose All</a>\n    <a class="unpick-search"><i class="remove icon"></i> Remove All</a>\n    <a class="unpick-picked"><i class="remove icon"></i> Remove All</a>\n    <a class="ui blue button accept">Done</a>\n    <a class="ui button close">Cancel</a>\n  </div>\n</div>').modal({duration:200,allowMultiple:!0}),conceptModal=l,a=$(".count",l),b={tree:$(".tree-tab",l),search:$(".search-tab",l),picked:$(".picked-tab",l)},n={pickSearch:$(".actions .pick-search",l),unpickSearch:$(".actions .unpick-search",l),unpickPicked:$(".actions .unpick-picked",l)},i={childrenKey:"nodes",singlePick:!1,minSearchQueryLength:3,hidden:function(e){return!1},disabled:function(e){return!1},displayFormat:function(n){return e.name+" (Выбрано "+n.length+")"}},$.extend(i,e),c=function(){return i.data&&(u=i.data),i.picked?i.picked=i.picked:x.attr("data-picked-ids")&&x.attr("data-picked-ids").split(","),i.picked?u.length?(w(),x.html(i.displayFormat(p))):x.html(i.displayFormat(i.picked)):x.html(i.displayFormat([])),x.unbind("click"),x.on("click",function(e){return l.modal("show"),u.length?($(".ui.active.dimmer",l).removeClass("active"),d(u)):i.url?s(i.url,{},function(e){return $(".ui.active.dimmer",l).removeClass("active"),d(e)}):void 0}),$(".actions .accept",l).on("click",function(e){return l.modal("hide"),i.onSubmit&&i.onSubmit(p),x.html(i.displayFormat(p))}),$(".actions .close",l).on("click",function(e){l.modal("hide"),i.onClose&&i.onClose()}),n.pickSearch.on("click",function(e){return $(".search-tab .node:not(.picked) .name").trigger("click")}),n.unpickSearch.on("click",function(e){return $(".search-tab .node.picked .name").trigger("click")}),n.unpickPicked.on("click",function(e){return $(".picked-tab .node.picked .name").trigger("click")}),$(".menu .tree",l).on("click",function(e){return C()}),$(".menu .picked",l).on("click",function(e){return f()}),$(".search input",l).on("keyup",function(e){return g($(this).val())})},s=function(e,n,i){return null==n&&(n={}),$.get(e,n,function(e){return u=e.constructor===String?$.parseJSON(e):e,i(u)})},d=function(e){var n;return w(),n=k(e,{height:"300px",overflowY:"auto"}),b.tree.html(n),t(n)},w=function(){var e,n,a,c,t,d;if(i.picked){for(p=[],c=i.picked,t=[],e=0,a=c.length;e<a;e++)n=c[e],d=m(u,function(e){return""+e.id==""+n}),d.length?t.push(p.push(d[0])):t.push(void 0);return t}},C=function(){return $(".menu .item",l).removeClass("active"),$(".menu .tree",l).addClass("active"),b.tree.show(),b.search.hide(),b.picked.hide(),l.attr("data-mode","tree")},g=function(e){var n,a,c=[];return null!==e&&e.length>=i.minSearchQueryLength?(n=m(u,function(n){return n.name&&n.name.toLowerCase().indexOf(e.toLowerCase())>-1}),_.forEach(n,function(e){"selectable"===e.selectable&&c.push(e)}),n=c,a=v(n,{height:"400px",overflowY:"auto"}),$(".menu .item",l).removeClass("active"),b.search.show().html(a),b.tree.hide(),b.picked.hide(),l.attr("data-mode","search"),t(a),$(".name",a).each(function(){var n,i;return n=$(this).text(),i=RegExp("("+e+")","gi"),n=n.replace(i,"<strong class='search-query'>$1</strong>"),$(this).html(n)})):C()},f=function(){var e;return e=v(p,{height:"400px",overflowY:"auto"}),$(".menu .item",l).removeClass("active"),$(".menu .picked",l).addClass("active"),b.picked.show().html(e),b.tree.hide(),b.search.hide(),l.attr("data-mode","picked"),initializeNodeListForSelected(e)},k=function(e,n){var a,c,t,d,s;for(null==n&&(n={}),s=$('<div class="ui tree-picker tree"></div>').css(n),a=0,c=e.length;a<c;a++)t=e[a],i.hidden(t)||(d=$('<div class="node" data-id="'+t.id+'" data-name="'+t.name+'">\n  <div class="head '+t.selectable+'">\n    <i class="add circle icon"></i>\n    <i class="minus circle icon"></i>\n    <i class="radio icon"></i>\n    <a class="name">'+t.name+'</a>\n    <i class="checkmark icon"></i>\n  </div>\n  <div class="content"></div>\n</div>').appendTo(s),i.disabled(t)&&d.addClass("disabled"),t[i.childrenKey]&&t[i.childrenKey].length?$(".content",d).append(k(t[i.childrenKey])):d.addClass("childless"));return s},v=function(e,n){var a,c,t,d,s;for(null==n&&(n={}),t=$('<div class="ui tree-picker list"></div>').css(n),a=0,c=e.length;a<c;a++)d=e[a],i.hidden(d)||(s=$('<div class="node" data-id="'+d.id+'" data-name="'+d.name+'">\n  <div class="head '+d.selectable+'">\n    <a class="name">'+d.name+'</a>\n    <i class="checkmark icon"></i>\n  </div>\n  <div class="content"></div>\n</div>').appendTo(t),i.disabled(d)&&s.addClass("disabled"));return t},t=function(e){return $(".node",e).each(function(){var e,n,i;return i=$(this),clickHead=$(">.head.selectable",i),n=$(">.head",i),e=$(">.content",i),$(">.name",clickHead).on("click",function(e){return r(i)}),o(i)&&i.addClass("picked"),i.hasClass("childless")||(n.hasClass("selectable")?$(">.icon",n).on("click",function(n){return i.toggleClass("opened"),e.slideToggle()}):$(n).on("click",function(n){return i.toggleClass("opened"),e.slideToggle()})),S()})},initializeNodeListForSelected=function(e){return $(".node",e).each(function(){var e,n,i;return i=$(this),clickHead=$(">.head",i),n=$(">.head",i),e=$(">.content",i),$(">.name",clickHead).on("click",function(e){return r(i)}),o(i)&&i.addClass("picked"),i.hasClass("childless")||$(">.icon",n).on("click",function(n){return i.toggleClass("opened"),e.slideToggle()}),S()})},r=function(e){if(!e.hasClass("disabled"))return i.singlePick&&($(".node.picked",l).removeClass("picked"),p=[]),e.toggleClass("picked"),e.hasClass("picked")?h(e):y(e)},h=function(e){var n;return i.picked=null,n=e.attr("data-id"),p.push({id:n,name:e.attr("data-name")}),S(),$(".node[data-id="+n+"]",l).addClass("picked")},y=function(e){var n;return i.picked=null,n=e.attr("data-id"),p=p.filter(function(e){return""+e.id!=""+n}),S(),$(".node[data-id="+n+"]",l).removeClass("picked")},o=function(e){return p.filter(function(n){return""+n.id===e.attr("data-id")}).length},S=function(){return x.attr("data-picked-ids",p.map(function(e){return e.id})),p.length?(a.closest(".item").addClass("highlighted"),a.html("("+p.length+")")):(a.closest(".item").removeClass("highlighted"),a.html(""))},m=function(e,n){var a,c,t,d;for(d=[],a=0,c=e.length;a<c;a++)t=e[a],n(t)&&d.push({id:t.id,name:t.name,selectable:t.selectable}),t[i.childrenKey]&&t[i.childrenKey].length&&(d=d.concat(m(t[i.childrenKey],n)));return d},c()}}).call(this);