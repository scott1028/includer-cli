# includer-cli

- This Plugin Base On: https://www.npmjs.com/package/gulp-file-include
- C Language syntax like `#include` for text file CLI tool.

```
[Options]
    -w, --watch: watch mode(optional)
    -s, --src: input path(default: src).
    -d, --dist: out put path(default: dist).
    -t, --tpl: skip file if filename contains tpl keyword(default: tpl).
    -p, --prefix: include syntax prefix(default: @@), as @@include( PATH )
    -m, --match: replace to string from input regexp pattern(ex: -m \\.scss:.css).
    -i, --indent: apply indent for include content(default: true).

[Note]
    $ yarn global add includer-cli
   		or ...
   	$ yarn add includer-cli
   		...
   	$ includer
   		or ...
   	$ ./node_modules/.bin/includer
```

# Usage

```
$ ./node_modules/.bin/includer -s src -d dist
	... or
$ ./node_modules/.bin/includer -s src -d dist -w
	... or
$ ./node_modules/.bin/includer -s src -d dist -t tpl
	( skip file with filename contains ****.tpl.*** )
```

# Example

```
# main.js
@@include('data.tpl.txt')
  ... or
@@include('./.htaccess.tpl', {
    "env": "./@@TARGET.tpl"
})
```

![Alt text](https://raw.githubusercontent.com/scott1028/includer-cli/master/example.png "example.png")
