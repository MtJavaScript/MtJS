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