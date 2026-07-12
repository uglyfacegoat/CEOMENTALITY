# Сводка проекта и подключение backend

## Назначение проекта

**CEOMENTALITY Access System** — административная система управления закрытым клубом и ограниченным доступом.

Система предназначена для работы с:

- кандидатами на вступление;
- заявками на покупку и членство в клубе;
- статусами отбора;
- волнами доступа;
- дропами;
- уникальными и общими кодами доступа;
- заметками менеджеров;
- историей действий;
- аналитикой воронки;
- внутренними пользователями и ролями.

На текущем этапе реализован полноценный frontend-MVP. Backend пока заменён локальным API-адаптером и `localStorage`.

---

## Технологический стек frontend

- React 19;
- TypeScript;
- Vite 6;
- CSS без UI-фреймворка;
- Vitest для unit-тестов;
- Playwright для e2e-тестов;
- History API для маршрутизации;
- локальный EN/RU runtime для перевода интерфейса.

### Требования

- Node.js 18+;
- npm.

### Запуск

```bash
npm install
npm run dev
```

Проект запускается по адресу:

```text
http://127.0.0.1:5173
```

### Проверки

```bash
npm run typecheck
npm test
npm run test:e2e
npm run build
npm run preview
```

---

## Основные frontend-разделы

### Candidate Dossiers

Раздел управления кандидатами:

- просмотр списка;
- поиск;
- фильтрация;
- сортировка;
- grid/list отображение;
- открытие полного досье;
- создание кандидата;
- изменение статуса;
- назначение кода;
- добавление, изменение и удаление заметок;
- архивирование;
- экспорт досье.

### Access Codes

Раздел управления доступом:

- создание дропов;
- создание батчей кодов;
- single-use и multi-use режимы;
- количество кодов;
- срок действия;
- просмотр батча;
- закрытие и повторное открытие батча;
- экспорт;
- статистика issued/redeemed/remaining.

### Analytics

Раздел аналитики:

- общая воронка;
- количество заявок;
- количество одобренных кандидатов;
- количество созданных кодов;
- количество активированных кодов;
- conversion rate;
- статистика по дропам;
- график динамики;
- фильтры по периоду.

### Profile

Раздел профиля внутреннего пользователя:

- данные менеджера;
- настройки;
- безопасность;
- права доступа;
- уведомления;
- выход из системы.

---

## Текущая архитектура

```text
src/
├── app/
│   ├── ErrorBoundary.tsx
│   └── routes.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── ui/
├── features/
│   ├── access/
│   ├── analytics/
│   ├── auth/
│   ├── candidates/
│   └── profile/
├── i18n-runtime/
├── services/
│   └── api.ts
├── styles/
├── types/
│   └── domain.ts
├── main.tsx
└── styles.css
```

### Основные точки интеграции

```text
src/services/api.ts
```

Единый frontend-адаптер данных. Сейчас он работает через `localStorage`. При подключении backend его необходимо заменить на HTTP-запросы.

```text
src/types/domain.ts
```

Содержит текущие TypeScript-модели, enum-подобные union-типы и контракты данных.

```text
src/main.tsx
```

Orchestration shell приложения:

- загружает workspace;
- хранит frontend-состояние;
- вызывает API-адаптер;
- обрабатывает создание и обновление сущностей;
- переключает страницы;
- управляет локальной сессией.

---

## Текущий поток данных

При запуске frontend выполняет:

```ts
api.load()
```

После любого изменения общего состояния вызывается:

```ts
api.save(state)
```

Сейчас данные сохраняются в:

```text
localStorage: ceomentality:mvp:v1
```

Текущий контракт адаптера:

```ts
api.load()
api.save(state)
api.search(query)
api.reset()
api.export(state)
```

Backend можно подключать поэтапно.

---

# Backend-интеграция

## Вариант 1: минимальная интеграция без переработки frontend

Это самый быстрый способ подключить сервер к существующему интерфейсу.

Backend реализует два основных endpoint:

```http
GET /api/workspace
PUT /api/workspace
```

### GET `/api/workspace`

Возвращает полный workspace:

```json
{
  "candidates": [],
  "drops": [],
  "activity": []
}
```

### PUT `/api/workspace`

Принимает полный workspace:

```json
{
  "candidates": [],
  "drops": [],
  "activity": []
}
```

Возвращает сохранённую версию:

```json
{
  "candidates": [],
  "drops": [],
  "activity": []
}
```

