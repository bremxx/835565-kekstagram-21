"use strict";

// const PHOTOS_NUM_MAX = 25;
// const LIKES_MIN = 15;
// const LIKES_MAX = 200;
// const AVATAR_NUM_MIN = 1;
// const AVATAR_NUM_MAX = 6;
const pictures = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`);
const pictureTemplateContent = pictureTemplate.content.querySelector(
    `.picture`
);
// const bigPicture = document.querySelector(`.big-picture`);
// const bigPictureImg = bigPicture.querySelector(`.big-picture__img img`);
// const bigPictureLikesCount = bigPicture.querySelector(`.likes-count`);
// const bigPictureCommentsCount = bigPicture.querySelector(`.comments-count`);
// const bigPictureComments = bigPicture.querySelector(`.social__comments`);
// const bigPictureComment = bigPictureComments.querySelector(`.social__comment`);
// const bigPictureDescription = bigPicture.querySelector(`.social__caption`);
// const bigPictureCloseBtn = bigPicture.querySelector(`.big-picture__cancel`);

// const messages = [
//   `Всё отлично!`,
//   `В целом всё неплохо. Но не всё.`,
//   `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
//   `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
//   `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
//   `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
// ];
// const names = [
//   `Иван`,
//   `Федор`,
//   `Василий`,
//   `Дмитрий`,
//   `Александр`,
//   `Сергей`,
//   `Петр`,
//   `Михаил`,
//   `Георгий`,
// ];
// const descriptions = [
//   `Лучший день рождения!`,
//   `Потрясающие выходные..`,
//   `С лучшим другом))`,
//   `Это был восхитительный день!`,
//   `Настроение супер`,
// ];

// Наполнение комментария
// function getComment() {
//   const comment = {};
//   comment.avatar = `img/avatar-${window.util.getRandomNumber(
//       AVATAR_NUM_MIN,
//       AVATAR_NUM_MAX
//   )}.svg`;
//   comment.message = messages[window.util.getRandomNumber(0, messages.length - 1)];
//   comment.name = names[window.util.getRandomNumber(0, names.length - 1)];
//   return comment;
// }

// Наполнение информации о фотографии
// function getPhotos() {
//   let photos = [];

//   for (let i = 0; i < PHOTOS_NUM_MAX; i++) {
//     const newPhoto = {};
//     newPhoto.url = `photos/${i + 1}.jpg`;
//     newPhoto.description =
//       descriptions[window.util.getRandomNumber(0, descriptions.length - 1)];
//     newPhoto.likes = window.util.getRandomNumber(LIKES_MIN, LIKES_MAX);
//     newPhoto.comments = [];
//     for (let j = 0; j < window.util.getRandomNumber(1, 5); j++) {
//       newPhoto.comments[j] = getComment();
//     }
//     photos[i] = newPhoto;
//   }
//   return window.util.shuffleArr(photos);
// }

// const photos = getPhotos();

// Функция наполнения темплейта фотографии
function getPhotoElement(photo, idNum) {
  const newPicture = pictureTemplateContent.cloneNode(true);
  const newPictureImg = newPicture.querySelector(`.picture__img`);

  newPictureImg.src = photo.url;
  newPictureImg.dataset.id = `${idNum}`;
  newPicture.querySelector(`.picture__likes`).textContent = photo.likes;
  newPicture.querySelector(`.picture__comments`).textContent = photo.comments.length;

  return newPicture;
}

// Наполнение блока фотографиями из массива
function insertPhotoElements(imgs) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < imgs.length; i++) {
    fragment.appendChild(getPhotoElement(imgs[i], i));
  }
  return pictures.appendChild(fragment);
}
insertPhotoElements(window.data.photos);


// ПОЛНОЭКРАННОЕ ФОТО
// // Функция наполнения комментария для полноэкранного фото
// function getBigPicComment(comment) {
//   const newBigPicComment = bigPictureComment.cloneNode(true);
//   newBigPicComment.querySelector(`.social__picture`).src = comment.avatar;
//   newBigPicComment.querySelector(`.social__picture`).alt = comment.name;
//   newBigPicComment.querySelector(`.social__text`).textContent = comment.message;
//   return newBigPicComment;
// }

// // Наполнение комментариев из массива для полноэкранного фото
// function insertBigPicComment(comments) {
//   removeBigPicComments();
//   const fragment = document.createDocumentFragment();
//   for (let i = 0; i < comments.length; i++) {
//     fragment.appendChild(window.bigPicture.getBigPicComment(comments[i]));
//   }
//   return bigPictureComments.appendChild(fragment);
// }

