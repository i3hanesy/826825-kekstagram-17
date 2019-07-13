'use strict';
(function () {
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
        likes: getRandomNumber(window.data.minLikes, window.data.maxLikes),
        name: user[getRandomNumber(0, user.length - 1)],
        message: comment[getRandomNumber(0, comment.length - 1)]
      };
    }
    return arrayForObject;
  };

  getPhotos(window.data.names, window.data.comments, window.data.photos);

})();
