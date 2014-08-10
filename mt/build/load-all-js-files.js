(function(){
	var dc = 1,
		pathToSrc = '../src/',
		files = [
			pathToSrc + 'core/Mt.js',
			pathToSrc + 'Collection.js',
			pathToSrc + 'Class.js',
			pathToSrc + 'data/Data.js',
			pathToSrc + 'PluginManager.js',
			pathToSrc + 'WidgetManager.js',
			pathToSrc + 'Observable.js',
			pathToSrc + 'TraitWidget.js',

			pathToSrc + 'adapter/jquery.js',
			
			pathToSrc + 'Model.js',
			pathToSrc + 'Store.js',
			
			pathToSrc + 'widgets/button/Button.js',
			pathToSrc + 'widgets/field/Field.js',
			pathToSrc + 'widgets/panel/Panel.js',
			pathToSrc + 'widgets/textarea/TextArea.js',
			
			pathToSrc + 'widgets/grid/Grid.js',
			pathToSrc + 'widgets/grid/elements/Body.js',
			pathToSrc + 'widgets/grid/elements/Header.js',
		],
		i = 0,
		length = files.length,
		dcUrl = '?_dc='+dc;
	
	for(;i<length;i++){
		var file = files[i] + dcUrl;
		document.write('<script type="text/javascript" charset="UTF-8" src="' + file + '"></script>');
	}
	
})();