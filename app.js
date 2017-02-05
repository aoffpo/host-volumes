require('shelljs/global');
yaml = require('yamljs');
//get arguments
//var arg1 = '';
var cwd = pwd().toString();
yaml.load(cwd+ '/docker-compose.yml', function(result)
{
    var file = result;
	var services = file.services;
	Object.keys(services).map((e) => {
		if (services[e].volumes !== undefined){
			services[e].volumes.map((v)=> {
				var dir = v.split(':')[0];
				mkdir(dir);
				console.log('created:' + dir);
			});    
		}
	});
});

