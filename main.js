sound1 = "";
sound2 = "";
rightWrist_x = 0; 
rightWrist_y = 0; 
leftWrist_x = 0; 
leftWrist_y = 0; 
scoreLW = 0;
scoreRW = 0;
song_1_status = "";
song_2_status = "";

function setup(){
c1 = createCanvas(600, 450);
c1.center();
v1 = createCapture(VIDEO);
v1.hide();

pN = ml5.poseNet(v1, modelLoaded);
pN.on('pose',gotPoses);
}

function modelLoaded(){
console.log("PoseNet Model has Loaded");
}

function gotPoses(results){

    if (results.length>0){
console.log(results);

scoreLW = results[0].pose.keypoints[9].score;
scoreRW = results[0].pose.keypoints[10].score;

console.log("Score Right Wrist: "+scoreRW);
console.log("Score Left Wrist: "+scoreLW);

rightWrist_x = results[0].pose.rightWrist.x; 
rightWrist_y = results[0].pose.rightWrist.y; 
console.log("Right Wrist X: "+rightWrist_x+ " Right Wrist Y: "+rightWrist_y);

leftWrist_x = results[0].pose.leftWrist.x; 
leftWrist_y = results[0].pose.leftWrist.y; 
console.log("Left Wrist X: "+leftWrist_x+ " Left Wrist Y: "+leftWrist_y);
    }


}

function preload(){
sound1 = loadSound("FightSong.mp3");
sound2 = loadSound("Happy.mp3");
}

function draw(){
image (v1, 0, 0, 600, 450);

fill("red");
stroke ("red");

song_1_status = sound1.isPlaying();
song_2_status = sound2.isPlaying();

if (scoreLW > 0.2){
circle (leftWrist_x, leftWrist_y, 20);
sound2.stop();


if (song_1_status == false){

sound1.play();

document.getElementById("song_name").innerHTML = "Fight Song";}}

if (scoreRW > 0.2){
circle (rightWrist_x, rightWrist_y, 20);
sound1.stop();

if (song_2_status == false){
sound2.play();

document.getElementById("song_name").innerHTML = "Happy";}}



}

function stop(){
sound1.stop();
sound2.stop();



}
