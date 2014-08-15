(function(){
	var dc = 1,
		pathToSrc = '../src/',
		files = [
			pathToSrc + 'core/Mt.js',
			pathToSrc + 'util/Collection.js',
			pathToSrc + 'core/Class.js',
			pathToSrc + 'core/TraitClass.js',
			pathToSrc + 'data/Data.js',
			pathToSrc + 'widgets/PluginManager.js',
			pathToSrc + 'widgets/WidgetManager.js',
			pathToSrc + 'util/Event.js',

			pathToSrc + 'adapter/jquery.js',
			
			pathToSrc + 'data/Model.js',
			pathToSrc + 'data/Store.js',

			pathToSrc + 'widgets/Widget.js',
			pathToSrc + 'widgets/button/Button.js',
			pathToSrc + 'widgets/field/Field.js',
			pathToSrc + 'widgets/panel/Panel.js',
			pathToSrc + 'widgets/textarea/TextArea.js',
			
			pathToSrc + 'widgets/form/Form.js',
			
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