Mt.TraitClass = function(){};

Mt.TraitClass.prototype = {
	initId: function(){
		var me = this,
			prefix = me.prefix || Mt.prefix;
		
		me.id = me.id || Mt.id(null, prefix);
		
		Mt.addWidget(me.id, me);
	},
	initPlugins: function(){
		var me = this,
			widget = me,
			plugin,
			objectPlugin,
			pluginConfig;
		
		if(me.plugins !== undefined){
			me.$plugins = me.plugins;
			//me.$plugins = me.$plugins.concat( me.plugins );
			delete me.plugins;
		}
		
		if(me.$plugins === undefined){
			return;
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
};