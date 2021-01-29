var database ,dog,dog1,dog2
var position
//var form
var feed,add
var foodobject
var Feedtime
var Lastfeed
//Create variables here

function preload()

{
  dogimg1 = loadImage("dog.png");
  dogimg2 = loadImage("dog1.png");
  bowlimg = loadImage("download.jpg");
  backgroundimg = loadImage("images.jpg");
	//load images here
}

function setup() {
	createCanvas(800, 500);
  database = firebase.database();
  console.log(database);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
 // foodStock.set(20);
 
  foodobject=new Food();
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2

 // food1 = createSprite(150,280)
  //food1.addImage(bowlimg)
  //food1.scale = 0.20;
 
  var dogo = database.ref('Food');
  feedFood=createButton('Feed 🥛')
  feedFood.position(1000,100)
  feedFood.mousePressed(feedDog)
  addfood=createButton('add 🥛')
  addfood.position(900,100)
  addfood.mousePressed(addFood)

  bowl=createSprite(500,300)
  bowl.addImage(bowlimg);
  bowl.scale=0.25;

  input = createInput("Name of your dog");
  input.position(600,200)
  button = createButton('Play');
  button.position(650,240)
  greeting = createElement('h3');
  button.mousePressed(()=>{
    input.hide()
    button .hide()
    name = input.value();
    fill(255,255,250);
    greeting.html("Hello I am your pet dog "+name+"🐶")
   greeting .position(500,100)
  })  
} 

function draw(){
 background(backgroundimg);

 foodobject.display()
 
 
  
 fill(255,255,254);
 textSize(15);

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(x){
  if(x>0){
    x=x-1
  }
  else{
    x=0
  }
  database.ref('/').set({
    'Food': x
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}

function readStock(data)
{
  foodS = data.val();
  food.updateFoodStock(foodS);
}
function feedDog()
{
    dog.addImage(dogimg2);
    foodS--;
  
    bowl.visible=true
    database.ref('/').update({
      Food : foodS
    })
    fedTime = hour(); 
}

function addFood()
{
  dog.addImage(dogImage);
  bowl.visible=false
  foodS++;
  
  database.ref('/').update({
    Food:foodS
  })
  
}


