sap.ui.define(['require'], function (require) {
  'use strict';
  return {
    resolvePath: function (sPath) {
      return require.toUrl('../') + sPath;
    },
  };
});
