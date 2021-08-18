const source = 'src';
const build = 'build';

export const paths = {
  src: {
    html: `${source}/*.html`,
    styles: `${source}/scss/style.scss`,
    scss: `${source}/sass/**/*.*`,
    jsModules: `${source}/js/modules/*.js`,
    jsVendors: `${source}/js/vendors/*.js`,
    svgSrc: `${source}/img/**/icon__*.svg`,
    img: `${source}/img/**`,
    imgRaw: `${source}/imgRaw/**/*.{png,jpg,svg}`,
    imgOpt: `${source}/img`,
    svgSprite: `${source}/svgSprite`,
  },
  buildFolder: build,
  srcFolder: source,
  build: {
    css: `${build}/css`,
    js: `${build}/js`,
    img: `${build}/img`,
  },
  whatch: {
    styles: `${source}/scss/**/*.scss`,
    html: `${source}/*.html`,
    js: `${source}/js/**/*.*`,
    img: `${source}/img/**`,
  },
};
