"use strict";

const VISIBLE_COMMENTS_NUM = 5;
const bigPicture = document.querySelector(`.big-picture`);
const bigPictureImg = bigPicture.querySelector(`.big-picture__img img`);
const bigPictureLikesCount = bigPicture.querySelector(`.likes-count`);
const bigPictureCommentsCount = bigPicture.querySelector(`.comments-count`);
const bigPictureComments = bigPicture.querySelector(`.social__comments`);
const bigPictureComment = bigPictureComments.querySelector(`.social__comment`);
const bigPictureDescription = bigPicture.querySelector(`.social__caption`);
const bigPictureCloseBtn = bigPicture.querySelector(`.big-picture__cancel`);
const bigPictureCommentsLoadBtn = bigPicture.querySelector(`.comments-loader`);

const getBigPicComment = (comment) => {
  const newBigPicComment = bigPictureComment.cloneNode(true);
  newBigPicComment.querySelector(`.social__picture`).src = comment.avatar;
  newBigPicComment.querySelector(`.social__picture`).alt = comment.name;
  newBigPicComment.querySelector(`.social__text`).textContent = comment.message;
  return newBigPicComment;
};

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; i++) {
    fragment.appendChild(getBigPicComment(comments[i]));
  }
  return bigPictureComments.appendChild(fragment);
};

const setRenderCommentLogic = (comments) => {
  bigPictureComments.innerHTML = ``;
  const totalCommentsNumber = comments.length;
  let renderedCommentsNumber = totalCommentsNumber >= VISIBLE_COMMENTS_NUM ? VISIBLE_COMMENTS_NUM : totalCommentsNumber;

  const commentsLoadHandler = () => {
    const nonRenderedCommentsNumber = totalCommentsNumber - renderedCommentsNumber;
    const nextRenderedCommentsNumber = renderedCommentsNumber +
      (nonRenderedCommentsNumber >= VISIBLE_COMMENTS_NUM ? VISIBLE_COMMENTS_NUM : nonRenderedCommentsNumber);
    renderComments(comments.slice(renderedCommentsNumber, nextRenderedCommentsNumber));
    renderedCommentsNumber = nextRenderedCommentsNumber;
    toggleCommentsBtnVisibility();
  };

  const toggleCommentsBtnVisibility = () => {
    if (totalCommentsNumber <= renderedCommentsNumber) {
      window.util.element.hide(bigPictureCommentsLoadBtn);
      bigPictureCommentsLoadBtn.removeEventListener(`click`, commentsLoadHandler);
    } else {
      window.util.element.show(bigPictureCommentsLoadBtn);
      bigPictureCommentsLoadBtn.addEventListener(`click`, commentsLoadHandler);
    }
  };
  renderComments(comments.slice(0, renderedCommentsNumber));
  toggleCommentsBtnVisibility();
};

const bigPictureCloseBtnPressHandler = () => {
  closeBigPicture();
};

const bigPictureEscPressHandler = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const bigPictureCloseHandler = (evt) => {
  if (!evt.target.closest(`.big-picture__preview`)) {
    closeBigPicture();
  }
};

const closeBigPicture = () => {
  window.util.modal.hide(bigPicture);
  document.removeEventListener(`keydown`, bigPictureEscPressHandler);
  bigPicture.removeEventListener(`click`, bigPictureCloseHandler);
  bigPictureCloseBtn.removeEventListener(`click`, bigPictureCloseBtnPressHandler);
};

window.showBigPicture = (currentImg) => {
  window.util.modal.show(bigPicture);
  bigPictureImg.src = currentImg.url;
  bigPictureLikesCount.textContent = currentImg.likes;
  bigPictureCommentsCount.textContent = currentImg.comments.length;
  bigPictureDescription.textContent = currentImg.description;
  bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);
  setRenderCommentLogic(currentImg.comments);
  document.addEventListener(`keydown`, bigPictureEscPressHandler);
  bigPicture.addEventListener(`click`, bigPictureCloseHandler);
  bigPictureCloseBtn.addEventListener(`click`, bigPictureCloseBtnPressHandler);
};
