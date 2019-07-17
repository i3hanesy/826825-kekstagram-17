'use strict';

window.util = (function () {

  var KEY_CODE = {
    ENTER: 13,
    ESC: 27
  };

  return {

    isEscEvent: function (evt, action) {
      if (evt.keyCode === KEY_CODE.ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KEY_CODE.ENTER) {
        action();
      }
    }
  };

})();
