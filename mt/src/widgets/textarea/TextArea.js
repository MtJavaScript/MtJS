Mt.Class('Mt.TextArea', {
	extend: Mt.Widget,
	type: 'textarea',
	constructor: function(){
		var me = this;
		
		me.Super('const', arguments);
	},
	init: function(){
		var me = this;
		
		me.addEvents();
		me.Super('init', arguments);
		
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
		
		me.fire('beforerender');
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
		
		me.fire('afterrender');
		me.fire('render');
	}
});