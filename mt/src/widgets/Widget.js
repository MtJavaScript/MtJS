Mt.Class('Mt.Widget', {
	extend: Mt.Event,
	constructor: function(config){
		var me = this;
		
		Mt.applyConfig(me, config);
		
		me.Super('const', arguments);
		
		me.init();
	},
	init: function(){
		var me = this;
		
		me.initId();
		me.addEvents('beforerender', 'afterrender', 'render', 'show', 'hide', 'destroy');
		me.initPlugins();
	},
	renderItems: function(renderTo){
		var me = this,
			i = 0,
			iL = me.items.length;
		
		for(;i<iL;i++){
			var item = me.items[i],
				w = Mt.getClassByType(item.type);
			
			item.renderTo = renderTo;
			me.items[i] = new w(item);
		}
	}
});