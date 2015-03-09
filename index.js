var express = require( 'express' );
var config = require( './conf' );
var app = express();

var Session = require( 'express-session' );
var session = Session( config.session );
app.use( session );

app.listen( config.server.port, config.server.host, listening );
function listening ( req, res, next ) {
    console.log( 'listening', config.server );
}
