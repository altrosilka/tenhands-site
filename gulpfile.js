var gulp = require("gulp"),
  http = require("http"),
  concat = require('gulp-concat'),
  minifyCSS = require("gulp-minify-css"),
  fs = require('fs'),
  semver = require('semver'),
  uglify = require('gulp-uglify'),
  replace = require('gulp-replace-task'),
  bump = require('gulp-bump'),
  git = require('gulp-git'),
  less = require('gulp-less'),
  moment = require('moment'),
  rename = require("gulp-rename"),
  templateCache = require('gulp-angular-templatecache'),
  ngAnnotate = require('gulp-ng-annotate');


var urlConfig = require('./src/config/urls');
var extensionConfig = require('./config/extension');

var SRC = {
  cabinet: {
    vendor: {
      js: [
        './bower_components/jquery/dist/jquery.js',
        './bower_components/lodash/dist/lodash.js',
        './bower_components/bootstrap/dist/js/bootstrap.js',
        './bower_components/angular/angular.js',
        './bower_components/angular-sanitize/angular-sanitize.js',
        './bower_components/angular-ui-router/release/angular-ui-router.js',
        './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        './bower_components/momentjs/moment.js',
        './bower_components/momentjs/locale/ru.js',
        './bower_components/fancybox/source/jquery.fancybox.js',
        './bower_components/highcharts/highcharts.src.js',
        './bower_components/angular-cookies/angular-cookies.js'
      ],
      css: [
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/font-awesome/css/font-awesome.css',
        './bower_components/ionicons/css/ionicons.css'
      ]
    },
    js: ['./src/cabinet/js/**/*.js'],
    css: ['./src/cabinet/less/main.less'],
    cssWatch: ['./src/cabinet/less/**/*.less'],
    templates: ['./src/cabinet/templates/**/*.html']
  },
  site: {
    vendor: {
      js: [
        './bower_components/angular/angular.js'
      ],
      css: [
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/font-awesome/css/font-awesome.css',
        './bower_components/ionicons/css/ionicons.css'
      ]
    },
    js: ['./src/site/js/**/*.js'],
    css: ['./src/site/less/main.less'],
    cssWatch: ['./src/site/less/**/*.less'],
    templates: ['./src/site/templates/**/*.html']
  }
};



var PATH = {
  pack: './public/pack'
}


var DEST = {
  cabinet: {
    vendor: {
      js: 'cabinet-vendor.js',
      css: 'cabinet-vendor.css'
    },
    js: 'cabinet-scripts.js',
    css: 'cabinet-styles.css',
    templates: 'cabinet-templates.js'
  },
  site: {
    vendor: {
      js: 'site-vendor.js',
      css: 'site-vendor.css'
    },
    js: 'site-scripts.js',
    css: 'site-styles.css',
    templates: 'site-templates.js'
  }
}


gulp.task('pack:scripts-site', function() {
  gulp.src(SRC.site.js)
    .pipe(replace({
      patterns: [{
        match: 'apiServer',
        replacement: urlConfig.apiServer_dev
      },{
        match: 'extensionId',
        replacement: extensionConfig.extensionId_dev
      }]
    }))
    .pipe(ngAnnotate())
    .pipe(concat(DEST.site.js))
    .pipe(gulp.dest(PATH.pack))

  gulp.src(SRC.site.vendor.js)
    .pipe(concat(DEST.site.vendor.js))
    .pipe(gulp.dest(PATH.pack))
});

gulp.task('pack:scripts-cabinet', function() {
  gulp.src(SRC.cabinet.js)
    .pipe(replace({
      patterns: [{
        match: 'apiServer',
        replacement: urlConfig.apiServer_dev
      },{
        match: 'extensionId',
        replacement: extensionConfig.extensionId_dev
      }]
    }))
    .pipe(ngAnnotate())
    .pipe(concat(DEST.cabinet.js))
    .pipe(gulp.dest(PATH.pack))

  gulp.src(SRC.cabinet.vendor.js)
    .pipe(concat(DEST.cabinet.vendor.js))
    .pipe(gulp.dest(PATH.pack))
});

