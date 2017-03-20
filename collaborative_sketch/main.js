 var config = {
    apiKey: "AIzaSyDTffI_t_Jd6lCmjOp64jb7bG3t5dNWsRU",
    authDomain: "collaborative-sketch-c59fa.firebaseapp.com",
    databaseURL: "https://collaborative-sketch-c59fa.firebaseio.com",
    storageBucket: "collaborative-sketch-c59fa.appspot.com",
    messagingSenderId: "1063827434993"
  };
  firebase.initializeApp(config);
  
  var pointsData = firebase.database().ref();
  var points = [];
  
  function setup() {
      var canvas = createCanvas(400, 400);
      background(255);
      fill(0);
      
      pointsData.on("child_added", function(point) {
          points.push(point.val());
      });
      pointsData.on("child_removed", function () {
      });
      
      canvas.mousePressed(drawPoint); 
      canvas.mouseMoved(drawPointIfMousePressed);
      
  }
  
  function draw() {
      background(255);
      
      for (var i = 0; i < points.length; i++) {
          var point = points[i];
          ellipse(point.x, point.y, 5, 5);
      }
  }
  
  function drawPoint() {
   pointsData.push({x: mouseX, y: mouseY});
  }
  
  function drawPointIfMousePressed() {
   if (mouseIsPressed){
    drawPoint(); 
   }
  }
  
  $("#saveDrawing").on("click, saveDrawing");
  
  function clearDrawing() {
   pointsData.remove();
   points = []; 
  }
  
  function saveDrawing() {
   saveCanvas();
  }