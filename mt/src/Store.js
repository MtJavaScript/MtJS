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