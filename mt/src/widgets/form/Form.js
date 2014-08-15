Mt.Class('Mt.Form', {
	extend: Mt.Widget,
	type: 'form',
	constructor: function(){
		var me = this;
		
		me.Super('const', arguments);
	},
	init: function(){
		var me = this;
		
		me.addEvents();
		me.render();
	},
	cls: 'mt mt-form',
	value: '',
	width: 200,
	emptyText: '',
	render: function(){
		var me = this,
			renderTo = me.renderTo || document.body,
			el = document.createElement('div'),
			cls = me.cls;
			
		me.fire('beforerender');
		
		el.className = me.cls;
		el.style.width = me.width + 'px';
		el.style.height = me.height + 'px';
		
		el.innerHTML = [
			'<div class="mt-form-body">',
				
			'</div>'
		].join('');
		
		me.el = Mt.get(renderTo.appendChild(el));
		me.renderItems(me.el.getByClass('mt-form-body'));
		
		me.fire('afterrender');
		me.fire('render');
	}
});