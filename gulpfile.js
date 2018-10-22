const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const prefix = require("gulp-autoprefixer");

// Compile Sass

gulp.task("sass", function() {
  return gulp
    .src(["src/scss/*.scss"]) // look into the src folder for any files ending in .scss
    .pipe(sass()) // Compiles Sass into CSS
    .pipe(
      prefix({
        browsers: ["last 2 versions"],
        cascade: false
      })
    ) // Autoprefixes CSS
    .pipe(gulp.dest("src/css")) // Sends new code to the CSS file
    .pipe(browserSync.stream());
});

// Watch & Serve

gulp.task("serve", ["sass"], function() {
  browserSync.init({
    server: "./src"
  });

  gulp.watch(["src/scss/*.scss"], ["sass"]); // constantly watches for changes in the files listed in the given array
  gulp.watch(["src/*.html"]).on("change", browserSync.reload); // watch for all html files found in the src folder and reload the browser when changes occur
});

// Defualt

gulp.task("default", ["serve"]);
