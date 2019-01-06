var SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline')
var porte = {comName:"cu"}



window.onload = function() {
  var elems = document.getElementsByName("animate")
  for (var i = 0; i < elems.length; i++) {
    
        elems[i].style.opacity = "0";
        console.log(elems[i])
    }
    var elems1 = document.getElementsByName("animatee")
  for (var i = 0; i < elems1.length; i++) {
    
        elems1[i].style.opacity = "0";
        console.log(elems[i])
    }
  }




function checkforPorts() {
  
  SerialPort.list(function (err, ports) {
    //console.log(ports)
    ports.forEach(function(port) {
      if (String(port.comName).includes("usbmodem")) {
        porte = port
      }
    });
      });
}
 checkforPorts()
setTimeout(function(){  
  //console.log(porter.comName)
  porter = new SerialPort(porte.comName, {
    baudRate: 9600
  });
  document.getElementById("connected").innerHTML = "Connected to " + porte.comName + "<img src='assets/outline-wifi_tethering-24px.svg' width='50px;'style='vertical-align:-40%'> <br>"


        var parser = porter.pipe(new Readline({ delimiter: '\r\n' }))
        parser.on('data', function(data) {
        var now = new Date();
        var hour = now.getUTCHours()
        var minutes = now.getUTCMinutes()
        var text = document.getElementById("brightness")
        if(minutes < 10) {
          document.getElementById("time").innerHTML = "<img src='assets/outline-access_time-24px.svg' height='27px;' style='vertical-align:-17%'>" + (hour+1) + ":0" + minutes
        } else {
          document.getElementById("time").innerHTML = "<img src='assets/outline-access_time-24px.svg' height='27px;' style='vertical-align:-17%'>" + (hour+1) + ":" + minutes
        }
      
        var strData = data.toString()
        var partsOfStr = strData.split(':');
        console.log(parseInt(partsOfStr[1])) 
        if (parseInt(partsOfStr[1])>500)  {
          text.innerHTML = "Hell" 
        } else if (parseInt(partsOfStr[1])<500) {
          text.innerHTML = "Dunkel" 
        }
      })
      //console.log(parser.read())

      porter.on('close', function() {
        error("Connection lost")

      });
      porter.on('open', function() {
        setTimeout(function(){ 
          var elems = document.getElementsByName("animate")
          for (var i = 0; i < elems.length; i++) {
      
      elems[i].classList.add("animated")
      elems[i].classList.add("fadeIn")
          }
          var elems1 = document.getElementsByName("animatee")
      for (var i = 0; i < elems1.length; i++) {
  elems1[i].style.opacity = "1";
  elems1[i].classList.add("animated")
  elems1[i].classList.add("zoomIn")
    }
    }, 850);

      });

      

        // Listen for error on open port
        porter.on('error', function (err) {
         
         error("Could not connect to Arduino")

      
         
          console.log(err)
        })

      
          
       
        
}, 200);


function error(message) {
  var blur = document.createElement('div');
          var modal = document.createElement('div');
          modal.id = 'block';
          modal.className = 'block';
          modal.style.backgroundColor = "#534BAE"
          modal.style.height = "200px"
          modal.style.width = "400px"
          modal.style.margin = "auto"
          modal.style.position = "absolute";
          modal.style.top = "0";
          modal.style.right = "0";
          modal.style.bottom = "0";
          modal.style.left = "0";
          modal.style.zIndex = "10";
          modal.style.fontSize = "25px"
          modal.style.borderRadius = "10px";
          modal.classList.add("animated")
          modal.classList.add("bounceIn")
          modal.innerHTML = "<img src='assets/outline-portable_wifi_off-24px.svg' width='150px;' ><br>" + message
          modal.style.color = "#ACFD58"
          modal.style.textAlign = "center"
          modal.style.fontFamily = "Roboto"
          modal.style.lineHeight = "30px";
          blur.style.height = "150%"
          blur.style.width = "100%"
          blur.style.backgroundColor = "black"
          blur.style.opacity = "0.25"
          blur.style.zIndex = "9";
          document.getElementsByTagName('body')[0].appendChild(blur);
          document.getElementsByTagName('body')[0].appendChild(modal);
          document.getElementById("footer").style.backgroundColor = "#26286E"
          //document.getElementById("footer").hidden = "true"
}
  


