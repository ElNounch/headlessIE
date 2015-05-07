var path = require('path')
var fs = require('fs')
var child_process = require('child_process')
var asyncify = require('dezalgo')

var versionsRE = /HeadlessIE ((?:\d+)(?:\.(?:\d+)){0,3}) \(Internet Explorer ((?:\d+)(?:\.(?:\d+)){0,3})\)/g
var fullPath = path.join( __dirname, '/bin/headlessIE.exe' )

exports.command = function command(callback) {
    var cb = asyncify(callback)

    fs.exists( fullPath, function exeExistCommand( present ) {
        if( present ) {
            cb( undefined, fullPath )
        } else {
            cb( 'missing headlessIE executable from package', undefined )
        }
    })
}

exports.version = function version(callback) {
    var cb = asyncify(callback)

    try {
        fs.exists( fullPath, function exeExistVersion( present ) {
            if( present ) {
                var proc = child_process.execFile( fullPath, [ '--version' ], function VersionRunner( err, stdout ) {
                    matches = versionsRE.exec( stdout )
                    if( matches ) {
                        cb( undefined, matches[2] )
                    } else {
                        cb( 'Wrong program return to --version argument', undefined )
                    }
                })
            } else {
                cb( 'missing headlessIE executable from package', undefined )
            }
        })
    } catch( e ) {
        cb( 'Unable to launch program', undefined )
    }
}
