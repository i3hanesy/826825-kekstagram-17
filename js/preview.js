'use strict';
(function () {

  var VALUE = {
    MAX: 100,
    LEFT_PIN_MAX: 450,
    LEFT_PIN_MIN: 0,
    GAP_SCALE: 25,
    SCALE_MAX: 3
  };

  var imgUploadPreview = document.querySelector('.img-upload__preview');

  var onEscKeydown = function (evt) {
    window.util.isEscEvent(evt, closeOverlay);
  };

  var uploadForm = document.querySelector('.img-upload__form');
  var scaleControl = document.querySelector('.img-upload__scale');
  var scaleControlValue = document.querySelector('.scale__control--value');
  scaleControlValue.setAttribute('value', VALUE.MAX);
  var scaleValue = scaleControlValue.value;

  var uploadFile = document.querySelector('#upload-file');
  var imgOverlay = document.querySelector('.img-upload__overlay');

  var buttonCancel = document.querySelector('#upload-cancel');

  var resetUpload = function () {
    uploadForm.reset();
    imgOverlay.classList.add('hidden');
    uploadFile.value = null;
    imgUploadPreview.className = '';
    imgUploadPreview.classList.add('img-upload__preview');
    imgUploadPreview.style = '';
    window.form.effectLevel.classList.add('hidden');

    window.form.textDescription.value = null;
    window.hashtag.hashTagsFeld.value = null;
    window.form.effectLevelValue.setAttribute('value', window.preview.VALUE.MAX);
  };

  // открывает обработчик фотографий
  var openOverlay = function () {
    imgOverlay.classList.remove('hidden');
    // отлавливает событие клавиши esc
    document.addEventListener('keydown', onEscKeydown);
  };

  // закрывает обработчик фотографий
  var closeOverlay = function () {
    resetUpload();
    document.removeEventListener('keydown', onEscKeydown);
  };

  // отлавливает событие окончания изменения поля ввода
  uploadFile.addEventListener('change', function () {
    openOverlay();

    // устанавливает значение 100%
    getScaleValue(VALUE.MAX);

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

  window.preview = {

    VALUE: VALUE,
    imgUploadPreview: imgUploadPreview,
    onEscKeydown: onEscKeydown,
    closeOverlay: closeOverlay,
    uploadForm: uploadForm

  };

})();