// // Функцуия очистки комментариев для bigPicture
// function removeBigPicComments() {
//   bigPictureComments.innerHTML = ``;
// }

// Функция отображения окна с полноэкранной фотографией
// function showBigPicture(currentImg) {
//   showModalWindow(bigPicture);
//   bigPictureImg.src = currentImg.url;
//   bigPictureLikesCount.textContent = currentImg.likes;
//   bigPictureCommentsCount.textContent = currentImg.comments.length;
//   bigPictureDescription.textContent = currentImg.description;
//   bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);
//   bigPicture.querySelector(`.comments-loader`).classList.add(`hidden`);
//   insertBigPicComment(currentImg.comments);
//   // Обработчик закрытия окна по по нажатию Esc
//   document.addEventListener(`keydown`, onBigPictureEscPress);
//   // Обработчик закрытия окна по клику вне окна
//   bigPicture.addEventListener(`click`, bigPictureCloseHandler);
//   // Обработчик закрытия окна по кнопке "X"
//   bigPictureCloseBtn.addEventListener(`click`, onBigPictureCloseBtnPress);
// }


// Обработчики открытия окна полноэкранной фотографии
pictures.addEventListener(`click`, bigPictureOpenHandler);
pictures.addEventListener(`keydown`, onPictureEnterPress);

function bigPictureOpenHandler(evt) {
  if (evt.target.closest(`img`) && photoEditor.classList.value.includes(`hidden`)) {
    const pictureToShow = window.data.photos[evt.target.dataset.id];
    window.bigPicture.show(pictureToShow);
  }
}

function onPictureEnterPress(evt) {
  if (evt.target.matches(`.picture`) && evt.key === `Enter`) {
    evt.preventDefault();
    const pictureToShow = window.data.photos[evt.target.querySelector(`img`).dataset.id];
    window.bigPicture.show(pictureToShow);
  }
}

// // Функция закрытия окна по кнопке Х
// function onBigPictureCloseBtnPress() {
//   closeBigPicture();
// }

// // Функция закрытия окна по нажатию Esc
// function onBigPictureEscPress(evt) {
//   if (evt.key === `Escape`) {
//     evt.preventDefault();
//     closeBigPicture();
//   }
// }

// // Функция закрытия окна по клику вне окна
// function bigPictureCloseHandler(evt) {
//   if (!evt.target.closest(`.big-picture__preview`)) {
//     closeBigPicture();
//   }
// }

// // Функция закрытия окна полноэкранной фотографии
// function closeBigPicture() {
//   window.util.hideModalWindow(bigPicture);
//   document.removeEventListener(`keydown`, onBigPictureEscPress);
//   bigPicture.removeEventListener(`click`, bigPictureCloseHandler);
//   bigPictureCloseBtn.removeEventListener(`click`, onBigPictureCloseBtnPress);
// }

// // Универсальная функция открытия модалки
// function showModalWindow(elem) {
//   elem.classList.remove(`hidden`);
//   document.body.classList.add(`modal-open`);
// }

// // Универсальная функция закрытия модалки
// function hideModalWindow(elem) {
//   elem.classList.add(`hidden`);
//   document.body.classList.remove(`modal-open`);
// }


// ЗАГРУЗКА ИЗОБРАЖЕНИЯ
const photoUploadForm = pictures.querySelector(`.img-upload__form`);
const photoUploader = pictures.querySelector(`.img-upload__input`);
const photoEditor = pictures.querySelector(`.img-upload__overlay`);
const previewImg = photoEditor.querySelector(`.img-upload__preview img`);
const photoEditorCloseBtn = photoEditor.querySelector(`.img-upload__cancel`);
photoUploadForm.action = `https://21.javascript.pages.academy/kekstagram`;

// ИЗМЕНЕНИЕ МАСШТАБА ИЗОБРАЖЕНИЯ
const scalePanel = photoEditor.querySelector(`.img-upload__scale`);
const scaleBtnSmaller = photoEditor.querySelector(`.scale__control--smaller`);
const scaleValueField = photoEditor.querySelector(`.scale__control--value`);
const INIT_SCALE_VALUE = 100;
const SCALE_CHANGE_STEP = 25;

