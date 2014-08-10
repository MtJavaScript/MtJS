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