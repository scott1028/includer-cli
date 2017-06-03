'use strict';


const fileinclude = require('gulp-file-include'),
      argv = require('yargs').argv,
      gulp = require('gulp');

// 
const src = argv.src || argv.s || 'src';
const dist = argv.dist || argv.d || 'dist';
const tpl = argv.tpl || argv.t || 'tpl';
const gulpfile = './node_modules/includer-cli/gulpfile.js'
const prefix = argv.prefix || argv.p || '@@';
const cwd = process.cwd();

// 
let ext = `${tpl}`;
let rootDir = `${cwd}/${src}`;
let distDir = `${cwd}/${dist}`;

// 
let srcTpl = [`${rootDir}/**/*`,
              `!${rootDir}/**/*.${ext}.*`,
              `${rootDir}/**/.*`,
              `!${rootDir}/**/.*.${ext}.*`,];

gulp.task('include', function(){
    console.log('=> source has changed!!');
    gulp.src(srcTpl)
        .pipe(fileinclude({
            prefix: `${prefix}`,
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
