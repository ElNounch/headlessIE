var path = require('path')
var child_process = require('child_process')
var asap = require('asap')

var fullPath = path.join(__dirname, '/bin/headlessIE.exe')

function asapify( cb ) {
	var th = this
	return function () {
		asap( cb.apply( th, arguments ) )
	}
}

exports.command = function command(callback) {
	asapify(callback)

	callback( undefined, fullPath )
}

exports.version = function version(callback) {
	asapify(callback)

    try {
        var vers = ''
        var proc = child_process.spawn( fullPath, [ '--version' ] )

        proc.stdout.on( 'data', function (data) {
            vers += data
        })

        proc.on('close', function (code) {
            if( ( code == 0 ) && ( /^(\d+)(\.(\d+)){0,3}/.test( vers ) ) ) {
                callback( undefined, vers )
            } else {
                callback( "Wrong program return to --version argument", undefined )
            }
        })
    } catch( e ) {
        callback( "Unable to launch program", undefined )
    }
}
