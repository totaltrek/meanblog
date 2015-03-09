module.exports = function extend ( into, from ) {
	var	key;

	Object.keys( from ).forEach( function ( key ) {
		into[ key ] = from[ key ];
	});
	return into;
};
