var dog, happyDog, dogImg, happyDogImg, database, foodS, foodStock;
var feed, addFood;
var fedtime, lastFed;
var foodObj;

function preload() {
	dogImg = loadImage("images/dogImg.png");
	happyDogImg = loadImage("images/happydogImg.png");
}

function setup() {
	database = firebase.database();
	createCanvas(900, 500);

	foodObj = new Food();
	foodStock = database.ref('Food');
	console.log(foodStock);
	foodStock.on("value", readStock);

	fedTime = database.ref('FeedTime');
	fedTime.on("value", function (data) {
		lastFed = database.val();
	})


	dog = createSprite(800, 220, 150, 150);
	dog.addImage(dogImg);
	dog.scale = 0.15;

	feed = createButton("FEED THE B*TCH");
	feed.position(795, 95);
	feed.mousePressed(feedDog);

	addFood = createButton("ADD FOOD");
	addFood.position(580, 95);
	addFood.mousePressed(addFoods);
}


function draw() {
	background(50, 80, 150)

	fill(10, 200, 255);
	textSize(20);
	if (lastFed >= 12) {
		text("LAST FED : " + lastFed % 12 + "PM", 350, 30);
	}
	else if (lastFed == 0) {
		text("LAST FED :  + 12 AM", 350, 30);
	}
	else {
		text("LAST FED : " + lastFed + "AM", 350, 30);
	}

	fill("black");
	textSize(20);
	text("Food Remaining :" + foodS, 400, 300)

	foodObj.display();
	drawSprites();
}

function readStock(data) {
	foodS = data.val();
	console.log(foodS);
	foodObj.updateFoodStock(foodS);
}

function feedDog() {
	dog.addImage(happyDogImg);
	foodObj.updateFoodStock(foodObj.getFoodStock() - 1)
	database.ref('/').update({
		Food: foodObj.getFoodStock(),
		FeedTime: hour()
	})
}

function addFoods() {
	foodS++;
	database.ref('/').update({
		Food: foodS
	})
}