gulp.task('pack:styles-cabinet', function() {
  gulp.src(SRC.cabinet.vendor.css)
    .pipe(minifyCSS({
      keepBreaks: false
    }))
    .pipe(concat(DEST.cabinet.vendor.css))
    .pipe(gulp.dest(PATH.pack))

  gulp.src(SRC.cabinet.css)
    .pipe(less(DEST.cabinet.css))
    .pipe(rename(DEST.cabinet.css))
    .pipe(gulp.dest(PATH.pack));
});

gulp.task('pack:styles-site', function() {
  gulp.src(SRC.site.vendor.css)
    .pipe(minifyCSS({
      keepBreaks: false
    }))
    .pipe(concat(DEST.site.vendor.css))
    .pipe(gulp.dest(PATH.pack))

  gulp.src(SRC.site.css)
    .pipe(less())
    .pipe(rename(DEST.site.css))
    .pipe(gulp.dest(PATH.pack));
});

gulp.task('pack:templates-cabinet', function() {
  gulp.src(SRC.cabinet.templates)
    .pipe(templateCache(DEST.cabinet.templates, {
      standalone: true,
      root: './templates/',
      module: 'templates'
    }))
    .pipe(gulp.dest(PATH.pack));
});


gulp.task('pack:templates-site', function() {
  gulp.src(SRC.site.templates)
    .pipe(templateCache(DEST.site.templates, {
      standalone: true,
      root: './templates/',
      module: 'templates'
    }))
    .pipe(gulp.dest(PATH.pack));
});



gulp.task('build:scripts-site', function() {
  gulp.src(SRC.site.js)
    .pipe(replace({
      patterns: [{
        match: 'apiServer',
        replacement: urlConfig.apiServer
      },{
        match: 'extensionId',
        replacement: extensionConfig.extensionId
      }]
    }))
    .pipe(ngAnnotate())
    .pipe(concat(DEST.site.js))
    .pipe(uglify())
    .pipe(gulp.dest(PATH.pack))

  gulp.src(SRC.site.vendor.js)
    .pipe(concat(DEST.site.vendor.js))
    .pipe(uglify())
    .pipe(gulp.dest(PATH.pack))
});

gulp.task('build:scripts-cabinet', function() {
  gulp.src(SRC.cabinet.js)
    .pipe(replace({
      patterns: [{
        match: 'apiServer',
        replacement: urlConfig.apiServer
      },{
        match: 'extensionId',
        replacement: extensionConfig.extensionId
      }]
    }))
    .pipe(ngAnnotate())
    .pipe(concat(DEST.cabinet.js))
    .pipe(uglify())
    .pipe(gulp.dest(PATH.pack))

  gulp.src(SRC.cabinet.vendor.js)
    .pipe(concat(DEST.cabinet.vendor.js))
    .pipe(uglify())
    .pipe(gulp.dest(PATH.pack))
});


gulp.task("watch", function() {
  gulp.watch(SRC.site.js, ["pack:scripts-site"]);
  gulp.watch(SRC.site.cssWatch, ["pack:styles-site"]);
  gulp.watch(SRC.site.templates, ["pack:templates-site"]);

  gulp.watch(SRC.cabinet.js, ["pack:scripts-cabinet"]);
  gulp.watch(SRC.cabinet.cssWatch, ["pack:styles-cabinet"]);
  gulp.watch(SRC.cabinet.templates, ["pack:templates-cabinet"]);
});




gulp.task('build', [
    'build:scripts-cabinet',
    'build:scripts-site',
    "pack:styles-site",
    "pack:templates-site",
    "pack:styles-cabinet",
    "pack:templates-cabinet"
  ],
  function() {

  });


/* VERSION */
var getPackageJson = function() {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};

function inc(type) {
  var pkg = getPackageJson();
  var newVer = semver.inc(pkg.version, type);


  git.tag('v' + newVer, 'new version', function(err) {
    console.log(newVer)
  });


  return gulp.src(['./bower.json', './package.json'])
    .pipe(bump({
      version: newVer
    }))
    .pipe(gulp.dest('./'));


}

gulp.task('patch', function() {
  inc('patch');
});
gulp.task('feature', function() {
  inc('minor');
});
gulp.task('release', function() {
  inc('major');
});
