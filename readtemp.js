var exec = require('child_process').exec;
var request = require('request');

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
	if(err !== null) {
		console.log('error: ' + err);	
	} else if(stdout !== null) {
		var temp = 'f_' + parseTempF(stdout) + '_c_' + parseTempC(stdout);
		//console.log('f: ' + parseTempF(stdout) + ' c: ' + parseTempC(stdout));
		//return temp;
		console.log(temp);
		request.get('http://192.168.1.104:8080?dt=' + temp);
	}
	});
}

setInterval(
	function() { 
		readt(); 
	}, 
1000);
