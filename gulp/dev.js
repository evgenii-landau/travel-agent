// Обычная сборка запуск через gulp

const gulp = require('gulp'); // Сам gulp
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass')); // Компиляция SCSS (sass)
const server = require('gulp-server-livereload'); // Запуск live-server
const sassGlob = require('gulp-sass-glob'); // Автоматическое подключение SASS
const clean = require('gulp-clean'); // Удаление папку dist
const fs = require('fs'); // Модуль для работы с файловой системой
const sourceMaps = require('gulp-sourcemaps'); // Отображение где находится стили в папке, через devtools в браузере
const plumber = require('gulp-plumber'); // Помогает избежать зависания сборки при возникновении ошибок
const notify = require('gulp-notify'); // Сообщение об ошибках
const webpack = require('webpack-stream'); // Подключение вебпака для JS
const bable = require('gulp-babel'); // Подержка нового JS в старых браузерах
const imagemin = require('gulp-imagemin'); // Сжатие изображений
const changed = require('gulp-changed'); // Чтобы после добавления новых файлов они не обрабатывались повторно

gulp.task('clean:dev', function (done) {
	if (fs.existsSync('./build/')) {
		return gulp
			.src('./build/', { read: false })
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

gulp.task('html:dev', function () {
	return gulp
		.src(['./src/html/**/*.html', '!./src/html/blocks/**/*.html'])
		.pipe(changed('./build/', { hasChanged: changed.compareContents }))
		.pipe(plumber(plumberNotify('HTML')))
		.pipe(fileInclude(fileIncludeSettings))
		.pipe(gulp.dest('./build/'));
}); // Сообщение об ошибках для sass и html

gulp.task('sass:dev', function () {
	return gulp
		.src('./src/scss/*.scss')
		.pipe(changed('./build/css/'))
		.pipe(plumber(plumberNotify('SCSS')))
		.pipe(sourceMaps.init())
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('./build/css/'));
});

gulp.task('images:dev', function () {
	return (
		gulp
			.src('./src/img/**/*')
			.pipe(changed('./build/img/'))
			// .pipe(imagemin({ verbose: true })) // Сжатие картинок
			.pipe(gulp.dest('./build/img/'))
	);
}); // Копирование картинок

gulp.task('fonts:dev', function () {
	return gulp.src('./src/fonts/**/*').pipe(gulp.dest('./build/fonts/'));
}); // Копирование шрифтов

gulp.task('files:dev', function () {
	return gulp.src('./src/files/**/*').pipe(gulp.dest('./build/files/'));
}); // Копирование файлов pdf или еще чего-то

gulp.task('js:dev', function () {
	return (
		gulp
			.src('./src/js/*.js')
			.pipe(plumber(plumberNotify('JS')))
			// .pipe(bable())
			.pipe(webpack(require('./../webpack.config.js')))
			.pipe(gulp.dest('./build/js'))
	);
});

const serverOptions = {
	livereload: true,
	open: true,
};

gulp.task('server:dev', function () {
	return gulp.src('./build/').pipe(server(serverOptions));
});

gulp.task('watch:dev', function () {
	gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:dev'));
	gulp.watch('./src/**/*.html', gulp.parallel('html:dev'));
	gulp.watch('./src/img/**/*', gulp.parallel('images:dev'));
	gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:dev'));
	gulp.watch('./src/files/**/*', gulp.parallel('files:dev'));
	gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'));
}); // Слежение за файлами
