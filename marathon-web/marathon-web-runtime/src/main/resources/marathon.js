// # https://github.com/Autarc/optimal-select
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.OptimalSelect=e():t.OptimalSelect=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var u=n[r]={exports:{},id:r,loaded:!1};return t[r].call(u.exports,u,u.exports,e),u.loaded=!0,u.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.optimize=e.select=void 0;var u=n(4),i=r(u),o=n(2),a=r(o);e.select=i.default,e.optimize=a.default,e.default=i.default},function(t,e){(function(n){"use strict";function r(t){return Array.isArray(t)?t:Array.from(t)}function u(t,e){if(n.document)return!1;var u=e.context;n.document=u||function(){for(var e=t;e.parent;)e=e.parent;return e}();var a=Object.getPrototypeOf(n.document);return Object.getOwnPropertyDescriptor(a,"childTags")||Object.defineProperty(a,"childTags",{enumerable:!0,get:function(){return this.children.filter(function(t){return"tag"===t.type||"script"===t.type||"style"===t.type})}}),Object.getOwnPropertyDescriptor(a,"attributes")||Object.defineProperty(a,"attributes",{enumerable:!0,get:function(){var t=this.attribs,e=Object.keys(t),n=e.reduce(function(e,n,r){return e[r]={name:n,value:t[n]},e},{});return Object.defineProperty(n,"length",{enumerable:!1,configurable:!1,value:e.length}),n}}),a.getAttribute||(a.getAttribute=function(t){return this.attribs[t]||null}),a.getElementsByTagName||(a.getElementsByTagName=function(t){var e=[];return o(this.childTags,function(n){n.name!==t&&"*"!==t||e.push(n)}),e}),a.getElementsByClassName||(a.getElementsByClassName=function(t){var e=t.trim().replace(/\s+/g," ").split(" "),n=[];return o([this],function(t){var r=t.attribs.class;r&&e.every(function(t){return r.indexOf(t)>-1})&&n.push(t)}),n}),a.querySelectorAll||(a.querySelectorAll=function(t){var e=this;t=t.replace(/(>)(\S)/g,"$1 $2").trim();var n=i(t),u=r(n),o=u[0],a=u.slice(1),f=a.length;return o(this).filter(function(t){for(var n=0;f>n;){if(t=a[n](t,e),!t)return!1;n+=1}return!0})}),a.contains||(a.contains=function(t){var e=!1;return o([this],function(n,r){n===t&&(e=!0,r())}),e}),!0}function i(t){return t.split(" ").reverse().map(function(t,e){var n=0===e,r=t.split(":"),u=c(r,2),i=u[0],l=u[1],s=null,d=null;switch(!0){case/>/.test(i):d=function(t){return function(e){return e(t.parent)&&t.parent}};break;case/^\./.test(i):var p=i.substr(1).split(".");s=function(t){var e=t.attribs.class;return e&&p.every(function(t){return e.indexOf(t)>-1})},d=function(t,e){return n?t.getElementsByClassName(p.join(" ")):"function"==typeof t?t(s):a(t,e,s)};break;case/^\[/.test(i):var v=i.replace(/\[|\]|"/g,"").split("="),y=c(v,2),h=y[0],g=y[1];s=function(t){var e=Object.keys(t.attribs).indexOf(h)>-1;return e&&(!g||t.attribs[h]===g)},d=function(t,e){if(n){var r=function(){var e=[];return o([t],function(t){s(t)&&e.push(t)}),{v:e}}();if("object"===("undefined"==typeof r?"undefined":f(r)))return r.v}return"function"==typeof t?t(s):a(t,e,s)};break;case/^#/.test(i):var m=i.substr(1);s=function(t){return t.attribs.id===m},d=function(t,e){if(n){var r=function(){var e=[];return o([t],function(t,n){s(t)&&(e.push(t),n())}),{v:e}}();if("object"===("undefined"==typeof r?"undefined":f(r)))return r.v}return"function"==typeof t?t(s):a(t,e,s)};break;case/\*/.test(i):s=function(t){return!0},d=function(t,e){if(n){var r=function(){var e=[];return o([t],function(t){return e.push(t)}),{v:e}}();if("object"===("undefined"==typeof r?"undefined":f(r)))return r.v}return"function"==typeof t?t(s):a(t,e,s)};break;default:s=function(t){return t.name===i},d=function(t,e){if(n){var r=function(){var e=[];return o([t],function(t){s(t)&&e.push(t)}),{v:e}}();if("object"===("undefined"==typeof r?"undefined":f(r)))return r.v}return"function"==typeof t?t(s):a(t,e,s)}}if(!l)return d;var b=l.match(/-(child|type)\((\d+)\)$/),j=b[1],S=parseInt(b[2],10)-1,O=function(t){if(t){var e=t.parent.childTags;"type"===j&&(e=e.filter(s));var n=e.findIndex(function(e){return e===t});if(n===S)return!0}return!1};return function(t){var e=d(t);return n?e.reduce(function(t,e){return O(e)&&t.push(e),t},[]):O(e)&&e}})}function o(t,e){t.forEach(function(t){var n=!0;e(t,function(){return n=!1}),t.childTags&&n&&o(t.childTags,e)})}function a(t,e,n){for(;t.parent;){if(t=t.parent,n(t))return t;if(t===e)break}return null}Object.defineProperty(e,"__esModule",{value:!0});var f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},c=function(){function t(t,e){var n=[],r=!0,u=!1,i=void 0;try{for(var o,a=t[Symbol.iterator]();!(r=(o=a.next()).done)&&(n.push(o.value),!e||n.length!==e);r=!0);}catch(f){u=!0,i=f}finally{try{!r&&a.return&&a.return()}finally{if(u)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.default=u,t.exports=e.default}).call(e,function(){return this}())},function(t,e,n){(function(r){"use strict";function u(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){var n=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],u=(0,f.default)(e,n),i=t.replace(/> /g,">").split(/\s+(?=(?:(?:[^"]*"){2})*[^"]*$)/);if(i.length<3)return t;for(var a=[i.pop()];i.length>1;){var c=i.pop(),l=i.join(" "),s=a.join(" "),d=l+" "+s,p=document.querySelectorAll(d);1!==p.length&&a.unshift(o(l,c,s,e))}return a.unshift(i[0]),i=a,i[0]=o("",i[0],i.slice(1).join(" "),e),i[i.length-1]=o(i.slice(0,-1).join(" "),i[i.length-1],"",e),u&&delete r.document,i.join(" ").replace(/>/g,"> ").trim()}function o(t,e,n,r){if(t.length&&(t+=" "),n.length&&(n=" "+n),/\[*\]/.test(e)){var u=e.replace(/=.*$/,"]"),i=""+t+u+n,o=document.querySelectorAll(i);if(1===o.length&&o[0]===r)e=u;else for(var a=document.querySelectorAll(""+t+u),f=0,c=a.length;c>f;f++)if(a[f].contains(r)){var l=a[f].tagName.toLowerCase(),i=""+t+l+n,o=document.querySelectorAll(i);1===o.length&&o[0]===r&&(e=l);break}}if(/>/.test(e)){var s=e.replace(/>/,""),i=""+t+s+n,o=document.querySelectorAll(i);1===o.length&&o[0]===r&&(e=s)}if(/:nth-child/.test(e)){var d=e.replace(/nth-child/g,"nth-of-type"),i=""+t+d+n,o=document.querySelectorAll(i);1===o.length&&o[0]===r&&(e=d)}if(/\.\S+\.\S+/.test(e)){for(var p=e.trim().split(".").slice(1).map(function(t){return"."+t}).sort(function(t,e){return t.length-e.length});p.length;){var v=e.replace(p.shift(),""),i=""+t+v+n,o=document.querySelectorAll(i);1===o.length&&o[0]===r&&(e=v)}if(e&&e.match(/\./g).length>2)for(var y=document.querySelectorAll(""+t+e),f=0,c=y.length;c>f;f++)if(y[f].contains(r)){var h=y[f].tagName.toLowerCase(),i=""+t+h+n,o=document.querySelectorAll(i);1===o.length&&o[0]===r&&(e=h);break}}return e}Object.defineProperty(e,"__esModule",{value:!0}),e.default=i;var a=n(1),f=u(a);t.exports=e.default}).call(e,function(){return this}())},function(t,e){"use strict";function n(t,e){var n=[],p=t,v=n.length,y=e.root,h=void 0===y?document:y,g=e.skip,m=void 0===g?null:g,b=e.ignore,j=void 0===b?{}:b,S=m&&(Array.isArray(m)?m:[m]).map(function(t){return"function"!=typeof t?function(e){return e===t}:t}),O=function(t){return m&&S.some(function(e){return e(t)})},A=!1;for(Object.keys(j).forEach(function(t){"class"===t&&(A=!0);var e=j[t];"function"!=typeof e&&("number"==typeof e&&(e=e.toString()),"string"==typeof e&&(e=new RegExp(e)),j[t]=e.test.bind(e))}),A&&!function(){var t=j.attribute;j.attribute=function(e,n,r){return j.class(n)||t&&t(e,n,r)}}();p!==h;){if(O(p)!==!0){if(d(p,n,j))break;if(r(p,n,j,h))break;if(o(p,n,j,h))break;if(c(p,n,j,h))break;u(p,n,j),n.length===v&&a(p,n,j),n.length===v&&l(p,n,j),n.length===v&&i(p,n,j),n.length===v&&f(p,n,j),n.length===v&&s(p,n,j)}p=p.parentNode,v=n.length}return p===h&&n.unshift("*"),n.join(" ")}function r(t,e,n,r){return p(t,e,n,r)}function u(t,e,n){return p(t,e,n,t.parentNode)}function i(t,e,n){var r=t.getAttribute("class");return g(n.class,r)?!1:h(t,e,"."+r.trim().replace(/\s+/g,"."))}function o(t,e,n,r){return v(t,e,n,r)}function a(t,e,n){return v(t,e,n,t.parentNode)}function f(t,e,n){var r=t.attributes;return Object.keys(r).some(function(u){var i=r[u],o=i.name,a=i.value;if(g(n.attribute,o,a,m.attribute))return!1;var f="["+o+'="'+a+'"]';return h(t,e,f)})}function c(t,e,n,r){return y(t,e,n,r)}function l(t,e,n){return y(t,e,n,t.parentNode)}function s(t,e,n){var r=t.tagName.toLowerCase();return g(n.tag,r)?!1:h(t,e,r)}function d(t,e,n){var r=t.getAttribute("id");return g(n.id,r)?!1:(e.unshift("#"+r),!0)}function p(t,e,n,r){var u=t.getAttribute("class");if(g(n.class,u))return!1;var i=r.getElementsByClassName(u);return 1===i.length?(e.unshift("."+u.trim().replace(/\s+/g,".")),!0):!1}function v(t,e,n,r){var u=t.attributes;return Object.keys(u).some(function(t){var i=u[t],o=i.name,a=i.value;if(g(n.attribute,o,a,m.attribute))return!1;var f="["+o+'="'+a+'"]',c=r.querySelectorAll(f);return 1===c.length?(e.unshift(f),!0):void 0})}function y(t,e,n,r){var u=t.tagName.toLowerCase();if(g(n.tag,u))return!1;var i=r.getElementsByTagName(u);return 1===i.length?(e.unshift(u),!0):!1}function h(t,e,n){for(var r=t.parentNode,u=r.childTags||r.children,i=0,o=u.length;o>i;i++)if(u[i]===t)return e.unshift("> "+n+":nth-child("+(i+1)+")"),!0;return!1}function g(t,e,n,r){if(!e)return!0;var u=t||r;return u?u(e,n||e,r):!1}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n;var m={attribute:function(t){return["style","data-reactid","data-react-checksum"].indexOf(t)>-1}};t.exports=e.default},function(t,e,n){(function(t){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function u(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return Array.isArray(t)?o(t,e):i(t,e)}function i(e,n){if(3===e.nodeType)return i(e.parentNode);if(1!==e.nodeType)throw new Error('Invalid input - only HTMLElements or representations of them are supported! (not "'+("undefined"==typeof e?"undefined":a(e))+'")');var r=(0,c.default)(e,n),u=(0,s.default)(e,n),o=(0,p.default)(u,e,n);return r&&delete t.document,o}function o(t,e){for(var n=null,r=null,u=null,o=null,a=0,f=t.length;f>a;a++){var c=t[a];if(n){if(n!==c.parentNode)return console.log("Can't be efficiently mapped. It probably best to use multiple single selectors instead!")}else n=c.parentNode,r=c.className,o=c.tagName;if(c.className!==r){var l,s,d=[];c.className.length>r.length?(l=c.className,s=r):(l=r,s=c.className),s.split(" ").forEach(function(t){l.indexOf(t)>-1&&d.push(t)}),r=d.join(" ")}c.tagName!==o&&(o=null)}var p=i(n,e);return console.log(p,r,u,o),r?p+" > ."+r.replace(/ /g,"."):o?p+" > "+o.toLowerCase():p+" > *"}Object.defineProperty(e,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};e.default=u,e.getSingleSelector=i,e.getMultiSelector=o;var f=n(1),c=r(f),l=n(3),s=r(l),d=n(2),p=r(d)}).call(e,function(){return this}())}])});
// # sourceMappingURL=optimal-select.min.js.map

