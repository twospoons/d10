var exec = require('child_process').exec;

var parseTempF = function(str) {
    return (((parseInt(str, 16) / 50 - 273.15) * 1.8 + 32).toFixed(2));
};
var parseTempC = function(str) { 
   return ((parseInt(str, 16) / 50 - 273.15).toFixed(2));
};

var cm = 'i2cget -y 1 0x5a 0x07 w';
console.log('getting temp..');

function readt() { 
	exec(cm, function(err, stdout, stderr) {
	//console.log(stdout);
	//console.log(stderr);
	if(err !== null) {
		console.log('error: ' + err);	
	} else if(stdout !== null) {
		console.log('f: ' + parseTempF(stdout) + ' c: ' + parseTempC(stdout));
	}
	});
}

for(var x = 0; x < 10; x++) {
	readt();
}
