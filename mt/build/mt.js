/*!
*  Mt JS is small JavaScript RIA library
*  Licence MIT
*  Author: Mikhail Tatsky - JavaScript Arhitect
*  http://ru.linkedin.com/pub/mikhail-tatsky/4b/69a/804/
*  Connect with me if want to hire
*/

"use strict";
var Mt = {
	global: this,
	version: '0.0.2'
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

	var toString = Object.prototype.toString,
		typeToString = toString.call(value);

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

Mt.isArray = ('isArray' in Array) ? Array.isArray : function(value){
	var toString = Object.prototype.toString;
	
    return toString.call(value) === '[object Array]';
};

Mt.isObject = function(value){
	var toString = Object.prototype.toString;
	
	return toString.call(value) === '[object Object]';
};

Mt.isFunction = function(value){
	var toString = Object.prototype.toString;
	
    return toString.apply(value) === '[object Function]';
};

Mt.isString = function(value){
    return typeof value === 'string';
};

Mt.isBoolean = function(value){
    return typeof value === 'boolean';
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

Mt.trait = function(proto, traits){
	if( traits.classes ){
		var i = 0,
			classes = traits.classes,
			length = classes.length;
		
		if( Mt.typeOf( traits.classes[0] ) === 'object' ){
			for(;i<length;i++){
				var item = classes[i],
					_class = item._class,
					methods = item.methods,
					j = 0,
					jL = methods.length;
					
				for(;j<jL;j++){
					var methodName = methods[j];
					proto[methodName] = _class['prototype'][methodName];
				}
			}
		}
		else{
			for(;i<length;i++){
				Mt.apply(proto, classes[i]['prototype']);
			}
		}
	}

	if( traits.methods ){
		var i = 0,
			methods = traits.methods,
			length = methods.length,
			methodObject;
		
		for(;i<length;i++){
			methodObject = methods[i];
			proto[methodObject.name] = methodObject.method;
		}
	}
};

//that avoid multiple appying in deep class inheritance
Mt.applyConfig = function(object, config){
	var property,
		config = config || {};
	
	if(object._isConfigApplied === true){
		return object;
	}
	
    for(property in config){
		object[property] = config[property];
    }
	object._isConfigApplied = true;
	
    return object;
};

Mt.apply(Mt, {
	prefix: 'mt-gen',
	idSeed: 0,
	id: function(el, prefix){
		if(!el){
			return (prefix || Mt.prefix) + (++ZG.idSeed);
		}
		el = el.dom || {};
		if(!el.id){
			el.id = (prefix || Mt.prefix) + (++ZG.idSeed);
		}
		return el.id;
	}
});
Mt.Collection = function(arr){
	var me = this;
	
	me.items = [];
	me.keys = [];
	me.map = {};
	me.indexMap = {};
	me.length = 0;
	
	if( arr ){
		if(arr.length > 0){
			var i = 0,
				iL = arr.length;
			
			for(;i<iL;i++){
				me.add(i, arr[i]);
			}
		}
		else{
			for(var p in arr){
				me.add(p, arr[p]);
			}
		}
	}
};

Mt.Collection.prototype = {
	add: function(key, value){
		var me = this;
		
		me.items.push(value);
		me.keys.push(key);
		me.map[key] = value;
		me.indexMap[key] = me.length;
		me.length++;
	},
	remove: function(key){
		var me = this,
			index = me.indexMap[key];
		
		me.items.splice(index, 1);
		me.keys.splice(index, 1);
		delete me.indexMap[index];
		delete me.map[key];
		me.length--;
	},
	removeAll: function(){
		var me = this;
		
		me.items = [];
		me.keys = [];
		me.indexMap = {};
		me.map = {};
		me.length = 0;
	},
	get: function(key){
		var me = this;
		
		return me.map[key];
	},
	each: function(fn){
		var me = this,
			i = 0,
			iL = me.length;
		
		for(;i<iL;i++){
			fn(me.keys[i], me.items[i], i, me.length);
		}
	}
};
(function(){

var $classes = {},
	$types = {};

var applyIf = function(Child, Parent){
	for(var p in Parent.prototype){
		if(Child.prototype[p] === undefined){
			Child.prototype[p] = Parent.prototype[p];
		}
	}
};

var ClassManager = function(){};
ClassManager.prototype = {
	items: new Mt.Collection(),
	add: function(key, value){
		var parts = key.split("."),
			i = 1,
			iL = parts.length - 1;
		
		Mt.ns(key);
		
		var ref = Mt.global[parts[0]];
		
		for(;i<iL;i++){
			ref = ref[parts[i]];
		}
		
		if(parts.length > 1){
			ref[parts[parts.length - 1]] = value;
		}
		else{
			Mt.global[parts[0]] = value;
		}
		
		this.items.add(key, value);
	},
	get: function(key){
		return this.items.get(key);
	}
};

Mt.ClassManager = new ClassManager();

Mt.Class = function(name, config){
	var config = config || {},
		names = [];
	
	if( Mt.isArray(name) ){
		names = name;
		name = names[0];
	}
	
	if(config.constructor === Object){
		if(config.extend === undefined){
			config.constructor = function(){
				
			};
		}
		else{
			config.constructor = function(){
				this.Super('constructor', arguments);
			};
		}
	}
	
	if(config.extend === undefined){
		$classes[name] = config.constructor;
	}
	else{
		$classes[name] = config.constructor;
		
		var extendClass;
		switch(typeof config.extend){
			case 'string':
				extendClass = Mt.ClassManager.get(config.extend);
				$classes[name].prototype.$Super = Mt.ClassManager.get(config.extend);
				break;
			case 'function':
				extendClass = config.extend;
				$classes[name].prototype.$Super = config.extend;
				break;
		}
		delete config.extend;
		
		$classes[name].prototype.Super = function(method, args){
			var me = this;
			//console.log(me.$Super.prototype.$name);
			if( me.$Iam ){
				me.$Iam = Mt.ClassManager.get( me.$Iam.prototype.$Super.prototype.$name );
			}
			else{
				me.$Iam = Mt.ClassManager.get( me.$Super.prototype.$name );
			}
			//console.log(config);
			switch(method){
				case 'const':
				case 'constructor':
					me.$Iam.apply(me, args);
				break;
				default:
					//console.log(me.$Iam, method, name, config);
					//console.log(me.$Iam);
					me.$Iam.prototype[method].apply(me, args);
			}
			
			delete me.$Iam;
		};
		applyIf($classes[name], extendClass);
	}
	
	$classes[name].prototype.$name = name;
	
	if(config.traits){
		Mt.trait( $classes[name].prototype, config.traits );
		delete $classes[name].prototype.traits;
	}
	
	if(config.plugins !== undefined){
		if( $classes[name].prototype.$plugins === undefined ){
			$classes[name].prototype.$plugins = [];
		}
		
		$classes[name].prototype.$plugins = $classes[name].prototype.$plugins.concat( config.plugins );
		delete $classes[name].prototype.plugins;
	}
	
	for(var p in config){
		$classes[name].prototype[p] = config[p];
	}
	
	var _classRef = $classes[name];
	
	if( config.singleton === true ){
		delete $classes[name];
		_classRef = new _classRef(config);
		$classes[name] = _classRef;
		
	}
	
	if( names.length > 1 ){
		Mt.each(names, function(name){
			Mt.ClassManager.add(name, _classRef);
		});
	}
	else{
		Mt.ClassManager.add(name, _classRef);
	}
	
	if(config.type){
		$types[config.type] = _classRef;
		Mt.addWidgetType(config.type, _classRef);
	}
	else if(config.ptype){
		$types[config.type] = _classRef;
		Mt.addPluginByType(config.ptype, _classRef);
	}
};

Mt.getClassByType = function(type){
	return $types[type];
};

})();
Mt.Class('Mt.Data', {
	constructor: function(data){
		var me = this;
		
		me.map = {};
		
		if(data){
			var i = 0,
				length = data.length,
				map = me.map;
				
			for(;i<length;i++){
				map[i] = data[i];
			}
		}
		
		me.length = 0;
	},
	add: function(key, value){
		var me = this;
		me.map[key] = value;
		me.length++;
	},
	get: function(key){
		return this.map[key];
	}
});
Mt.Class('Mt.PluginManager', {
	singleton: true,
	constructor: function(){
		var me = this;
		me.ptypes = new Mt.Data();
	},
	addPlugin: function(ptype, plugin){
		this.ptypes.add(ptype, plugin);
	},
	getPlugin: function(ptype){
		return this.ptypes.get(ptype);		
	}
});

Mt.addPluginByType = function(ptype, plugin){
	Mt.PluginManager.addPlugin(ptype, plugin);
};

Mt.getPluginByType = function(ptype){
	return Mt.PluginManager.getPlugin(ptype);
};
Mt.Class('Mt.WidgetManager', {
	singleton: true,
	constructor: function(){
		var me = this;
		me.wtypes = new Mt.Data();
		me.widgets = new Mt.Data();
	},
	addWidgetType: function(wtype, widget){
		widget.prototype.wtype = wtype;
		this.wtypes.add(wtype, widget);
	},
	getWidgetClassByType: function(wtype){
		return this.wtypes.get(wtype);		
	},
	addWidget: function(id, widget){
		this.widgets.add(id, widget);
	},
	getWidget: function(id){
		return this.widgets.get(id);	
	}
});

Mt.addWidgetType = function(wtype, widget){
	Mt.WidgetManager.addWidgetType(wtype, widget);
};

Mt.getWidgetClassByType = function(wtype){
	return Mt.WidgetManager.getWidgetClassByType(wtype);
};

Mt.addWidget = function(id, widget){
	Mt.WidgetManager.addWidget(id, widget);
};

Mt.getWidget = function(id){
	return Mt.WidgetManager.getWidget(id);
};
//"use strict";
Mt.Class('Mt.Observable', {
	constructor: function(config){
		var me = this,
			config = config || {};
	
		Mt.applyConfig(me, config);
		
		me.events = {};
		if(me.listeners){
			var listeners = me.listeners,
				i = 0,
				length = listeners.length;
			
			for(;i<length;i++){
				var lis = listeners[i],
					eventName = null,
					handler = null,
					scope = null,
					params = [];
				
				for(var p in lis){
					if(p === 'scope'){
						scope = lis[p];
					}
					else if(p === 'params'){
						params = lis[p];
					}
					else{
						eventName = p;
						handler = lis[p];
					}
				}
				
				if(eventName === null || Mt.isFunction(handler) === false){
					throw new Error('Event was not set');
				}
				
				if(Mt.isArray(params) === false){
					throw new Error('params must be array');
				}
				
				me.addEvent(eventName);
				me.on(eventName, handler, scope, params);
			}
		}
	},
	on: function(eventName, fn, scope, params){
		if( this.events[eventName] === undefined ){
			console.log(arguments);
			throw new Error('Event name is not set: ' + eventName);
		}
		this.events[eventName].push({
			fn:fn,
			scope: scope,
			params: params || []
		});
	},
	un: function(eventName, fn){
		var me = this,
			eventListeners = me.events[eventName];
		
		if(!eventListeners){
			return false;
		}
		
		var i = 0,
			length = eventListeners.length;
			
		for(;i<length;i++){
			var lis = eventListeners[i];
			if(lis.fn === fn){
				eventListeners.splice(i, 1);
				return true;
			}
		}
		return false;
	},
	once: function(eventName, fn, scope){
		var me = this,
			fnWrapper = function(){
				fn.apply(this, arguments);
				me.un(eventName, fnWrapper);
			};
		
		me.on(eventName, fnWrapper, scope);
	},
	unAll: function(){
		this.events = {};
	},
	unAllByType: function(eventName){
		this.events[eventName] = [];
	},
	fireEvent: function(eventName){
		var me = this,
			eventListeners = me.events[eventName];
		if(!eventListeners){
			return false;
		}
		
		var i = 1,
			length = arguments.length,		
			args = [me];
			
		for(;i<length;i++){
			args.push(arguments[i]);
		}
		
		var i = 0,
			length = eventListeners.length;
		
		for(;i<length;i++){
			var lis = eventListeners[i],
				_args = [];
			
			_args = _args.concat(args);
			if( lis.params ){
				_args = _args.concat(lis.params);
			}
			
			lis.fn.apply(lis.scope || me, _args);
		}
	},
	addEvent: function(eventName){
		var me = this;
		
		me.events[eventName] = me.events[eventName] || [];
	},
	addEvents: function(eventName){
		var me = this;
		if(arguments.length > 1){
			var tempEventName = [],
				i = 0,
				length = arguments.length;
				
			for(;i<length;i++){
				tempEventName[i] = arguments[i];
			}
			eventName = tempEventName;
		}
		if(Mt.typeOf(eventName) === 'string'){			
			me.events[eventName] = me.events[eventName] || [];
		}
		else if(Mt.typeOf(eventName) === 'array'){
			var i = 0,
				length = eventName.length;
			
			for(; i < length; i++){
				me.events[eventName[i]] = me.events[eventName[i]] || [];
			}
		}
	},
	has: function(eventName){
		var lis = this.events[eventName];
		if(!lis){
			return false;
		}
		
		return lis.length !== 0;
	}
});
Mt.Class('Mt.TraitWidget', {
	initId: function(){
		var me = this,
			prefix = me.prefix || Mt.prefix;
		
		me.id = me.id || Mt.id(null, prefix);
		
		Mt.addWidget(me.id, me);
	},
	initPlugins: function(widget){
		var me = this,
			plugin,
			objectPlugin,
			pluginConfig;
		
		if(me.plugins !== undefined){
			me.$plugins = me.plugins;
			//me.$plugins = me.$plugins.concat( me.plugins );
			delete me.plugins;
		}
		
		var i = 0,
			plugins = me.$plugins,
			iL = plugins.length,
			inWidgetName;
		
		//console.log(plugins);
		
		for(;i<iL;i++){
			pluginConfig = plugins[i];
			pluginConfig.widget = widget;
			
			var type = pluginConfig.type || pluginConfig.ptype;
			plugin = Mt.getPluginByType( type );
			//console.log(pluginConfig);
			objectPlugin = new plugin(pluginConfig);
			inWidgetName = pluginConfig.inWidgetName || objectPlugin.inWidgetName;
			
			if(inWidgetName !== undefined){
				widget[ inWidgetName ] = objectPlugin;
			}
		}
	}
});
Mt.$ = $;

/*
	Mt.Element
*/
Mt.get = function(id){
	var type = Mt.typeOf(id);
	
	switch(type){
		case 'string':
			return new Mt.Element(Mt.$('#'+id)[0]);
			break;
		default:
			return new Mt.Element(id);
			break;
	}
};

Mt.Element = function(dom){
	var me = this;
	
	me.dom = dom;
	me.$dom = Mt.$(dom);
};

Mt.Element.prototype = {
	on: function(eventName, fn, scope){
		var me = this;
		if( scope ){
			me.$dom.bind(eventName, $.proxy(fn, scope));
		}
		else{
			me.$dom.bind(eventName, fn);
		}
	},
	un: function(){
		
	},
	getByClass: function(cls){
		return this.dom.getElementsByClassName(cls)[0];
	}
};

/*
	Mt.onReady
*/

Mt.onReady = function(fn){
	$(document).ready(fn);
};
Mt.Class('Mt.Model', {
	constructor: function(data){
		var me = this;
		
		me.data = data;
    }
});
Mt.Class('Mt.Store', {
	extend: 'Mt.Observable',
	constructor: function(config){
		var me = this,
			config = config || {};
		
		me.data = [];
		if(config.data){
			me.setData(config.data);
			delete config.data;
		}
		
		Mt.apply(me, config);
		
		me.Super('constructor', arguments);
    },
	setData: function(data){
		var me = this,
			i = 0,
			iL = data.length;
		
		for(;i<iL;i++){
			me.data[i] = new Mt.Model(data[i]);
		}
	}
});
Mt.Class('Mt.Button', {
	extend: Mt.Observable,
	constructor: function(config){
		var me = this,
			config = config || {};
		
		Mt.apply(me, config);
		
		me.Super('constructor', arguments);
		me.init();
	},
	init: function(){
		var me = this;
		
		me.render();
		me.addEvents('click', 'mousedown', 'mouseup', 'mouseover', 'mouseout');
		me.setHandlers();
	},
	cls: 'mt mt-button',
	text: '',
	height: 28,
	paddingTextWidth: 5,
	render: function(){
		var me = this,
			renderTo = me.renderTo || document.body,
			el = document.createElement('div'),
			width = 0;
		
		if( me.width ){
			width = me.width;
		}
		else{
			width = me.paddingTextWidth * 2;
			width += me.text.length * 7;
		}
		
		el.className = me.cls;
		el.style.width = width + 'px';
		el.style.height = me.height + 'px';
		
		el.innerHTML = [
			'<div class="mt-button-text">',
				me.text,
			'</div>'
		].join('');
		
		me.el = Mt.get( renderTo.appendChild(el) );
	},
	setHandlers: function(){
		var me = this,
			el = me.el;
		
		el.on('click', me.onClick, me);
		el.on('mousedown', me.onMouseDown, me);
		el.on('mouseup', me.onMouseUp, me);
		el.on('mouseover', me.onMouseOver, me);
		el.on('mouseout', me.onMouseOut, me);
	},
	onClick: function(){
		var me = this;
		
		me.fireEvent('click');
		//console.log('onClick');
	},
	onMouseDown: function(){
		var me = this;
		
		me.fireEvent('mousedown');
		//console.log('onMouseDown');
	},
	onMouseUp: function(){
		var me = this;
		
		me.fireEvent('mouseup');
		//console.log('onMouseUp');
	},
	onMouseOver: function(){
		var me = this;
		
		me.fireEvent('mouseover');
		//console.log('onMouseOver');
	},
	onMouseOut: function(){
		var me = this;
		
		me.fireEvent('mouseout');
		//console.log('onMouseOut');
	}
});
Mt.Class('Mt.Field', {
	extend: Mt.Observable,
	type: 'field',
	constructor: function(config){
		var me = this,
			config = config || {};
		
		Mt.apply(me, config);
		
		me.Super('constructor', arguments);
		me.init();
	},
	init: function(){
		var me = this;
		
		me.render();
	},
	cls: 'mt mt-field',
	value: '',
	width: 100,
	emptyText: '',
	render: function(){
		var me = this,
			renderTo = me.renderTo || document.body,
			el = document.createElement('div'),
			width = 0;
		
		el.className = me.cls;
		//el.style.width = width + 'px';
		//el.style.height = me.height + 'px';
		
		el.innerHTML = [
			'<div class="mt-field-label">',
				me.label + ':',
			'</div>',
			'<div class="mt-field-text">',
				'<input placeholder="' + me.emptyText + '" type="text" class="mt-field-text-input" style="width: ' + me.width + 'px;" value="' + me.value + '">',
			'</div>'
		].join('');
		
		me.el = renderTo.appendChild(el);
	}
});
Mt.Class('Mt.Panel', {
	extend: Mt.Observable,
	constructor: function(config){
		var me = this,
			config = config || {};
		
		Mt.apply(me, config);
		
		me.Super('constructor', arguments);
		me.init();
	},
	init: function(){
		var me = this;
		
		me.render();
	},
	cls: 'mt mt-panel',
	value: '',
	width: 300,
	height: 200,
	title: '',
	frame: false,
	shadow: true,
	render: function(){
		var me = this,
			renderTo = me.renderTo || document.body,
			el = document.createElement('div'),
			cls = me.cls;
		
		if( me.shadow ){
			cls += ' mt-shadow';
		}
		
		el.className = cls;
		el.style.width = me.width + 'px';
		el.style.height = me.height + 'px';
		
		el.innerHTML = [
			'<div class="mt-panel-header">',
				'<div class="mt-panel-header-text">',
					me.title,
				'</div>',
			'</div>',
			'<div style="height: ' + (me.height-34) + 'px;width: ' + (me.width-2) + 'px;" class="mt-panel-body ' + '' + '">',
				
			'</div>'
		].join('');
		
		me.el = renderTo.appendChild(el);
	}
});
Mt.Class('Mt.TextArea', {
	extend: Mt.Observable,
	type: 'textarea',
	constructor: function(config){
		var me = this,
			config = config || {};
		
		Mt.apply(me, config);
		
		me.Super('constructor', arguments);
		me.init();
	},
	init: function(){
		var me = this;
		
		me.render();
	},
	cls: 'mt mt-textarea',
	value: '',
	width: 250,
	height: 100,
	emptyText: '',
	render: function(){
		var me = this,
			renderTo = me.renderTo || document.body,
			el = document.createElement('div'),
			width = 0;
		
		el.className = me.cls;
		//el.style.width = width + 'px';
		//el.style.height = me.height + 'px';
		
		el.innerHTML = [
			'<div class="mt-textarea-label">',
				me.label + ':',
			'</div>',
			'<div class="mt-textarea-text">',
				'<textarea autocomplete="off" placeholder="' + me.emptyText + '" type="text" class="mt-textarea-text-input" style="width: ' + me.width + 'px;height:' + me.height + 'px;" value="' + me.value + '"></textarea>',
			'</div>'
		].join('');
		
		me.el = renderTo.appendChild(el);
	}
});
Mt.Class('Mt.Grid', {
	extend: 'Mt.Observable',
	width: 200,
	height: 200,
	cls: 'mt mt-grid',
	cellWidth: 70,
	cellHeight: 32,
	header: true,
	constructor: function(config){
		var me = this,
			config = config || {};
		
		Mt.apply(me, config);
		
		me.Super('constructor', arguments);
		
		me.addEvent('afterrender');
		me.init();
    },
	init: function(){
		var me = this;
		
		me.render();
		me.initElements();
		me.fireEvent('afterrender');
		//me.update();
	},
	initElements: function(){
		var me = this;
		
		if( me.header !== false ){
			me.header = new Mt.grid.Header({
				widget: me
			});
			
			me.leftSideHeader = new Mt.grid.Header({
				widget: me,
				left: true
			});
		}
		
		me.body = new Mt.grid.Body({
			widget: me
		});
		
		me.leftBody = new Mt.grid.Body({
			widget: me,
			left: true
		});
	},
	render: function(){
		var me = this,
			renderTo = me.renderTo || document.body,
			el = document.createElement('div');
		
		el.className = me.cls;
		el.style.width = me.width + 'px';
		el.style.height = me.height + 'px';
		
		el.innerHTML = [
			'<div class="mt-grid-left-side"></div>',
			'<div class="mt-grid-right-side">',
			'</div>'
		].join('');
		
		me.el = renderTo.appendChild(el);
	},
	update: function(){
		var me = this;
		
		me.checkRows();
		me.updateRows();
	},
	checkRows: function(){
		var me = this,
			el = me.el,
			store = me.store,
			data = store.data,
			columns = me.columns,
			tbodyEl = el.getElementsByTagName('tbody')[0],
			numTr = tbodyEl.childNodes.length - 1,
			numNewRow = data.length - numTr,
			i = 0;
		
		for(;i<numNewRow;i++){
			var rowHTML = '',
				tr = document.createElement('tr'),
				j = 0,
				jL = columns.length;
			
			for(;j<jL;j++){
				rowHTML += [
					'<td style="max-width: 70px;" class="mt-grid-body-td">',
						'<div class="mt-grid-body-td-text">',
							
						'</div>',
					'</td>'
				].join('');
			}
			
			tr.innerHTML = rowHTML;
			tbodyEl.appendChild(tr);
		}
	},
	updateRows: function(){
		var me = this,
			el = me.el,
			store = me.store,
			data = store.data,
			columns = me.columns;
			tbodyEl = el.getElementsByTagName('tbody')[0],
			i = 1,
			iL = data.length + 1;
		
		for(;i<iL;i++){
			var tr = tbodyEl.childNodes[i],
				rowValues = data[i - 1].data,
				j = 0,
				jL = columns.length;
			
			for(;j<jL;j++){
				var td = tr.childNodes[j],
					tdTextEl = td.firstChild,
					columnIndex = columns[j].index; 
				
				tdTextEl.innerHTML = rowValues[columnIndex];
			}
		}
	}
});
Mt.Class('Mt.grid.Body', {
	extend: Mt.Observable,
	constructor: function(config){
		var me = this,
			config = config || {};
		
		Mt.apply(me, config);
		
		me.Super('constructor', arguments);
		
		me.init();
	},
	init: function(){
		var me = this;
		
		me.render();
		me.setHandlers();
	},
	setHandlers: function(){
		var me = this,
			w = me.widget;
		
		w.on('afterrender', me.onAfterRender, me);
	},
	render: function(){
		var me = this,
			w = me.widget,
			renderTo = w.el.getElementsByClassName(me.left? 'mt-grid-left-side' : 'mt-grid-right-side')[0],
			el = document.createElement('div'),
			trWithTh = '',
			columns = w.columns,
			i = 0,
			iL = columns.length;
		
		trWithTh += '<tr>';
		for(;i<iL;i++){
			var column = columns[i];
			if( (!me.left && !column.locked ) || (me.left && column.locked === true) ){
				trWithTh += '<th style="width: 60px;"></th>';
			}
		}
		trWithTh += '</tr>';
		
		el.className = 'mt-grid-body';
		//el.style.width = me.width + 'px';
		//el.style.height = me.height + 'px';
		el.innerHTML = [
			'<table style="">',
				'<tbody class="mt-grid-body">',
					trWithTh,
				'</tbody>',
			'</table>'
		].join('');
		
		me.el = renderTo.appendChild(el);
	},
	onAfterRender: function(){
		var me = this;
		
		me.update();
	},
	update: function(){
		var me = this;
		
		me.checkRows();
		me.updateRows();
	},
	checkRows: function(){
		var me = this,
			w = me.widget,
			el = me.el,
			store = w.store,
			data = store.data,
			columns = w.columns,
			tbodyEl = el.getElementsByTagName('tbody')[0],
			numTr = tbodyEl.childNodes.length - 1,
			numNewRow = data.length - numTr,
			i = 0;
		
		for(;i<numNewRow;i++){
			var rowHTML = '',
				tr = document.createElement('tr'),
				j = 0,
				jL = columns.length;
			
			tr.className = (i%2 === 0)? 'mt-grid-row-odd':'mt-grid-row-even';
			
			for(;j<jL;j++){
				var column = columns[j];
				if( (!me.left && !column.locked ) || (me.left && column.locked === true) ){
					rowHTML += [
						'<td style="max-width: 60px;" class="mt-grid-body-td">',
							'<div class="mt-grid-body-td-text">',
								
							'</div>',
						'</td>'
					].join('');
				}
			}
			
			tr.innerHTML = rowHTML;
			tbodyEl.appendChild(tr);
		}
	},
	updateRows: function(){
		var me = this,
			w = me.widget,
			el = me.el,
			store = w.store,
			data = store.data,
			columns = w.columns;
			tbodyEl = el.getElementsByTagName('tbody')[0],
			i = 1,
			iL = data.length + 1;
		
		for(;i<iL;i++){
			var tr = tbodyEl.childNodes[i],
				rowValues = data[i - 1].data,
				j = 0,
				jL = columns.length,
				lockedColumn = 0;
			
			for(;j<jL;j++){
				var column = columns[j];
				
				if( (!me.left && !column.locked ) ){
					var td = tr.childNodes[j - lockedColumn],
						tdTextEl = td.firstChild,
						columnIndex = column.index; 
				
					tdTextEl.innerHTML = rowValues[columnIndex];
				}
				else if( me.left && column.locked === true ){
					var td = tr.childNodes[j - (j - lockedColumn)],
						tdTextEl = td.firstChild,
						columnIndex = column.index; 
				
					tdTextEl.innerHTML = rowValues[columnIndex];
				}
				
				if(column.locked){
					lockedColumn++;
				}
			}
		}
	}
});
Mt.Class('Mt.grid.Header', {
	extend: Mt.Observable,
	constructor: function(config){
		var me = this,
			config = config || {};
		
		Mt.apply(me, config);
		
		me.Super('constructor', arguments);
		
		me.init();
	},
	init: function(){
		var me = this;
		
		me.render();
		me.setHandlers();
	},
	setHandlers: function(){
		var me = this,
			w = me.widget;
		
		w.on('afterrender', me.onAfterRender, me);
	},
	render: function(){
		var me = this,
			w = me.widget,
			columns = w.columns,
			renderTo = w.el.getElementsByClassName(me.left? 'mt-grid-left-side' : 'mt-grid-right-side')[0],
			el = document.createElement('div'),
			html = '',
			i = 0,
			iL = columns.length;
		
		for(;i<iL;i++){
			var column = columns[i];
			
			if( (!me.left && !column.locked ) || (me.left && column.locked === true) ){
				html += [
					'<div style="width:50px;" class="mt-grid-header-cell">',
						'<div class="mt-grid-header-cell-text">',
							column.title,
						'</div>',
					'</div>'
				].join('');
			}
		}
		
		el.className = 'mt-grid-header';		
		el.innerHTML = html;
		
		me.el = renderTo.appendChild(el);
	},
	onAfterRender: function(){
		var me = this;
		
	}
});
