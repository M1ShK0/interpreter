var io = require('socket.io').listen(1489);

io.sockets.on('connection', function (socket) {
	console.log('connected');

	//===================Prodaction==================//

	socket.on('get_pols', function (msg) {

	});




});





