# headlessIE

[![Build status](https://ci.appveyor.com/api/projects/status/ek0a74lvpflmsy8j?svg=true)](https://ci.appveyor.com/project/ElNounch/headlessie)

Windows only.

Encapsulate [headlessIE-cs](https://github.com/ElNounch/headlessIE-cs), providing an headless browser using local Internet Explorer.

# methods

``` js
var headlessIE = require('headlessIE')
...
headlessIE.command( function( err, reported_path ) {
    proc = child_process.spawn( reported_path, [ 'http://localhost:8000/entrance' ] )
}
```

## command(callback)

Return full path to (provided) browser's executable.

## version(callback)

Return local Internet Explorer version number.

# install

```
npm install --save-opts headlessIE
```

# license

MIT
