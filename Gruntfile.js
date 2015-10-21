/*
  Gruntfile.js

  Функции: Автоматическое подключение задач (load-grunt-tasks),
           Компиляция less,
           Авто добавление вендорных префиксов,
           оптимизация media query,
           "Причесывание" style.css,
           Очистка конечной папки проекта,
           Копирование файлов в конечную папку проекта,
           Отслеживание изменений файлов less,
           "Склеивание" скриптов,
           Минификация скриптов,
           Минификация стилей,
           Автоматическое обновление страницы при изменении html или css кода.

  Структура проекта:
   /Project
   |----/app - каталог для полностью готового приложения
   |----/assets - каталог для файлов исходников и работы над проектом
        |----/js
        |----/fonts
        |----/img
        |----/less
             |----/_base
             |----/_layout
             |----/_modules
             |----/_state
             |----/_theme
             |----/_utilities
                  |----vares.less
                  |----fonts.less
                  |----mixins.less
                  |----extends.less
        app.less - генерируется автоматом(содержит @import всех файлов .less)
    |----style.css
    |----*.html - все файлы html-страниц (index.html, about.html и т.д.)
*/
module.exports  = function(grunt){

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({

    // Компиляция less
    less: {
      dist: {
        options: {
          compress: false
        },
        files: {
          "assets/style.css": "assets/less/app.less"
        }
      }
    },

    // Добавление вендорных префиксов
    autoprefixer: {
      options: {
        browser: ["last 3 version", "ie8", "ie9"]
      },
      files: {
        src: "assets/style.css"
      }
    },

    // Сборка все media query's и помещение их в самый конец style.css файла
    cmq: {
      style: {
        options: {
          log: false
        },
        files: {
          "assets/style.css": ["assets/style.css"]
        }
      }
    },

    // Сжимание и минификация style.css файла
    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0,
          report: "gzip"
        },
        files: {
          "app/style.min.css": ["app/style.css"]
        }
      }
    },

    // Привести в порядок файл style.css к единому стилю кода
    csscomb: {
      options: {
        config: "csscomb_config.json"
      },
      style: {
        expand: true,
        src: ["app/style.css"]
      }
    },

    // Очищаем конечную папку app перед копированием
    clean: {
      build: ["app"]
    },

    // Копируем нужные файлы в папку app
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "assets",
          src: [
            "js/app.min.js",
            "img/**",
            "fonts/**",
            "**/*.html",
            "style.css"
          ],
          dest: "app"
        }]
      }
    },

    // Склеиваем скрипты js
    concat: {
      prod: {
        src: [
          "assets/js/src/libs/**/*.js",
          "assets/js/src/*.js"
        ],
        dest: "assets/js/app.js"
      }
    },

    // Минификация файла app.js
    uglify: {
      options: {
        compress: {
          warnings: false
        },
        mangle: true,
        preserveComments: "some"
      },
      files: {
        src: "assets/js/app.js",
        dest: "assets/js/app.min.js"
      }
    },

    // Автоматический импорт новых файлов .less
    sass_globbing: {
      my_target: {
        files: {
          "assets/less/app.less": [
            "assets/less/_utilities/vars.less",
            "assets/less/_utilities/mixins.less",
            "assets/less/_utilities/extends.less",
            "assets/less/_utilities/fonts.less",
            "assets/less/_base/**/*",
            "assets/less/_layout/**/*",
            "assets/less/_modules/**/*",
            "assets/less/_state/**/*",
            "assets/less/_theme/**/*"
          ]
        },
        options: {
          useSingleQuotes: false,
          signature: "// All import file .less"
        }
      }
    },

    // Для автообновления html (работает в связке с grunt-contrib-watch)
    // Страница с версткой будет доступна по адресу http://localhost:3000
    connect: {
      server: {
        options: {
          port: 3000,
          base: "assets", // Директория в которой ведется разработка
        }
      }
    },

    /**
    * Если нужно удалить все комментарии и лишние пробелы/переводы на новую строку,
    * то перед выполнение grunt prodution раскомментируйте следующий код, и допишете
    * все файлы html в которых необходимо выполнить данную задачу. Так же в массиве
    * задач production раскомментировать 2 крайние строки.
    **/
    // htmlmin: {
    //   dist: {
    //     options: {
    //       removeComments: true
    //     },
    //     files: {
    //       // Сюда нужно дописать все html-файлы проекта
    //       "app/index.html": "app/index.html"
    //     }
    //   }
    // },

    // replace: {
    //   dist: {
    //     options: {
    //       patterns: [
    //         {
    //           match: /\r\n(?=\r\n|\s*\r\n)/g,
    //           replacement: ''
    //         }
    //       ]
    //     },
    //     files: [
    //       // В параметр scr дописать все html-файлы проекта
    //       {expand: true, flatten: true, src: ['app/index.html'], dest: 'app/'}
    //     ]
    //   }
    // },

    // Смотрим за изменениями файлов *.less и выполняем авто-компиляция при изменении
    watch: {
      livereload: {
        options: {
          livereload: true
        },
        files: ["assets/**/*"]
      },
      style: {
        files: ["assets/less/**/*.less"],
        tasks: ["sass_globbing", "less", "autoprefixer"],
        options: {
          spawn: false,
        }
      },
      script: {
        files: ["assets/js/src/**/*.js"],
        tasks: ["concat", "uglify"]
      }
    }

  });

  // Задача для разработки
  grunt.registerTask("dev", [
    "sass_globbing",
    "less",
    "connect",
    "watch"
  ]);

  // Задача для сборки и оптимизации готового проекта
  grunt.registerTask("prod", [
    "sass_globbing",
    "less",
    "autoprefixer",
    "cmq",
    "clean",
    "copy",
    "csscomb",
    "cssmin"
    // ,"htmlmin",
    // "replace"
  ]);

};
