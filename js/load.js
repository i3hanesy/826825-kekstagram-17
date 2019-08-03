'use strict';

(function () {
  var LOAD_TIME = 10000;
  var OK_STATUS = 200;
  var xhr;

  var getServerData = function (onSuccess, onError) {

    xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = LOAD_TIME;
  };

  window.load = {

    getData: function (url, success, fail) {

      getServerData(success, fail);
      xhr.open('GET', url);
      xhr.send();

    },

    uploadData: function (url, data, success, fail) {

      getServerData(success, fail);
      xhr.open('POST', url);
      xhr.send(data);

    }
  };

})();
