import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import babel from 'gulp-babel';

const { src, dest } = gulp;

import { paths } from './index.js';

export const scripts = () =>
  src(paths.src.jsModules)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.build.js));
