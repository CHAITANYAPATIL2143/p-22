var rail,boy,cash,coin,jwellery,obstacle;
var railImg,boyImg,cashImg,coinImg,jwelleryImg,obstacleImg;
var treasureCollection = 0;
var cashG,coinG,jwelleryG,obstacleGroup;
var pointSound ,dieSound;
var restart ,restartImg;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload()
{
  railImg = loadImage("rail.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");

  cashImg = loadImage("cash.png");
  coinImg = loadImage("coin.png.gif");
  jwelleryImg = loadImage("jwell.png");

  obstacleImg = loadImage("obstacle.png");

  gameOverImg = loadImage("gameOver.png")
  restartImg = loadImage("reset.png")

  pointSound = loadSound("point.mp3")
  dieSound = loadSound("die.mp3")
  
}


function setup()
{
  
  createCanvas(400,600);
  // background  
  rail=createSprite(200,200);
  rail.addImage(railImg);
  rail.scale=0.4
  rail.velocityY = 4;


  //creating boy running
  boy = createSprite(70,580,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;
    

 //groups
  cashG=new Group();
  coinG=new Group();
  jwelleryG=new Group();
  obstacleGroup=new Group();


  //restart
  restart = createSprite(200,400,20,20);
  restart.addImage(restartImg);
  restart.scale=0.03
}

function draw() 
{

  if(gameState===PLAY)
  {
    restart.visible=false

  
    background(0);
    boy.x = World.mouseX;
    
    edges= createEdgeSprites();
    boy.collide(edges);
    
    //code to reset the background
    if(rail.y > 400 )
    {
      rail.y = height/2;
    }
    
    createCash();
    createCoin();
    createJwellery();
    createObstacle();

    if (cashG.isTouching(boy)) 
    {
     cashG.destroyEach();
     pointSound.play()
     treasureCollection=treasureCollection+50;
    }
    else if (coinG.isTouching(boy))
    {
     coinG.destroyEach();
     pointSound.play()
     treasureCollection=treasureCollection+100;
        
    }else if(jwelleryG.isTouching(boy)) 
    {
     jwelleryG.destroyEach();
     pointSound.play()
     treasureCollection= treasureCollection + 150;
        
    }else
    { 
      if(obstacleGroup.isTouching(boy)) 
      {
       dieSound.play()
       gameState=END;
        
       restart.visible=true
          
       cashG.destroyEach();
       coinG.destroyEach();
       jwelleryG.destroyEach();
       obstacleGroup.destroyEach();
          
       cashG.setVelocityYEach(0);
       coinG.setVelocityYEach(0);
       jwelleryG.setVelocityYEach(0);
       obstacleGroup.setVelocityYEach(0);


       gameOver = createSprite (200,300)
       gameOver.addImage(gameOverImg)
       gameOver.scale=1



      }

      
     
   
      drawSprites();
      textSize(20);
      fill("black");
      text("Point: "+ treasureCollection,10,30);
    }
    
  }
    if(mousePressedOver(restart))
    {
      reset()
    }
}




function reset()
{
  gameState=PLAY 
  obstacleGroup.destroyEach()
  cashG.destroyEach()
  coinG.destroyEach()
  jwelleryG.destroyEach()
  boy.changeAnimation("SahilRunning")
  treasureCollection=0
  gameOver.visible=false
  restart.visible=false

}





function createCash() 
{
  if (World.frameCount % 200 == 0) 
  {
    var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
    cash.addImage(cashImg);
    cash.scale=0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;
    cashG.add(cash);
  }
}





function createCoin() 
{
  if (World.frameCount % 320 == 0) 
  {
    var coin = createSprite(Math.round(random(50, 350),40, 10, 10));
    coin.addImage(coinImg);
    coin.scale=0.2;
    coin.velocityY = 3;
    coin.lifetime = 150;
    coinG.add(coin);
  }
}





function createJwellery() 
{
  if (World.frameCount % 410 == 0) 
  {
    var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale=0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 150;
    jwelleryG.add(jwellery);
  }
}





function createObstacle()
{
  if (World.frameCount % 530 == 0) 
  {
    var obstacle = createSprite(Math.round(random(50, 350),40, 10, 10));
    obstacle.addImage(obstacleImg);
    obstacle.scale=0.4;
    obstacle.velocityY = 3;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
}
