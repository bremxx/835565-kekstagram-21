"use strict";

const TIMEOUT_IN_MS = 10000;
const URL_PATH = `https://21.javascript.pages.academy/kekstagram`;
const StatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_AUTH: 401,
  NOT_FOUND: 404,
};

const getResponse = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.timeout = TIMEOUT_IN_MS;
  xhr.open(`GET`, `${URL_PATH}/data`, true);
  xhr.addEventListener(`load`, () => {
    switch (xhr.status) {
      case StatusCode.OK:
        onSuccess(xhr.response);
        break;
      case StatusCode.BAD_REQUEST:
        onError(`Неверный запрос`);
        break;
      case StatusCode.NOT_AUTH:
        onError(`Пользователь не авторизован`);
        break;
      case StatusCode.NOT_FOUND:
        onError(`Ошибка загрузки данных`);
        break;
      default:
        onError(`Cтатус ответа:${xhr.status + xhr.statusText}`);
    }
  });
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout / 1000} сек.`);
  });
  xhr.send();
};

const sendData = (data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess();
    } else {
      onError();
    }
  });

  xhr.open(`POST`, URL_PATH, true);
  xhr.send(data);
};

window.load = {
  get: getResponse,
  post: sendData,
};