Такой вариант совместим с текущим `main.tsx`, но при каждом изменении будет отправляться всё состояние целиком.

Это допустимо для первого серверного MVP, но не рекомендуется как финальная production-архитектура.

---

## Пример минимального HTTP-адаптера

Создать переменную окружения:

```env
VITE_API_URL=http://localhost:8000
```

Пример замены `src/services/api.ts`:

```ts
import type { WorkspaceState } from '../types/domain';

const API_URL = import.meta.env.VITE_API_URL ?? '';

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(
      error?.message ?? `Request failed with status ${response.status}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  load: (): Promise<WorkspaceState> =>
    request<WorkspaceState>('/api/workspace'),

  save: (state: WorkspaceState): Promise<WorkspaceState> =>
    request<WorkspaceState>('/api/workspace', {
      method: 'PUT',
      body: JSON.stringify(state),
    }),

  search: (query: string) =>
    request<{
      candidates: WorkspaceState['candidates'];
      drops: WorkspaceState['drops'];
    }>(`/api/search?q=${encodeURIComponent(query)}`),

  reset: (): Promise<WorkspaceState> =>
    request<WorkspaceState>('/api/workspace/reset', {
      method: 'POST',
    }),

  export: (state: WorkspaceState) =>
    new Blob([JSON.stringify(state, null, 2)], {
      type: 'application/json',
    }),
};
```

---

# Рекомендуемая production-архитектура API

После первичного подключения желательно отказаться от сохранения всего `WorkspaceState` одним запросом и перейти к отдельным endpoint для каждой сущности.

## Авторизация

```http
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/refresh
POST /api/auth/logout
```

### Login request

```json
{
  "email": "manager@ceomentality.club",
  "password": "password"
}
```

### Login response

```json
{
  "user": {
    "id": "usr_123",
    "name": "Club Manager",
    "email": "manager@ceomentality.club",
    "role": "manager"
  }
}
```

Предпочтительный вариант авторизации:

- `HttpOnly`;
- `Secure`;
- `SameSite=Lax` или `SameSite=Strict`;
- серверная cookie-сессия.

Допустимый альтернативный вариант:

- короткоживущий access token;
- refresh token в `HttpOnly` cookie.

Токены, пароли и реальные права доступа нельзя хранить в `localStorage`.

---

## Пользователи и роли

```http
GET   /api/users
GET   /api/users/:id
POST  /api/users
PATCH /api/users/:id
```

Минимальные роли:

```text
founder
manager
viewer
```

Рекомендуемые права:

| Действие | Founder | Manager | Viewer |
|---|---:|---:|---:|
| Просмотр кандидатов | Да | Да | Да |
| Изменение кандидатов | Да | Да | Нет |
| Создание кодов | Да | Да | Нет |
| Управление пользователями | Да | Нет | Нет |
| Просмотр аналитики | Да | Да | Да |
| Экспорт данных | Да | Да | По настройке |

Все права должны проверяться на сервере, независимо от состояния интерфейса.

---

## Кандидаты

```http
GET    /api/candidates
GET    /api/candidates/:id
POST   /api/candidates
PATCH  /api/candidates/:id
DELETE /api/candidates/:id
```

### Фильтрация

Пример:

```http
GET /api/candidates?status=Approved&wave=Wave%2002&source=Partner&expertise=Investor&search=maria&page=1&limit=20
```

Рекомендуемый ответ со страницами:

```json
{
  "items": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 0,
    "pages": 0
  }
}
```

### Текущая совместимая модель кандидата

```ts
interface Candidate {
  id: string;
  name: string;
  initials: string;
  role: string;
  company: string;
  status: CandidateStatus;
  wave: string;
  code: string | null;
  notes: string[];
  summary: string;
  expertise: string;
  country: string;
  telegram: string;
  source: CandidateSource;
  stage: CandidateStage;
  appliedAt: string;
}
```

### Допустимые статусы кандидата

Backend должен возвращать значения в точном написании:

```text
Under review
Approved
Rejected
Code assigned
Code used
Accepted
Waitlisted
Archived
```

### Этап заявки

```text
purchase
club
```

### Источник кандидата

```text
Website
Telegram bot
Partner
Referral
Manual
Import
API
```

### Пример создания кандидата

```http
POST /api/candidates
```

```json
{
  "name": "Alexei Petrov",
  "telegram": "@alexei",
  "country": "Switzerland",
  "role": "Founder / CEO",
  "company": "Northtrail",
  "expertise": "Founder / CEO",
  "wave": "Wave 02",
  "stage": "purchase",
  "summary": "Serial founder with two exits.",
  "source": "Website"
}
```

### Пример обновления статуса

```http
PATCH /api/candidates/alexei-petrov
```

```json
{
  "status": "Approved"
}
```

Архивирование желательно реализовать как изменение статуса:

```json
{
  "status": "Archived"
}
```

Физическое удаление записей использовать только при наличии отдельного подтверждённого сценария.

---

## Заметки кандидата

Для production лучше вынести заметки из массива строк в отдельную таблицу.

```http
GET    /api/candidates/:candidateId/notes
POST   /api/candidates/:candidateId/notes
PATCH  /api/candidates/:candidateId/notes/:noteId
DELETE /api/candidates/:candidateId/notes/:noteId
```

Рекомендуемая модель:

```json
{
  "id": "note_123",
  "candidateId": "alexei-petrov",
  "author": {
    "id": "usr_123",
    "name": "Club Manager"
  },
  "text": "Strong product sense.",
  "visibility": "private",
  "createdAt": "2026-07-12T12:00:00.000Z",
  "updatedAt": "2026-07-12T12:00:00.000Z"
}
```

На первом этапе frontend ожидает:

```ts
notes: string[]
```

Поэтому есть два варианта:

1. backend временно возвращает массив строк;
2. frontend переводится на объектную модель заметок.

Второй вариант предпочтительнее.

---

## Дропы и батчи кодов

```http
GET   /api/drops
GET   /api/drops/:id
POST  /api/drops
PATCH /api/drops/:id
```

### Текущая совместимая модель

```ts
interface AccessBatch {
  id: string;
  name: string;
  description: string;
  issued: number;
  redeemed: number;
  status: DropStatus;
  validity: string;
  code: string;
  codeType?: CodeType;
  source?: CandidateSource;
}
```

### Допустимые статусы дропа

```text
Draft
Scheduled
Active
Paused
Closed
Expired
Cancelled
```

### Типы кодов

```text
Single-use
Multi-use
```

### Создание дропа

```http
POST /api/drops
```

```json
{
  "name": "Wave 05",
  "description": "Private summer access",
  "issued": 500,
  "validity": "2026-07-15/2026-08-15",
  "code": "CM-SUMMER-05"
}
```

Для production даты желательно хранить раздельно:

```json
{
  "validFrom": "2026-07-15T00:00:00.000Z",
  "validUntil": "2026-08-15T23:59:59.000Z"
}
```

Текущее строковое поле `validity` можно формировать на frontend.

---

## Генерация кодов

Генерация кодов обязательно должна выполняться на сервере.

```http
POST /api/code-batches
```

```json
{
  "dropId": "wave-05",
  "codeType": "Single-use",
  "quantity": 500,
  "validFrom": "2026-07-15T00:00:00.000Z",
  "validUntil": "2026-08-15T23:59:59.000Z",
  "prefix": "CM-W5"
}
```

Пример ответа:

```json
{
  "batch": {
    "id": "batch_123",
    "dropId": "wave-05",
    "codeType": "Single-use",
    "issued": 500,
    "redeemed": 0,
    "status": "Active"
  }
}
```

Необходимо обеспечить:

- криптографически безопасную генерацию;
- уникальный индекс в базе;
- невозможность повторной активации single-use кода;
- транзакционное погашение;
- хранение даты создания;
- хранение пользователя, создавшего батч;
- audit log;
- rate limiting;
- защиту от перебора кодов.

Клиентская генерация через `Math.random()` является только MVP-заглушкой и не должна использоваться как источник истины.

---

## Назначение кода кандидату

```http
POST /api/candidates/:candidateId/access-code
```

```json
{
  "batchId": "batch_123"
}
```

Ответ:

```json
{
  "id": "code_123",
  "value": "CM-W5-A8K2-PQ91",
  "candidateId": "alexei-petrov",
  "status": "Active",
  "validFrom": "2026-07-15T00:00:00.000Z",
  "validUntil": "2026-08-15T23:59:59.000Z",
  "redeemedAt": null
}
```

---

## Погашение кода

```http
POST /api/access-codes/redeem
```

```json
{
  "code": "CM-W5-A8K2-PQ91"
}
```

Успешный ответ:

```json
{
  "success": true,
  "code": {
    "status": "Redeemed",
    "redeemedAt": "2026-07-20T14:30:00.000Z"
  }
}
```

Повторное использование single-use кода должно возвращать конфликт:

```http
409 Conflict
```

---

## Activity и audit log

```http
GET /api/activity
GET /api/candidates/:id/activity
GET /api/drops/:id/activity
```

Рекомендуемая модель события:

```json
{
  "id": "evt_123",
  "type": "candidate.status_changed",
  "entityType": "candidate",
  "entityId": "alexei-petrov",
  "actor": {
    "id": "usr_123",
    "name": "Club Manager"
  },
  "data": {
    "previousStatus": "Under review",
    "nextStatus": "Approved"
  },
  "createdAt": "2026-07-12T12:00:00.000Z"
}
```

В audit log желательно фиксировать:

- вход и выход;
- создание кандидата;
- изменение статуса;
- редактирование профиля;
- создание дропа;
- генерацию кодов;
- назначение кода;
- погашение кода;
- экспорт;
- изменение ролей;
- удаление или архивирование.

Audit log не должен редактироваться обычным пользователем.

---

## Поиск

```http
GET /api/search?q=alexei
```

Пример ответа:

```json
{
  "candidates": [],
  "drops": [],
  "codes": []
}
```

Текущий API-адаптер уже содержит метод `search`, но интерфейс глобального поиска пока частично фильтрует локальный список. Для полноценного серверного поиска Header необходимо переключить на `api.search()`.

---

## Аналитика

```http
GET /api/analytics/summary
GET /api/analytics/funnel
GET /api/analytics/timeseries
GET /api/analytics/drops
```

Пример:

```http
GET /api/analytics/timeseries?from=2026-07-01&to=2026-07-31&granularity=daily
```

Ответ:

```json
{
  "items": [
    {
      "date": "2026-07-01",
      "applications": 12,
      "approved": 5,
      "codesGenerated": 4,
      "codesActivated": 3,
      "conversionRate": 25
    }
  ]
}
```

Сейчас часть аналитики рассчитывается frontend из массива кандидатов и дропов, а временные ряды и некоторые показатели являются демонстрационными данными.

Backend должен стать единственным источником:

- количества заявок;
- количества одобрений;
- количества созданных кодов;
- количества активаций;
- conversion rate;
- данных по волнам;
- динамики по времени;
- сравнений периодов.

---

## Уведомления и Telegram

Рекомендуемые endpoint:

```http
GET   /api/notifications
PATCH /api/notifications/:id/read
POST  /api/notifications/read-all
POST  /api/candidates/:id/reminders
```

Для Telegram-интеграции backend должен:

- принимать заявки от Telegram-бота;
- сохранять Telegram ID отдельно от username;
- отправлять уведомления;
- отправлять коды;
- фиксировать время отправки;
- обрабатывать ошибки доставки;
- предотвращать повторную отправку;
- записывать события в activity log.

Telegram bot token должен находиться только на backend в переменных окружения.

---

## Экспорт

```http
GET /api/exports/workspace
GET /api/exports/candidates
GET /api/exports/drops
GET /api/exports/activity
```

Для небольших объёмов сервер может возвращать файл сразу.

Для больших объёмов:

```http
POST /api/export-jobs
GET  /api/export-jobs/:id
```

---

# Формат ответов API

## Успех

```json
{
  "data": {}
}
```

Для списков:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

## Ошибка

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Candidate status is invalid",
    "fields": {
      "status": "Unsupported value"
    }
  }
}
```

