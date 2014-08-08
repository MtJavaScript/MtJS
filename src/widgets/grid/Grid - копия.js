Mt.Class('Mt.Grid', {
	extend: 'Mt.Observable',
	width: 200,
	height: 200,
	cls: 'mt-grid mt-clear-padding-marging',
	cellWidth: 70,
	cellHeight: 32,
	header: true,
	constructor: function(config){
		var me = this,
			config = config || {};
		
		Mt.apply(me, config);
		
		me.Super('constructor', arguments);
		
		me.addEvent();
		me.init();
    },
	init: function(){
		var me = this;
		
		me.initElements();
		//me.render();
		//me.update();
	},
	initElements: function(){
		var me = this;
		
		me.body = new Mt.grid.Body({
			widget: me
		});
		
		me.header = new Mt.grid.Header({
			widget: me
		});
	},
	render: function(){
		var me = this,
			renderTo = me.renderTo || document.body,
			el = document.createElement('div'),
			trWithTh = '',
			i = 0,
			iL = me.columns.length;
		
		trWithTh += '<tr>';
		for(;i<iL;i++){
			trWithTh += '<th style="width: 70px;"></th>';
		}
		trWithTh += '</tr>';
		
		el.className = me.cls;
		el.style.width = me.width + 'px';
		el.style.height = me.height + 'px';
		el.innerHTML = [
			'<table style="width:200px; height: 200px;">',
				'<tbody class="mt-grid-body">',
					trWithTh,
				'</tbody>',
			'</table>'
		].join('');
		
		me.el = renderTo.appendChild(el);
	},
	update: function(){
		var me = this;
		
		me.checkRows();
		me.updateRows();
	},
	checkRows: function(){
		var me = this,
			el = me.el,
			store = me.store,
			data = store.data,
			columns = me.columns,
			tbodyEl = el.getElementsByTagName('tbody')[0],
			numTr = tbodyEl.childNodes.length - 1,
			numNewRow = data.length - numTr,
			i = 0;
		
		for(;i<numNewRow;i++){
			var rowHTML = '',
				tr = document.createElement('tr'),
				j = 0,
				jL = columns.length;
			
			for(;j<jL;j++){
				rowHTML += [
					'<td style="max-width: 70px;" class="mt-grid-body-td">',
						'<div class="mt-grid-body-td-text">',
							
						'</div>',
					'</td>'
				].join('');
			}
			
			tr.innerHTML = rowHTML;
			tbodyEl.appendChild(tr);
		}
	},
	updateRows: function(){
		var me = this,
			el = me.el,
			store = me.store,
			data = store.data,
			columns = me.columns;
			tbodyEl = el.getElementsByTagName('tbody')[0],
			i = 1,
			iL = data.length + 1;
		
		for(;i<iL;i++){
			var tr = tbodyEl.childNodes[i],
				rowValues = data[i - 1].data,
				j = 0,
				jL = columns.length;
			
			for(;j<jL;j++){
				var td = tr.childNodes[j],
					tdTextEl = td.firstChild,
					columnIndex = columns[j].index; 
				
				tdTextEl.innerHTML = rowValues[columnIndex];
			}
		}
	}
});