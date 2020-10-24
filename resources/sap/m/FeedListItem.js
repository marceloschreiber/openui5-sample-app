/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ListItemBase","./Link","./library","./FormattedText","sap/ui/core/Control","sap/ui/core/IconPool","sap/m/Button","sap/ui/Device","./FeedListItemRenderer"],function(t,e,o,i,s,n,r,a,l){"use strict";var p=o.ListType;var h=o.ImageHelper;var g=o.LinkConversion;var u=o.ButtonType;var d=t.extend("sap.m.FeedListItem",{metadata:{library:"sap.m",designtime:"sap/m/designtime/FeedListItem.designtime",properties:{icon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},activeIcon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},sender:{type:"string",group:"Data",defaultValue:null},text:{type:"string",group:"Data",defaultValue:null},moreLabel:{type:"string",group:"Data",defaultValue:null},lessLabel:{type:"string",group:"Data",defaultValue:null},info:{type:"string",group:"Data",defaultValue:null},timestamp:{type:"string",group:"Data",defaultValue:null},senderActive:{type:"boolean",group:"Behavior",defaultValue:true},iconActive:{type:"boolean",group:"Behavior",defaultValue:true},iconDensityAware:{type:"boolean",defaultValue:true},showIcon:{type:"boolean",group:"Behavior",defaultValue:true},convertLinksToAnchorTags:{type:"sap.m.LinkConversion",group:"Behavior",defaultValue:g.None},convertedLinksDefaultTarget:{type:"string",group:"Behavior",defaultValue:"_blank"},maxCharacters:{type:"int",group:"Behavior",defaultValue:null}},defaultAggregation:"actions",aggregations:{actions:{type:"sap.m.FeedListItemAction",multiple:true},_text:{type:"sap.m.FormattedText",multiple:false,visibility:"hidden"},_actionSheet:{type:"sap.m.ActionSheet",multiple:false,visibility:"hidden"},_actionButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{senderPress:{parameters:{domRef:{type:"string"},getDomRef:{type:"function"}}},iconPress:{parameters:{domRef:{type:"string"},getDomRef:{type:"function"}}}}}});d._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");d._nMaxCharactersMobile=300;d._nMaxCharactersDesktop=500;d._sTextShowMore=d._oRb.getText("TEXT_SHOW_MORE");d._sTextShowLess=d._oRb.getText("TEXT_SHOW_LESS");d.prototype.init=function(){t.prototype.init.apply(this);this.setAggregation("_text",new i(this.getId()+"-formattedText"),true);this.setAggregation("_actionButton",new r({id:this.getId()+"-actionButton",type:u.Transparent,icon:"sap-icon://overflow",press:[this._onActionButtonPress,this]}),true)};d.prototype._onActionButtonPress=function(){sap.ui.require(["sap/m/ActionSheet"],this._openActionSheet.bind(this))};d.prototype._openActionSheet=function(t){var e=this.getAggregation("_actionSheet");var o=this.getActions();var i;if(!(e&&e instanceof t)){e=new t({id:this.getId()+"-actionSheet",beforeOpen:[this._onBeforeOpenActionSheet,this]});this.setAggregation("_actionSheet",e,true)}e.destroyAggregation("buttons",true);for(var s=0;s<o.length;s++){i=o[s];e.addButton(new r({icon:i.getIcon(),text:i.getText(),press:i.firePress.bind(i,{item:this})}))}e.openBy(this.getAggregation("_actionButton"))};d.prototype._onBeforeOpenActionSheet=function(t){var e,o;if(a.system.phone){return}o=sap.ui.getCore().getConfiguration().getTheme();e=t.getSource().getParent();e.removeStyleClass("sapContrast sapContrastPlus");if(o==="sap_belize"){e.addStyleClass("sapContrast")}else if(o==="sap_belize_plus"){e.addStyleClass("sapContrastPlus")}};d.prototype.invalidate=function(){s.prototype.invalidate.apply(this,arguments);var t=d._sTextShowMore;if(this.getMoreLabel()){t=this.getMoreLabel()}delete this._bTextExpanded;if(this._oLinkExpandCollapse){this._oLinkExpandCollapse.setProperty("text",t,true)}};d.prototype.onBeforeRendering=function(){this.$("realtext").find('a[target="_blank"]').off("click");var t=this.getAggregation("_text");t.setProperty("convertLinksToAnchorTags",this.getConvertLinksToAnchorTags(),true);t.setProperty("convertedLinksDefaultTarget",this.getConvertedLinksDefaultTarget(),true);if(this.getConvertLinksToAnchorTags()===o.LinkConversion.None){t.setHtmlText(this.getText())}else{t.setProperty("htmlText",this.getText(),true)}this._sFullText=t._getDisplayHtml().replace(/\n/g,"<br>");this._sShortText=this._getCollapsedText();if(this._sShortText){this._sShortText=this._sShortText.replace(/<br>/g," ")}this._bEmptyTagsInShortTextCleared=false};d.prototype.onAfterRendering=function(){if(this._checkTextIsExpandable()&&!this._bTextExpanded){this._clearEmptyTagsInCollapsedText()}var t=this.$("realtext");i.prototype.onAfterRendering.apply({$:function(){return t}})};d.prototype.exit=function(){this.$("realtext").find('a[target="_blank"]').off("click");if(this._oLinkControl){this._oLinkControl.destroy()}if(this._oImageControl){this._oImageControl.destroy()}if(this._oLinkExpandCollapse){this._oLinkExpandCollapse.destroy()}t.prototype.exit.apply(this)};d.prototype.ontap=function(e){if(e.srcControl){if(!this.getIconActive()&&this._oImageControl&&e.srcControl.getId()===this._oImageControl.getId()||!this.getSenderActive()&&this._oLinkControl&&e.srcControl.getId()===this._oLinkControl.getId()||(!this._oImageControl||e.srcControl.getId()!==this._oImageControl.getId()&&(!this._oLinkControl||e.srcControl.getId()!==this._oLinkControl.getId())&&(!this._oLinkExpandCollapse||e.srcControl.getId()!==this._oLinkExpandCollapse.getId()))){t.prototype.ontap.apply(this,[e])}}};d.prototype.onfocusin=function(t){if(this._oImageControl){var e=this.$("icon");if(t.target.id===this.getId()){e.removeAttr("alt")}else{e.attr("alt"," ")}}var o=t.srcControl,i=o.getDomRef(),s=this.getParent().getAccessbilityPosition(o);if(o instanceof sap.m.FeedListItem){i.setAttribute("aria-posinset",s.posInset);i.setAttribute("aria-setsize",s.setSize)}};d.prototype._getImageControl=function(){var t=this.getIcon();var e=t?t:n.getIconURI("person-placeholder");var o=this.getId()+"-icon";var i={src:e,alt:this.getSender(),densityAware:this.getIconDensityAware(),decorative:false,useIconTooltip:false};var s;if(this.getIconActive()){s=["sapMFeedListItemImage"]}else{s=["sapMFeedListItemImageInactive"]}var r=this;this._oImageControl=h.getImageControl(o,this._oImageControl,this,i,s);if(this.getIconActive()){if(!this._oImageControl.hasListeners("press")){this._oImageControl.attachPress(function(){r.fireIconPress({domRef:this.getDomRef(),getDomRef:this.getDomRef.bind(this)})})}}return this._oImageControl};d.prototype._getLinkSender=function(t){if(!this._oLinkControl){var o=this;this._oLinkControl=new e({press:function(){o.fireSenderPress({domRef:this.getDomRef(),getDomRef:this.getDomRef.bind(this)})}});this._oLinkControl.setParent(this,null,true)}if(t){this._oLinkControl.setProperty("text",this.getSender()+d._oRb.getText("COLON"),true)}else{this._oLinkControl.setProperty("text",this.getSender(),true)}this._oLinkControl.setProperty("enabled",this.getSenderActive(),true);return this._oLinkControl};d.prototype._activeHandlingInheritor=function(){var t=this.getActiveIcon();if(this._oImageControl&&t){this._oImageControl.setSrc(t)}};d.prototype._inactiveHandlingInheritor=function(){var t=this.getIcon()?this.getIcon():n.getIconURI("person-placeholder");if(this._oImageControl){this._oImageControl.setSrc(t)}};d.prototype._getCollapsedText=function(){this._nMaxCollapsedLength=this.getMaxCharacters();if(this._nMaxCollapsedLength===0){if(a.system.phone){this._nMaxCollapsedLength=d._nMaxCharactersMobile}else{this._nMaxCollapsedLength=d._nMaxCharactersDesktop}}var t=this._convertHtmlToPlainText(this._sFullText);var e=null;if(t&&t.length>this._nMaxCollapsedLength){var o=t.substring(0,this._nMaxCollapsedLength);var i=o.lastIndexOf(" ");if(i>0){o=o.substr(0,i)}if(t.length===this._sFullText.length){e=o}else{e=this._convertPlainToHtmlText(o)}}return e};d.prototype._clearEmptyTagsInCollapsedText=function(){var t;if(this._bEmptyTagsInShortTextCleared){return}this._bEmptyTagsInShortTextCleared=true;do{t=this.$("realtext").find(":empty").remove()}while(t.length>0);this._sShortText=this.$("realtext").html()};d.prototype._toggleTextExpanded=function(){var t=this.$("realtext");var e=this.$("threeDots");var o=d._sTextShowMore;var i=d._sTextShowLess;if(this.getMoreLabel()){o=this.getMoreLabel()}if(this.getLessLabel()){i=this.getLessLabel()}if(this._bTextExpanded){t.html(this._sShortText.replace(/&#xa;/g,"<br>"));e.text(" ... ");this._oLinkExpandCollapse.setText(o);this._bTextExpanded=false;this._clearEmptyTagsInCollapsedText()}else{t.html(this._sFullText.replace(/&#xa;/g,"<br>"));e.text("  ");this._oLinkExpandCollapse.setText(i);this._bTextExpanded=true}};d.prototype._getLinkExpandCollapse=function(){var t=d._sTextShowMore;if(this.getMoreLabel()){t=this.getMoreLabel()}if(!this._oLinkExpandCollapse){this._oLinkExpandCollapse=new e({text:t,press:[this._toggleTextExpanded,this]});this._bTextExpanded=false;this._oLinkExpandCollapse.setParent(this,null,true)}return this._oLinkExpandCollapse};d.prototype._convertHtmlToPlainText=function(t){var e=/(<([^>]+)>)/gi;return t.replace(e,"")};d.prototype._convertPlainToHtmlText=function(t){var e=this._sFullText;var o=/(<([^>]+)>)/gi;var i=e.split(o);var s="";for(var n=0;n<i.length;n++){if(i[n].length===0){continue}if(t.length>0&&i[n].indexOf(t.trim())!==-1){i[n]=t}if(/^<.+>$/.test(i[n])){s=s+i[n];i[n+1]="";continue}if(t.indexOf(i[n].trim())===-1){continue}else{t=t.replace(i[n],"")}s=s+i[n]}return s};d.prototype._checkTextIsExpandable=function(){return this._sShortText!==null};d.prototype.setType=function(t){if(this.getType()!==t){if(t===p.Navigation){this.setProperty("type",p.Active)}else{this.setProperty("type",t)}}return this};return d});