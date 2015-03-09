/**
 * Return a deep copy of the specified object.
 *
 * This returns a new object with all elements copied from the specified
 * object.  Deep copies are made of objects and arrays so you can do anything
 * with the returned object without affecting the input object.
 *
 * @protected
 * @method cloneDeep
 * @param parent {object} The original object to copy from
 * @param [depth=20] {Integer} Maximum depth (default 20)
 * @return {object} A new object with the elements copied from the copyFrom object
 *
 * This method is copied from https://raw.githubusercontent.com/lorenwest/node-config/627d636dfb29866769f594e1344c5d1d3539694a/lib/config.js
 *
 * Copyright © 2011-2014 Paul Vorbach and contributors.
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the “Software”), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions: The above copyright notice and this permission
 * notice shall be included in all copies or substantial portions of the Software.
 */
util.cloneDeep = function cloneDeep(parent, depth, circular, prototype) {
	// maintain two arrays for circular references, where corresponding parents
	// and children have the same index
	var allParents = [];
	var allChildren = [];

	var useBuffer = typeof Buffer != 'undefined';

	if (typeof circular == 'undefined')
		circular = true;

	if (typeof depth == 'undefined')
		depth = 20;

	// recurse this function so we don't reset allParents and allChildren
	function _clone(parent, depth) {
		// cloning null always returns null
		if (parent === null)
			return null;

		if (depth == 0)
			return parent;

		var child;
		if (typeof parent != 'object') {
			return parent;
		}

		if (Utils.isArray(parent)) {
			child = [];
		} else if (Utils.isRegExp(parent)) {
			child = new RegExp(parent.source, util.getRegExpFlags(parent));
			if (parent.lastIndex) child.lastIndex = parent.lastIndex;
		} else if (Utils.isDate(parent)) {
			child = new Date(parent.getTime());
		} else if (useBuffer && Buffer.isBuffer(parent)) {
			child = new Buffer(parent.length);
			parent.copy(child);
			return child;
		} else {
			if (typeof prototype == 'undefined') child = Object.create(Object.getPrototypeOf(parent));
			else child = Object.create(prototype);
		}

		if (circular) {
			var index = allParents.indexOf(parent);

			if (index != -1) {
				return allChildren[index];
			}
			allParents.push(parent);
			allChildren.push(child);
		}

		for (var i in parent) {
			var propDescriptor  = Object.getOwnPropertyDescriptor(parent,i);
			var hasGetter = ((propDescriptor !== undefined) && (propDescriptor.get !== undefined));

			if (hasGetter){
				Object.defineProperty(child,i,propDescriptor);
			} else {
				child[i] = _clone(parent[i], depth - 1);
			}
		}

		return child;
	}

	return _clone(parent, depth);
};

