# Loc8r

## Versions of favicon

_v1=_ ![v1](./info/favicon-v1.ico) __->__
_v2=_ ![v2](./info/favicon-v2.png) __->__
_v3=_ ![v3](./info/favicon-v3.ico)

## Архитектура приложения

![Потрачено...](./info/app-arch.png)

## Нерешённые проблемы

1. **Проблема с сигналами.** Из-за недоработанной обработки сигналов сервер закрывается не польностью и продолжает занимать отведённый порт и дальше.
2. **geoNear().** Книге 2015 год. Многие вещи устарели, особенно эта функция. Одно из её решений у меня сработало на половину. Требуется дальнейшее разбирательство.

## Layout

![Шо, ничего не видишь? Хах!](./info/layouts.png)

## Routes

![Шо, ничего не видишь? Хах!](./info/routes-table.png)
![Шо, ничего не видишь? Хах!](./info/routes-scheme.png)

## API REST

### ALL URL

![Шо, ничего не видишь? Хах!](./info/all-url.png)

### GET

![Шо, ничего не видишь? Хах!](./info/query-get.png)

### POST

![Шо, ничего не видишь? Хах!](./info/query-post.png)

### PUT

![Шо, ничего не видишь? Хах!](./info/query-put.png)

### DELETE

![Пропало! Всё, пропало!!!](./info/query-delete.png)

## Learnway 7

1. Установка модуля **request**:

    ```shell
        npm install --save request
    ```

2. В файле __app_server/controllers__:

    ```javascript
        var request = require('request');
    ```
