'use strict';

const shell = require('gulp-shell'),
      argv = require('yargs').argv,
      execSync = require('child_process').execSync;

if(argv.h || argv.help){
    return console.log(`
[Options]
    -w, --watch: watch mode(optional)
    -s, --src: input path(default: src).
    -d, --dist: out put path(default: dist).
    -t, --tpl: skip file if filename contains tpl keyword(default: tpl).

[Note]
    no support global install. please use \`./node_modules/.bin/includer\`.
`);
};

const src = argv.src || argv.s || 'src';
const dist = argv.dist || argv.d || 'dist';
const tpl = argv.tpl || argv.t || 'tpl';
const gulpfile = './node_modules/includer-cli/gulpfile.js'
const cwd = process.cwd();
const gulp = `./node_modules/.bin/gulp`;

// Main
if(argv.watch || argv.w)
    shell.task([`${gulp} --src=${src} --dist=${dist} --tpl=${tpl} --gulpfile=${gulpfile} --cwd=${cwd}`])();
else
    shell.task([`${gulp} include --src=${src} --dist=${dist} --tpl=${tpl} --gulpfile=${gulpfile} --cwd=${cwd}`])();
