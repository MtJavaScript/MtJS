Mt.Class('Mt.grid.Body', {
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
			renderTo = w.el.getElementsByClassName(me.left? 'mt-grid-left-side' : 'mt-grid-right-side')[0],
			el = document.createElement('div'),
			trWithTh = '',
			columns = w.columns,
			i = 0,
			iL = columns.length;
		
		trWithTh += '<tr>';
		for(;i<iL;i++){
			var column = columns[i];
			if( (!me.left && !column.locked ) || (me.left && column.locked === true) ){
				trWithTh += '<th style="width: 60px;"></th>';
			}
		}
		trWithTh += '</tr>';
		
		el.className = 'mt-grid-body';
		//el.style.width = me.width + 'px';
		//el.style.height = me.height + 'px';
		el.innerHTML = [
			'<table style="">',
				'<tbody class="mt-grid-body">',
					trWithTh,
				'</tbody>',
			'</table>'
		].join('');
		
		me.el = renderTo.appendChild(el);
	},
	onAfterRender: function(){
		var me = this;
		
		me.update();
	},
	update: function(){
		var me = this;
		
		me.checkRows();
		me.updateRows();
	},
	checkRows: function(){
		var me = this,
			w = me.widget,
			el = me.el,
			store = w.store,
			data = store.data,
			columns = w.columns,
			tbodyEl = el.getElementsByTagName('tbody')[0],
			numTr = tbodyEl.childNodes.length - 1,
			numNewRow = data.length - numTr,
			i = 0;
		
		for(;i<numNewRow;i++){
			var rowHTML = '',
				tr = document.createElement('tr'),
				j = 0,
				jL = columns.length;
			
			tr.className = (i%2 === 0)? 'mt-grid-row-odd':'mt-grid-row-even';
			
			for(;j<jL;j++){
				var column = columns[j];
				if( (!me.left && !column.locked ) || (me.left && column.locked === true) ){
					rowHTML += [
						'<td style="max-width: 60px;" class="mt-grid-body-td">',
							'<div class="mt-grid-body-td-text">',
								
							'</div>',
						'</td>'
					].join('');
				}
			}
			
			tr.innerHTML = rowHTML;
			tbodyEl.appendChild(tr);
		}
	},
	updateRows: function(){
		var me = this,
			w = me.widget,
			el = me.el,
			store = w.store,
			data = store.data,
			columns = w.columns;
			tbodyEl = el.getElementsByTagName('tbody')[0],
			i = 1,
			iL = data.length + 1;
		
		for(;i<iL;i++){
			var tr = tbodyEl.childNodes[i],
				rowValues = data[i - 1].data,
				j = 0,
				jL = columns.length,
				lockedColumn = 0;
			
			for(;j<jL;j++){
				var column = columns[j];
				
				if( (!me.left && !column.locked ) ){
					var td = tr.childNodes[j - lockedColumn],
						tdTextEl = td.firstChild,
						columnIndex = column.index; 
				
					tdTextEl.innerHTML = rowValues[columnIndex];
				}
				else if( me.left && column.locked === true ){
					var td = tr.childNodes[j - (j - lockedColumn)],
						tdTextEl = td.firstChild,
						columnIndex = column.index; 
				
					tdTextEl.innerHTML = rowValues[columnIndex];
				}
				
				if(column.locked){
					lockedColumn++;
				}
			}
		}
	}
});