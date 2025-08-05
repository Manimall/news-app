# Новостное приложение на Nuxt 3

Проект представляет собой SPA для просмотра новостей с возможностью фильтрации, поиска и переключения между режимами отображения (сетка/список).

[![Nuxt](https://img.shields.io/badge/Nuxt-4.0.1-00DC82?logo=nuxtdotjs&logoColor=white)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Vue-3.5.18-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![npm](https://img.shields.io/badge/npm-11.5.2-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Pinia](https://img.shields.io/badge/Pinia-2.1-FFD02F?logo=vue.js&logoColor=333)](https://pinia.vuejs.org/)

## 🚀 Функциональность

### ✅ Реализовано
- [x] Фильтрация новостей по источнику (`source`)
- [x] Поиск по заголовку/содержанию с debounce
- [x] Переключение между режимами отображения (Grid/List)
- [x] Сохранение выбранного режима в `localStorage`
- [x] Синхронизация фильтров и поиска с URL-параметрами
- [x] Адаптивный заголовок и панель управления
- [x] Пагинация новостей
- [x] Ресет данных, оптимизация запросов
- [x] Полная адаптация под мобильные устройства

### ⏳ В планах
- [ ] Написание тестов (Vitest + Testing Library)
- [ ] Оптимизация загрузки данных (кеширование)

### 📱 Адаптивные брейкпоинты
Приложение использует следующие контрольные точки для адаптивного дизайна:
- **1200px** - Оптимизация для широких экранов
- **992px** - Стандартные планшеты (ландшафт)
- **768px** - Планшеты (портрет) / маленькие ноутбуки
- **500px** - Мобильные устройства (смартфоны)

## 🛠 Технологии
- Nuxt 3 (Vue 3)
- Pinia (стейт-менеджмент)
- TypeScript
- SCSS (стилизация)

## 🛠 Установка зависимостей

```bash
npm install
```

## 🖥 Разработка
Запуск dev-сервера:
```bash
npm run dev
```

### Приложение будет доступно по адресу:
http://localhost:3000

## Сборка для production
```
npm run build
npm run preview
```

## 🏗 Структура проекта

```markdown
📦 news-app

├── assets/         # CSS, изображения, шрифты
├── components/     # UI компоненты (Vue)
├── composables/    # Логика приложения (хуки)
├── layouts/        # Шаблоны страниц
├── pages/          # Страницы приложения
├── public/         # Публичные файлы
├── server/         # Серверная часть
│   └── api/        # API эндпоинты
├── stores/         # Pinia хранилища
├── types/          # Типы TypeScript
├── utils/          # Вспомогательные утилиты
├── app.vue         # Корневой компонент (входная точка)
├── nuxt.config.ts  # Конфигурация Nuxt
└── package.json    # Зависимости и скрипты
```
