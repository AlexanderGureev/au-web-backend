## Тестовое задание на позицию Backend Developer.

Структура проекта представляет собой монорепозиторий.  
Стек технологий: NestJs, GraphQL, PostgreSQL + TypeOrm, Redis.  
Проект доступен по [ссылке](https://au-webapp-api.herokuapp.com/graphql)

### В соответствии с заданием, реализовано:

1. Регистрация, аутентификация и авторизация пользователя. Используется аутентификация по Cookies. Решено использовать именно cookie по причине более безопасного механизма поддержания сессии в базовой реализации.
2. [AuthMiddleware](https://github.com/AlexanderGureev/au-web-backend/blob/master/packages/common/src/middleware/auth.middleware.ts), которая производит восстановление сессии через [AuthService](https://github.com/AlexanderGureev/au-web-backend/blob/master/packages/auth/src/auth.service.ts) и сохраняет пользователя в объекте request. В качестве хранилища сессий используется Redis.
3. [AccessGuard](https://github.com/AlexanderGureev/au-web-backend/blob/master/packages/common/src/guards/AccessGuard.ts), который проверяет наличие юзера в обьекте request.
4. [ResourceGuard](https://github.com/AlexanderGureev/au-web-backend/blob/master/packages/common/src/guards/ResourceGuard.ts), проверяющий наличие определенной роли и разрешенных действий по отношению к ресурсу у пользователя.
5. Настроен контекст graphql и добавлены [декораторы](https://github.com/AlexanderGureev/au-web-backend/tree/master/packages/common/src/decorators) для извелечения cookies и обьекта user из request.
6. Дополнены и настроены все сущности и связи между ними.
7. Добавлена валидация для dto. Реализован [ValidationPipe](https://github.com/AlexanderGureev/au-web-backend/blob/master/packages/common/src/pipes/validation.pipe.ts).
8. Добавлена [миграция](https://github.com/AlexanderGureev/au-web-backend/blob/master/packages/db/src/migrations/Role/1566497630692-RolesInit.ts) для таблицы Role.
9. Добавлен [mail service](https://github.com/AlexanderGureev/au-web-backend/tree/master/packages/mail) для отправки почты. После регистрации пользователя, используя eventBus, создается событие "userRegisterEvent" и через mail service отправлется уведомление.
10. Добавлен [files service](https://github.com/AlexanderGureev/au-web-backend/tree/master/packages/files) для загрузки изображений на сервер.
11. Для модуля [users](https://github.com/AlexanderGureev/au-web-backend/tree/master/packages/api/src/users/resolvers) добавлены следующие query и mutation.

##### mutation:

- login
- register
- logout
- updateProfileById
- updateProfile

##### query:

- me
- user
- users

12. Реализован [dataloader service](https://github.com/AlexanderGureev/au-web-backend/blob/master/packages/dataloader/src/profileDataloader.service.ts) для пакетной обработки запросов к таблице profile.

## Development

```bash
yarn install
yarn build
yarn start:dev and yarn watch
```
