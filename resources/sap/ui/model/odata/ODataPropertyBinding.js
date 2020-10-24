/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/Context","sap/ui/model/ChangeReason","sap/ui/model/PropertyBinding","sap/base/util/deepEqual","sap/ui/model/ChangeReason"],function(t,e,i,a){"use strict";var s=i.extend("sap.ui.model.odata.ODataPropertyBinding",{constructor:function(t,e,a,s){i.apply(this,arguments);this.bInitial=true;this.oValue=this._getValue();this.vOriginalValue;this.getDataState().setValue(this.oValue);this.setIgnoreMessages(s&&s.ignoreMessages)}});s.prototype.initialize=function(){if(this.oModel.oMetadata.isLoaded()&&this.bInitial){this.checkUpdate(true);this.bInitial=false}};s.prototype.getValue=function(){return this.oValue};s.prototype._getValue=function(){return this.oModel._getObject(this.sPath,this.oContext)};s.prototype.setValue=function(t){if(this.bSuspended){return}if(!a(t,this.oValue)&&this.oModel.setProperty(this.sPath,t,this.oContext,true)){this.oValue=t;var i=this.getDataState();i.setValue(this.oValue);this.oModel.firePropertyChange({reason:e.Binding,path:this.sPath,context:this.oContext,value:t})}};s.prototype.setContext=function(e){var i,a=this.oContext;if(e&&e.isPreliminary()){return}if(t.hasChanged(this.oContext,e)){this.oContext=e;if(this.isRelative()){i=!!(a!==e&&this.getDataState().getControlMessages().length);this.checkUpdate(i)}}};s.prototype.checkUpdate=function(t){if(this.bSuspended&&!t){return}var i=this.getDataState();var s=false;var o=this.oModel.getOriginalProperty(this.sPath,this.oContext);if(t||!a(o,this.vOriginalValue)){this.vOriginalValue=o;i.setOriginalValue(o);s=true}var n=this._getValue();if(t||!a(n,this.oValue)){this.oValue=n;i.setValue(this.oValue);this._fireChange({reason:e.Change});s=true}if(s){this.checkDataState()}};s.prototype.checkDataState=function(t){var e=this.oModel.resolve(this.sPath,this.oContext,true)||this.oModel.resolve(this.sPath,this.oContext);this.getDataState().setLaundering(!!t&&!!(e in t));i.prototype._checkDataState.call(this,e,t)};s.prototype.supportsIgnoreMessages=function(){return true};return s});