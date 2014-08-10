Mt.Class('Mt.Button', {
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
		me.addEvents('click', 'mousedown', 'mouseup', 'mouseover', 'mouseout');
		me.setHandlers();
	},
	cls: 'mt mt-button',
	text: '',
	height: 28,
	paddingTextWidth: 5,
	render: function(){
		var me = this,
			renderTo = me.renderTo || document.body,
			el = document.createElement('div'),
			width = 0;
		
		if( me.width ){
			width = me.width;
		}
		else{
			width = me.paddingTextWidth * 2;
			width += me.text.length * 7;
		}
		
		el.className = me.cls;
		el.style.width = width + 'px';
		el.style.height = me.height + 'px';
		
		el.innerHTML = [
			'<div class="mt-button-text">',
				me.text,
			'</div>'
		].join('');
		
		me.el = Mt.get( renderTo.appendChild(el) );
	},
	setHandlers: function(){
		var me = this,
			el = me.el;
		
		el.on('click', me.onClick, me);
		el.on('mousedown', me.onMouseDown, me);
		el.on('mouseup', me.onMouseUp, me);
		el.on('mouseover', me.onMouseOver, me);
		el.on('mouseout', me.onMouseOut, me);
	},
	onClick: function(){
		var me = this;
		
		me.fireEvent('click');
		//console.log('onClick');
	},
	onMouseDown: function(){
		var me = this;
		
		me.fireEvent('mousedown');
		//console.log('onMouseDown');
	},
	onMouseUp: function(){
		var me = this;
		
		me.fireEvent('mouseup');
		//console.log('onMouseUp');
	},
	onMouseOver: function(){
		var me = this;
		
		me.fireEvent('mouseover');
		//console.log('onMouseOver');
	},
	onMouseOut: function(){
		var me = this;
		
		me.fireEvent('mouseout');
		//console.log('onMouseOut');
	}
});