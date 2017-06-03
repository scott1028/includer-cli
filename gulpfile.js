'use strict';


const fileinclude = require('gulp-file-include'),
      argv = require('yargs').argv,
      isBinary = require('gulp-is-binary'),
      through = require('through2'),
      rename = require("gulp-rename"),
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
let srcTpl = [
    `${rootDir}/**/*`,
    `${rootDir}/**/.*`,
    `!${rootDir}/**/*.${ext}`,
    `!${rootDir}/**/*.${ext}.*`,
    `!${rootDir}/**/.*.${ext}`,
    `!${rootDir}/**/.*.${ext}.*`,
];

gulp.task('include', function(){
    console.log('=> source has changed!!', (new Date));
    gulp.src(srcTpl)
        .pipe(isBinary())
        .pipe(through.obj(function(file, enc, next){
            if(file.isBinary() || file.stat.isDirectory())
                return next();
            next(null, file);
        }))
        .pipe(fileinclude({
            prefix: `${prefix}`,
            basepath: '@file'
        }))
        .pipe(rename(function(path){
            // TODO: Next version feature
            // console.log([path.basename]);
            // console.log([path.dirname]);
            // console.log([path.extname]);
            // return path.extname += '.tpl';
        }))
        .pipe(gulp.dest(`${distDir}`));
});

// main
gulp.task('default', ['include'], function(){
    gulp.watch(srcTpl.map(function(row){
        if(row.startsWith(`!`))
            return row.slice(1, row.length);
        return row;
    }), ['include']);
});
