Создать приложение для отображения списка задач
(TO-DO лист, аналог Jira и Trello)

1. Создать новое приложение на основе Create React App,
Typescript используется по желанию, SCSS или SASS так
же по желанию для продвинутого уровня.

2. Приложения должно содержать три страницы:
● Главная (рабочий стол)
● Активный спринт
● Панель администратора (создание задач)

Главная (Рабочий стол). Отображает список выполненных
задач и общую и информацию о текущем спринте(вкладки -
product, backlog). Так же можно выбрать отдельного
пользователя и всю команду целиком, для от отображение
статистики (only my issues). Продвинутый уровень содержит
график для визуализации статистики.

Активный спринт. Страница отображает доску канбан с
активными задачами. Есть фильтр по участникам команды
при нажатии на который остаются только задача
отфильтрованного участника.

Страница с добавлением задачи имеет окно и оно в свою
очередь имеет следующие обязательные поля для
заполнения при создании задачи:
● Заголовок
● Подзаголовок
● Автор
● Исполнитель
● Время выполнения в виде количество часов и дней если
количество часов более 8 (6ч или 1д.6ч и тд)
● Описание задачи. Обязательно не менее 40 символов
● Айди задачи должен иметь тип – ХХ-1234. где Х – любая
буква английского алфавита и 1234 – любые
последовательности чисел от 1 до 9, генерируются
автоматически.
