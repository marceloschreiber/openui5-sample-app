/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_AggregationHelper","./_Cache","./_GroupLock","./_Helper","./_Parser","sap/base/Log","sap/ui/base/SyncPromise"],function(e,t,n,i,r,o,s){"use strict";var a=/,|%2C|%2c/,u=new RegExp("^"+r.sODataIdentifier+"(?:"+r.sWhitespace+"+(?:asc|desc))?$"),l=new RegExp(r.sWhitespace+"+");function c(n,i,r,o){var s={},a,u;t.call(this,n,i,o,true);this.oAggregation=r;if("$expand"in o){throw new Error("Unsupported system query option: $expand")}if("$select"in o){throw new Error("Unsupported system query option: $select")}if(e.hasMinOrMax(r.aggregate)){if(r.groupLevels.length){throw new Error("Unsupported group levels together with min/max")}this.oMeasureRangePromise=new Promise(function(e,t){u=e});a=e.buildApply(r,o,s);this.oFirstLevel=t.create(n,i,a,true);this.oFirstLevel.getResourcePathWithQuery=c.getResourcePathWithQuery.bind(this.oFirstLevel,r,o);this.oFirstLevel.handleResponse=c.handleResponse.bind(this.oFirstLevel,null,s,u,this.oFirstLevel.handleResponse)}else if(r.groupLevels.length){this.aElements=[];this.aElements.$byPredicate={};this.aElements.$count=undefined;this.aElements.$created=0;if(o.$count){throw new Error("Unsupported system query option: $count")}if(o.$filter){throw new Error("Unsupported system query option: $filter")}this.oFirstLevel=this.createGroupLevelCache()}else{this.oFirstLevel=t.create(n,i,o,true);this.oFirstLevel.getResourcePathWithQuery=c.getResourcePathWithQuery.bind(this.oFirstLevel,r,o);this.oFirstLevel.handleResponse=c.handleResponse.bind(this.oFirstLevel,r,null,null,this.oFirstLevel.handleResponse)}}c.prototype=Object.create(t.prototype);c.prototype.addElements=function(e,t){var n=this.aElements;e.forEach(function(e,r){var o=i.getPrivateAnnotation(e,"predicate");n[t+r]=e;n.$byPredicate[o]=e})};c.prototype.createGroupLevelCache=function(n){var r,o,s,a,u,l,h,g,f;l=n?n["@$ui5.node.level"]+1:1;o=c.filterAggregation(this.oAggregation,l);a=o.$groupBy;delete o.$groupBy;h=o.$missing;delete o.$missing;g=Object.assign({},this.mQueryOptions);s=c.filterOrderby(this.mQueryOptions.$orderby,o);if(s){g.$orderby=s}else{delete g.$orderby}if(n){g.$$filterBeforeAggregate=i.getPrivateAnnotation(n,"filter")}delete g.$count;g=e.buildApply(o,g);g.$count=true;r=t.create(this.oRequestor,this.sResourcePath,g,true);u=!o.groupLevels.length;f=!u&&Object.keys(o.aggregate).length>0;r.calculateKeyPredicate=c.calculateKeyPredicate.bind(null,n,a,h,u,f,this.aElements.$byPredicate);return r};c.prototype.expand=function(e,t){var r,o,s=this;o=this.fetchValue(n.$cached,t).getResult();i.updateAll(this.mChangeListeners,t,o,{"@$ui5.node.isExpanded":true});r=this.createGroupLevelCache(o);return r.read(0,this.iReadLength,0,e).then(function(e){var t=e.value.$count,n=s.aElements.indexOf(o)+1,a;for(a=s.aElements.length-1;a>=n;a-=1){s.aElements[a+t]=s.aElements[a]}s.addElements(e.value,n);s.aElements.$count+=t;for(a=n+e.value.length;a<n+t;a+=1){s.aElements[a]={};i.setPrivateAnnotation(s.aElements[a],"index",a-n);i.setPrivateAnnotation(s.aElements[a],"parent",r)}return t},function(e){i.updateAll(s.mChangeListeners,t,o,{"@$ui5.node.isExpanded":false});throw e})};c.prototype.fetchValue=function(e,t,n,i){var r=this;if(t==="$count"){if(!this.mQueryOptions.$count){o.error("Failed to drill-down into $count, invalid segment: $count",this.toString(),"sap.ui.model.odata.v4.lib._Cache");return s.resolve()}if(!this.oMeasureRangePromise){return this.oFirstLevel.fetchValue(e,t).then(function(){return r.oFirstLevel.iLeafCount})}}if(this.oAggregation.groupLevels.length){this.registerChange(t,i);return this.drillDown(this.aElements,t,e)}return this.oFirstLevel.fetchValue(e,t,n,i)};c.prototype.getMeasureRangePromise=function(){return this.oMeasureRangePromise};c.prototype.read=function(e,t,n,r,o){var a,u,l,c,h,g=this.oAggregation.groupLevels.length,f=[],d=this;function p(e,t){var n=i.getPrivateAnnotation(d.aElements[e],"index"),s=d.aElements[e];f.push(c.read(n,t-e,0,r.getUnlockedCopy(),o).then(function(t){if(s!==d.aElements[e]&&t.value[0]!==d.aElements[e]){e=d.aElements.indexOf(s);if(e<0){e=d.aElements.indexOf(t.value[0])}}d.addElements(t.value,e)}))}if(g&&this.aElements.length){for(a=e,u=Math.min(e+t,this.aElements.length);a<u;a+=1){l=i.getPrivateAnnotation(this.aElements[a],"parent");if(l!==c){if(h){p(h,a);c=h=undefined}if(l){h=a;c=l}}}if(h){p(h,a)}r.unlock();return s.all(f).then(function(){var n=d.aElements.slice(e,e+t);n.$count=d.aElements.$count;return{value:n}})}return this.oFirstLevel.read(e,t,n,r,o).then(function(r){var o;if(g){d.addElements(r.value,e);d.aElements.$count=r.value.$count;for(o=0;o<d.aElements.$count;o+=1){if(!d.aElements[o]){d.aElements[o]={};i.setPrivateAnnotation(d.aElements[o],"index",o);i.setPrivateAnnotation(d.aElements[o],"parent",d.oFirstLevel)}}d.iReadLength=t+n}else if(!d.oMeasureRangePromise){r.value.forEach(function(e){if(!("@$ui5.node.level"in e)){e["@$ui5.node.isExpanded"]=undefined;e["@$ui5.node.isTotal"]=false;e["@$ui5.node.level"]=1}})}return r})};c.prototype.toString=function(){return this.oRequestor.getServiceUrl()+this.sResourcePath+this.oRequestor.buildQueryString(this.sMetaPath,e.buildApply(this.oAggregation,this.mQueryOptions),false,true)};c.calculateKeyPredicate=function(e,t,n,r,o,s,a,u,l){var c;function h(e){return JSON.stringify(i.publicClone(e))}t.forEach(function(t){if(!(t in a)){a[t]=e[t]}});n.forEach(function(e){a[e]=null});c=i.getKeyPredicate(a,l,u,t,true);if(c in s){throw new Error("Multi-unit situation detected: "+h(a)+" vs. "+h(s[c]))}i.setPrivateAnnotation(a,"predicate",c);if(!r){i.setPrivateAnnotation(a,"filter",i.getKeyFilter(a,l,u,t))}if(a["@$ui5.node.level"]!==0){a["@$ui5.node.isExpanded"]=r?undefined:false;a["@$ui5.node.isTotal"]=o;a["@$ui5.node.level"]=e?e["@$ui5.node.level"]+1:1}};c.create=function(e,t,n,i){return new c(e,t,n,i)};c.filterAggregation=function(e,t){var n,i,r;function o(e,t){e[t]=this[t];return e}function s(e,t){return t.reduce(o.bind(e),{})}function a(e,t){return Object.keys(e).filter(t)}function u(t){return!e.aggregate[t].subtotals}function l(t){return e.aggregate[t].subtotals}function c(t){return e.groupLevels.indexOf(t)<0}i=e.groupLevels.slice(t-1,t);n={aggregate:i.length?s(e.aggregate,a(e.aggregate,l)):e.aggregate,groupLevels:i,$groupBy:e.groupLevels.slice(0,t)};r=a(e.group,c).sort();if(i.length){n.group={};n.$missing=e.groupLevels.slice(t).concat(r).concat(Object.keys(e.aggregate).filter(u))}else{n.group=s(e.group,r);n.$groupBy=n.$groupBy.concat(r);n.$missing=[]}return n};c.filterOrderby=function(e,t){if(e){return e.split(a).filter(function(e){var n;if(u.test(e)){n=e.split(l)[0];return n in t.aggregate||n in t.group||t.groupLevels.indexOf(n)>=0}return true}).join(",")}};c.getResourcePathWithQuery=function(t,n,i,r){n=Object.assign({},n,{$skip:i,$top:r-i});n=e.buildApply(t,n,null,this.bFollowUp);this.bFollowUp=true;return this.sResourcePath+this.oRequestor.buildQueryString(this.sMetaPath,n,false,true)};c.handleResponse=function(e,t,n,i,r,o,s,a){var u,l={},c;function h(e){l[e]=l[e]||{};return l[e]}if(t){c=s.value.shift();s["@odata.count"]=c.UI5__count;for(u in t){h(t[u].measure)[t[u].method]=c[u]}n(l);this.handleResponse=i}else{c=s.value[0];if("UI5__count"in c){this.iLeafCount=parseInt(c.UI5__count);s["@odata.count"]=this.iLeafCount+1;if(r>0){s.value.shift()}}if(r===0){c["@$ui5.node.isExpanded"]=true;c["@$ui5.node.isTotal"]=true;c["@$ui5.node.level"]=0;Object.keys(c).forEach(function(e){if(e.startsWith("UI5grand__")){c[e.slice(10)]=c[e]}});Object.keys(e.aggregate).forEach(function(e){c[e]=c[e]||null});Object.keys(e.group).forEach(function(e){c[e]=null})}}i.call(this,r,o,s,a)};return c},false);