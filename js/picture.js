'use strict';
(function () {

  // var onError = function (message) {
  //   console.error(message);
  // };

  var onSuccess = function (data) {

    //  создает элементы из массива объектов по шаблону
    var pictures = document.querySelector('.pictures');
    var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
    var fragment = document.createDocumentFragment();

    var getTemplatesElements = function (templateElement, objectsArray) {
      for (var i = 0; i < objectsArray.length; i++) {
        var element = templateElement.cloneNode(true);
        var object = objectsArray[i];
        element.querySelector('.picture__comments').textContent = object.comments;
        element.querySelector('.picture__likes').textContent = object.likes;
        element.querySelector('.picture__img').setAttribute('src', object.url);
        fragment.appendChild(element);
      }

      return element;
    };

    getTemplatesElements(pictureTemplate, data);

    // вставляет элементы из шаблона на страницу
    var insertElements = function (locationOfInsertion) {
      locationOfInsertion.appendChild(fragment);
    };

    insertElements(pictures);
  };

  window.load('https://js.dump.academy/kekstagram/data', onSuccess);

})();

