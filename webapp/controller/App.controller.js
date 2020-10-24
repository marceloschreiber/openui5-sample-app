sap.ui.define(
  [
    'sap/ui/Device',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/ui/model/json/JSONModel',
  ],
  function (Device, Controller, Filter, FilterOperator, JSONModel) {
    'use strict';

    return Controller.extend('sap.ui.demo.todo.controller.App', {
      onInit: function () {
        this.aSearchFilters = [];
        this.aTabFilters = [];

        this.getView().setModel(
          new JSONModel({
            isMobile: Device.browser.mobile,
            filterText: undefined,
          }),
          'view',
        );
      },

      addTodo: function () {
        var oModel = this.getView().getModel();
        var aTodos = oModel.getProperty('/todos').map(function (oTodo) {
          return Object.assign({}, oTodo);
        });

        aTodos.push({
          title: oModel.getProperty('/newTodo'),
          completed: false,
        });

        oModel.setProperty('/todos', aTodos);
        oModel.setProperty('/newTodo', '');
      },

      clearCompleted: function () {
        var oModel = this.getView().getModel();
        var aTodos = oModel.getProperty('/todos').map(function (oTodo) {
          return Object.assign({}, oTodo);
        });

        var i = aTodos.length;
        while (i--) {
          var oTodo = aTodos[i];
          if (oTodo.completed) {
            aTodos.splice(i, 1);
          }
        }

        oModel.setProperty('/todos', aTodos);
      },

      updateItemsLeftCount: function () {
        var oModel = this.getView().getModel();
        var aTodos = oModel.getProperty('/todos') || [];

        var iItemsLeft = aTodos.filter(function (oTodo) {
          return oTodo.completed !== true;
        }).length;

        oModel.setProperty('/itemsLeftCount', iItemsLeft);
      },

      onSearch: function (oEvent) {
        var oModel = this.getView().getModel();

        this.aSearchFilters = [];

        this.sSearchQuery = oEvent.getSource().getValue();
        if (this.sSearchQuery && this.sSearchQuery.length > 0) {
          oModel.setProperty('/itemsRemovable', false);
          var filter = new Filter('title', FilterOperator.Contains, this.sSearchQuery);
          this.aSearchFilters.push(filter);
        } else {
          oModel.setProperty('/itemsRemovable', true);
        }

        this._applyListFilters();
      },

      onFilter: function (oEvent) {
        this.aTabFilters = [];

        this.sFilterKey = oEvent.getParameter('item').getKey();

        switch (this.sFilterKey) {
          case 'active':
            this.aTabFilters.push(new Filter('completed', FilterOperator.EQ, false));
            break;
          case 'completed':
            this.aTabFilters.push(new Filter('completed', FilterOperator.EQ, true));
            break;
          case 'all':
          default:
          // Don't use any filter
        }

        this._applyListFilters();
      },

      _applyListFilters: function () {
        var oList = this.byId('todoList');
        var oBinding = oList.getBinding('items');

        oBinding.filter(this.aSearchFilters.concat(this.aTabFilters), 'todos');

        var sI18nKey;
        if (this.sFilterKey && this.sFilterKey !== 'all') {
          if (this.sFilterKey === 'active') {
            sI18nKey = 'ACTIVE_ITEMS';
          } else {
            sI18nKey = 'COMPLETED_ITEMS';
          }
          if (this.sSearchQuery) {
            sI18nKey += '_CONTAINING';
          }
        } else if (this.sSearchQuery) {
          sI18nKey = 'ITEMS_CONTAINING';
        }

        var sFilterText;
        if (sI18nKey) {
          var oResourceBundle = this.getView().getModel('i18n').getResourceBundle();
          sFilterText = oResourceBundle.getText(sI18nKey, [this.sSearchQuery]);
        }

        this.getView().getModel('view').setProperty('/filterText', sFilterText);
      },
    });
  },
);
