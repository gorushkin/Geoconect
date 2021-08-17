import imagemin from 'gulp-imagemin';
import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import svgstore from 'gulp-svgstore';

import { paths } from './index.js';
const { src, dest } = gulp;

export const images = () =>
  src(paths.src.imgRaw)
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest(paths.src.imgOpt));

export const createSprite = () =>
  gulp
    .src(paths.src.svgSrc)
    .pipe(
      svgSprite({
        mode: {
          inline: true,
          stack: {
            sprite: '../sprite.svg',
            example: false,
          },
        },
      })
    )
    .pipe(gulp.dest(paths.src.imgOpt));
