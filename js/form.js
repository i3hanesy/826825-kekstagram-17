'use strict';
(function () {
  // обработчик фильтров
  var filter = document.querySelector('.img-upload__effects');
  var filterButton = document.querySelector('.effects__radio');
  var effectLevel = document.querySelector('.img-upload__effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  var filters = {};

  var getStyleSlider = function (value) {
    var valueInPx = value + 'px';
    effectLevelPin.style.left = valueInPx;
    effectLevelDepth.style.width = valueInPx;
  };

  filter.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.type !== 'radio') {
      return;
    }

    getFilters(target);
    removeEffectLevel(target);
    effectLevelValue.setAttribute('value', window.preview.VALUE.MAX);
    window.preview.imgUploadPreview.style.filter = '';
    getStyleSlider(window.preview.VALUE.LEFT_PIN_MAX);
  });


  // выбирает класс фильтра
  var getFilters = function (node) {
    window.preview.imgUploadPreview.classList.remove('effects__preview--' + filterButton.value);
    filterButton = node;
    window.preview.imgUploadPreview.classList.add('effects__preview--' + filterButton.value);
    filters.filterName = filterButton.value;
  };


  // удаляет ползунок при отсутствии фильтра
  var removeEffectLevel = function (noEffect) {
    effectLevel.classList.toggle('hidden', noEffect.value === 'none');
  };

  var imgUploadText = document.querySelector('.img-upload__text');
  var textDescription = imgUploadText.querySelector('.text__description');


  textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.preview.onEscKeydown);
  });

  textDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', window.preview.onEscKeydown);
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
      valueLeftPin = valueLeftPin < window.preview.VALUE.LEFT_PIN_MAX ? valueLeftPin : window.preview.VALUE.LEFT_PIN_MAX;
      valueLeftPin = valueLeftPin > window.preview.VALUE.LEFT_PIN_MIN ? valueLeftPin : window.preview.VALUE.LEFT_PIN_MIN;

      var relationScaleToValue = Math.round(window.preview.VALUE.MAX / window.preview.VALUE.LEFT_PIN_MAX * valueLeftPin);

      getStyleSlider(valueLeftPin);
      effectLevelValue.setAttribute('value', relationScaleToValue);

      var valuePin = effectLevelValue.value;
      var val = valuePin / window.preview.VALUE.MAX;
      var valRound = Math.round(val * window.preview.VALUE.SCALE_MAX);
      var valRoundFromOne = valRound > 0 ? valRound : 1;
      var valueToStyle = {
        'chrome': 'grayscale(' + val + ')',
        'sepia': 'sepia(' + val + ')',
        'marvin': 'invert(' + valuePin + '%)',
        'phobos': 'blur(' + valRound + 'px)',
        'heat': 'brightness(' + valRoundFromOne + ')'
      };

      window.preview.imgUploadPreview.style.filter = valueToStyle[filters.filterName];

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.form = {
    textDescription: textDescription,
    removeEffectLevel: removeEffectLevel,
    effectLevelValue: effectLevelValue,
    effectLevel: effectLevel
  };

})();
