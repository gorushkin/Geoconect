import gulp from 'gulp';
import sass from 'sass';
import sourcemaps from 'gulp-sourcemaps';
import gulpSass from 'gulp-sass';
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';
import server from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';

const { src, dest } = gulp;

const scss = gulpSass(sass);

import { paths } from './index.js';

export const styles = () =>
  src(paths.src.styles)
    .pipe(plumber())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true,
      })
    )
    .pipe(sourcemaps.init())
    .pipe(scss({ outputStyle: 'compressed' }).on('error', scss.logError))
    // .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/css'))
    .pipe(server.stream());
