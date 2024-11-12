# TODO Backend

Простой бэкенд для управления списком задач с возможностью регистрации и авторизации пользователей.

## Установка

1. Клонируйте репозиторий:

   ```sh
   git clone https://github.com/p-force/todo_back.git
   cd todo_back
   ```

2. Установите зависимости:

   ```sh
   npm install
   ```

3. Создайте базу данных и настройте подключение к ней в файле .env. Переменные окружения в <a href="">файле.</a>

4. Выполните миграции базы данных:

   ```sh
   npm run migrate
   ```

5. Запустите сервер:

   ```sh
   npm start
   ```

## Функционал

- Управление задачами:
  - Создание, удаление, редактирование и получение всех задач.
- Аутентификация и управление пользователями:
  - Регистрация и авторизация пользователей.
  - Активация аккаунта.
  - Восстановление пароля.

## Технологии

- Node.js
- Express
- База данных PostgreSQL (Sequelize Orm)
- JWT для аутентификации
- dotenv для управления переменными окружения
- Swagger

## API Документация

```
http://localhost:PORT/api-docs/
```