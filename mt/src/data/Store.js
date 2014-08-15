Mt.Class('Mt.Store', {
	extend: Mt.Event,
	constructor: function(config){
		var me = this,
			config = config || {};
		
		Mt.applyConfig(me, config);
		me.data = [];
		me.setModel();
		if(config.data){
			me.setData(config.data);
			delete config.data;
		}
		
		me.Super('const', arguments);
		me.init();
    },
	init: function(){
		var me = this;
		
		me.initId();
		me.initPlugins();
	},
	setModel: function(){
		var me = this,
			model = me.model;
		
		if(!model === undefined){
			model = Mt.Model;
		}
		else{
			model = Mt.ClassManager.get(me.model);
		}
		
		me.model = model;
		me.fields = model.prototype.fields;
		if( me.fields === undefined){
			throw new Error('needed to set fields in Model of Store');
		}
	},
	setData: function(data){
		var me = this,
			i = 0,
			iL = data.length,
			model = me.model;
		
		if( Mt.isObject(data[0]) ){
			for(;i<iL;i++){
				me.data[i] = new model(data[i]);
			}
		}
		else{
			for(;i<iL;i++){
				me.data[i] = new model(data[i]);
			}
		}
	}
});