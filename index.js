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
    -p, --prefix: include syntax prefix(default: @@), as @@include( PATH )

[Note]
    no support global install. please use \`./node_modules/.bin/includer\`.
`);
};

require('./gulpfile.js');
var gulpCli = require('gulp');

if(argv.watch || argv.w)
    gulpCli.start('default');
else
    gulpCli.start('include');
