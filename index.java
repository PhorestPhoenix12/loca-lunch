//variables//
int nextStage = 0;
int win = 0;
int lose = 0;
int aY = 0;
int aX = 250;
int aS = 2;
int bY = 0;
int bX = 50;
int bS = 1;
int cY = 500;
int cS = 2;
int cX = 150;
int dY = 0;
int dS = 3;
int dX = 410;
int MY = 250;
int MX = 250;
int MS = 3;
PImage img1;
PImage apple;
PImage banana;
PImage burger;
PImage cake;
PImage mouse;

////start////
void setup(){
  size(500,500);
  img1 = loadImage("town.jpg");
  apple = loadImage("apple.png");
  banana = loadImage("banana.png");
  burger = loadImage("burger.png");
  cake = loadImage("cake.png");
  mouse = loadImage("geoffreyidle.png");
}

////background///
void startScreen(){
  ///Mini Setup
  background(255);
  ////title////
  noStroke();
  fill(102, 145, 110);
  rect(95,120, 300, 125);
  fill(129, 230, 149);
  rect(100,125, 300, 125);
  textSize(40);
  fill(120);
  text("MunchyMouse",135,145,300, 115);
  ////mini///
  fill(109, 230, 129);
  stroke(119, 166, 191);
  strokeWeight(5)
  rect(150,252,200,75,5);
  textSize(33);
  fill(120);
  text("Click 'a' start",160,265,194,69);
  ////button////
  if(keyPressed && (key == 'a'  || key == 'A')){
    nextStage = nextStage + 1;
  }
  
}

void instructions(){
  //Mini Setup
  background(255);
  /////text
  fill(255);
  stroke(119, 166, 191);
  strokeWeight(5)
  rect(50,50, 400, 230,5);
  textSize(20);
  fill(0);
  text("Press the 'a' key to move the mouse left and the 'd' key to move the mouse right. Make sure that the mouse only collects healthy foods. To win the game, catch the two fruit. However, a single nasty product will end the game. Be careful and good luck!",60,60,380, 230);
  ////mini///
  fill(109, 230, 129);
  stroke(119, 166, 191);
  strokeWeight(5)
  rect(150,302, 200, 75,5);
  textSize(30);
  fill(120);
  text("Click 's' to start",160,315,194, 69);
  ////button////
  if(keyPressed && (key == 's'  || key == 'S')){
    nextStage = nextStage + 1;
  }
  
}

void game(){
  ///Mini Setup
  background(255);
  ////fruits
  ///apple
  fill(255);
  noStroke();
  rect(aX,aY, 60,60);
  fill(199, 55, 47);
  ellipseMode(CORNER);
  ellipse(aX+5, aY+10, 50,50);
  fill(58, 95, 11);
  ellipse(aX+30, aY, 20, 10);
  fill(92, 64, 51);
  rect(aX+28, aY, 4, 15);
  aY= aY + aS;
  if ((aY > 500) || (aY < 0)) {
    aS= aS * - 1;
}
  ////banana
  fill(255);
  noStroke();
  rect(bX,bY, 60,60);
  fill(255, 255, 53);
  ellipseMode(CORNER);
  ellipse(bX+5, bY+10, 50,50);
  fill(255);
  ellipse(bX+25, bY+2, 30,55);
  fill(92, 64, 51);
  rect(bX+28, bY+10, 4, 4);
  bY= bY + bS;
  if ((bY > 500) || (bY < 0)) {
    bS= bS * - 1;
}
  ///burger
  image(burger,cX,cY,60,60);
  cY= cY + cS;
  if ((cY > 500) || (cY < 0)) {
    cS= cS * - 1;
}
  ////cake
  fill(255);
  noStroke();
  rect(dX,dY, 60,60);
  ellipseMode(CORNER);
  fill(92, 32, 21);
  ellipse(dX+5, dY+35, 50,25);
  fill(252, 224,185);
  ellipse(dX+5, dY+30, 50,25);
  fill(249, 215,211);
  ellipse(dX+5, dY+25, 50,25);
  fill(92, 32, 21);
  ellipse(dX+5, dY+20, 50,25);
  fill(252, 224,185);
  ellipse(dX+5, dY+15, 50,25);
  fill(249, 215,211);
  ellipse(dX+5, dY+10, 50,25);
  dY= dY + dS;
  if ((dY > 500) || (dY < 0)) {
    dS= dS * - 1;
}
  
  ////mouse
  image(mouse, MX, MY, 45,45);
  if(keyPressed && (key == 'a' || key == 'A') && (MX > 0 || MX < 500)){
    MX=MX - 1;
  }
  if(keyPressed && (key == 'd' || key == 'D') && (MX > 0 || MX < 500)){
    MX=MX + 1;
  }
  
  if(MX >= aX && MX <= aX+60  && MY >= aY && MY <= aY+60){
    aX = -100;
    win = win +1;
  }
  
  if(MX >= bX && MX <= bX+60  && MY >= bY && MY <= bY+60){
    bX = -100;
    win = win +1;
  }
  
  if(MX >= cX && MX <= cX+60  && MY >= cY && MY <= cY+60){
    cX = -100;
    lose = lose +1;
  }
  
  if(MX >= dX && MX <= dX+60  && MY >= dY && MY <= dY+60){
    dX = -100;
    lose = lose +1;
  }
  

  
  if(win == 2){
    background(255);
    fill(127, 255, 212);
    textSize(50);
    text("Amazing, you won! Press 'r' if you want to play again! :)",100,100,400,400);
    if(keyPressed && (key == 'r'  || key == 'R')){
      //variables//
      nextStage = 0;
      win = 0;
      lose = 0;
      aY = 0;
      aX = 250;
      aS = 2;
      bY = 0;
      bX = 50;
      bS = 1;
      cY = 500;
      cS = 2;
      cX = 150;
      dY = 0;
      dS = 3;
      dX = 410;
      MY = 250;
      MX = 1;
      MS = 3;
    }
  }
  
  if(lose == 1){
    background(255);
    fill(0);
    textSize(50);
    text("Oh no, you lost. Press 'r' to play again.",100,100,400,400);
    if(keyPressed && (key == 'r'  || key == 'R')){
      //variables//
      nextStage = 0;
      win = 0;
      lose = 0;
      aY = 0;
      aX = 250;
      aS = 2;
      bY = 0;
      bX = 50;
      bS = 1;
      cY = 500;
      cS = 2;
      cX = 150;
      dY = 0;
      dS = 3;
      dX = 410;
      MY = 250;
      MX = 1;
      MS = 3;
    }
  }
  
}

void winScreen(){
  //Mini Setup
  background(0);
  image(img1,0,0,width,height,50);
}

void endScreen(){
  //Mini Setup
  background(0);
  image(img1,0,0,width,height,50);
}


void draw(){
  if (nextStage == 0){
    startScreen();
  }
  if (nextStage == 1){
    instructions();
  }
  if (nextStage == 2){
    game();
  }
}