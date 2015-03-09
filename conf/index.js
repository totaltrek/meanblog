var fs = require( 'fs' ),
	path = require( 'path' ),
	lib = require( '../lib' ),
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

files.defaults.forEach( read( confs.defaults ) );
files.local.forEach( read( confs.locals ) );

confs.result = lib.cloneDeep( {}, confs.local );
confs.result = lib.cloneDeep( confs.result, confs.defaults );

function isConf ( file ) {
	var checks = [
			file.split( '.' ).length > 0,
			file != 'index.js',
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

function clone ( into ) {
	function _clone () {
		_clone( )
	}
}

module.exports = confs.result;
