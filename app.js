var shell = require('shelljs');
var yaml = require('yamljs');

var cwd = shell.pwd().toString();
var composefile = cwd + '/docker-compose.yml'

if (!shell.test('-f', composefile)){
	console.log('docker-compose.yml not found in current directory.');
} else {
	yaml.load(composefile, function(result)
	{
		var file = result;
		var services = file.services;
		Object.keys(services).map((e) => {
			if (services[e].volumes !== undefined){
				services[e].volumes.map((v)=> {
					var dir = v.split(':')[0];
					var msg = shell.mkdir(dir);
					if (msg.stderr === null){
						console.log('Created ' + dir);
					}
				});    
			}
		});
	});
}

