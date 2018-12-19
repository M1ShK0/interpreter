var io = require('socket.io').listen(1489);
console.log(1312312);
var Socket;


let btSerial = require("bluetooth-serial-port");;
var btSerialO = new (require('bluetooth-serial-port')).BluetoothSerialPort();
 
 /*
btSerial.findSerialPortChannel(address, (channel) => {
    btSerial.connect(address, channel, () => {
        btSerial.write(new Buffer("yes"), (err) => {
        if (err) {
                console.error(err);
            }
        });
    }, (err) => {
            if (err) {
                console.error(err);
            }
        });
        btSerial.on("data", (buffer) => console.log(buffer.toString("ascii")));
}, () => {
        console.error("Cannot find channel!");
});*/


btSerialO.listPairedDevices(function (list) {
		console.log(JSON.stringify(list,null,2));
		if(list[0].name=='HC-06\n'){
			btSerialO.findSerialPortChannel(list[0].address, function(channel) {
				btSerialO.connect(list[0].address, channel, function() {
					console.log('connected');
					console.log('ertyu');
					
					
					
					io.sockets.on('connection', function (socket) {
						console.log('sconnected');
						//===================Prodaction==================//

						socket.on('send', function (data) {
								//data.v data.u;
								console.log(data);
								console.log(""+(data.v*100+data.u));
								
								btSerialO.write(( Buffer.from((""+(data.v*100+data.u)))), function(err, bytesWritten) {
											if (err) console.log(err);
										});
										
								btSerialO.on('data', function(buffer) {
									
									console.log(buffer.toString());
									console.log(JSON.stringify(buffer.toString()))
									socket.emit('send',buffer.toString());
								});
								
						});

					});

					
					
					
					
			}, function () {
				console.log('cannot connect');
			});
		}, function() {
        console.log('found nothing');
    });
 
        // close the connection when you're ready
     //   btSerialO.close();
}}
);
