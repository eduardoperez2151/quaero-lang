var gulp = require("gulp");
var rename = require("gulp-rename");
var run = require("gulp-run");
var sourcemaps = require('gulp-sourcemaps');
var ts = require("gulp-typescript");
var jest = require('gulp-jest').default;

var tsproj = ts.createProject("tsconfig.json");

// Depends on gen-grammar
gulp.task("default", ["test","gen-grammar"], function () {
  return tsproj.src()
        .pipe(sourcemaps.init())
        .pipe(tsproj()).js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("bin"));
});


// Generates grammar
gulp.task("gen-grammar", function () {
  return run("nearleyc src/parser/Grammar.ne -o src/parser/Grammar.ts").exec()
});

gulp.task('test', function () {
    return gulp.src('test').pipe(jest({
        "preprocessorIgnorePatterns": [
            "<rootDir>/dist/", "<rootDir>/node_modules/"
        ],
        "automock": false
    }));
});