// Функция открытия окна редактора изображения
function openEditor() {
  window.util.showModalWindow(photoEditor);
  if (getCurrentEffect() === null) {
    hideElement(effectLevelPanel);
  }
  scaleValueField.value = `${INIT_SCALE_VALUE}%`;
  // Обработчик изменения масштаба
  scalePanel.addEventListener(`click`, scaleChangeHandler);
  // Обработчик закрытия окна по кнопке "X"
  photoEditorCloseBtn.addEventListener(`click`, onPhotoEditorCloseBtnPress);

  // Обработчик закрытия окна по по нажатию Esc
  document.addEventListener(`keydown`, onPhotoEditorEscPress);

  // Обработчик переключения эффектов на изображении
  effectsPanel.addEventListener(`change`, effectChangeHandler);
  // Обработчик уровня эффекта
  effectLevelPin.addEventListener(`mouseup`, changeEffectLevel);
  // Обработчик ввода хэштегов
  hashtagInput.addEventListener(`input`, checkHashtagValidity);
}

// Обработчик загрузки нового изображения
photoUploader.addEventListener(`change`, function () {
  openEditor();
});

// Функция применения масштаба
function scaleChangeHandler(evt) {
  const currentScale = parseInt(scaleValueField.value, 10);
  let newScale;
  if (evt.target === scaleBtnSmaller) {
    newScale = decreaseScaleValue(currentScale);
  } else {
    newScale = increaseScaleValue(currentScale);
  }
  scaleValueField.value = `${newScale}%`;
  changeImgScale(newScale);
}

// Функция закрытия редактора изображения
function closePhotoEditor() {
  photoUploader.value = ``;
  window.util.hideModalWindow(photoEditor);
  removeEffect(getCurrentEffect());
  document.removeEventListener(`keydown`, onPhotoEditorEscPress);
  photoEditorCloseBtn.removeEventListener(`click`, onPhotoEditorCloseBtnPress);
  scalePanel.removeEventListener(`click`, scaleChangeHandler);
  effectsPanel.removeEventListener(`change`, effectChangeHandler);
  effectLevelPin.removeEventListener(`mouseup`, changeEffectLevel);
  hashtagInput.removeEventListener(`input`, checkHashtagValidity);
}

// Функция закрытия редактора по кнопке Х
function onPhotoEditorCloseBtnPress() {
  closePhotoEditor();
}

// Функция закрытия редактора по нажатию Esc
function onPhotoEditorEscPress(evt) {
  if (evt.key === `Escape` && !commentInput.focused) {
    evt.preventDefault();
    closePhotoEditor();
  }
}

// Функция изменения масштаба превью-изображения
function changeImgScale(value) {
  previewImg.style.transform = `scale(${value / 100})`;
}

function decreaseScaleValue(currScale) {
  return currScale > 25 ? currScale - SCALE_CHANGE_STEP : currScale;
}

function increaseScaleValue(currScale) {
  return currScale === 100 ? currScale : currScale + SCALE_CHANGE_STEP;
}


// ЭФФЕКТЫ ИЗОБРАЖЕНИЯ
const effectsPanel = photoEditor.querySelector(`.effects__list`);
const effectName = {
  chrome: `grayscale`,
  sepia: `sepia`,
  marvin: `invert`,
  phobos: `blur`,
  heat: `brightness`,
};

function effectChangeHandler(evt) {
  if (evt.target.matches(`input[type="radio"]`)) {
    const currentEffectName = evt.target.value;
    applyEffect(currentEffectName, initialEffectLevel);
  }
}

// Функция применения эффектов
function changeEffect(value) {
  const currentEffect = getCurrentEffect();
  if (currentEffect !== `effects__preview--${value}`) {
    if (value !== `none`) {
      showElement(effectLevelPanel);
      removeEffect(currentEffect);
      addEffect(value);
    } else {
      hideElement(effectLevelPanel);
      removeEffect(currentEffect);
    }
  }
}

// Функция добавления эффекта
function addEffect(effect) {
  previewImg.classList.add(`effects__preview--${effect}`);
}

// Функция удаления эффекта
function removeEffect(effectClass) {
  previewImg.classList.remove(effectClass);
  previewImg.style.filter = ``;
}

// Функция проверки наличия эффекта
function getCurrentEffect() {
  const classes = previewImg.classList;
  for (let i = 0; i < classes.length; i++) {
    if (classes[i].includes(`effects__preview--`)) {
      const currEffect = classes[i];
      return currEffect;
    }
  }
  return null;
}


