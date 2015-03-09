var fs = require( 'fs' ),
	path = require( 'path' ),
	files = {
		all: fs.readDirSync( './' ),
		defaults: [],
		locals: []
	},
	libs = {
		defaults: {},
		locals: {},
		result: {}
	};

files.all.filter( isLib );

Lib = Object.create( null );

files.forEach( addLib );

function isLib ( file ) {
	var tokens = file.split( '.' );
	var checks = [
			file != 'index.js',
			file.charAt( 0 ) != '.',
			tokens.length > 0,
			tokens[ tokens.length ] == '.js'
		];
	return checks.all( allTrue );
}

function addLib( file ) {
	/* if your lib is broken you better fix it */
	Lib.prototype[ file ] = require( path.resolve( './' + file ) );
}

module.exports = new Lib();
