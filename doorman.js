var socket = require('socket.io-client')('http://doorman.azurewebsites.net');
var fs = require("fs");
var Cylon = require('cylon');
 
function door(my) {
	console.log("Open the door...")
	var angle = 20;
    my.servo.angle(angle);
    setTimeout(function() {
      angle = 125;
      my.servo.angle(angle);
      console.log("close");
    },5000);
}

Cylon
  .robot()
  .connection('edison', { adaptor: 'intel-iot' })
  .device('servo', { driver: 'servo', pin: 3, connection: 'edison' })
  .on('ready', function(my) {
  	var angle = 125;
    my.servo.angle(angle);
  	initializeSockets(my)
  });
Cylon.start();

function getPicture(){
	 var image_origial = "doorman.jpg";
	 fs.readFile(image_origial, "base64", function(err,data){
	 	if(err){
	 		console.log(err);
	 		console.log("Error");
	 	}
	 	else{
	 		var socketData = {
	 			image:{
	 				base64String: data,
	 				contentType: "image/jpg"
	 			}
	 		}
	 		socket.emit('package_picture', socketData);
	 	}
	 })
}

function initializeSockets(my){
	socket.on('connect', function(){
		console.log('Connected!');
	});

	socket.on('door_messages', function (socket_data) {
		console.log('message for door controll: ' + socket_data);
		if(socket_data.open){
			door(my);
		}
	});

	socket.on('disconnect', function(){
		console.log('Disconnected from server: ');
	}); 
}