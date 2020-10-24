sap.ui.define(["sap/ui/Device","sap/ui/core/mvc/Controller","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/json/JSONModel"],function(e,t,i,s,r){"use strict";return t.extend("sap.ui.demo.todo.controller.App",{onInit:function(){this.aSearchFilters=[];this.aTabFilters=[];this.getView().setModel(new r({isMobile:e.browser.mobile,filterText:undefined}),"view")},addTodo:function(){var e=this.getView().getModel();var t=e.getProperty("/todos").map(function(e){return Object.assign({},e)});t.push({title:e.getProperty("/newTodo"),completed:false});e.setProperty("/todos",t);e.setProperty("/newTodo","")},clearCompleted:function(){var e=this.getView().getModel();var t=e.getProperty("/todos").map(function(e){return Object.assign({},e)});var i=t.length;while(i--){var s=t[i];if(s.completed){t.splice(i,1)}}e.setProperty("/todos",t)},updateItemsLeftCount:function(){var e=this.getView().getModel();var t=e.getProperty("/todos")||[];var i=t.filter(function(e){return e.completed!==true}).length;e.setProperty("/itemsLeftCount",i)},onSearch:function(e){var t=this.getView().getModel();this.aSearchFilters=[];this.sSearchQuery=e.getSource().getValue();if(this.sSearchQuery&&this.sSearchQuery.length>0){t.setProperty("/itemsRemovable",false);var r=new i("title",s.Contains,this.sSearchQuery);this.aSearchFilters.push(r)}else{t.setProperty("/itemsRemovable",true)}this._applyListFilters()},onFilter:function(e){this.aTabFilters=[];this.sFilterKey=e.getParameter("item").getKey();switch(this.sFilterKey){case"active":this.aTabFilters.push(new i("completed",s.EQ,false));break;case"completed":this.aTabFilters.push(new i("completed",s.EQ,true));break;case"all":default:}this._applyListFilters()},_applyListFilters:function(){var e=this.byId("todoList");var t=e.getBinding("items");t.filter(this.aSearchFilters.concat(this.aTabFilters),"todos");var i;if(this.sFilterKey&&this.sFilterKey!=="all"){if(this.sFilterKey==="active"){i="ACTIVE_ITEMS"}else{i="COMPLETED_ITEMS"}if(this.sSearchQuery){i+="_CONTAINING"}}else if(this.sSearchQuery){i="ITEMS_CONTAINING"}var s;if(i){var r=this.getView().getModel("i18n").getResourceBundle();s=r.getText(i,[this.sSearchQuery])}this.getView().getModel("view").setProperty("/filterText",s)}})});