'use strict';


const fileinclude = require('gulp-file-include'),
      argv = require('yargs').argv,
      isBinary = require('gulp-is-binary'),
      through = require('through2'),
      rename = require("gulp-rename"),
      gulp = require('gulp'),
      replace = require('gulp-replace'),
      colors = require('colors');

// 
const cwd = process.cwd();
const src = argv.src || argv.s || 'src';
const dist = argv.dist || argv.d || 'dist';
const tpl = argv.tpl || argv.t || 'tpl';
const prefix = argv.prefix || argv.p || '@@';
const match = (argv.match || argv.m || `use strict:use strict`).toString().split(`:`);
const indent = eval(argv.indent || argv.i || 'true');

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
    gulp.src(srcTpl)
        .pipe(isBinary())
        .pipe(through.obj(function(file, enc, next){
            if(file.isBinary() || file.stat.isDirectory())
                return next();
            next(null, file);
        }))
        .pipe(replace(new RegExp(`${match[0]}`, 'g'), `${match[1]}`))
        .pipe(fileinclude({
            prefix: `${prefix}`,
            basepath: '@file',
            indent: indent
        }))
        .pipe(replace(new RegExp(`${match[0]}`, 'g'), `${match[1]}`))
        .on('error', function(e){
            console.log(`=> ${e.message}`.magenta);
        })
        .pipe(rename(function(path){
            // TODO: Next version feature
            // console.log([path.basename]);
            // console.log([path.dirname]);
            // console.log([path.extname]);
            // return path.extname += '.tpl';
        }))
        .pipe(gulp.dest(`${distDir}`))
        .on('end', function(){
            console.log(`=> Output has changed at ${(new Date).toString()}`.cyan);
        });
});

// main
gulp.task('default', ['include'], function(){
    gulp.watch(srcTpl.map(function(row){
        if(row.startsWith(`!`))
            return row.slice(1, row.length);
        return row;
    }), ['include']);
});
