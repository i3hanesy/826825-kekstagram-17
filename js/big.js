'use strict';

(function () {

  var bigPictures = document.querySelector('.big-picture');
  var bigPictureImg = bigPictures.querySelector('img');
  var licesCout = bigPictures.querySelector('.likes-count');
  var commentsCount = bigPictures.querySelector('.comments-count');
  var socialCommentCount = bigPictures.querySelector('.social__comment-count');
  var socialCaption = bigPictures.querySelector('.social__caption');
  var commentsList = bigPictures.querySelector('.social__comments');
  var comment = bigPictures.querySelector('.social__comment');
  var commentsLoader = bigPictures.querySelector('.comments-loader');
  var bigPictureCancel = bigPictures.querySelector('.big-picture__cancel');

  var onEscKeydown = function (evt) {
    window.util.isEscEvent(evt, closeBigPicture);
  };

  var openBigPicture = function () {
    bigPictures.classList.remove('hidden');
    document.addEventListener('keydown', onEscKeydown);
  };

  var closeBigPicture = function () {
    bigPictures.classList.add('hidden');
    document.removeEventListener('keydown', onEscKeydown);
  };

  bigPictureCancel.addEventListener('click', closeBigPicture);

  var getBigPicture = function (arrayElement) {
    openBigPicture();
    bigPictureImg.setAttribute('src', arrayElement.url);
    licesCout.textContent = arrayElement.likes;
    commentsCount.textContent = arrayElement.comments.length;
    socialCaption.textContent = arrayElement.description;

    window.util.clearDomElements(commentsList, 'li');

    for (var i = 0; i < arrayElement.comments.length; i++) {
      var commentItem = comment.cloneNode(true);

      commentItem.querySelector('.social__picture').src = arrayElement.comments[i].avatar;
      commentItem.querySelector('.social__picture').alt = arrayElement.comments[i].name;
      commentItem.querySelector('.social__text').textContent = arrayElement.comments[i].message;
      commentsList.appendChild(commentItem);
    }
    socialCommentCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
  };

  window.big = {
    getBigPicture: getBigPicture
  };

})();
