/**
*  Mt JS is small JavaScript RIA library
*  Licence MIT
*  Author: Mikhail Tatsky - JavaScript Arhitect
*  http://ru.linkedin.com/pub/mikhail-tatsky/4b/69a/804/
*  Connect with me if want to hire
*/

"use strict";
var Mt = {
	global: this,
	version: '0.0.1'
};

Mt.apply = function(to, from){
	for(var p in from){
		to[p] = from[p];
	}
};

Mt.applyIf = function(to, from){
	for(var p in from){
		if( to[p] === undefined ){
			to[p] = from[p];
		}
	}
};

Mt.namespace = function(){
	var i = 0,
		iL = arguments.length;
	
	for(;i<iL;i++){
		var value = arguments[i],
			parts = value.split("."),
			j = 1,
			jL = parts.length;
		
		Mt.global[parts[0]] = Mt.global[parts[0]] || {};
		var namespace = Mt.global[parts[0]];
		
		for(;j<jL;j++){
			namespace[parts[j]] = namespace[parts[j]] || {};
			namespace = namespace[parts[j]];
		}
	}
};

Mt.ns = Mt.namespace;

Mt.typeOf = function(value){
	if(value === null) {
        return 'null';
	}

	var type = typeof value;
	if(type === 'undefined' || type === 'string' || type === 'number' || type === 'boolean') {
		return type;
	}

	var typeToString = toString.call(value);

	switch(typeToString){
		case '[object Array]':
			return 'array';
		case '[object Date]':
			return 'date';
		case '[object Boolean]':
			return 'boolean';
		case '[object Number]':
			return 'number';
		case '[object RegExp]':
			return 'regexp';
	}

	if(type === 'function'){
		return 'function';
	}

	if(type === 'object'){
		return 'object';
	}
};

Mt.each = function(arrayObject, fn){
	var a = arrayObject,
		type = Mt.typeOf(arrayObject);

	switch(type){
		case 'array':
			var i = 0,
				iL = a.length;

			for(;i<iL;i++){
				fn(arrayObject[i], i, arrayObject);
			}
			break;
		case 'object':
			var p;

			for(p in arrayObject){
				fn(arrayObject[p], p, arrayObject);
			}
			break;
	}
};