if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.matchesSelector
			|| Element.prototype.mozMatchesSelector
			|| Element.prototype.msMatchesSelector
			|| Element.prototype.oMatchesSelector
			|| Element.prototype.webkitMatchesSelector
			|| function(s) {
				var matches = (this.document || this.ownerDocument)
						.querySelectorAll(s), i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {
				}
				return i > -1;
			};
}

if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

if (!Element.prototype.label) {
	Element.prototype.label = function() {
		var id = this.getAttribute('id');
		if(id != null) {
			var labels = document.querySelectorAll('label');
			for(var i = 0; i < labels.length; i++) {
				var forId = labels[i].getAttribute('for');
				if(forId === id)
					return labels[i].innerText.trim();
			}
		}
		return null;
	}
}

if (!Element.prototype.css) {
	Element.prototype.css = function() {
		return OptimalSelect.select(this);
	}
}

if (!Element.prototype.link_text) {
	Element.prototype.link_text = function() {
		if(this.tagName.toLowerCase() === 'a')
			return this.innerText.trim();
		return null;
	}
}

window.matches = function(s) {
	return true;
}

function Marathon(port) {
	this.url = "ws://localhost:" + port + "/";
	this.parent_container = null;
	this.identity = null;
	this.omapLoaded = false;
	console.log("Connecting to server @ " + this.url);

	this.createSocket(this.url);
}

