'use strict';

var names = ['Артем', 'Костя', 'Юлия', 'Саня',
  'Егор', 'Ирина', 'Олег', 'Иван', 'Яков', 'Антон',
  'Алина', 'Андрей', 'Ефросия', 'Кабысдох', 'Дармоед',
  'Лентяй', 'Толстый', 'Анатолий', 'Барон', 'Юрец', 'Джон',
  'Уил', 'Генри', 'Гарри', 'Педант'];

var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var minLikes = 15;
var maxLikes = 200;

var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
var fragment = document.createDocumentFragment();
var photos = [];

// создает случайное число в диапазоне min - max
var getRandomNumber = function (min, max) {
  var rand = Math.floor(min + Math.random() * (max + 1 - min));
  return rand;
};

// Создает объекты массива со случайными данными из других массивов
var getPhotos = function (user, comment, arrayForObject) {

  for (var i = 0; i < user.length; i++) {
    arrayForObject[i] = {
      avatar: 'img/avatar-' + (i + 1) + '.svg',
      url: 'photos/' + (i + 1) + '.jpg',
      // интервал колличества лайков от 15 до 200
      likes: getRandomNumber(minLikes, maxLikes),
      name: user[getRandomNumber(0, user.length - 1)],
      message: comment[getRandomNumber(0, comment.length - 1)]
    };
  }
  return arrayForObject;
};

getPhotos(names, comments, photos);

// создает элементы из массива объектов по шаблону
var getTemplatesElements = function (templateElement, objectsArray) {
  for (var i = 0; i < objectsArray.length; i++) {
    var element = templateElement.cloneNode(true);
    var object = objectsArray[i];
    element.querySelector('.picture__comments').textContent = object.message;
    element.querySelector('.picture__likes').textContent = object.likes;
    element.querySelector('.picture__img').setAttribute('src', object.url);
    fragment.appendChild(element);
  }

  return element;
};

getTemplatesElements(pictureTemplate, photos);

// вставляет элементы из шаблона на страницу
var insertElements = function (locationOfInsertion) {
  locationOfInsertion.appendChild(fragment);
};

insertElements(pictures);


var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var uploadFile = document.querySelector('#upload-file');
var imgOverlay = document.querySelector('.img-upload__overlay');

var buttonCancel = document.querySelector('#upload-cancel');


// открывает обработчик фотографий
var openOverlay = function () {
  imgOverlay.classList.remove('hidden');
  // отлавливает событие клавиши esc
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeOverlay();
    }
  });
};

// закрывает обработчик фотографий
var closeOverlay = function () {
  imgOverlay.classList.add('hidden');
  uploadFile.value = null;
};

// отлавливает событие окончания изменения поля ввода
uploadFile.addEventListener('change', function () {
  openOverlay();
});

// отлавливает событие по клику мыши
buttonCancel.addEventListener('click', function () {
  closeOverlay();
});

// отлавливает событие клавиши Enter
buttonCancel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeOverlay();
  }
});

var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview');

scaleControlValue.setAttribute('value', '100%');

// scaleControlValue.addEventListener('click', function () {
//   scaleControlValue.setAttribute('value', '100%');
//   imgUploadPreview.setAttribute('style', 'transform: scale(1)');
// });

var SCALE_VALUE = 100;
var GAP_VALUE = 25;

scaleControlSmaller.addEventListener('click', function () {
  if (scaleControlValue.getAttribute('value') === (SCALE_VALUE - GAP_VALUE * (0)) + '%') {
    scaleControlValue.setAttribute('value', (SCALE_VALUE - GAP_VALUE * (1)) + '%');
    imgUploadPreview.setAttribute('style', 'transform: scale(0.' + (SCALE_VALUE - GAP_VALUE * (1)) + ')');
  } else if (scaleControlValue.getAttribute('value') === (SCALE_VALUE - GAP_VALUE * (1)) + '%') {
    scaleControlValue.setAttribute('value', (SCALE_VALUE - GAP_VALUE * (2)) + '%');
    imgUploadPreview.setAttribute('style', 'transform: scale(0.' + (SCALE_VALUE - GAP_VALUE * (2)) + ')');
  } else if (scaleControlValue.getAttribute('value') === (SCALE_VALUE - GAP_VALUE * (2)) + '%') {
    scaleControlValue.setAttribute('value', (SCALE_VALUE - GAP_VALUE * (3)) + '%');
    imgUploadPreview.setAttribute('style', 'transform: scale(0.' + (SCALE_VALUE - GAP_VALUE * (3)) + ')');
  }
});

scaleControlBigger.addEventListener('click', function () {
  if (scaleControlValue.getAttribute('value') === (SCALE_VALUE - GAP_VALUE * (3)) + '%') {
    scaleControlValue.setAttribute('value', (SCALE_VALUE - GAP_VALUE * (2)) + '%');
    imgUploadPreview.setAttribute('style', 'transform: scale(0.' + (SCALE_VALUE - GAP_VALUE * (2)) + ')');
  } else if (scaleControlValue.getAttribute('value') === (SCALE_VALUE - GAP_VALUE * (2)) + '%') {
    scaleControlValue.setAttribute('value', (SCALE_VALUE - GAP_VALUE * (1)) + '%');
    imgUploadPreview.setAttribute('style', 'transform: scale(0.' + (SCALE_VALUE - GAP_VALUE * (1)) + ')');
  } else if (scaleControlValue.getAttribute('value') === (SCALE_VALUE - GAP_VALUE * (1)) + '%') {
    scaleControlValue.setAttribute('value', (SCALE_VALUE - GAP_VALUE * (0)) + '%');
    imgUploadPreview.setAttribute('style', 'transform: scale(' + 1 + ')');
  }
});
