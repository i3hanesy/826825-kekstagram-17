'use strict';
(function () {

  var XHR_URL = 'https://js.dump.academy/kekstagram/data';
  var SHOW_ITEMS_TO = 10;

  var imgFilter = document.querySelector('.img-filters');
  var imgFiltersForm = imgFilter.querySelector('.img-filters__form');
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('a');

  var clearPictures = function () {
    var pictureElements = pictures.querySelectorAll('a');
    pictureElements.forEach(function (node) {
      node.parentNode.removeChild(node);
    });
  };

  var getShuffleArray = function (array) {
    array.sort(function () {
      return 0.5 - Math.random();
    });
    return array;
  };

  var getSortArray = function (array) {
    array.sort(function (first, second) {
      if (first.comments.length < second.comments.length) {
        return 1;
      } else if (first.comments.length > second.comments.length) {
        return -1;
      } else {
        return 0;
      }
    });
    return array;
  };


  var getPictures = function (dataArray) {
    var fragment = document.createDocumentFragment();

    clearPictures();

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
    var buttonElement = evt.target;
    var typeButton = buttonElement.type === 'button';

    if (!typeButton) {
      return;
    }

    var activeButton = imgFiltersForm.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    buttonElement.classList.add('img-filters__button--active');

    var dataForWork = dataCopy.slice();

    if (buttonElement.id === 'filter-popular') {
      getPictures(dataCopy);
    } else if (buttonElement.id === 'filter-new') {
      getPictures(getShuffleArray(dataForWork).slice(0, SHOW_ITEMS_TO));
    } else if (buttonElement.id === 'filter-discussed') {
      getPictures(getSortArray(dataForWork));
    }

    return;
  };

  window.load(XHR_URL, onSuccess);

  var onFiltersFormTimeOutClick = window.debounce(onImgFiltersFormClick);

  imgFiltersForm.addEventListener('click', onFiltersFormTimeOutClick);

})();