Marathon.prototype.setParentContainer = function(jsonStr) {
	this.parent_container = JSON.parse(jsonStr);	
}

Marathon.prototype.createSocket = function(url) {
	_this = this;
	
	var ws = new WebSocket(url);
	ws.onopen = function() {
		console.log("Connected to server @ ", ws);
		ws.onmessage = _this.onMessage;
		_this.post = function(method, data) {
			var message = { method: method, data: JSON.stringify(data) };
			ws.send(JSON.stringify(message));
		}
		ws.onclose = function(evt) {
			console.log("Closed connection to " + url);
		}
		_this.addEventHandlers();
	}

	ws.onclose = function(evt) {
		console.log("Trying reconnect again to " + url);
		_this.createSocket(url);
	};
}

Marathon.prototype.reloadScript = function() {
	this.post('reloadScript', {});	
}

Marathon.prototype.addEventHandlers = function() {
	document.addEventListener('change', function(evt) {
		_this.handleChangeEvent(evt.target);
	}, true);
	document.addEventListener('click', function(evt) {
		_this.handleClickEvent(evt.target);
	}, true);
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	var list = document.querySelector('body');
	
	var observer = new MutationObserver(function(mutations) {  
      var reloadScript = false;
	  mutations.forEach(function(mutation) {
	    if (mutation.type === 'childList' && mutation.addedNodes) {
	      var addedNodes = mutation.addedNodes;
	      for(var i = 0; i < addedNodes.length; i++) {
	        if(addedNodes[i].tagName.toLowerCase() === 'iframe')
	          reloadScript = true;
	      }
	    }
	  });
	  if(reloadScript)
	  	_this.reloadScript();
	});
	
	observer.observe(list, {
	  attributes: true, 
	  childList: true, 
	  subtree: true,
	  characterData: true
	});
}

