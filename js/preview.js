'use strict';
(function () {

  window.preview = {

    VALUE: {
      MAX: 100,
      LEFT_PIN_MAX: 450,
      LEFT_PIN_MIN: 0,
      GAP_SCALE: 25,
      SCALE_MAX: 3
    },

    imgUploadPreview: document.querySelector('.img-upload__preview'),

    onEscKeydown: function (evt) {
      window.util.isEscEvent(evt, closeOverlay);
    }

  };

  var scaleControl = document.querySelector('.img-upload__scale');
  var scaleControlValue = document.querySelector('.scale__control--value');
  scaleControlValue.setAttribute('value', window.preview.VALUE.MAX);
  var scaleValue = scaleControlValue.value;

  var uploadFile = document.querySelector('#upload-file');
  var imgOverlay = document.querySelector('.img-upload__overlay');

  var buttonCancel = document.querySelector('#upload-cancel');

  // открывает обработчик фотографий
  var openOverlay = function () {
    imgOverlay.classList.remove('hidden');
    // отлавливает событие клавиши esc
    document.addEventListener('keydown', window.preview.onEscKeydown);
  };

  // закрывает обработчик фотографий
  var closeOverlay = function () {
    imgOverlay.classList.add('hidden');
    uploadFile.value = null;
    document.removeEventListener('keydown', window.preview.onEscKeydown);
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
    window.util.isEnterEvent(evt, closeOverlay);
  });


  // изменение размера изображения по кнопкам '+' и '-'

  scaleControl.addEventListener('click', function (evt) {
    var target = evt.target;
    var typeButton = target.type === 'button';
    if (typeButton && target.classList.contains('scale__control--bigger')) {
      var increaseScale = scaleValue + window.preview.VALUE.GAP_SCALE;
      scaleValue = increaseScale > window.preview.VALUE.MAX ? window.preview.VALUE.MAX : increaseScale;
    } else if (typeButton && target.classList.contains('scale__control--smaller')) {
      var reductionScale = scaleValue - window.preview.VALUE.GAP_SCALE;
      scaleValue = reductionScale < window.preview.VALUE.GAP_SCALE ? window.preview.VALUE.GAP_SCALE : reductionScale;
    }
    getScaleValue(scaleValue);
  });

  var getScaleValue = function (val) {
    scaleControlValue.setAttribute('value', val + '%'); //
    window.preview.imgUploadPreview.style.transform = 'scale(' + val / window.preview.VALUE.MAX + ')';
  };
})();
