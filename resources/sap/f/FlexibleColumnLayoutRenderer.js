/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText","sap/ui/Device","sap/m/library"],function(e,n,r){"use strict";var o={apiVersion:2};o.render=function(e,n){var a=n.getBackgroundDesign();e.openStart("div",n);e.class("sapFFCL");if(a!==r.BackgroundDesign.Transparent){e.class("sapFFCLBackgroundDesign"+a)}e.openEnd();o.renderBeginColumn(e,n);o.renderMidColumn(e,n);o.renderEndColumn(e,n);e.close("div")};o.renderBeginColumn=function(n,r){var a=r.getAggregation("_beginColumnBackArrow");n.openStart("div",r.getId()+"-beginColumn");n.accessibilityState(r,{role:"region",labelledby:e.getStaticId("sap.f","FCL_BEGIN_COLUMN_REGION_TEXT")});n.class("sapFFCLColumn");n.class("sapFFCLColumnBegin");n.class("sapFFCLColumnActive");n.openEnd();o.renderColumnContentWrapper(n);n.close("div");o.renderArrow(n,a)};o.renderMidColumn=function(n,r){var a=r.getAggregation("_midColumnForwardArrow"),t=r.getAggregation("_midColumnBackArrow");o.renderArrow(n,a);n.openStart("div",r.getId()+"-midColumn");n.accessibilityState(r,{role:"region",labelledby:e.getStaticId("sap.f","FCL_MID_COLUMN_REGION_TEXT")});n.class("sapFFCLColumn");n.class("sapFFCLColumnMid");n.openEnd();o.renderColumnContentWrapper(n);n.close("div");o.renderArrow(n,t)};o.renderEndColumn=function(n,r){var a=r.getAggregation("_endColumnForwardArrow");o.renderArrow(n,a);n.openStart("div",r.getId()+"-endColumn");n.accessibilityState(r,{role:"region",labelledby:e.getStaticId("sap.f","FCL_END_COLUMN_REGION_TEXT")});n.class("sapFFCLColumn");n.class("sapFFCLColumnEnd");n.openEnd();o.renderColumnContentWrapper(n);n.close("div")};o.renderArrow=function(e,r){if(!n.system.phone){e.openStart("div");e.class("sapFFCLArrow");e.class("sapContrastPlus");e.openEnd();e.renderControl(r);e.close("div")}};o.renderColumnContentWrapper=function(e){e.openStart("div");e.class("sapFFCLColumnContent");e.openEnd();e.close("div")};return o},true);