Marathon.prototype.getName = function(props) {
	var parts = [];
	for(var prop in props) {
		if(props.hasOwnProperty(prop)) {
			parts.push(props[prop]);
		}
	}
	return parts.join(':');
}

Marathon.prototype.getContainer = function(target) {
	var container = {};

	var headContainer = container ;
	var current = target.parentElement;
	while(current != null) {
		if(this.isContainer(current)) {
			container.container = this.getContainerDetails(current);
			container = container.container;
		}
		current = current.parentElement;
	}
	
	container.container = this.getContainerDetails(window);
	return headContainer.container;
}

Marathon.prototype.isContainer = function(target) {
	return this.findMatchingProperties('containerRecognitionProperties', target);
}

Marathon.prototype.getContainerDetails = function(target) {
	var container = {};
	if(this.identity !== null && target === window) {
		container.attributes = Object.assign({}, this.identity.attributes);
		Object.assign(container.attributes, this.findGeneralProperties(target));
		container.urp = Object.assign({}, this.identity.urp);
		container.attributes.title = this.identity.attributes.suggestedName;
	} else {
		var title = this.getName(this.findMatchingProperties('containerNamingProperties', target, false));
		container.attributes = this.findGeneralProperties(target);
		container.attributes.title = title ;
		container.urp = this.findMatchingProperties('containerRecognitionProperties', target);
	}
	container.containerURP = this.findMatchingProperties('containerRecognitionProperties', target);
	if(target === window)
		container.urp.title = title;
	if(target === window) {
		if(this.parent_container === null) {
			container.container_type = "window" ;	
		} else {
			container.container_type = "frame" ;
		}
	} else {
		container.container_type = target.tagName.toLowerCase() ;
	}
	if(this.parent_container !== null && target === window)
	  container.container = this.parent_container;
	return container;
}

