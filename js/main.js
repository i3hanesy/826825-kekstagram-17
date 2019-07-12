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
var onEscKeydown = function (evt) {
  if (evt.keyCode === KEY_CODE.ESC) {
    closeOverlay();
  }
};

// открывает обработчик фотографий
var openOverlay = function () {
  imgOverlay.classList.remove('hidden');
  // отлавливает событие клавиши esc
  document.addEventListener('keydown', onEscKeydown);
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

var VALUE = {
  MAX: 100,
  LEFT_PIN_MAX: 450,
  LEFT_PIN_MIN: 0,
  GAP_SCALE: 25,
  SCALE_MAX: 3
};

var scaleControl = document.querySelector('.img-upload__scale');
var scaleControlValue = document.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview');
scaleControlValue.setAttribute('value', VALUE.MAX);
var scaleValue = scaleControlValue.value;

scaleControl.addEventListener('click', function (evt) {
  var target = evt.target;
  var typeButton = target.type === 'button';
  if (typeButton && target.classList.contains('scale__control--bigger')) {
    var increaseScale = scaleValue + VALUE.GAP_SCALE;
    scaleValue = increaseScale > VALUE.MAX ? VALUE.MAX : increaseScale;
  } else if (typeButton && target.classList.contains('scale__control--smaller')) {
    var reductionScale = scaleValue - VALUE.GAP_SCALE;
    scaleValue = reductionScale < VALUE.GAP_SCALE ? VALUE.GAP_SCALE : reductionScale;
  }
  getScaleValue(scaleValue);
});

var getScaleValue = function (val) {
  scaleControlValue.setAttribute('value', val + '%'); //
  imgUploadPreview.style.transform = 'scale(' + val / VALUE.MAX + ')';
};

// обработчик фильтров
var filter = document.querySelector('.img-upload__effects');
var filterButton = document.querySelector('.effects__radio');
var effectLevel = document.querySelector('.img-upload__effect-level');
var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
var effectLevelValue = effectLevel.querySelector('.effect-level__value');
var filters = {};

var getStyleSlider = function (value) {
  effectLevelPin.style.left = value + 'px';
  effectLevelDepth.style.width = value + 'px';
};

filter.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.type !== 'radio') {
    return;
  }

  getFilters(target);
  removeEffectLevel(target);
  effectLevelValue.setAttribute('value', VALUE.MAX);
  imgUploadPreview.style.filter = '';
  getStyleSlider(VALUE.LEFT_PIN_MAX);
});


// выбирает класс фильтра
var getFilters = function (node) {
  imgUploadPreview.classList.remove('effects__preview--' + filterButton.value);
  filterButton = node;
  imgUploadPreview.classList.add('effects__preview--' + filterButton.value);
  filters.filterName = filterButton.value;
};


// удаляет ползунок при отсутствии фильтра
var removeEffectLevel = function (noEffect) {
  effectLevel.classList.toggle('hidden', noEffect.value === 'none');
};

var imgUploadText = document.querySelector('.img-upload__text');
var textDescription = imgUploadText.querySelector('.text__description');


textDescription.addEventListener('focus', function () {
  document.removeEventListener('keydown', onEscKeydown);
});

textDescription.addEventListener('blur', function () {
  document.addEventListener('keydown', onEscKeydown);
});

effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var valueLeftPin = effectLevelPin.offsetLeft - shift.x;
    valueLeftPin = valueLeftPin < VALUE.LEFT_PIN_MAX ? valueLeftPin : VALUE.LEFT_PIN_MAX;
    valueLeftPin = valueLeftPin > VALUE.LEFT_PIN_MIN ? valueLeftPin : VALUE.LEFT_PIN_MIN;

    var relationScaleToValue = Math.round(VALUE.MAX / VALUE.LEFT_PIN_MAX * valueLeftPin);

    getStyleSlider(valueLeftPin);
    effectLevelValue.setAttribute('value', relationScaleToValue);

    var valuePin = effectLevelValue.value;
    var val = valuePin / VALUE.MAX;
    var valRound = Math.round(val * VALUE.SCALE_MAX);
    var valRoundFromOne = valRound > 0 ? valRound : 1;
    var valueToStyle = {
      'chrome': 'grayscale(' + val + ')',
      'sepia': 'sepia(' + val + ')',
      'marvin': 'invert(' + valuePin + '%)',
      'phobos': 'blur(' + valRound + 'px)',
      'heat': 'brightness(' + valRoundFromOne + ')'
    };

    imgUploadPreview.style.filter = valueToStyle[filters.filterName];

  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
