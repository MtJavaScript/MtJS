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