Mt.Class('Mt.grid.Header', {
	extend: Mt.Event,
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
		me.setHandlers();
	},
	setHandlers: function(){
		var me = this,
			w = me.widget;
		
		w.on('afterrender', me.onAfterRender, me);
	},
	render: function(){
		var me = this,
			w = me.widget,
			columns = w.columns,
			renderTo = w.el.getElementsByClassName(me.left? 'mt-grid-left-side' : 'mt-grid-right-side')[0],
			el = document.createElement('div'),
			html = '',
			i = 0,
			iL = columns.length;
		
		for(;i<iL;i++){
			var column = columns[i];
			
			if( (!me.left && !column.locked ) || (me.left && column.locked === true) ){
				html += [
					'<div style="width:50px;" class="mt-grid-header-cell">',
						'<div class="mt-grid-header-cell-text">',
							column.title,
						'</div>',
					'</div>'
				].join('');
			}
		}
		
		el.className = 'mt-grid-header';		
		el.innerHTML = html;
		
		me.el = renderTo.appendChild(el);
	},
	onAfterRender: function(){
		var me = this;
		
	}
});