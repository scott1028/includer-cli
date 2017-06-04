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
    -m, --match: replace to string from input regexp pattern(ex: -m \\.scss:.css).

[Usage]
    $ includer -s src -d dist -w
    $ includer -s src -d dist
    $ includer -s src -d dist -t erb
    $ includer -s src -d dist -m \\.scss:css
`);
};

require('./gulpfile.js');
var gulpCli = require('gulp');

if(argv.watch || argv.w)
    gulpCli.start('default');
else
    gulpCli.start('include');
