<h2>Шаблон для быстрого старта над проектом</h2>
<h3>Ориентирован на frontend-разработчиков использющих методологию организации стилей SMACSS</h3>

<h3>Основные функции</h3>
<ul>
  <li>Конкатенация и минификация javascript файлов</li>
  <li>Автоматический импорт новых файлов less и дальнейшая компиляция главного файла less в css</li>
  <li>"Причесывание" и минификация стилей</li>
  <li>Автоматическое обновление страницы при изменении html и css файлов</li>
  <li>Опционально: Удаление комментариев и лишних переходов на новую строку в конечных html файлах</li>
</ul>

<h3>Структура проета</h3>
<pre>
/app - каталог готового проекта(Генерируется автоматически при сборке)
/assets - каталог для работы над проектом
|----/fonts
|----/img
|----/js
|    |----/src - каталог для работы с файлами js
|    |    |----/libs
|    |    |-----*.js
|    |----app.js - готовый сконкатенированый файл javascript
|    |----app.min.js
|----/less
|    |----/_base
|    |----/_layout
|    |----/_modules
|    |----/_state
|    |----/_theme
|    |----/_utilities
|    |    |----vars.less
|    |    |----mixins.less
|    |    |----extends.less
|    |    |----fonts.less
|    |----app.less - готовый less файл для компиляции(содержит только @import)
|----index.html
|----*.html
|----style.css
|----.gitignore
|----csscomb_config.json
|----Gruntfile.js
|----Readme.md
</pre>

<h3>Инструкция</h3>
<p>У вас должен быть установлен Node.js и Git</p>
<p>В консоли поочередно набрать</p>
<pre>
  git clone git@github.com:stasov1/Grunt-boilerplate-smacss-less.git You_project_name
  cd Your_project_name
  npm install
</pre>
<p>Дождаться установки всех зависимостей и далее для работы над проектом запустить команду</p>
<pre>
  grunt dev
</pre>
<p>Она будет выполнять следующие действия<p>
<ul>
  <li>Запустит локальный сервер, доступный по адресу localhost:3000</li>
  <li>Следит за изменением файлов javascript в каталоге assets/js/src и выполняет конкатенацию и минификацию скриптов</li>
  <li>Следит за изменением файлов less в каталоге assets/less и выполняет автоимпорт новых файлов и компиляцию</li>
  <li>Автоматически обновляет страницу в браузере при изменении html и css файлов (Для работы нужен либо livereload плагин для браузера, либо раскомментировать строку скрипта в index.html)</li>
</ul>

<h3>Когда проект готов</h3>
<p>Запустить на выполнение команду</p>
<pre>
  grunt prod
</pre>
<p>Она выполнит следующие действия</p>
<ul>
  <li>Автоматические выполнит имфорт less файлов в главный app.less в правильном порядке (Сначала vars.less, mixins.less..., а только потом остальные файлы из каталогов _base, _layout...)</li>
  <li>Если каталог /app уже был ранее, очистит его полностью или если его небыло создаст его</li>
  <li>Скопирует в него все файлы из fonts/**, img/**, js/app.js, js/app.min.js, /style.css, /index.html и остальные html файлы, если они есть</li>
  <li>"Причешет" файл стилей app/style.css и следает рядом с ним его минифицированную копию app/style.min.css</li>
  <li>Опционально: Удалит все комментарии и лишние переходы на новую строку в html файлах</li>
</ul>
