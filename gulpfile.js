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
    jade                = require('gulp-jade'),
    path                = require('path'),
    reload              = browsersync.reload,
    rimraf              = require('rimraf'),
    sass                = require('gulp-sass'),
    uglify              = require('gulp-uglify'),
    coffee              = require('gulp-coffee'),
    useref              = require('gulp-useref'),
    wiredep             = require('wiredep').stream,
    minifyCss           = require('gulp-minify-css'),
    minifyHtml          = require('gulp-minify-html'),
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
        .pipe(gulp.dest(conf_style_dest))
        .pipe(reload({stream:true}));
});

/**
 * Jade to html.
 */
gulp.task('templates', function () {
    return gulp.src('./src/*.jade')
        .pipe(jade({
            locals: {},
            pretty: true
        }))
        .pipe(wiredep({
          directory: './bower_components'
        }))
        .pipe(gulp.dest(conf_template_dest))
        .pipe(reload({stream:true}));
});

/**
 * Move images.
 */
gulp.task('images', function () {
    gulp.src('./src/img/**')
        .pipe(gulp.dest(conf_image_dest));
});

/**
 * Move fonts components into css for the client.
 */
gulp.task('fonts', function () {
    gulp.src(paths.fonts).pipe(gulp.dest(conf_fonts_dest));
});


/**
 * Compress javascript.
 */
gulp.task('scripts', function () {
    return gulp.src('./src/js/*.js')
        .pipe(changed(conf_script_dest))
        .pipe(uglify())
        .pipe(gulp.dest(conf_script_dest))
        .pipe(reload({stream:true}));

});

/**
 * Coffeescript to javascript.
 */
gulp.task('coffee', function() {
  gulp.src('./src/js/*')
    .pipe(gulpif(/[.]coffee$/, coffee()))
    .pipe(gulp.dest(conf_script_dest))
    .pipe(reload({stream:true}));
});

/**
 * All build tasks.
 */
gulp.task('html', ['style', 'coffee', 'scripts', 'templates', 'images'], function () {
    var assets = useref.assets({searchPath: '{.src, .bower_components}'});
    return gulp.src('dist/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulpif('*.html', minifyHtml({conditionals: true, loose: true})))
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
// TODO: move html task only to build do not use build here
gulp.task('dev', ['style', 'templates', 'images', 'scripts','coffee'], function () {
    browsersync.init({
        server: {
            baseDir:["./src", "./dist"],
            routes: {
                "/bower_components": "bower_components" // make bower_components accessible
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
    gulp.watch('./src/scss/*.scss', ['style']);
    gulp.watch('./src/jade/**/*.jade', ['templates']);
    gulp.watch('./src/js/*.js', ['scripts']); //in case there will be JavaScript
    gulp.watch('./src/js/*.coffee', ['coffee']);
    gulp.watch('./src/img/**', ['images']);
    gulp.watch('./dist/*html').on('change', reload);
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