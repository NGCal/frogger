//Distancia del moviemiento de los personajes
 var cantPasos_X = 70;
 var cantPasos_y = 70;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var x = 0;
	var y = 0;
	var width = 50;
	var height = 80;
	var speed = Math.floor(Math.random()* 5) + 2;
	
	//console.log(Math.floor(Math.random()*5) + 1);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};


Enemy.prototype.collision = function(player) {
    if (this.x < player.x + player.width  && this.x + this.width  > player.x &&
        this.y < player.y + player.height && this.y + this.height > player.y)
		{
			player.x = 202;
			player.y = 424;
			
		}
	//return false;	
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

   this.x += (cantPasos_X  * dt * this.speed);
    //console.log('enemy x = ', this.x, 'enemy y = ', this.y);    
    if(this.x > 480){
        //var locations = [80.8 , 161.6 , 242.40];
        this.speed = Math.floor(Math.random()*5) + 1;
        this.x = -18;
        //this.y = locations[getRandomInt(0,2)];
		
		this.y = (cantPasos_y/0.92) * (Math.floor(Math.random()*3) + 1);

    }
    this.collision(player)
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    Enemy.call(this);
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 424;

};
//Player.prototype = Object.create(Enemy.prototype);
Player.prototype = new Enemy();
Player.prototype.reset = function(){
    this.x = 202;
    this.y = 424;
};
Player.prototype.update = function(dt) {
    if(player.y < 20){
        this.x = 202;
		this.y = 424;
    }
    console.log('player x = ', this.x, 'player y = ', this.y);    
};
Player.prototype.handleInput = function(direction){
    console.log("Handle input");
    switch(direction){
    case 'left':
    if(this.x > -8){
        this.x -= cantPasos_X;
    }
    break;
    case 'up':
    this.y -= cantPasos_y;
    break;
    case 'right':
    if(this.x < 412){
        this.x += cantPasos_X;    
    }    
    break;
    case 'down':
    if(this.y < 424){
        this.y += cantPasos_y;
    }
    break;    

    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for(var i = 1 ; i <= 3 ; i++){
    var enemy = new Enemy();
    enemy.x =  cantPasos_X * Math.floor(Math.random()*3 +1);
    enemy.y = i * (cantPasos_y/0.92);
    allEnemies.push(enemy);

}
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