Marathon.prototype.getSuffix = function(target) {
	if(target.tagName.toLowerCase() === "input") {
		return (target.getAttribute('type') === null ? "text" : target.getAttribute('type'));
	} else {
		return target.tagName.toLowerCase();
	}
}

Marathon.prototype.handleChangeEvent = function(target) {
	var v = this.value(target);
	if(v != null)
		this.postEvent(target, { type: 'select', value: v, suffix: this.getSuffix(target)});
}

Marathon.prototype.shouldIgnoreClick = function(target) {
	var values = [ 'input[type="text"]', 'input[type="password"]', 'input[type="color"]',
	               'input[type="date"]', 'input[type="datetime"]', 'input[type="datetime-local"]',
	               'input[type="number"]', 'input[type="range"]', 'input[type="search"]',
	               'input[type="tel"]', 'input[type="time"]', 'input[type="url"]',
	               'input[type="week"]', 'input[type="email"]', 'input[type="file"]',
	               'input[type="checkbox"]', 'input[type="radio"]',
	               'input[type="month"]', 'select', 'option', 'textarea',
					function() { return this.matches('label') && this.getAttribute('for') !== null ;},
					function() { return this.matches('input') && this.getAttribute('type') === null ;},
					'ul.ui-autocomplete > li.ui-menu-item > div.ui-menu-item-wrapper'];
	
	var matched = values.find(function(v) { return typeof v === 'function' ? v.call(target) : target.matches(v); });
	if(matched)
		return true;
	return false;
}

Marathon.prototype.handleClickEvent = function(target) {
	if(this.shouldIgnoreClick(target) === true)
		return;
	this.postEvent(target, { type: 'click', clickCount: 1, button: 1, modifiersEx: "", x: 0, y: 0, suffix: this.getSuffix(target)});
}

Marathon.prototype.postEvent = function(target, event) {
    var record = this.getObjectIdentity(target);
	record.event = event ;
	record.request = 'record-action';
	record.container = this.getContainer(target);
	this.post('record', record);
}

Marathon.prototype.getObjectIdentity = function(target) {
	var identity = {};	
	identity.attributes = this.findGeneralProperties(target);
	identity.urp = this.findMatchingProperties('recognitionProperties', target);
	identity.urp['tag_name'] = target.tagName.toLowerCase();
	identity.attributes.suggestedName = this.getName(this.findMatchingProperties('namingProperties', target, false));
	return identity;
}

Marathon.prototype.setContainerIdentity = function(jsonStr) {
	this.identity = JSON.parse(jsonStr);
}

Marathon.prototype.value = function(target) {
	var values = [ 'input[type="text"]', 'input[type="password"]', 'input[type="color"]',
	               'input[type="date"]', 'input[type="datetime"]', 'input[type="datetime-local"]',
	               'input[type="number"]', 'input[type="range"]', 'input[type="search"]',
	               'input[type="tel"]', 'input[type="time"]', 'input[type="url"]',
	               'input[type="week"]', 'input[type="email"]', 'input[type="file"]',
	               'input[type="month"]',
	               function() { return this.matches('input') && this.getAttribute('type') === null ;}];
		
	var matched = values.find(function(v) { return typeof v === 'function' ? v.call(target) : target.matches(v); });
	if(matched)
		return target.value;

	if(target.matches('input[type="checkbox"]') || target.matches('input[type="radio"]'))
		return "" + target.checked;
	
	if(target.matches('select')) {
	 var result = [];	   
	   for(var i = 0; i < target.options.length; i++) {
	      if(target.options[i].selected)
	      	result.push(target.options[i].text);
	   }
	   return JSON.stringify(result);
	}
	
	if(target.matches('textarea'))		
		return target.value;	
	
	console.log('Unhandled getValue');
	console.log(target);
	return null;
}

