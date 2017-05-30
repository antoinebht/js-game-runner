window.onload = function() {

    /**
     * Get the HTML canvas element from the HTML document.
     */
    var canvas = document.getElementById("game-canvas");
    if (!canvas || !canvas.getContext) {
        return;
    }
    /**
     * Get the context of the canvas element.
     */
    var context = canvas.getContext('2d');
    if (!context) {
        return;
    }

    /**
     * Init game objects (player, obstacles list)
     */
    var player = createPlayer(knightSprite, 60, 170);
	var obstacles = [];
    var backgroundBack = createBackground(forestBackSprite, canvas.width);
    var backgroundMiddle = createBackground(forestMiddleSprite, canvas.width);
    var backgroundFront = createBackground(forestFrontSprite, canvas.width);


	
    /**
     * Handling the Key Event
     * @param {*} e 
     */
    var handleKeyPressed = function(e) {
        switch (e.keyCode) {
            case KEY_ARROW_UP:
                player.jump();
                break;
            case KEY_SPACE:
               	player.shoot();
                break;
        }
    };
    window.document.addEventListener("keydown", handleKeyPressed, false);

    /**
     * The global render function. Display on the canvas the player, the obstacles, shots, decorations
     */
    var render = function() {
        context.clearRect(0,0,canvas.width, canvas.height);
        // Backgrounds
        backgroundBack.render(context);
        backgroundMiddle.render(context);
        backgroundFront.render(context);
        
        player.render(context);

        // Game Objects
        for (var i = 0; i < obstacles.length; i++) {
			obstacles[i].render(context);
		}
    };

    /**
     * The main game Loop.
     * Render, animate game objects.
     */
    var loop = function() {
        render();
		for (var i = 0; i < obstacles.length; i++) {
            // The obstacle is out of the canvas.
			if (obstacles[i].getX() < 0) {
				obstacles.shift();
			}
			else {
				obstacles[i].move();
				if (checkColision(player.getHitBox(), obstacles[i].getHitBox())) {
                    console.log("collide");
				    obstacles.shift();
                }
			}
		}
    };	
	
	var idGenerateObstacles = setInterval(function() {
		var modulation = Math.random();
		if (modulation >= 0.5) {
			obstacles.push(createObstacle(obstacleSprite, canvas.width, 210));
		}
		else if (modulation < 0.5 && modulation > 0.4) {
			obstacles.push(createObstacle(obstacleSprite, canvas.width, 190));
		}
	},1300);

    var idLoop = setInterval(loop, 1000/FPS);
};

