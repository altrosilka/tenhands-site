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
var extensionConfig = require('./src/config/extension');

var SRC = {
  cabinet: {
    vendor: {
      js: [
        './bower_components/jquery/dist/jquery.js',
        './bower_components/lodash/dist/lodash.js',
        './bower_components/bootstrap/dist/js/bootstrap.js',
        './bower_components/angular/angular.js',
        './bower_components/angular-sanitize/angular-sanitize.js',
        './bower_components/angular-animate/angular-animate.js',
        './bower_components/angular-ui-router/release/angular-ui-router.js',
        './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        './bower_components/momentjs/moment.js',
        './bower_components/angular-ui-select/dist/select.js',
        './bower_components/momentjs/locale/ru.js',
        './bower_components/fancybox/source/jquery.fancybox.js',
        './bower_components/highcharts/highcharts.src.js',
        './bower_components/angular-cookies/angular-cookies.js',
        './bower_components/angular-local-storage/dist/angular-local-storage.js',
        './bower_components/fullcalendar/dist/fullcalendar.js',
        './bower_components/fullcalendar/dist/lang/ru.js'
      ],
      css: [
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/font-awesome/css/font-awesome.css',
        './bower_components/select2/select2.css',
        './bower_components/select2/select2-bootstrap.css',
        './bower_components/angular-ui-select/dist/select.css',
        './bower_components/ionicons/css/ionicons.css',
        './bower_components/fullcalendar/dist/fullcalendar.css'
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
        './bower_components/jquery/dist/jquery.js',
        './bower_components/angular/angular.js',
        './bower_components/bootstrap/dist/js/bootstrap.js'
      ],
      css: [
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/ionicons/css/ionicons.css'
      ]
    },
    js: ['./src/site/js/**/*.js'],
    css: ['./src/site/less/main.less'],
    cssWatch: ['./src/site/less/**/*.less'],
    templates: ['./src/site/templates/**/*.html']
  },
  admin: {
    vendor: {
      js: [
        './bower_components/jquery/dist/jquery.js',
        './bower_components/lodash/dist/lodash.js',
        './bower_components/bootstrap/dist/js/bootstrap.js',
        './bower_components/angular/angular.js',
        './bower_components/angular-sanitize/angular-sanitize.js',
        './bower_components/angular-animate/angular-animate.js',
        './bower_components/angular-ui-router/release/angular-ui-router.js',
        './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        './bower_components/momentjs/moment.js',
        './bower_components/angular-ui-select/dist/select.js',
        './bower_components/momentjs/locale/ru.js',
        './bower_components/fancybox/source/jquery.fancybox.js',
        './bower_components/highcharts/highcharts.src.js',
        './bower_components/angular-cookies/angular-cookies.js',
        './bower_components/angular-local-storage/dist/angular-local-storage.js'
      ],
      css: [
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/font-awesome/css/font-awesome.css',
        './bower_components/select2/select2.css',
        './bower_components/select2/select2-bootstrap.css',
        './bower_components/angular-ui-select/dist/select.css',
        './bower_components/ionicons/css/ionicons.css'
      ]
    },
    js: ['./src/admin/js/**/*.js'],
    css: ['./src/admin/less/main.less'],
    cssWatch: ['./src/admin/less/**/*.less'],
    templates: ['./src/admin/templates/**/*.html']
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
  },
  admin: {
    vendor: {
      js: 'admin-vendor.js',
      css: 'admin-vendor.css'
    },
    js: 'admin-scripts.js',
    css: 'admin-styles.css',
    templates: 'admin-templates.js'
  }
}


gulp.task('pack:scripts-site', function() {
  gulp.src(SRC.site.js)
    .pipe(replace({
      patterns: [{
        match: 'apiServer',
        replacement: urlConfig.apiServer_dev
      }, {
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
      }, {
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


gulp.task('pack:scripts-admin', function() {
  gulp.src(SRC.admin.js)
    .pipe(replace({
      patterns: [{
        match: 'apiServer',
        replacement: urlConfig.apiServer_dev
      }, {
        match: 'extensionId',
        replacement: extensionConfig.extensionId_dev
      }]
    }))
    .pipe(ngAnnotate())
    .pipe(concat(DEST.admin.js))
    .pipe(gulp.dest(PATH.pack))

  gulp.src(SRC.admin.vendor.js)
    .pipe(concat(DEST.admin.vendor.js))
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

gulp.task('pack:styles-admin', function() {
  gulp.src(SRC.admin.vendor.css)
    .pipe(minifyCSS({
      keepBreaks: false
    }))
    .pipe(concat(DEST.admin.vendor.css))
    .pipe(gulp.dest(PATH.pack))

  gulp.src(SRC.admin.css)
    .pipe(less())
    .pipe(rename(DEST.admin.css))
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

gulp.task('pack:templates-admin', function() {
  gulp.src(SRC.admin.templates)
    .pipe(templateCache(DEST.admin.templates, {
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
      }, {
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
      }, {
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

gulp.task('build:scripts-admin', function() {
  gulp.src(SRC.admin.js)
    .pipe(replace({
      patterns: [{
        match: 'apiServer',
        replacement: urlConfig.apiServer
      }, {
        match: 'extensionId',
        replacement: extensionConfig.extensionId
      }]
    }))
    .pipe(ngAnnotate())
    .pipe(concat(DEST.admin.js))
    .pipe(uglify())
    .pipe(gulp.dest(PATH.pack))

  gulp.src(SRC.admin.vendor.js)
    .pipe(concat(DEST.admin.vendor.js))
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

  gulp.watch(SRC.admin.js, ["pack:scripts-admin"]);
  gulp.watch(SRC.admin.cssWatch, ["pack:styles-admin"]);
  gulp.watch(SRC.admin.templates, ["pack:templates-admin"]);
});




gulp.task('build', [
    'build:scripts-cabinet',
    'build:scripts-admin',
    'build:scripts-site',
    "pack:styles-site",
    "pack:templates-site",
    "pack:styles-cabinet",
    "pack:styles-admin",
    "pack:templates-cabinet",
    "pack:templates-admin"
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
