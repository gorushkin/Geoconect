import gulp from 'gulp';
import server from 'browser-sync';
import { styles, scripts, images, paths, createSprite } from './gulp/index.js';
import del from 'del';

const { src, dest, watch: watcher, series, parallel } = gulp;

const serverInit = () => {
  server.init({
    port: 4500,
    server: {
      baseDir: paths.buildFolder,
      online: true,
      tunnel: true,
    },
  });
};

const refresh = (done) => {
  server.reload();
  done();
};

const clean = () => del(paths.buildFolder);

const copy = () =>
  src([paths.src.scss, paths.src.img], {
    base: paths.srcFolder,
  }).pipe(dest(paths.buildFolder));

const html = () => src(paths.src.html).pipe(dest(paths.buildFolder));

const watch = () => {
  watcher(paths.whatch.styles, styles);
  watcher(paths.whatch.html, series(html, refresh));
  watcher(paths.whatch.js, series(scripts, refresh));
  watcher(paths.whatch.img, gulp.series(copy, refresh));

  serverInit();
};

const build = series(clean, parallel(styles, copy, html, scripts));
const start = series(build, watch);

export { styles, watch, serverInit, clean, start, build, createSprite, images };
