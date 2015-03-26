/* requires */
/* logging first */
var log = require( './log' );
// third party
var express = require( 'express' ); // http wiring framework
var Session = require( 'express-session' ); // session plugin for express
// published
var Velvetrope = require( 'velvetrope' ); // vulnerability scanner
var Charmed = require( 'charmed' ); // character escapes conversion
// local
var Conf = require( './conf' ); // configurator
var Lib = require( './lib' ); // common processes - keep very small
var Login = require( './login' ); // logged-out interface
var Models = require( './models' ); // data models 
var Orm = require( './orm-adapter' ); // orm event and request hooks
var Controllers = require( './controllers' ); // event hooks for logic
var Services = require( './services' ); // async services
var Gateway = require( './gateway' ); // router

/* app inits */
var app = express();
app.set( 'lib', Lib );
var config = Conf( app );
app.set( 'config', config );

/* the point is not to use express too much, just enough
app.set( config.app );
// app.set( lib ); // what does this actually do?
app.locals.config = config;
app.locals.lib = lib;
*/

/* class inits */
// var lib = Lib.init( config.lib ); // lib doesn't need configuration
var velvetrope = Velvetrope.init( config.velvetrope );
var session = Session( config.session );
var charmed = Charmed.init( config.charmed );
var login = Login.init( config.login );
var models = Models.init( config.model );
var orm = Orm.init( config.orm );
var services = Services.init( config.services );
var controllers = Controllers.init( config.controllers );
var gateway = Gateway.init( app );

/* middlewares */
/* in order of execution */

/* safe ( no http ) */
app.use( charmed.express );
/* security */
app.use( velvetrope.express );
/* use third party anywhere below security, not above */ 
app.use( session );
/* login short-circuit */
app.use( login.express );
/* models */
app.use( models.express );
/* orm adapter */
app.use( orm.express );
/* controllers */
app.use( controllers.express );
/* services */
app.use( services.express );
/* routes */
app.use( gateway.express );

/* server */
app.listen( config.server.port, config.server.host, listening );
function listening ( req, res, next ) {
    gateway.emit( 'listening' );
}
