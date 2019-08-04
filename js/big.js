'use strict';

(function () {
  var COMMENTS_COUNT = 5;

  var bigPictures = document.querySelector('.big-picture');
  var bigPictureImg = bigPictures.querySelector('img');
  var likesCount = bigPictures.querySelector('.likes-count');
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

  var getComments = function (commentsArray, count) {

    window.util.clearDomElements(commentsList, 'li');

    for (var i = 0; i < commentsArray.length && i < count; i++) {
      var commentItem = comment.cloneNode(true);

      var socialPicture = commentItem.querySelector('.social__picture');
      var commentArray = commentsArray[i];
      var socialText = commentItem.querySelector('.social__text');

      socialPicture.src = commentArray.avatar;
      socialPicture.alt = commentArray.name;
      socialText.textContent = commentArray.message;
      commentsList.appendChild(commentItem);
    }

    if (count >= commentsArray.length) {
      commentsLoader.classList.add('visually-hidden');
    } else {
      commentsLoader.classList.remove('visually-hidden');
    }

  };

  var getBigPicture = function (arrayElement) {
    commentsLoader.classList.remove('visually-hidden');

    var commentsArray = arrayElement.comments.slice();

    openBigPicture();
    bigPictureImg.setAttribute('src', arrayElement.url);
    likesCount.textContent = arrayElement.likes;
    commentsCount.textContent = commentsArray.length;
    socialCaption.textContent = arrayElement.description;

    var countCommentToShow = COMMENTS_COUNT;

    getComments(commentsArray, countCommentToShow);

    commentsLoader.addEventListener('click', function () {
      countCommentToShow += COMMENTS_COUNT;
      getComments(commentsArray, countCommentToShow);
    });

    socialCommentCount.classList.add('visually-hidden');
  };

  window.big = {
    getBigPicture: getBigPicture
  };

})();

