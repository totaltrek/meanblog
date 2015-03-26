function rebuild ( request, response, next ) {
	require( 'grunt' ).tasks( [ 'rebuildConfig' ], {}, oncomplete );
}

function oncomplete ( request, response, next ) {
	return function ( appconfig ) {
		if ( appconfig && appconfig != {} ) {
			request.app.set( 'config', appconfig );
			request.emit( 'config:rebuild', appconfig, request, response, next );
			response.emit( 'config:rebuild', appconfig, request, response, next );
		} else {
			next();
		}
	};
}

function updateConfigs( request, response, next ) {
	var config = request.app.get( 'config' );
	var nodes = Object.keys( config );
	nodes.forEach( function ( node ) {
		request.emit( node + ':updateConfig', config[ node ], request, response, next );
		response.emit( node + ':updateConfig', config[ node ], request, response, next );
	});
}

function middleware ( request, response, next ) {
	request.on( 'config:update', rebuild );
	response.on( 'config:update', rebuild );
	request.on( 'config:rebuild', updateConfigs );
	response.on( 'config:rebuild', updateConfigs );
}

module.exports = {
	express: middleware,
	hapi: middleware
};

/* implement like so
subscriber:
var config = {};
function updateMyConfig ( newconfig, request, response, next ) {
	config = newconfig;
	if ( next ) {
		next();
	}
}
function someMiddleware ( request, response, next ) {
	request.on( 'testing:updateConfig', updateMyConfig );
}
publisher:
function announceUpdate ( request, response, next ) {
	
	request.emit( 'config:update', request, response, next );
}
function 
*/
