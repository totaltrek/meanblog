var fs = require( 'fs' ),
	path = require( 'path' ),
	lib = require( '../lib' ),
	files = {
		all: fs.readdirSync( __dirname ),
		defaults: [],
		locals: [],
		others: []
	};
var tooOld;
if ( tooOld ) {
	require( 'grunt' ).tasks( [ 'rebuildConfig' ] );
}

module.exports = config;
