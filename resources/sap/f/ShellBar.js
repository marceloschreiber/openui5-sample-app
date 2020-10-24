/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/library","sap/ui/core/Control","./shellBar/Factory","./shellBar/AdditionalContentSupport","./shellBar/ResponsiveHandler","./shellBar/Accessibility","sap/m/BarInPageEnabler","./ShellBarRenderer"],function(t,o,e,i,s,a,r){"use strict";var n=t.AvatarSize;var l=o.extend("sap.f.ShellBar",{metadata:{library:"sap.f",interfaces:["sap.f.IShellBar","sap.m.IBar","sap.tnt.IToolHeader"],properties:{title:{type:"string",group:"Appearance",defaultValue:""},secondTitle:{type:"string",group:"Appearance",defaultValue:""},homeIcon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""},homeIconTooltip:{type:"string",group:"Appearance",defaultValue:""},showMenuButton:{type:"boolean",group:"Appearance",defaultValue:false},showNavButton:{type:"boolean",group:"Appearance",defaultValue:false},showCopilot:{type:"boolean",group:"Appearance",defaultValue:false},showSearch:{type:"boolean",group:"Appearance",defaultValue:false},showNotifications:{type:"boolean",group:"Appearance",defaultValue:false},showProductSwitcher:{type:"boolean",group:"Appearance",defaultValue:false},notificationsNumber:{type:"string",group:"Appearance",defaultValue:""}},aggregations:{menu:{type:"sap.m.Menu",multiple:false,forwarding:{getter:"_getMenu",aggregation:"menu"}},searchManager:{type:"sap.f.SearchManager",multiple:false},profile:{type:"sap.m.Avatar",multiple:false},additionalContent:{type:"sap.f.IShellBar",multiple:true,singularName:"additionalContent"},_overflowToolbar:{type:"sap.m.OverflowToolbar",multiple:false,visibility:"hidden"},_additionalBox:{type:"sap.m.HBox",multiple:false,visibility:"hidden"}},events:{homeIconPressed:{parameters:{icon:{type:"sap.m.Image"}}},menuButtonPressed:{parameters:{button:{type:"sap.m.Button"}}},navButtonPressed:{parameters:{button:{type:"sap.m.Button"}}},copilotPressed:{parameters:{image:{type:"sap.m.Image"}}},searchButtonPressed:{parameters:{button:{type:"sap.m.Button"}}},notificationsPressed:{parameters:{button:{type:"sap.m.Button"}}},productSwitcherPressed:{parameters:{button:{type:"sap.m.Button"}}},avatarPressed:{parameters:{avatar:{type:"sap.m.Avatar"}}}}}});i.apply(l.prototype);l.prototype.init=function(){this._oFactory=new e(this);this._bOTBUpdateNeeded=true;this._bLeftBoxUpdateNeeded=true;this._bRightBoxUpdateNeeded=true;this._oOverflowToolbar=this._oFactory.getOverflowToolbar();this._oAdditionalBox=this._oFactory.getAdditionalBox();this._aControls=[];this._aAdditionalContent=[];this.setAggregation("_overflowToolbar",this._oOverflowToolbar);this.setAggregation("_additionalBox",this._oAdditionalBox);this._oToolbarSpacer=this._oFactory.getToolbarSpacer();this._oResponsiveHandler=new s(this);this._oAcc=new a(this)};l.prototype.onBeforeRendering=function(){var t=this.getNotificationsNumber();if(this.getShowNotifications()&&t!==undefined){this._updateNotificationsIndicators(t)}this._assignControls()};l.prototype.exit=function(){this._aLeftControls=[];this._aRightControls=[];this._aControls=[];this._oResponsiveHandler.exit();this._oFactory.destroy();this._oAcc.exit()};l.prototype.setHomeIcon=function(t){if(t){if(!this._oHomeIcon){this._oHomeIcon=this._oFactory.getHomeIcon()}this._oHomeIcon.setSrc(t)}else{this._oHomeIcon=null}this._bLeftBoxUpdateNeeded=true;return this.setProperty("homeIcon",t)};l.prototype.setProfile=function(t){this.validateAggregation("profile",t,false);if(t){t.setDisplaySize(n.XS);t.setTooltip(this._oAcc.getEntityTooltip("PROFILE"));t.attachPress(function(){this.fireEvent("avatarPressed",{avatar:t})},this);t.addStyleClass("sapFShellBarProfile")}return this.setAggregation("profile",t)};l.prototype.setHomeIconTooltip=function(t){var o=this._oAcc.getEntityTooltip("LOGO");if(!this._oHomeIcon){this._oHomeIcon=this._oFactory.getHomeIcon()}if(t){this._oHomeIcon.setTooltip(t)}else{this._oHomeIcon.setTooltip(o)}return this.setProperty("homeIconTooltip",t,true)};l.prototype.setTitle=function(t){this._sTitle=t;if(!t){this._oPrimaryTitle=null;this._oMegaMenu=null}else{if(!this._oMegaMenu){this._oMegaMenu=this._oFactory.getMegaMenu()}this._oMegaMenu.setText(t);if(!this._oPrimaryTitle){this._oPrimaryTitle=this._oFactory.getPrimaryTitle()}this._oPrimaryTitle.setText(t)}this._bLeftBoxUpdateNeeded=true;return this.setProperty("title",t)};l.prototype.setSecondTitle=function(t){if(t){if(!this._oSecondTitle){this._oSecondTitle=this._oFactory.getSecondTitle()}this._oSecondTitle.setText(t)}else{this._oSecondTitle=null}this._bLeftBoxUpdateNeeded=true;return this.setProperty("secondTitle",t)};l.prototype.setShowCopilot=function(t){if(t){if(!this._oCopilot){this._oCopilot=this._oFactory.getCopilot()}}else{this._oCopilot=null}this._bOTBUpdateNeeded=true;this._bLeftBoxUpdateNeeded=true;this._bRightBoxUpdateNeeded=true;return this.setProperty("showCopilot",t)};l.prototype.setShowSearch=function(t){if(t){if(!this._oSearch){this._oSearch=this._oFactory.getSearch()}}else{this._oSearch=null}this._bOTBUpdateNeeded=true;return this.setProperty("showSearch",t)};l.prototype.setSearchManager=function(t){this.setAggregation("searchManager",t);if(t){if(!this._oManagedSearch){this._oManagedSearch=this._oFactory.getManagedSearch()}}else{this._oManagedSearch=null}this._bOTBUpdateNeeded=true;return this};l.prototype.setShowNotifications=function(t){if(t){if(!this._oNotifications){this._oNotifications=this._oFactory.getNotifications()}}else{this._oNotifications=null}this._bOTBUpdateNeeded=true;return this.setProperty("showNotifications",t)};l.prototype.setShowProductSwitcher=function(t){if(t){if(!this._oProductSwitcher){this._oProductSwitcher=this._oFactory.getProductSwitcher()}}else{this._oProductSwitcher=null}this._bRightBoxUpdateNeeded=true;return this.setProperty("showProductSwitcher",t)};l.prototype.setShowNavButton=function(t){if(t){if(!this._oNavButton){this._oNavButton=this._oFactory.getNavButton()}}else{this._oNavButton=null}this._bLeftBoxUpdateNeeded=true;return this.setProperty("showNavButton",t)};l.prototype.setShowMenuButton=function(t){if(t){if(!this._oMenuButton){this._oMenuButton=this._oFactory.getMenuButton()}}else{this._oMenuButton=null}this._bLeftBoxUpdateNeeded=true;return this.setProperty("showMenuButton",t)};l.prototype.setNotificationsNumber=function(t){if(this.getShowNotifications()&&t!==undefined){this._updateNotificationsIndicators(t);this._oAcc.updateNotificationsNumber(t)}return this.setProperty("notificationsNumber",t,true)};l.prototype._addDataToControl=function(t){t.addStyleClass("sapFShellBarItem");if(this._aControls.indexOf(t)===-1){this._aControls.push(t)}return t};l.prototype._assignControls=function(){if(!this._bOTBUpdateNeeded&&!this._bLeftBoxUpdateNeeded&&!this._bRightBoxUpdateNeeded){return}if(this._bLeftBoxUpdateNeeded){this._aLeftControls=[];if(this._oNavButton){this.addControlToCollection(this._oNavButton,this._aLeftControls)}if(this._oMenuButton){this.addControlToCollection(this._oMenuButton,this._aLeftControls)}if(this._oHomeIcon){this.addControlToCollection(this._oHomeIcon,this._aLeftControls)}this._assignControlsToAdditionalBox();this._aLeftControls.push(this._oAdditionalBox)}if(this._oCopilot){this._addDataToControl(this._oCopilot)}if(this._bRightBoxUpdateNeeded||this._bOTBUpdateNeeded){this._aRightControls=[];if(this._bOTBUpdateNeeded){this._assignControlsToOverflowToolbar()}this._aRightControls.push(this._oOverflowToolbar)}this._bLeftBoxUpdateNeeded=false;this._bRightBoxUpdateNeeded=false;this._bOTBUpdateNeeded=false};l.prototype._assignControlsToAdditionalBox=function(){this._oAdditionalBox.removeAllItems();this._oTitleControl=null;if(this.getShowMenuButton()){if(this._oPrimaryTitle){this.addControlToCollection(this._oPrimaryTitle,this._oAdditionalBox);this._oTitleControl=this._oPrimaryTitle}}else if(this._oMegaMenu){if(this._oMegaMenu.getMenu()&&this._oMegaMenu.getMenu().getItems().length){this.addControlToCollection(this._oMegaMenu,this._oAdditionalBox);this._oTitleControl=this._oMegaMenu}else if(this._oPrimaryTitle){this.addControlToCollection(this._oPrimaryTitle,this._oAdditionalBox);this._oTitleControl=this._oPrimaryTitle}}if(this._oSecondTitle){this.addControlToCollection(this._oSecondTitle,this._oAdditionalBox)}return this._oAdditionalBox};l.prototype._assignControlsToOverflowToolbar=function(){var t;if(!this._oOverflowToolbar){return}this._oOverflowToolbar.removeAllContent();this.addControlToCollection(this._oToolbarSpacer,this._oOverflowToolbar);if(this._oManagedSearch){this.addControlToCollection(this._oManagedSearch,this._oOverflowToolbar)}if(this._oSearch){this.addControlToCollection(this._oSearch,this._oOverflowToolbar)}if(this._oNotifications){this.addControlToCollection(this._oNotifications,this._oOverflowToolbar)}t=this.getAdditionalContent();if(t){t.forEach(function(t){this.addControlToCollection(t,this._oOverflowToolbar)},this)}this._bOTBUpdateNeeded=false;return this._oOverflowToolbar};l.prototype.addControlToCollection=function(t,o){var e;if(Array.isArray(o)){e="push"}else{e=o===this._oAdditionalBox?"addItem":"addContent"}this._addDataToControl(t);o[e](t)};l.prototype._updateNotificationsIndicators=function(t){if(this._oOverflowToolbar._getOverflowButton()){this._oOverflowToolbar._getOverflowButton().data("notifications",t,true)}if(this._oNotifications){this._oNotifications.data("notifications",t,true)}};l.prototype._getMenu=function(){if(!this._oMegaMenu){this._oMegaMenu=this._oFactory.getMegaMenu()}return this._oMegaMenu};l.prototype.onThemeChanged=function(){this._oResponsiveHandler._handleResize()};l.prototype._getOverflowToolbar=function(){return this._oOverflowToolbar};l.prototype.getContext=r.prototype.getContext;l.prototype.isContextSensitive=r.prototype.isContextSensitive;l.prototype.setHTMLTag=r.prototype.setHTMLTag;l.prototype.getHTMLTag=r.prototype.getHTMLTag;l.prototype.applyTagAndContextClassFor=r.prototype.applyTagAndContextClassFor;l.prototype._applyContextClassFor=r.prototype._applyContextClassFor;l.prototype._applyTag=r.prototype._applyTag;l.prototype._getContextOptions=r.prototype._getContextOptions;l.prototype._setRootAccessibilityRole=r.prototype._setRootAccessibilityRole;l.prototype._getRootAccessibilityRole=r.prototype._getRootAccessibilityRole;l.prototype._setRootAriaLevel=r.prototype._setRootAriaLevel;l.prototype._getRootAriaLevel=r.prototype._getRootAriaLevel;return l});