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

// работа с фотографией

var KEY_CODE = {
  ENTER: 13,
  ESC: 27
};

var uploadFile = document.querySelector('#upload-file');
var imgOverlay = document.querySelector('.img-upload__overlay');

var buttonCancel = document.querySelector('#upload-cancel');

// открывает обработчик фотографий
var openOverlay = function () {
  imgOverlay.classList.remove('hidden');
  // отлавливает событие клавиши esc
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE.ESC) {
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
  // устанавливает значение 100%
  // effectLevelValue.setAttribute('value', VALUE_MAX);
  getScaleValue(scaleValue);
});

// отлавливает событие по клику мыши
buttonCancel.addEventListener('click', function () {
  closeOverlay();
});

// отлавливает событие клавиши Enter
buttonCancel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE.ENTER) {
    closeOverlay();
  }
});

// изменение размера изображения по кнопкам '+' и '-'

var VALUE_MAX = 100;
var GAP_SCALE = 25;
var SCALE_MAX = 3;
var scaleControl = document.querySelector('.img-upload__scale');
var scaleControlValue = document.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview');
scaleControlValue.setAttribute('value', VALUE_MAX);
var scaleValue = scaleControlValue.value;

scaleControl.addEventListener('click', function (evt) {
  var target = evt.target;
  var typeButton = target.type === 'button';
  if (typeButton && target.classList.contains('scale__control--bigger')) {
    var increaseScale = scaleValue + GAP_SCALE;
    scaleValue = increaseScale > VALUE_MAX ? VALUE_MAX : increaseScale;
  } else if (typeButton && target.classList.contains('scale__control--smaller')) {
    var reductionScale = scaleValue - GAP_SCALE;
    scaleValue = reductionScale < GAP_SCALE ? GAP_SCALE : reductionScale;
  }
  getScaleValue(scaleValue);
});

var getScaleValue = function (val) {
  scaleControlValue.setAttribute('value', val + '%'); //
  imgUploadPreview.style.transform = 'scale(' + val / VALUE_MAX + ')';
};

// обработчик фильтров
var filter = document.querySelector('.img-upload__effects');
var filterButton = document.querySelector('.effects__radio');
var effectLevel = document.querySelector('.img-upload__effect-level');
var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
var effectLevelValue = effectLevel.querySelector('.effect-level__value');

filter.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.type !== 'radio') {
    return;
  }

  getFilters(target);
  removeEffectLevel(target);
  imgUploadPreview.style.filter = '';
});

// выбирает класс фильтра
var getFilters = function (node) {
  imgUploadPreview.classList.remove('effects__preview--' + filterButton.value);
  filterButton = node;
  imgUploadPreview.classList.add('effects__preview--' + filterButton.value);
};

// удаляет ползунок при отсутствии фильтра
var removeEffectLevel = function (noEffect) {
  effectLevel.classList.toggle('hidden', noEffect.value === 'none');
};


// устанавлевает стиль фильтра при отпускании клавиши мыши
effectLevelPin.addEventListener('mouseup', function () {
  var valuePin = effectLevelValue.value;
  var val = valuePin / VALUE_MAX;
  var valRound = Math.round(val * SCALE_MAX);
  var valRoundFromOne = valRound > 0 ? valRound : 1;
  var valueToStyle = {
    'chrome': 'grayscale(' + val + ')',
    'sepia': 'sepia(' + val + ')',
    'marvin': 'invert(' + valuePin + '%)',
    'phobos': 'blur(' + valRound + 'px)',
    'heat': 'brightness(' + valRoundFromOne + ')'
  };

  imgUploadPreview.style.filter = valueToStyle[filterButton.value];
});
