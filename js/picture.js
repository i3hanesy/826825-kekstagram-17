'use strict';
(function () {

  var XHR_URL = 'https://js.dump.academy/kekstagram/data';
  var SHOW_ITEMS_TO = 10;

  var imgFilter = document.querySelector('.img-filters');
  var imgFiltersForm = imgFilter.querySelector('.img-filters__form');
  var pictures = document.querySelector('.pictures');
  var imgFilterButton = imgFiltersForm.querySelector('.img-filters__button--active');


  var getPictures = function (dataArray) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
    var fragment = document.createDocumentFragment();

    while (pictures.contains(pictures.querySelector('.picture'))) {
      pictures.removeChild(pictures.querySelector('.picture'));
    }

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

  var dataCopy = [];

  var onSuccess = function (data) {

    dataCopy = data;

    getPictures(data);
    imgFilter.classList.remove('img-filters--inactive');
  };

  var onImgFiltersFormClick = function (evt) {
    var target = evt.target;
    var typeButton = target.type === 'button';

    if (!typeButton) {
      return;
    }

    imgFilterButton.classList.remove('img-filters__button--active');
    imgFilterButton = target;
    imgFilterButton.classList.add('img-filters__button--active');

    var dataForWork = dataCopy.slice();

    if (target.id === 'filter-popular') {
      getPictures(dataCopy);

    } else if (target.id === 'filter-new') {

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

      shuffleArray(dataForWork);
      getPictures(dataForWork.slice(0, SHOW_ITEMS_TO));

    } else if (target.id === 'filter-discussed') {

      dataForWork.sort(function (first, second) {
        if (first.comments.length < second.comments.length) {
          return 1;
        } else if (first.comments.length > second.comments.length) {
          return -1;
        } else {
          return 0;
        }
      });
      getPictures(dataForWork);

    }
  };

  window.load(XHR_URL, onSuccess);

  var onFiltersFormTimeOutClick = window.debounce(onImgFiltersFormClick);

  imgFiltersForm.addEventListener('click', onFiltersFormTimeOutClick);

})();
