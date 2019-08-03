'use strict';

(function () {

  var HASHTAG_MAX_LENGHT = 20;
  var HASHTAG_MAX_COUNT = 5;

  var hashTagsFeld = document.querySelector('.text__hashtags');


  var getCheckHachTag = function (inputArray) {
    if (inputArray === '') {
      return '';
    }

    hashTagsFeld.style.outline = 'none';

    var hashTagsArray = inputArray.toLowerCase().split(' ');

    if (hashTagsArray.length > HASHTAG_MAX_COUNT) {
      return 'Нельзя указывать больше ' + HASHTAG_MAX_COUNT + ' хэш-тегов';
    }

    for (var i = 0; i < hashTagsArray.length; i++) {
      var hashtag = hashTagsArray[i];

      if (hashtag[0] !== '#') {
        return 'Хэш-тег должен начинаться с символа # (решётка)';
      }

      if (hashtag === '#') {
        return 'Хеш-тег не может состоять только из одной решётки';
      }

      var cutHashtag = hashtag.slice(1);

      if (cutHashtag.indexOf('#') !== -1) {
        return 'Отсутствуют пробелы между хэш-тегами';
      }

      if (hashTagsArray.indexOf(hashtag) !== i) {
        return 'Используйте разные хэш-теги, причем #Хэш-Тег и #хЭШ-тЕГ один и тот-же хеш-тег';
      }

      if (hashtag.length > HASHTAG_MAX_LENGHT) {
        return 'Хэш-тег не может содержать больше ' + HASHTAG_MAX_LENGHT + ' символов, включая решётку';
      }
    }

    return '';
  };


  hashTagsFeld.addEventListener('input', function () {

    var error = getCheckHachTag(hashTagsFeld.value);
    hashTagsFeld.setCustomValidity(error);

    if (error !== '') {
      hashTagsFeld.style.outline = '2px solid red';
    }

  });

  window.hashtag = {
    hashTagsFeld: hashTagsFeld
  };

})();
