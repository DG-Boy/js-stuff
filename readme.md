# Loc8r

## Versions of favicon

 v1  |  v2  |  v3
:--: | :--: | :--:
![v1](./info/favicon-v1.ico)|![v2](./info/favicon-v2.png)|![v3](./info/favicon-v3.ico)|

## Архитектура приложения

![Потрачено...](./info/app-arch.png)

## Нерешённые проблемы

1. **Проблема с сигналами.** Из-за недоработанной обработки сигналов сервер закрывается не польностью и продолжает занимать отведённый порт и дальше.

## Layout

![Шо, ничего не видишь? Хах!](./info/layouts.png)

## Routes

![Потрачено...](./info/routes-table.png)
![Потрачено...](./info/routes-scheme.png)

## API REST

### ALL URL

![Потрачено...](./info/all-url.png)

### GET

![Потрачено...](./info/query-get.png)

### POST

![Потрачено...](./info/query-post.png)

### PUT

![Потрачено...](./info/query-put.png)

### DELETE

![Пропало! Всё, пропало!!!](./info/query-delete.png)

## Learnway #7

1. Установка модуля **request**:

    ```shell
        npm install --save request
    ```

2. Подключение модуля в файле **app_server/controllers**:

    ```js
        var request = require('request');
    ```
