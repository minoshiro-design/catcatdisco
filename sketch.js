let started = false;

// very simple posenet example

let video;
let poseNet;
let poses = [];
let mic;

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function (results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
  
  mic = new p5.AudioIn();
  mic.start();
}



function modelReady() {
  // loaded
}

function draw() {
 
  image(video, 0, 0, width, height);
  
  // Get the overall volume (between 0 and 1.0)
  let vol = mic.getLevel()*30;
  fill(random(255),random(255),random(255),50);
  noStroke();

  // Draw an ellipse with height based on volume
  let h = map(vol, 0, 1, height, 0);
  ellipse(width/2, h, h, h/2);
  ellipse(h,width/2,h/2,h/3)
  ellipse(0,0,h,h)
  ellipse(height/2,width,0,h)
  ellipse(width/2,height/2,h)
  
  if (started === false) {
    fill(0)
    textAlign(CENTER)
    text("please click to start", width / 2, height / 2)
  }

  // check we even have a person
  if (poses.length > 0) {
    
    let person = poses[0].pose;
    //console.log(person)
    let eyeR = person.rightEye;
        let eyeL = person.leftEye;
        let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    //find the nose of the first person
    // let nose = poses[0].pose.nose;

 //ears 
    noStroke()
    //strokeWeight(10)
    fill(255,255,0)
    triangle(person.nose.x + d, person.nose.y - (d*1.2), person.nose.x + (d/1.2), person.nose.y -(d*2), person.nose.x + (d/5), person.nose.y - (d*1.5));
    triangle(person.nose.x - d, person.nose.y - (d*1.2), person.nose.x - (d/1.2), person.nose.y -(d*2), person.nose.x - (d/5), person.nose.y - (d*1.5));
    
// Inner Ear
    
        fill(244,168,168);
        triangle(person.nose.x + (d*0.9),person.nose.y - (d*1.3), person.nose.x + (d/1.3), person.nose.y - (d*1.8), person.nose.x + (d/3.33), person.nose.y - (d*1.5));
        triangle(person.nose.x - (d*0.9),person.nose.y - (d*1.3), person.nose.x - (d/1.3), person.nose.y - (d*1.8), person.nose.x - (d/3.33), person.nose.y - (d*1.5));
    
//nose
    noStroke()
    fill(0);
    triangle(person.nose.x - (d/4), person.nose.y - (d/10), person.nose.x + (d/4), person.nose.y -(d/10), person.nose.x, person.nose.y + (d/6));
 
    
//eyes    
    stroke(255,255,0)
    strokeWeight(10)
    fill(0);
    circle(person.rightEye.x, person.rightEye.y, 40)
    
    circle(person.leftEye.x, person.leftEye.y, 40)

    
// Whiskers
    stroke(255,255,0)
    strokeWeight(10)
        line(person.nose.x + (d/2), person.nose.y - (d/10), person.nose.x + (d), person.nose.y - (d/4));
        line(person.nose.x + (d/2), person.nose.y + (d/10), person.nose.x + d, person.nose.y + (d/4));
        line(person.nose.x + (d/2), person.nose.y, person.nose.x + d, person.nose.y);
        line(person.nose.x - (d/2), person.nose.y - (d/10), person.nose.x - d, person.nose.y - (d/4));
        line(person.nose.x - (d/2), person.nose.y + (d/10), person.nose.x - d, person.nose.y + (d/4));
        line(person.nose.x - (d/2), person.nose.y, person.nose.x - d, person.nose.y);
  }
  
  
  
}

function mousePressed() {
  started = true;
  userStartAudio();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  video.size(width, height);
}