Marathon.prototype.getProperty = function(target, props) {
	if(props === 'tag_name') {
		if(target.tagName)
			return ['tag_name', target.tagName.toLowerCase()];
		return null;
	}
	else if (props === 'text') {
		var text = target.innerText;
		if(text && text.length < 30)
			return ['text', text.trim()];
		return null;
	}
	var user_given_values = props.match(/([^:]*):(.*)/)
	if(user_given_values !== null) {
		user_given_values.shift();
		return user_given_values;
	}
	var aProps = props.split('.');
	var ret = target;
	aProps.forEach(function(prop) {
		if (ret != null)
			ret = $marathon.getImmediateProperty(ret, prop);
	});
	if(ret === null)
		return ret;
	return [props, ret];
}

Marathon.prototype.getImmediateProperty = function(target, prop) {
	var ret = null;
	if (target.getAttribute && (ret = target.getAttribute(prop)) != null)
		return ret;
	if (target[prop] && !this.isFunction(target[prop]))
		return target[prop];
	if (target[prop] && this.isFunction(target[prop])
			&& (ret = target[prop].call(target)) != null)
		return ret;
	return ret;
}

Marathon.prototype.findGeneralProperties = function(target) {
	var propmap = {};
	this.generalProperties.forEach(function(prop) {
		var val = $marathon.getProperty(target, prop);
		if (val != null)
			propmap[val[0]] = val[1];
	});
	if(target.attributes)
		for (var i = 0, atts = target.attributes, n = atts.length; i < n; i++){
	    	propmap[atts[i].nodeName] = atts[i].nodeValue;
		}
	return propmap;
}

Marathon.prototype.isUnique = function(target, props) {
	var others = document.getElementsByTagName(target.tagName);
	for(var i = 0; i < others.length; i++) {
		if(target == others[i])
			continue;
		var other = others[i];
		var matched = true;
		for(var prop in props) {
			if(matched && props.hasOwnProperty(prop)) {
				var otherValue = this.getProperty(other, prop);
				if(otherValue === null || otherValue[1] !== props[prop])
					matched = false;
			}
		}
		if(matched)
			return false;
	}
	return true;
}

Marathon.prototype.findMatchingProperties = function(properties, target, unique) {
	unique = typeof unique !== 'undefined' ? unique : true;
    for(var i = 0; i < this[properties].length; i++) {
    	var np = this[properties][i];
    	if(target.matches(np.className)) {
    		var arrName = {} ;
    		var rb = true ;
    		np.properties.forEach(function(prop) {
				if (rb) {
					var val = $marathon.getProperty(target, prop);
					if (val == null) {
						rb = false;
					}
					else
						arrName[val[0]] = val[1];
				}
    		});
    		if(rb && (!unique || this.isUnique(target, arrName)))
    			return arrName;
    	}
    }
    return null;
}

Marathon.prototype.isFunction = function(obj) {
	return !!(obj && obj.constructor && obj.call && obj.apply);
};

Marathon.prototype.onMessage = function(evt) {
	var jsonEvt = JSON.parse(evt.data);
	$marathon[jsonEvt.method].call($marathon, JSON.parse(jsonEvt.data));
}

Marathon.prototype.toString = function() {
	return "Marathon[" + this.url + "]";
}

Marathon.prototype.setContextMenuTriggers = function(jsonTriggers) {
}

Marathon.prototype.setObjectMapConfig = function(jsonObjectMap) {
	var lists = [ 'namingProperties', 'recognitionProperties',
			'containerNamingProperties', 'containerRecognitionProperties' ];

	var generalProperties = new Set(jsonObjectMap['generalProperties']);
	_this = this;
	lists.forEach(function(list) {
		var nplist = [];
		jsonObjectMap[list].forEach(function(np) {
			np.propertyLists.map(function(propertyList) {
				propertyList.className = np.className;
				nplist.push(propertyList);
				propertyList.properties.forEach(function(p) {
					if(p.match(/([^:]*):(.*)/) === null)
						generalProperties.add(p);
				});
			});
		});
		nplist = nplist.sort(function(a, b) {
			return b.priority - a.priority;
		});
		_this[list] = nplist;
	});
	generalProperties.add('tag_name');
	generalProperties.add('link_text');
	_this['generalProperties'] = Array.from(generalProperties);
	_this.omapLoaded = true;
}

console.log("Loading marathon.js...");

if(!window.$marathon)
	window.$marathon = new Marathon(arguments[0]);
