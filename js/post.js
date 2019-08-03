'use strict';

(function () {
  var HHR_URL_POST = 'https://js.dump.academy/kekstagram';
  // var uploadForm = document.querySelector('.img-upload__form');
  var mainLocation = document.querySelector('main');

  var getResultMessageWindow = function (result) {

    var onEscKeydown = function (evt) {
      window.util.isEscEvent(evt, closeWindow);
    };

    var messageTemplate = document.querySelector('#' + result).content.querySelector('.' + result);
    var element = messageTemplate.cloneNode(true);
    mainLocation.appendChild(element);

    var messageWindow = mainLocation.querySelector('.' + result);
    var windowButton = messageWindow.querySelector('.' + result + '__button');

    var closeWindow = function () {
      messageWindow.remove();
    };

    windowButton.addEventListener('click', closeWindow);
    document.addEventListener('keydown', onEscKeydown);
    document.addEventListener('click', closeWindow);

  };

  var onSuccess = function () {
    getResultMessageWindow('success');
  };

  var onError = function () {
    getResultMessageWindow('error');
    window.preview.closeOverlay();
  };

  window.preview.uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.load.uploadData(HHR_URL_POST, new FormData(window.preview.uploadForm), function () {
      window.preview.closeOverlay();
      onSuccess();
    }, onError);
  });

})();
