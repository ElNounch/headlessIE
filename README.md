# headless-ie

[![Build status](https://ci.appveyor.com/api/projects/status/ek0a74lvpflmsy8j/branch/master?svg=true)](https://ci.appveyor.com/project/ElNounch/headlessie)

Windows only.

Encapsulate [headlessIE-cs](https://github.com/ElNounch/headlessIE-cs), providing an headless browser using local Internet Explorer.

# methods

``` js
var headlessIE = require('headless-ie')
...
headlessIE.command( function( err, reported_path ) {
    proc = child_process.spawn( reported_path, [ 'http://localhost:8000/entrance' ] )
}
```

## command(callback)

Provide full path to (included) browser's executable, by calling your `callback(error,command)`.

## version(callback)

Provide local Internet Explorer version number, by calling your `callback(error,version)`.

# install

```
npm install --save-opts headless-ie
```

# license

MIT
