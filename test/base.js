var headlessIE = require('../')
var test = require('tape')
var express = require('express')
var fs = require('fs')
child_process = require('child_process')

function createRandomLocalAddress() {
    function upTo( max ) {
        return Math.floor( Math.random() * (max + 1) )
    }
    return '127.' + upTo(255) + '.' + upTo(255) + '.' + (upTo(252) + 2)
}

test('return values test', function (t) {
    t.plan(5)

    headlessIE.version( function(err,reported_version) {
        t.ok( typeof err === 'undefined', 'no error while looking for version' )
        t.ok( typeof reported_version === 'string', 'version returned a string : "' + reported_version + '"' )
    })

    headlessIE.command( function(err,reported_path) {
        t.ok( typeof err === 'undefined', 'no error while looking for command' )
        var stat = fs.statSync( reported_path )
        t.ok( stat, 'path exist...')
        t.ok( stat.isFile(), '... and is a file')
    })
})

test('functionnal test', { timeout: 20000 }, function (t) {
    t.plan(5)
    var app = express()
    var server
    var proc
    var timer
    var job_done = false
    var local_addr = createRandomLocalAddress()

    app.get('/entrance', function (req, res) {
      res.send('<html><head><script>location.href="/javascript_passed"</script><body></body></html>')
      t.pass('entrance page accessed')
    })
    app.get('/javascript_passed', function (req, res) {
      res.send('Job done !')
      t.pass('javascript worked')
      job_done = true
      clearTimeout( timer )
      proc.kill()
      server.close()
    })

    server = app.listen(8000, local_addr)

    timer = setTimeout( function onTimeOut() {
        proc.kill()
        server.close()
    }, 15000)

    headlessIE.command( function(err,reported_path) {
        t.ok( typeof err === 'undefined', 'no error while looking for command' )
        proc = child_process.spawn( reported_path, [ 'http://' + local_addr + ':8000/entrance' ] )

        proc.on('exit', function onIEExit( code, signal ) {
            if( job_done ) {
                t.ok( code === null, 'exit code is correct')
                t.ok( signal === 'SIGTERM', 'killed by signal')
            }
        })
    })
})