Рекомендуемые HTTP-коды:

| Код | Назначение |
|---:|---|
| 200 | Успешный запрос |
| 201 | Сущность создана |
| 204 | Успешный запрос без тела |
| 400 | Некорректный запрос |
| 401 | Пользователь не авторизован |
| 403 | Недостаточно прав |
| 404 | Сущность не найдена |
| 409 | Конфликт или повторное использование кода |
| 422 | Ошибка валидации |
| 429 | Превышен rate limit |
| 500 | Внутренняя ошибка сервера |

---

# Правила совместимости frontend и backend

## Строковые значения

До появления отдельного mapping-слоя backend должен возвращать статусы в точном написании, указанном в `src/types/domain.ts`.

Например:

```text
Approved
```

а не:

```text
approved
APPROVED
Одобрена
```

Иначе текущие фильтры и отображение статусов могут перестать работать.

## Даты

Backend должен хранить и передавать даты в ISO 8601:

```text
2026-07-12T12:00:00.000Z
```

Форматирование выполняется frontend.

## Идентификаторы

ID должны быть стабильными и уникальными.

Допустимые варианты:

- UUID;
- ULID;
- серверный string ID.

Frontend не должен генерировать production-ID через `Date.now()`.

## Денормализация

Первый backend-MVP может возвращать данные в форме текущего `WorkspaceState`.

