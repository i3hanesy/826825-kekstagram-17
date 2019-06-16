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
