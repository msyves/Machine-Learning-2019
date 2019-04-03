let video;
let poseNet;
let poses = [];
let skeletons = [];
let lips, lips1, lips2, lips3, lips4;
let counter = 0;

function preload() {
    lips = loadImage('lips.png');
    lips1 = loadImage('lips1.png');
    lips2 = loadImage('lips2.png');
    lips3 = loadImage('lips3.png');
    lips4 = loadImage('lips4.png');
  }

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function (results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  imageMode(CORNER)  ;
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let nose = poses[i].pose.keypoints[0];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (nose.score > 0.8) {
        imageMode(CENTER);
        if (counter == 1) {
            image(lips, nose.position.x, nose.position.y + 65, 120, 70);
        } else if (counter == 2){
            image(lips1, nose.position.x, nose.position.y + 65, 120, 70);
        } else if (counter == 3){
            image(lips2, nose.position.x, nose.position.y + 65, 120, 70);
        } else if (counter == 4) {
            image(lips3, nose.position.x, nose.position.y + 65, 120, 70);
        } else if (counter == 5) {
            image(lips4, nose.position.x, nose.position.y + 65, 120, 70);
        }
      }
    }
  }
}

function keyReleased() {
    if (counter < 6) {
        counter = counter + 1;
    } else {
        counter = 0;
    }

}