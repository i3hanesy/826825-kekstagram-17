'use strict';

(function () {
  var HASHTAG_MAX_LENGHT = 20;
  var HASHTAG_MAX_COUNT = 5;


  var hashTagsFeld = document.querySelector('.text__hashtags');
  var hashTagsFeldArray = [];
  var lowCaseHashTags = [];

  hashTagsFeld.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.preview.onEscKeydown);
  });

  hashTagsFeld.addEventListener('blur', function () {
    document.addEventListener('keydown', window.preview.onEscKeydown);
  });

  hashTagsFeld.addEventListener('input', function () {
    hashTagsFeldArray = hashTagsFeld.value.split(' ');

    hashTagsFeld.style.outline = 'none';
    hashTagsFeld.setCustomValidity('');

  });

  var getCheckHachTag = function (checkArray) {

    if (hashTagsFeld.value === '') {
      return false;
    }

    for (var i = 0; i < checkArray.length; i++) {
      lowCaseHashTags[i] = checkArray[i].toLowerCase();

      if (checkArray[i].charAt(0) !== '#') {
        return 'хэш-тег должен начинаться с символа # (решётка)';
      }

      if (checkArray[i] === '#') {
        return 'хеш-тег не может состоять только из одной решётки;';
      }

      if (checkArray[i].indexOf('#', 1) >= 1) {
        return 'Хэш-теги разделяются пробелами';
      }

      if (lowCaseHashTags.indexOf(lowCaseHashTags[i]) !== i) {
        return 'Один и тот же хэш-тег не может быть использован дважды';
      }

      if (checkArray.length > HASHTAG_MAX_COUNT) {
        return 'Нельзя указать больше ' + HASHTAG_MAX_COUNT + ' хэш-тегов';
      }

      if (checkArray[i].length > HASHTAG_MAX_LENGHT) {
        return 'Хэштег не может содержать больше ' + HASHTAG_MAX_LENGHT + ' символов, включая решётку';
      }

    }

    return false;
  };

  var showError = function () {

    var error = getCheckHachTag(hashTagsFeldArray);

    if (error) {
      hashTagsFeld.style.outline = '4px solid red';
      hashTagsFeld.setCustomValidity(error);
      return true;
    }
    return false;
  };

  window.hashtag = {
    showError: showError,
    hashTagsFeld: hashTagsFeld
  };

})();
