Mt.Class('Mt.Form', {
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
		me.renderItems();
	},
	cls: 'mt-form mt-clear-padding-marging',
	value: '',
	width: 300,
	width: 200,
	emptyText: '',
	render: function(){
		var me = this,
			renderTo = me.renderTo || document.body,
			el = document.createElement('div'),
			cls = me.cls;
		
		el.className = me.cls;
		el.style.width = me.width + 'px';
		el.style.height = me.height + 'px';
		
		el.innerHTML = [
			'<div class="mt-form-body">',
				
			'</div>'
		].join('');
		
		me.el = Mt.get(renderTo.appendChild(el));
	},
	renderItems: function(){
		var me = this,
			renderTo = me.el.getByClass('mt-form-body'),
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