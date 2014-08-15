Mt.Class('Mt.Button', {
	extend: Mt.Widget,
	constructor: function(){
		var me = this;
		
		me.Super('const', arguments);
	},
	init: function(){
		var me = this;
		
		me.addEvents('click', 'mousedown', 'mouseup', 'mouseover', 'mouseout');
		me.Super('init', arguments);
		
		me.render();
		me.setOns();
	},
	setOns: function(){
		var me = this,
			el = me.el;
		
		el.on('click', me.onClick, me);
		el.on('mousedown', me.onMouseDown, me);
		el.on('mouseup', me.onMouseUp, me);
		el.on('mouseover', me.onMouseOver, me);
		el.on('mouseout', me.onMouseOut, me);
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
		
		me.fire('beforerender');
		
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
		
		me.fire('afterrender');
		me.fire('render');
	},
	onClick: function(){
		var me = this;
		
		me.fire('click');
		//console.log('onClick');
	},
	onMouseDown: function(){
		var me = this;
		
		me.fire('mousedown');
		//console.log('onMouseDown');
	},
	onMouseUp: function(){
		var me = this;
		
		me.fire('mouseup');
		//console.log('onMouseUp');
	},
	onMouseOver: function(){
		var me = this;
		
		me.fire('mouseover');
		//console.log('onMouseOver');
	},
	onMouseOut: function(){
		var me = this;
		
		me.fire('mouseout');
		//console.log('onMouseOut');
	}
});