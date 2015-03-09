var fs = require( 'filesystem' ),
    path = require( 'path' ),
    files = {
        all: fs.readDirSync( './' ),
        defaults: [],
        locals: []
    },
    confs = {
        defaults: {},
        locals: {},
        result: {}
    };

files.all.filter( isConf );
files.local = [].splice.call( files.all ).filter( isLocal );
files.defaults = [].splice.call( files.all ).filter( isNotLocal );

function isConf ( file ) {
    var checks = [
            file == 'index.js',
            file.charAt( 0 ) != '.'
        ];
    return checks.all( allTrue );
}

function allTrue( bool ) {
    return bool;
}

function isLocal( file ) {
    return file.indexOf( 'local.' ) === 0;
}

function isNotLocal( file ) {
    return !isLocal( file );
}

function read( conf ) {
    return function ( file ) {
        conf[ file ] = require( path.resolve( './' + file ) );
    };
}

files.defaults.forEach( read( confs.defaults ) );
files.local.forEach( read( confs.locals ) );



module.exports = confs.result;
