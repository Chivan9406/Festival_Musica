const { series, src, dest, watch, parallel } = require('gulp');   //{} multiples funciones
const sass = require('gulp-dart-sass');         // solo una funcion
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//Utilidades CSS
const autoprefixer = require('autoprefixer');       //Añade prefijos
const postcss = require('gulp-postcss');     //Añade procesamiento a css
const cssnano = require('cssnano');     //Optimiza el archivo CSS
const sourcemaps = require('gulp-sourcemaps');      //Identifica dónde esta la referencia de los archivos originales

//Utilidades JS
const terser = require('gulp-terser-js');       //
const rename = require('gulp-rename');

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

// Función que compila SASS
function css() {
    return src(paths.scss)     //Busca el archivo
        .pipe(sourcemaps.init())        /* Iniciar SourceMaps */
        .pipe(sass({
            outputStyle: 'expanded' /* Indica el formato del arvhico css */
        }))                          //Compila el archivo
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))       /* Anota las referencias */
        .pipe(dest('./build/css'))      //Crea la carpeta build y guarda el archivo css
}

// function minificarCSS() {
//     return src(paths.scss)
//         .pipe(sass({
//             outputStyle: 'compressed' /* Indica el formato del arvhico css */
//         }))
//         .pipe(dest('./build/css'))
// }

function javascript() {
    return src(paths.js)
        .pipe(sourcemaps.init())        /* Iniciar SourceMaps */
        .pipe(concat('bundle.js'))      /* Nombre del archivo */
        .pipe(terser())     /* Minifica JS */
        .pipe(sourcemaps.write('.'))       /* Anota las referencias */
        .pipe(rename({suffix:'.min'}))      /* Renombrar */
        .pipe(dest('build/js'))         /* Se guarda en build/js */
}

function imagenes() {
    return src(paths.imagenes)      /* Lee las imágenes de todos los formatos */
        .pipe(imagemin())           /* Minifica las imágenes */
        .pipe(dest('./build/img'))  /* Guarda las imagenes en build/img */
        .pipe(notify({message: 'Imagen Minificada'}))    /* Notificación al termino de minificar */
}

function versionWebp() {
    return src(paths.imagenes)
        .pipe(webp())
        .pipe(dest('./build/img'))
        .pipe(notify({message: 'Version webp Lista'}))
}

function watchArchivos() {
    watch(paths.scss, css)      //Observa los cambios del archivo y ejecuta la funcion css  | * que observe a todos los archivos con extension scss dentro de la carpeta y **/* busca en todas las carpetas
    watch(paths.js, javascript)    
}

exports.css = css;
// exports.minificarCSS = minificarCSS;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = parallel(css, javascript/*, imagenes, versionWebp, watchArchivos*/);