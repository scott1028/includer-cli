# includer-cli

- C Language syntax like `#include` for text file CLI tool.

```
[Options]
    -w, --watch: watch mode(optional)
    -s, --src: input path(default: src).
    -d, --dist: out put path(default: dist).
    -t, --tpl: skip file if filename contains tpl keyword(default: tpl).

[Note]
    no support global install. please use `./node_modules/.bin/includer`
```

# Usage

- Included file name startsWith `_`.
- Default prefix is `@@`.

```
$ ./node_modules/.bin/includer -s=src -d=dist -p=#
	( handler #include('./_lib.txt') )
	... or
$ ./node_modules/.bin/includer -s=src -d=dist
	... or
$ ./node_modules/.bin/includer -s=src -d=dist -w
	... or
$ ./node_modules/.bin/includer -s=src -d=dist -t=tpl
	( handle file with filename contains *.tpl.* or *.tpl )
```

# Example

```
# main.js
@@include('_data.tpl.txt')
```