В production рекомендуется разделить:

- candidates;
- notes;
- users;
- drops;
- batches;
- access codes;
- redemptions;
- activity events.

---

# Что сейчас является frontend-заглушкой

Следующие данные пока не являются серверными:

- авторизация;
- пользовательские роли;
- часть профиля;
- генерация кодов;
- сохранение кандидатов;
- сохранение дропов;
- заметки;
- история статусов;
- activity;
- уведомления;
- временные ряды аналитики;
- часть метрик досье;
- fit score;
- сведения о компании;
- даты изменения;
- информация о погашении кодов;
- экспорт.

При подключении backend эти места необходимо заменять постепенно, сохраняя текущую структуру компонентов и TypeScript-контракты.

---

# Рекомендуемый порядок подключения

## Этап 1. Базовый сервер

1. Поднять backend и базу данных.
2. Настроить `.env`.
3. Реализовать `GET /api/workspace`.
4. Реализовать `PUT /api/workspace`.
5. Заменить localStorage-адаптер.
6. Добавить loading и error handling.
7. Проверить существующие frontend-сценарии.

## Этап 2. Авторизация

1. Реализовать пользователей.
2. Реализовать роли.
3. Реализовать login/logout/me.
4. Удалить frontend-сессию из localStorage.
5. Добавить защиту endpoint.
6. Добавить защиту frontend-маршрутов.

