// Прошдакшн сборка запуск через gulp docs

const gulp = require('gulp'); // Сам gulp

//HTML
const fileInclude = require('gulp-file-include');
const htmlclean = require('gulp-htmlclean'); // Мимификация HTML
const webpHTML = require('gulp-webp-html');

//SASS
const sass = require('gulp-sass')(require('sass')); // Компиляция SCSS (sass)
const sassGlob = require('gulp-sass-glob'); // Автоматическое подключение SASS
const autoprefixer = require('gulp-autoprefixer'); // Автопрефиксер
const csso = require('gulp-csso'); // Мимификация CSS
const webpCss = require('gulp-webp-css');

const server = require('gulp-server-livereload'); // Запуск live-server
const clean = require('gulp-clean'); // Удаление папку dist
const fs = require('fs'); // Модуль для работы с файловой системой
const sourceMaps = require('gulp-sourcemaps'); // Отображение где находится стили в папке, через devtools в браузере
const groupMedia = require('gulp-group-css-media-queries'); // Группировка media запросов смотри css/main.css
const plumber = require('gulp-plumber'); // Помогает избежать зависания сборки при возникновении ошибок
const notify = require('gulp-notify'); // Сообщение об ошибках
const webpack = require('webpack-stream'); // Подключение вебпака для JS
const bable = require('gulp-babel'); // Подержка нового JS в старых браузерах
const changed = require('gulp-changed'); // Чтобы после добавления новых файлов они не обрабатывались повторно

//IMAGES
const imagemin = require('gulp-imagemin'); // Сжатие изображений
const webp = require('gulp-webp'); // Автоматическая конвертация в webp

gulp.task('clean:docs', function (done) {
	if (fs.existsSync('./docs/')) {
		return gulp
			.src('./docs/', { read: false })
			.pipe(clean({ force: true }));
	}
	done();
});

const fileIncludeSettings = { prefix: '@@', basepath: '@file' };

const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: false,
		}),
	};
};

gulp.task('html:docs', function () {
	return gulp
		.src(['./src/html/**/*.html', '!./src/html/blocks/**/*.html'])
		.pipe(plumber(plumberNotify('HTML')))
		.pipe(fileInclude(fileIncludeSettings))
		.pipe(webpHTML())
		.pipe(htmlclean())
		.pipe(gulp.dest('./docs/'));
}); // Сообщение об ошибках для sass и html

gulp.task('sass:docs', function () {
	return gulp
		.src('./src/scss/*.scss')
		.pipe(changed('./docs/css/'))
		.pipe(plumber(plumberNotify('SCSS')))
		.pipe(sourceMaps.init())
		.pipe(autoprefixer())
		.pipe(sassGlob())
		.pipe(webpCss())
		.pipe(groupMedia())
		.pipe(sass())
		.pipe(csso())
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('./docs/css/'));
});

gulp.task('images:docs', function () {
	return gulp
		.src('./src/img/**/*')
		.pipe(changed('./docs/img/'))
		.pipe(webp())
		.pipe(gulp.dest('./docs/img/'))
		.pipe(gulp.src('./src/img/**/*'))
		.pipe(changed('./docs/img/'))
		.pipe(imagemin({ verbose: true }))
		.pipe(gulp.dest('./docs/img/'));
}); // Копирование картинок

gulp.task('fonts:docs', function () {
	return gulp.src('./src/fonts/**/*').pipe(gulp.dest('./docs/fonts/'));
}); // Копирование шрифтов

gulp.task('files:docs', function () {
	return gulp.src('./src/files/**/*').pipe(gulp.dest('./docs/files/'));
}); // Копирование файлов pdf или еще чего-то

gulp.task('js:docs', function () {
	return gulp
		.src('./src/js/*.js')
		.pipe(plumber(plumberNotify('JS')))
		.pipe(bable())
		.pipe(webpack(require('../webpack.config.js')))
		.pipe(gulp.dest('./docs/js'));
});

const serverOptions = {
	livereload: true,
	open: true,
};

gulp.task('server:docs', function () {
	return gulp.src('./docs/').pipe(server(serverOptions));
});