// ИНТЕНСИВНОСТЬ ЭФФЕКТА
// начальная реализация по заданию
const effectLevelPanel = photoEditor.querySelector(`.img-upload__effect-level`);
const effectLevelBar = effectLevelPanel.querySelector(`.effect-level__line`);
const effectLevelPin = effectLevelPanel.querySelector(`.effect-level__pin`);
const effectLevelInput = effectLevelPanel.querySelector(`.effect-level__value`);
const initialEffectLevel = parseInt(effectLevelInput.value, 10);

function changeEffectLevel(evt) {
  const effectLevel = {
    MIN: 0,
    MAX: effectLevelBar.offsetWidth
  };
  const newEffectLevel = getEffectLevel(effectLevel.MAX, getPositionX(evt.target));
  effectLevelInput.value = newEffectLevel;

  const currentFilter = effectsPanel.querySelector(`input[type="radio"]:checked`);
  applyEffect(currentFilter.value, newEffectLevel);
}

function getPositionX(elem) {
  const positionX = elem.offsetLeft;
  return positionX;
}

function getEffectLevel(maxLevel, currLevel) {
  const effectLevel = Math.floor((currLevel * 100) / maxLevel);
  return effectLevel;
}

function applyEffect(effect, value) {
  changeEffect(effect);
  switch (effect) {
    case `phobos`:
      previewImg.style.filter = effectName[effect] + `(${(value * 3) / 100}px)`;
      break;
    case `heat`:
      previewImg.style.filter = effectName[effect] + `(${(value * 3) / 100})`;
      break;
    case `marvin`:
      previewImg.style.filter = effectName[effect] + `(${value}%)`;
      break;
    default:
      previewImg.style.filter = effectName[effect] + `(${value / 100})`;
  }
}

function hideElement(elem) {
  elem.classList.add(`hidden`);
}

function showElement(elem) {
  elem.classList.remove(`hidden`);
}


// ВАЛИДАЦИЯ ХЭШТЕГОВ
const hashtagInput = photoEditor.querySelector(`.text__hashtags`);
const regExp = /^#[a-zA-Zа-яА-Я\d]+$/;
const MIN_HATSHTAG_LENGTH = 1;
const MAX_HATSHTAG_LENGTH = 20;
const MAX_HASHTAG_NUM = 5;

// Обработчик отправки изображения
// ! Вынести работу обрабочика в функцию, далее удалять обработчик при закрытии окна редактирования
// photoUploadForm.addEventListener(`submit`, function (evt) {

// });

// Функция проверки валижности хэштега
function checkHashtagValidity(evt) {
  let hashtags = evt.target.value.split(/ +/);
  for (let i = 0; i < hashtags.length; i++) {
    if ((!regExp.test(hashtags[i])) && (hashtags[i].length !== 0)) {
      hashtagInput.setCustomValidity(`Неверный формат хэштэга ${hashtags[i]} !`);
    } else if ((hashtags[i].length > MAX_HATSHTAG_LENGTH)) {
      hashtagInput.setCustomValidity(`Хэштэг ${hashtags[i]} слишком длинный!`);
    } else if (hashtags.length > MAX_HASHTAG_NUM) {
      hashtagInput.setCustomValidity(`Слишком много хэштэгов!`);
    } else if (checkIdenticalHashtags(hashtags)) {
      hashtagInput.setCustomValidity(`Не используйте одинаковые хэштэги!`);
    } else if (checkEmptyHashtag(hashtags)) {
      hashtagInput.setCustomValidity(`Не используйте пустые хэштэги!`);
    } else {
      hashtagInput.setCustomValidity(``);
    }
    hashtagInput.reportValidity();
  }
}

// Функция проверки одиковых тэгов
function checkIdenticalHashtags(arr) {
  return arr.some((item) => arr.indexOf(item) !== arr.lastIndexOf(item));
}

// Функция проверки пустых тэгов
function checkEmptyHashtag(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length === MIN_HATSHTAG_LENGTH) {
      return true;
    }
  }
  return false;
}


// ВАЛИДАЦИЯ КОММЕНТАРИЯ
const commentInput = photoEditor.querySelector(`.text__description`);
commentInput.maxLength = 140;

// Флаги фокуса поля для обработчика закрытия окна по Esc
commentInput.onfocus = () => {
  commentInput.focused = true;
};

commentInput.onblur = () => {
  commentInput.focused = false;
};
