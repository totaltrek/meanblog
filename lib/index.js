var fs = require( 'fs' ),
	path = require( 'path' ),
	files = fs.readdirSync( __dirname ),
	lib = {};

files = files.filter( valid );
files.forEach( addLib );

function allTrue( bool ) {
	return bool;
}

function valid ( file ) {
	var tokens = file.split( '.' );
	var checks = [
			file != 'index.js',
			file.charAt( 0 ) != '.',
			tokens.length > 0,
			tokens[ tokens.length - 1 ] == 'js'
		];
	return checks.every( allTrue );
}

function addLib( file ) {
	var scope = file.split( '.' );
	scope.pop(); /* dispose of extension */
	scope = scope.join( '.' );

	/* if your lib is broken you better fix it */
	lib[ scope ] = require( path.join( __dirname, path.sep, file ) );
}

module.exports = lib;
