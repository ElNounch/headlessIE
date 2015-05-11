# headless-ie

[![npm](https://img.shields.io/npm/v/headless-ie.svg?style=plastic)](https://www.npmjs.com/package/headless-ie)
[![AppVeyor branch](https://img.shields.io/appveyor/ci/ElNounch/headlessIE/master.svg?label=Windows&style=plastic)](https://ci.appveyor.com/project/ElNounch/headlessie)
[![Downloads](https://img.shields.io/npm/dm/headless-ie.svg?style=plastic)](https://www.npmjs.com/package/headless-ie)
[![David](https://img.shields.io/david/ElNounch/headlessIE.svg?style=plastic)](https://github.com/ElNounch/headlessIE)
[![David dev](https://img.shields.io/david/dev/ElNounch/headlessIE.svg?style=plastic)](https://github.com/ElNounch/headlessIE)

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
