/*!
* OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["sap/base/util/merge","sap/base/strings/capitalize","sap/base/Log","sap/ui/test/Opa5","sap/ui/test/actions/Action","sap/ui/test/actions/Press","sap/ui/test/actions/EnterText","sap/ui/test/matchers/Matcher","sap/ui/test/matchers/MatcherFactory","sap/ui/test/pipelines/MatcherPipeline","sap/ui/test/pipelines/ActionPipeline"],function(t,n,e,r,i,o,u,s,a,c,f){"use strict";function p(){return t.apply(this,[{}].concat(Array.prototype.slice.call(arguments)))}function h(t,n,e){var r=Array.isArray(n)?n:[n];return r.reduce(function(n,r){if(n){return true}if(r===null||r===undefined){return t===r}if(t===null||t===undefined){return!!e}if(typeof r==="function"){if(r===Boolean){return typeof t==="boolean"}if(r===Array){return Array.isArray(t)}if(r===String){return typeof t==="string"||t instanceof String}if(r===Object){return typeof t==="object"&&t.constructor===Object}return t instanceof r}return typeof t===r},false)}function l(t){var n=Array.prototype.slice.call(arguments,1);return t.reduce(function(t,e){if(h(n[0],e,true)){t.push(n.shift())}else{t.push(undefined)}return t},[])}function d(t,n,e){if(n===undefined){n=[]}else if(!Array.isArray(n)){n=[n]}else{n=n.slice(0)}if(Array.isArray(t)){n=e?t.slice(0).concat(n):n.concat(t)}else if(t!==undefined){if(e){n.unshift(t)}else{n.push(t)}}return n}function g(t,n,e){if(!h(t,Function)){throw new Error("not a function")}if(!h(n,Function)){return t}if(e){return function(e){return n(e)&&t(e)}}return function(e){n(e);t(e)}}function y(t){if(h(t,_)){return function(){return t.execute()}}if(!h(t,Function)){return function(){r.assert.ok(true,t||"Success")}}return t}function m(t){var n="";n+=t.controlType||"Control";n+="#"+(t.id||"<undefined>");n+=t.matchers?" with "+(h(t.matchers,Array)?t.matchers.length:1)+" additional matcher(s)":"";n+=" not found";return n}function A(t,e){if(!t){return null}var r=t["get"+n(e,0)];if(!r){throw new Error("Object '"+t+"' does not have an aggregation called '"+e+"'")}return r.call(t)}function v(t,n){if(t&&n){F.process({actions:t,control:n})}}function O(t,n){return I.process({matchers:x.getFilteringMatchers({matchers:t}),control:n})}function b(t){var n=t.indexOf(">"),e=n===-1?undefined:t.substring(0,n),r=n===-1?t:t.substring(n+1);return{model:e,path:r}}function M(t){if(h(t,Boolean)){return t?_.Matchers.TRUE:_.Matchers.FALSE}return _.Matchers.match(t)}var w={autoWait:true,visible:true},x=new a,I=new c,F=new f;var _=function(t,n){var e=l([r,Object],t,n);this._oOpaInstance=e[0];return this.options(w,e[1])};_.defaultOptions=function(t){if(arguments.length>0){w=p(t)}return p(w)};_.create=function(t,n,e,o,u,a,c){var f=l([r,[String,RegExp],String,Boolean,[s,Function,Array,Object],[i,Function,Array],Object],t,n,e,o,u,a,c);return new _(f[0]).hasId(f[1]).hasType(f[2]).isDialogElement(!!f[3]).has(f[4]).do(f[5]).options(f[6])};_.prototype.options=function(t){this._oOptions=p.apply(this,[this._oOptions].concat(Array.prototype.slice.call(arguments)));return this};_.prototype.viewId=function(t){return this.options({viewId:t})};_.prototype.viewName=function(t){return this.options({viewName:t})};_.prototype.viewNamespace=function(t){return this.options({viewNamespace:t})};_.prototype.fragmentId=function(t){return this.options({fragmentId:t})};_.prototype.timeout=function(t){return this.options({timeout:t})};_.prototype.debugTimeout=function(t){return this.options({debugTimeout:t})};_.prototype.pollingInterval=function(t){return this.options({pollingInterval:t})};_.prototype.hasId=function(t){return this.options({id:t})};_.prototype.hasType=function(t){return this.options({controlType:t})};_.prototype.has=function(t,n){return this.options({matchers:n?t:d(t,this._oOptions.matchers)})};_.prototype.hasProperties=function(t){return this.has(_.Matchers.properties(t))};_.prototype.hasI18NText=function(t,n,e){return this.has(_.Matchers.i18n.apply(_.Matchers,arguments))};_.prototype.hasAggregation=function(t,n){return this.has(_.Matchers.aggregationMatcher(t,n))};_.prototype.hasAggregationProperties=function(t,n){return this.hasAggregation(t,_.Matchers.properties(n))};_.prototype.hasAggregationLength=function(t,n){return this.has(_.Matchers.aggregationLength(t,n))};_.prototype.hasConditional=function(t,n,e){return this.has(_.Matchers.conditional(t,n,e))};_.prototype.hasSome=function(t){return this.has(_.Matchers.some.apply(_.Matchers,arguments))};_.prototype.mustBeEnabled=function(t){return this.options({enabled:arguments.length?!!t:true})};_.prototype.mustBeVisible=function(t){return this.options({visible:arguments.length?!!t:true})};_.prototype.mustBeReady=function(t){return this.options({autoWait:arguments.length?!!t:true})};_.prototype.isDialogElement=function(t){return this.options({searchOpenDialogs:arguments.length?!!t:true})};_.prototype.check=function(t,n){return this.options({check:n?t:g(t,this._oOptions.check,true)})};_.prototype.checkNumberOfMatches=function(t){return this.check(function(n){if(!n){return t===0}if(!h(n,Array)){n=[n]}return n.length===t})};_.prototype.do=function(t,n){if(h(t,_)){e.error("(deprecated) OpaBuilder instance is incorrectly used in .do function - use .success instead");return this.success(t)}return this.options({actions:n?t:d(t,this._oOptions.actions)})};_.prototype.doConditional=function(t,n,r){if(h(n,_)||h(r,_)){e.error("(deprecated) OpaBuilder instance is incorrectly used in .doConditional function - use .success instead");return this.success(_.Actions.conditional(t,n,r))}return this.do(_.Actions.conditional(t,n,r))};_.prototype.doPress=function(t){return this.do(_.Actions.press(t))};_.prototype.doEnterText=function(t,n,e,r){var i=l([String,Boolean,Boolean,String],t,n,e,r);return this.do(_.Actions.enterText(i[0],i[1],i[2],i[3]))};_.prototype.doOnAggregation=function(t,n,e){if(arguments.length<3){e=n;n=undefined}var r=_.Matchers.filter(n),i=v.bind(this,e);return this.do(function(n){r(A(n,t)).forEach(i)})};_.prototype.doOnChildren=function(t,n,e){var r=l([[s,Function,Array,Object,_],[i,Function,Array],Boolean],t,n,e);t=r[0];n=r[1];e=r[2];if(!h(t,_)){t=new _(this._getOpaInstance()).has(r[0])}if(n){t.do(n)}return this.do(function(n){var r=t.build(),i=_.Matchers.children(t,e)(n);return _.Actions.executor(r.actions)(i)})};_.prototype.description=function(t){return this.success(t+" - OK").error(t+" - FAILURE")};_.prototype.success=function(t,n){var e=y(t);return this.options({success:n?e:g(e,this._oOptions.success)})};_.prototype.error=function(t,n){if(h(t,String)){return this.options({errorMessage:t})}return this.options({error:n?t:g(t,this._oOptions.error)})};_.prototype.build=function(){if(!this._oOptions.errorMessage){this.error(m(this._oOptions))}return p(this._oOptions)};_.prototype.execute=function(t){if(h(t,r)){this._setOpaInstance(t)}return this._getOpaInstance().waitFor(this.build())};_.prototype._setOpaInstance=function(t){if(!h(t,r)){throw new Error("Opa5 instance expected")}this._oOpaInstance=t};_.prototype._getOpaInstance=function(){if(!h(this._oOpaInstance,r)){this._setOpaInstance(new r)}return this._oOpaInstance};_.Matchers={TRUE:function(){return true},FALSE:function(){return false},not:function(t){var n=_.Matchers.match(t);return function(t){return!n(t)}},ancestor:function(t,n){return{ancestor:[[t,n]]}},descendant:function(t,n){return{descendant:[[t,n]]}},properties:function(t){return{properties:t}},i18n:function(t,n,e){var r=b(n),i=r.model||"i18n",o=r.path;if(arguments.length>3||e&&!Array.isArray(e)){e=Array.prototype.slice.call(arguments,2)}return{I18NText:{propertyName:t,modelName:i,key:o,parameters:e}}},resourceBundle:function(t,n,e,r){if(arguments.length>4||r&&!Array.isArray(r)){r=Array.prototype.slice.call(arguments,3)}return function(i){var o=sap.ui.getCore().getLibraryResourceBundle(n),u=o.getText(e,r),s={};s[t]=u;return O({properties:s},i)}},labelFor:function(t,n,e,r){var i=3,o;if(!h(n,Boolean)){i=2;r=e;e=n;n=false}if(n){return{labelFor:{propertyName:t,text:e}}}o=b(e);if(arguments.length>i+1||r&&!Array.isArray(r)){r=Array.prototype.slice.call(arguments,i)}return{labelFor:{propertyName:t,modelName:o.model||"i18n",key:o.path,parameters:r}}},children:function(t,n){var e=l([[s,Function,Array,Object,_],Boolean],t,n);t=e[0];n=e[1];if(!h(t,_)){t=(new _).has(t)}return function(e){var i=t.build(),o=r.getPlugin().getMatchingControls(i),u=d(_.Matchers.ancestor(e,n),i.matchers,true);return _.Matchers.filter(u)(o)}},childrenMatcher:function(t,n){var e=_.Matchers.children(t,n);return function(t){return e(t).length>0}},aggregation:function(t,n){var e=_.Matchers.filter(n);return function(n){return e(A(n,t))}},aggregationMatcher:function(t,n){var e=_.Matchers.aggregation(t,n);return function(t){return e(t).length>0}},aggregationLength:function(t,n){return{aggregationLengthEquals:{name:t,length:n}}},aggregationAtIndex:function(t,n){return function(e){var r=A(e,t);return r&&n<r.length?r[n]:undefined}},bindingProperties:function(t,n){return function(e){var r=e.getBindingContext(t),i,o;for(i in n){o=r.getProperty(i);if(o!==n[i]){return false}}return true}},bindingPath:function(t,n){var e=b(t);return{bindingPath:{modelName:e.model,path:e.path,propertyPath:n}}},customData:function(t){if(!t){return _.Matchers.TRUE}return function(n){if(!n||typeof n.data!=="function"){return false}return Object.keys(t).reduce(function(e,r){return e&&n.data(r)===t[r]},true)}},conditional:function(t,n,e){var r=M(t);return function(t){if(r(t)){return O(n,t)}return e?O(e,t):true}},focused:function(t){return function(n){var e=n&&n.isA("sap.ui.core.Element")&&n.$();return e&&(e.is(":focus")||e.hasClass("sapMFocus")||t&&e.find(":focus").length>0)||false}},some:function(t){if(t.length>1||t&&!Array.isArray(t)){t=Array.prototype.slice.call(arguments,0)}return function(n){var e=false;if(t.some(function(t){e=O(t,n);return e})){return e}return false}},filter:function(t){return function(n){if(n===null||n===undefined){return[]}if(!h(n,Array)){n=[n]}return O(t,n)||[]}},match:function(t){return function(n){if(n===null||n===undefined){return false}var e=O(t,[n]);return e.length?e[0]:false}}};_.Actions={press:function(t){return new o({idSuffix:t})},enterText:function(t,n,e,r){return new u({text:t,clearTextFirst:n,keepFocus:e,idSuffix:r})},conditional:function(t,n,e){var r=M(t),i=n,o=e;if(h(n,_)){i=function(){return n.execute()}}if(e&&h(e,_)){o=function(){return e.execute()}}return function(t){if(r(t)){return v(i,t)}else if(o){return v(o,t)}}},executor:function(t){return function(n){if(!n){return}if(h(n,Array)){return n.map(function(n){return v(t,n)})}return v(t,n)}}};return _});