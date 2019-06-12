'use strict';

var names = ['Артем', 'Костя', 'Юлия', 'Саня',
  'Егор', 'Ирина', 'Олег', 'Иван', 'Яков', 'Антон',
  'Алина', 'Андрей', 'Ефросия', 'Кабысдох', 'Дармоед',
  'Лентяй', 'Толстый', 'Анатолий', 'Барон', 'Юрец', 'Джон',
  'Уил', 'Генри', 'Гарри', 'Педант'];

var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('a');

var getPhotos = function (user, comment) {
  var photos = [];

  for (var i = 0; i < names.length; i++) {
    photos[i] = {
      avatar: 'img/avatar-' + (i + 1) + '.svg',
      url: 'photos/' + (i + 1) + '.jpg',
      likes: Math.floor(Math.random() * (200 - 15 + 1) + 15),
      name: user[Math.floor(Math.random() * user.length)],
      message: comment[Math.floor(Math.random() * comment.length)]
    };

    var picturesElement = pictureTemplate.cloneNode(true);

    picturesElement.querySelector('.picture__comments').textContent = photos[i].message;
    picturesElement.querySelector('.picture__likes').textContent = photos[i].likes;
    picturesElement.querySelector('.picture__img').setAttribute('src', photos[i].url);
    pictures.appendChild(picturesElement);
  }
};

getPhotos(names, comments);
