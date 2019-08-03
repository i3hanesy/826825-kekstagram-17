'use strict';
(function () {

  var XHR_URL = 'https://js.dump.academy/kekstagram/data';
  var SHOW_ITEMS_TO = 10;

  var imgFilter = document.querySelector('.img-filters');
  var imgFiltersForm = imgFilter.querySelector('.img-filters__form');
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('a');

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

    window.util.clearDomElements(pictures, 'a');

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

  var picturesData = [];

  var onSuccess = function (data) {

    picturesData = data;
    getPictures(data);
    imgFilter.classList.remove('img-filters--inactive');

  };

  pictures.addEventListener('click', function (evt) {
    var pictureTarget = evt.target;
    var pictureNumber;
    var pictureLink = pictures.querySelector('.picture');
    var picture = pictureLink.querySelector('img');

    var clickedPicture = pictureTarget.className === picture.className;
    var pressedPictureLink = pictureTarget.className === pictureLink.className;

    if (!clickedPicture && !pressedPictureLink) {
      return;
    }

    if (!clickedPicture) {
      pictureNumber = pictureTarget.firstElementChild.getAttribute('src');
    } else {
      pictureNumber = pictureTarget.getAttribute('src');
    }

    var selectedPhoto = picturesData.filter(function (address) {
      return address.url === pictureNumber;
    });

    var showElement = selectedPhoto[0];

    window.big.getBigPicture(showElement);
  });

  var onImgFiltersFormClick = function (evt) {
    var buttonElement = evt.target;
    var typeButton = buttonElement.type === 'button';
    var FILTER = {
      POPULAR: buttonElement.id === 'filter-popular',
      NEW: buttonElement.id === 'filter-new',
      DISCUSSED: buttonElement.id === 'filter-discussed'
    };

    if (!typeButton) {
      return;
    }

    var activeButton = imgFiltersForm.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    buttonElement.classList.add('img-filters__button--active');

    var dataForWork = picturesData.slice();

    if (FILTER.POPULAR) {
      getPictures(picturesData);
    }

    if (FILTER.NEW) {
      getPictures(getShuffleArray(dataForWork).slice(0, SHOW_ITEMS_TO));
    }

    if (FILTER.DISCUSSED) {
      getPictures(getSortArray(dataForWork));
    }

    return;
  };

  var onFiltersFormTimeOutClick = window.debounce(onImgFiltersFormClick);

  imgFiltersForm.addEventListener('click', onFiltersFormTimeOutClick);

  window.load.getData(XHR_URL, onSuccess);

  window.pictures = {
    pictures: pictures
  };

})();
