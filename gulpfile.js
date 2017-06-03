'use strict';


const fileinclude = require('gulp-file-include'),
      argv = require('yargs').argv,
      gulp = require('gulp');

const ext = argv.tpl;
const rootDir = `${argv.cwd}/${argv.src}`;
const distDir = `${argv.cwd}/${argv.dist}`;

const srcTpl = [`${rootDir}/**/*`,
                `!${rootDir}/**/*.${ext}.*`,
                `${rootDir}/**/.*`,
                `!${rootDir}/**/.*.${ext}.*`,];

gulp.task('include', function(){
    gulp.src(srcTpl)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(`${distDir}`));
});

// main
gulp.task('default', ['include'], function(){
    gulp.watch(srcTpl.filter(function(row){
        return !row.startsWith('!');
    }), ['include']);
});
