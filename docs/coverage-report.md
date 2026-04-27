# Coverage Report

## Загальне покриття
- Statements/Instructions: 30.06%
- Branches: 9.16%
- Functions/Methods: 8.47%
- Lines: 32.02%

## Аналіз

- ** Які функції/класи покриті найкраще? **

  - Constants & Utils: Файли в папках src/constants (майже всі 100%) та src/utils (наприклад, formUtils.js, selectUtils.js, urlUtils.js). Це прості функції без складної логіки.

  - Компоненти відображення: GroupCard.js, LessonTypeBadge.js, LessonsList.js, RoomsList.js. Вони мають 100% покриття, оскільки переважно лише рендерять вхідні дані.

  - Допоміжні сервіси: setLink.js, axios.js (у папці helper), cardObjectHandler.js.

  - Redux-інструменти: actionType.js, index.js (у багатьох папках).

- ** Які потребують додаткових тестів? **

  -  Форми (Forms): Більшість компонентів у src/components/...Form мають критично низьке покриття (від 1% до 18%). Наприклад: AddTeacherForm.js, LessonForm.js, RegistrationForm.js.

  - Сторінки (Containers/Pages): Великі модулі, такі як TeachersPage.js (1.75%), SchedulePage.js, RoomsPage.js. Тести не охоплюють життєвий цикл цих сторінок.

  - Sagas: Папка src/sagas має низькі показники (загалом ~12%). Бізнес-логіка завантаження даних (наприклад, schedule.js — 10.98%) майже не перевірена.

  - Сервіси: departmentService.js, teacherService.js, userService.js. Покриті лише базові виклики, без обробки помилок.

  - Валідація: storeValidation.js (12.9%) та validateFields.js (44.26%).

- ** Чому деякі branches не покриті? **

  - Відсутність тестів на помилки: Стовпчик % Branch показує 0% у більшості сервісів та саг. Це означає, що тести перевіряють лише успішне виконання (try), але не перевіряють блоки catch або умови перевірки статусів відповідей.

  - Складні умовні рендери: У компонентах форм (наприклад, AddStudentForm) не протестовані різні стани: показ повідомлень про помилки, активна/неактивна кнопка сабміту, відображення лоадерів.

  - Обробники подій: У великих файлах (стовпчик Uncovered Line #s) пропущені функції onClick, onChange та логіка перемикання табів або фільтрів (наприклад, у Schedule.js або Header.js).

  - Default props та Edge cases: Не перевірені випадки, коли дані приходять як null або undefined, що часто зустрічається в логіці маперів (наприклад, fullScheduleMapper.js — 6.06% Statements).

## Скріншот
![Coverage Report](./image.png)
