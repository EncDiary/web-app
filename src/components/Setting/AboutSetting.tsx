import React from "react";
import SettingsTitle from "../Generic/SettingsTitle";

const AboutSetting: React.FC = () => {
  return (
    <>
      <SettingsTitle text="О проекте" level={1} />
      <p>
        Web Diary - приложение с открытым исходным кодом. Создано idefant.
        Исходный код на Github
      </p>
      <p>Приложение состоит из 2 частей:</p>
      <ul>
        <li>фронтенда на ReactJS</li>
        <li>бэкенда на PHP</li>
      </ul>
      <p>
        Сервис не требует регистрации или авторизации через соц.сети. Для
        создания книги требуется лишь придумать название и пароль. Все записи
        шифруются с помощью AES256 и в чистом виде хранятся лишь в памяти
        устройства пользователя, пароли на сервер не передаюся. Для проверки
        владения паролем используется JWT (подпись json&#39;а передаваемых с
        устройства данных приватным ключом и проверка их на сервере публичным
        ключом)
      </p>
      <p>Названия книг и даты создания записей не шифруются.</p>
      <p>
        Пока что сервис заточен под хранение книг в базе данных, доступ и
        управление которой осуществяется посредством серверной части. Но также
        возможна реализация локального хранения базы записей, либо использование
        облачного хранилища пользователя
      </p>
      <p>
        На создание проекта натолкнуло браузерное приложение для хранения
        паролей - KeeWeb
      </p>
      <p>Создание проекта стало возможным благодаря пакетам и библиотекам:</p>
    </>
  );
};

export default AboutSetting;
