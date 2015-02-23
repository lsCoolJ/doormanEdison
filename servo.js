// Servo Demo
// This code will move the servo in several directions as proof of concept
var Cylon = require('cylon');

Cylon
  .robot()
  .connection('edison', { adaptor: 'intel-iot' })
  .device('servo', { driver: 'servo', pin: 3, connection: 'edison' })
  .on('ready', function(my) {
    var angle = 20;
    my.servo.angle(angle);
    setTimeout(function() {
      angle = 125;
      my.servo.angle(angle);
      console.log("close");
    },2000);
    // setInterval(function(){
    //   if(angle == 20){
    //       angle = 125; //reset position if servo angle is greater than 135 (i.e. 180)
    //   } else {
    //     angle = 20;
    //   }
    //   my.servo.angle(angle);
    //   console.log("Servo Angle: "+angle);
    // },2000);
  });

Cylon.start();