## Этап 3. Нормальный CRUD

1. Разделить workspace на сущности.
2. Реализовать CRUD кандидатов.
3. Реализовать заметки.
4. Реализовать дропы.
5. Реализовать батчи.
6. Перевести `main.tsx` с полного `save(state)` на точечные mutation-запросы.

## Этап 4. Коды

1. Перенести генерацию кодов на сервер.
2. Добавить уникальность.
3. Добавить назначение кандидату.
4. Добавить погашение.
5. Добавить срок действия.
6. Добавить rate limiting и audit log.

## Этап 5. Аналитика и интеграции

1. Подключить серверную аналитику.
2. Подключить Telegram.
3. Подключить уведомления.
4. Подключить экспорт.
5. Добавить фоновые задачи.
6. Добавить мониторинг и логирование.

---

# Переменные окружения frontend

Пример `.env.example`:

```env
VITE_API_URL=http://localhost:8000
```

Не добавлять реальные секреты в frontend `.env`.

Все переменные Vite с префиксом `VITE_` доступны клиентскому JavaScript и не являются секретными.

В frontend допустимо хранить:

- публичный URL API;
- название окружения;
- публичные feature flags.

В frontend запрещено хранить:

- JWT secret;
- database URL;
- Telegram bot token;
- private API keys;
- пароли;
- signing keys.

---

# CORS и cookies

Для локальной разработки:

```text
Frontend: http://127.0.0.1:5173
Backend:  http://localhost:8000
```

При cookie-авторизации backend должен разрешать credentials.

Пример параметров CORS:

```text
Allowed origin: http://127.0.0.1:5173
Allow credentials: true
Allowed methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Allowed headers: Content-Type, Authorization
```

Нельзя использовать одновременно:

```text
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
```

---

# Что проверить после подключения backend

```bash
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Обязательные ручные сценарии:

1. Вход.
2. Обновление страницы после входа.
3. Выход.
4. Получение списка кандидатов.
5. Создание кандидата.
6. Изменение статуса.
7. Добавление заметки.
8. Редактирование заметки.
9. Удаление заметки.
10. Создание дропа.
11. Генерация батча.
12. Закрытие батча.
13. Назначение кода.
14. Погашение кода.
15. Поиск.
16. Фильтры.
17. Аналитика.
18. Обработка 401, 403, 404, 409 и 500.
19. Повторный запрос при сетевой ошибке.
20. Работа на desktop, tablet и mobile.

---

# Клонирование проекта

```bash
git clone https://github.com/uglyfacegoat/CEOMENTALITY.git
cd CEOMENTALITY
npm install
npm run dev
```

Для backend-разработчика рекомендуется создать отдельную ветку:

```bash
git switch -c backend/integration
git push -u origin backend/integration
```