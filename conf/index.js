var fs = require( 'fs' ),
	path = require( 'path' ),
	lib = require( '../lib' ),
	files = {
		all: fs.readdirSync( __dirname ),
		defaults: [],
		locals: [],
		others: []
	},
	confs = {
		defaults: {},
		locals: {},
		others: {}
	}
	config = {};

files.all = files.all.filter( valid );

files.locals = [].slice.call( files.all ).filter( isLocal );
files.defaults = [].slice.call( files.all ).filter( isDefault );
files.others = [].slice.call( files.all ).filter( isOther );

files.defaults.forEach( read( confs.defaults ) );
files.locals.forEach( read( confs.locals ) );
files.others.forEach( read( confs.others ) );

config = lib.extend( config, confs.defaults );
config = lib.extend( config, confs.others );
config = lib.extend( config, confs.locals );

function allTrue( bool ) {
	return bool;
}

function valid ( file ) {
	var checks = [
			file.split( '.' ).length > 0,
			file != 'index.js',
			file.charAt( 0 ) != '.'
		];
	return checks.every( allTrue );
}

function isLocal( file ) {
	return file.indexOf( 'local.' ) === 0;
}

function isDefault( file ) {
	return file.indexOf( 'default.' ) === 0;
}

function isOther ( file  ) {
	return files.locals.indexOf( file ) === -1 && files.defaults.indexOf( file ) === -1;
}

function read( conf ) {
	return function ( file ) {
		var scope = file.split( '.' );
		scope.pop(); /* dispose of extension */
		if ( !isOther( file ) ) {
			scope = scope.slice( 1 ); /* dispose of local. or default. */
		}
		scope = scope.join( '.' );
		conf[ scope ] = require( path.join( __dirname, path.sep, file ) );
	};
}

module.exports = config;
