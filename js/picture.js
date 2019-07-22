'use strict';
(function () {

  var XHR_URL = 'https://js.dump.academy/kekstagram/data';

  var imgFilter = document.querySelector('.img-filters');
  var imgFiltersForm = imgFilter.querySelector('.img-filters__form');
  var pictures = document.querySelector('.pictures');


  var getPictures = function (dataArray) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
    var fragment = document.createDocumentFragment();

    var getTemplatesElements = function (templateElement, objectsArray) {
      for (var i = 0; i < objectsArray.length; i++) {
        var element = templateElement.cloneNode(true);
        var object = objectsArray[i];
        element.querySelector('.picture__comments').textContent = object.comments.length;
        element.querySelector('.picture__likes').textContent = object.likes;
        element.querySelector('.picture__img').setAttribute('src', object.url);
        fragment.appendChild(element);
      }

      return element;
    };

    getTemplatesElements(pictureTemplate, dataArray);


    // вставляет элементы из шаблона на страницу
    var insertElements = function (locationOfInsertion) {
      locationOfInsertion.appendChild(fragment);
    };

    insertElements(pictures);
  };

  var onSuccess = function (data) {

    var dataCopy = data.slice();

    getPictures(data);
    imgFilter.classList.remove('img-filters--inactive');

    imgFiltersForm.addEventListener('click', function (evt) {
      var target = evt.target;
      var typeButton = target.type === 'button';
      if (typeButton && target.id === 'filter-popular') {

        var picture = pictures.querySelectorAll('.picture');
        picture.parentNode.removeChild(picture);

        getPictures(data);

      } else if (typeButton && target.id === 'filter-new') {

        var shuffleArray = function (arr) {
          var j;
          var temp;
          for (var i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
          }

          return arr;
        };

        shuffleArray(dataCopy);
        getPictures(dataCopy.slice(0, 10));

      } else if (typeButton && target.id === 'filter-discussed') {

        dataCopy.sort(function (first, second) {
          if (first.comments.length < second.comments.length) {
            return 1;
          } else if (first.comments.length > second.comments.length) {
            return -1;
          } else {
            return 0;
          }
        });
        getPictures(dataCopy);

      }
    });

  };

  window.load(XHR_URL, onSuccess);

})();
