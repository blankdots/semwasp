var /* BEGIN ENVIRONMENT CONFIG */
    conf_fonts_dest     = './dist/css/themes',              // where to output the fonts directory
    conf_image_dest     = './dist/img',                     // where to output images
    conf_output_dest    = './dist',                         // the base output directory
    conf_script_dest    = './dist/js',                      // where to output scripts
    conf_style_dest     = './dist/css',                     // where to output styles
    conf_template_dest  = './dist',                         // where to output html templates
    conf_url_dest       = './dist',                         // the local URL of the project
    /* END ENVIRONMENT CONFIG */

    browsersync         = require('browser-sync'),
    changed             = require('gulp-changed'),
    clean               = false,
    gulp                = require('gulp'),
    gulpif              = require('gulp-if'),
    gulputil            = require('gulp-util'),
    pug                 = require('gulp-pug'),
    path                = require('path'),
    reload              = browsersync.reload,
    rimraf              = require('rimraf'),
    sass                = require('gulp-sass'),
    uglify              = require('gulp-uglify'),
    coffee              = require('gulp-coffee'),
    useref              = require('gulp-useref'),
    wiredep             = require('wiredep').stream,
    minifyCss           = require('gulp-clean-css'),
    minifyHtml          = require('gulp-minify-html'),
    autoprefixer        = require('gulp-autoprefixer'),
    gulpif              = require('gulp-if'),
    paths               = { 
                            fonts: ['./bower_components/semantic-ui/dist/themes/**']
                          };

/**
 * Check to see if --vars were set.
 */
process.argv.forEach(function (val) {
    if (val === '--clean') {
        clean = true;
    }
});

/**
 * Compile scss as compressed css.
 */
gulp.task('style', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(changed(conf_style_dest))
        .pipe(sass({'outputStyle': 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(conf_style_dest));
});
gulp.task('css-watch', ['style'], reload);

/**
 * pug to HTML.
 */
gulp.task('templates', function () {
    return gulp.src('./src/*.pug')
        .pipe(pug({
            locals: {},
            pretty: true
        }))
        .pipe(wiredep({
          directory: './bower_components'
        }))
        .pipe(gulp.dest(conf_template_dest));
});
gulp.task('pug-watch', ['templates'], reload);
/**
 * Move HTML.
 */
gulp.task('basichtml', function () {
   return gulp.src('./src/*.+(html|htm|xhtml)')
            .pipe(gulp.dest(conf_template_dest));
});
gulp.task('html-watch', ['basichtml'], reload);

/**
 * Move images.
 */
gulp.task('images', function () {
   return gulp.src('./src/img/*.+(gif|ico|jpg|jpeg|png|svg)')
            .pipe(gulp.dest(conf_image_dest));
});
gulp.task('img-watch', ['images'], reload);

/**
 * Move fonts components into css for the client.
 */
gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
            .pipe(gulp.dest(conf_fonts_dest));
});
gulp.task('fonts-watch', ['fonts'], reload);

/**
 * Compress javascript.
 */
gulp.task('scripts', function () {
    return gulp.src('./src/js/*.js')
        .pipe(changed(conf_script_dest))
        .pipe(uglify())
        .pipe(gulp.dest(conf_script_dest));

});
gulp.task('js-watch', ['scripts'], reload);

/**
 * Coffeescript to javascript.
 */
gulp.task('coffee', function() {
  return gulp.src('./src/js/*')
    .pipe(gulpif(/[.]coffee$/, coffee()))
    .pipe(gulp.dest(conf_script_dest));
});
gulp.task('coffee-watch', ['coffee'], reload);

/**
 * All build tasks.
 */
gulp.task('html', ['style', 'coffee', 'scripts', 'templates', 'images'], function () {
    return gulp.src('dist/*.html')
        .pipe(gulpif('*.js', uglify()))
        // .pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
        .pipe(useref())
        // .pipe(gulpif('*.html', minifyHtml({conditionals: true, loose: true})))
        .pipe(gulp.dest(conf_url_dest));
});

/**
 * Build FrontEnd and distribute.
 */
gulp.task('build', ['html','fonts']);

/**
 * Remove dist directory.
 */
gulp.task('clean', function (cb) {
    rimraf(conf_output_dest, cb);
});

/**
 * Watch for chaned files and develop in peace
 */
gulp.task('dev', ['style', 'templates', 'images', 'scripts','coffee'], function () {
    browsersync.init({
        server: {
            baseDir:["./src", "./dist"],
            routes: {
                "/bower_components": "bower_components", // make bower_components accessible
                "/node_modules": "node_modules"
            }
        },
        socket: {
            domain: 'localhost:3000'
        },
        ui: {
            port: 9001
        },
        port: 3000

    })
    gulp.watch('./src/img/*.+(gif|ico|jpg|jpeg|png|svg)', ['img-watch'], {events: ['add', 'change', 'unlink']});
    gulp.watch('./src/scss/*.scss', ['css-watch'], {events: ['add', 'change', 'unlink']});
    gulp.watch('./src/*.pug', ['pug-watch'], {events: ['add', 'change', 'unlink']});
    gulp.watch('./src/includes/*.pug', ['pug-watch'], {events: ['add', 'change', 'unlink']});
    gulp.watch('./src/*.(html|htm|xhtml)', ['html-watch'], {events: ['add', 'change', 'unlink']}); //in case there will be HTML
    gulp.watch('./src/includes/*.(html|htm|xhtml)', ['html-watch'], {events: ['add', 'change', 'unlink']}); //in case there will be HTML
    gulp.watch('./src/js/*.js', ['js-watch'], {events: ['add', 'change', 'unlink']}); //in case there will be JavaScript
    gulp.watch('./src/js/*.coffee', ['coffee-watch'], {events: ['add', 'change', 'unlink']});
    gulputil.log(gulputil.colors.inverse("All done! We're up and running."));
});


/**
 * Default task
 */
gulp.task('default', function () {
    if (clean === true) {
        gulp.start(['clean']);
    } else {
        gulp.start(['dev']);
    }
});