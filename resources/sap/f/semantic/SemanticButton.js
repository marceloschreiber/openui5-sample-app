/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/semantic/SemanticButton","sap/f/semantic/SemanticConfiguration"],function(t,a){"use strict";var e=t.extend("sap.f.semantic.SemanticButton",{metadata:{library:"sap.f",abstract:true}});e.prototype._getConfiguration=function(){return a.getConfiguration(this.getMetadata().getName())};return e});