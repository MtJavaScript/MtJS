MtJS
====

Mt JS - RIA javascript library

Class
------------------

```javascript
Mt.Class('Car', {
	constructor: function(){
		console.log('Car constructor');
	},
	name: 'Car',
	run: function(km){
		console.log('I am '+ this.name + ' run ' + 'on ' + km + '/h');
	},
	getName: function(){
		console.log(this.name);
	}
});

Mt.Class('AverageCar', {
	extend: Car,
	name: 'AverageCar',
	constructor: function(){
		console.log('AverageCar constructor');
		this.Super('constructor', arguments);
	},
	run: function(){
		console.log('cool');
		this.Super('run', arguments);
	}
});

Mt.Class('SuperCar', {
	extend: AverageCar,
	name: 'SuperCar',
	constructor: function(){
		console.log('SuperCar constructor');
		this.Super('constructor', arguments);
	},
	run: function(){
		console.log('runnnnnn');
		this.Super('run', arguments);
	}
});

var s = new SuperCar();

s.getName();
s.run(70);
```

Observable
-------------------
```javascript
Mt.Class('Car', {
	extend: Mt.Observable,
	constructor: function(){
		var me = this;
		console.log('Car constructor');

		me.Super('constructor', arguments);

		me.addEvent('run');
	},
	name: 'Car',
	run: function(km){
		var me = this;

		me.fireEvent('run');
	},
	stop: function(){
		var me = this;

		me.fireEvent('stop');
	},
	getName: function(){
		console.log(this.name);
	}
});

Mt.Class('AverageCar', {
	extend: Car,
	name: 'AverageCar',
	constructor: function(){
		console.log('AverageCar constructor');
		this.Super('constructor', arguments);
	},
	run: function(){
		console.log('cool');
		this.Super('run', arguments);
	}
});

Mt.Class('SuperCar', {
	extend: AverageCar,
	name: 'SuperCar',
	constructor: function(){
		console.log('SuperCar constructor');
		this.Super('constructor', arguments);
	},
	run: function(){
		console.log('runnnnnn');
		this.Super('run', arguments);
	}
});

var s = new SuperCar();

s.getName();
s.run(70);

s.once('run', function(){
	console.log('once run');
});

var runFn = function(){
	console.log('on run');
};

s.on('run', runFn);

var numRun = 0;

setInterval(function(){
	s.run();
	numRun++
	if(numRun === 5){
		s.un('', runFn);
	}
}, 2000);
```