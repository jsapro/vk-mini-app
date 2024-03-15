# [<img width="134" src="https://vk.com/images/apps/mini_apps/vk_mini_apps_logo.svg">](https://vk.com/services)

# ※ Мини-приложение, в котором можно создавать роботов, находить факты о 🐈🐈🐈 и узнавать возраст по имени))

### &nbsp;

Запуск проекта

1. Склонируйте репозиторий:

```shell
git clone git@github.com:jsapro/vk-mini-app.git
```

1. Установите зависимости:

```shell
npm ci
```

1. Запустите локально (по адресу http://localhost:5173/):

```shell
npm start
```


1. Для того, чтобы поделиться приложением запущенным на localhost со своими друзьями, используйте утилиту VK Tunnel:

```shell
npm run tunnel
```

1. Для того чтобы захостить приложение на сервера ВКонтакте нужно зайти в vk-hosting-config.json и указать id вашего приложения. Далее можно запустить уже подготовленный скрипт:

```shell
npm run build && npm run deploy
```

## &nbsp;

### 🗂️ Используемые библиотеки

| Пакет | Назначение |
| ------ | ------ |
| [vk-bridge](https://dev.vk.com/ru/mini-apps/bridge) | Библиотека для отправки команд и обмена данными с платформой ВКонтакте. |
| [VKUI](https://vkcom.github.io/VKUI/) | Библиотека React-компонентов для создания мини-приложений в стиле ВКонтакте. |
| [vk-bridge-react](https://www.npmjs.com/package/@vkontakte/vk-bridge-react) | Пакет, который даёт возможность использовать события библиотеки VK Bridge в React-приложениях. |
| [vk-mini-apps-router](https://dev.vk.com/ru/libraries/router) | Библиотека для маршрутизации и навигации в мини-приложениях, созданных с помощью VKUI. |
| [icons](https://vkcom.github.io/icons/) | Набор иконок для использования в компонентах VKUI. |
| [vk-miniapps-deploy](https://dev.vk.com/ru/mini-apps/development/hosting) | Пакет для размещения файлов мини-приложения на хостинге ВКонтакте. |
| [vk-tunnel](https://dev.vk.com/ru/libraries/tunnel) | Утилита, которая позволяет отобразить в интернете веб-сервер, работающий на локальном компьютере. |
| [eruda](https://www.npmjs.com/package/eruda) | Консоль для мобильного браузера|


