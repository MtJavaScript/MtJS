Mt.Class('Mt.Panel', {
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
	},
	cls: 'mt-panel mt-clear-padding-marging',
	value: '',
	width: 300,
	height: 200,
	title: '',
	frame: false,
	shadow: true,
	render: function(){
		var me = this,
			renderTo = me.renderTo || document.body,
			el = document.createElement('div'),
			cls = me.cls;
		
		if( me.shadow ){
			cls += ' mt-shadow';
		}
		
		el.className = cls;
		el.style.width = me.width + 'px';
		el.style.height = me.height + 'px';
		
		el.innerHTML = [
			'<div class="mt-panel-header">',
				'<div class="mt-panel-header-text">',
					me.title,
				'</div>',
			'</div>',
			'<div style="height: ' + (me.height-34) + 'px;width: ' + (me.width-2) + 'px;" class="mt-panel-body ' + '' + '">',
				
			'</div>'
		].join('');
		
		me.el = renderTo.appendChild(el);
	}
});