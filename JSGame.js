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
    var shots = [];
<<<<<<< HEAD
    var backgroundBack = createBackground(cityBackSprite, canvas.width);
    var backgroundMiddle = createBackground(cityMiddleSprite, canvas.width);
    var backgroundFront = createBackground(cityFrontSprite, canvas.width);
=======
	var level = 1;
	var box_nb = 0;
	var speed = 1000;
    var backgroundBack = createBackground(forestBackSprite, canvas.width);
    var backgroundMiddle = createBackground(forestMiddleSprite, canvas.width);
    var backgroundFront = createBackground(forestFrontSprite, canvas.width);
>>>>>>> ee8ad6b04b3b558f4b2425ceac24b099c562a27d


	
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
               	player.shoot(shots);
                backgroundBack.setSprite(mountainBackSprite);
                backgroundMiddle.setSprite(mountainMiddleSprite);
                backgroundFront.setSprite(mountainFrontSprite);
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
        for (var i = 0; i < shots.length; i++) {
			shots[i].render(context);
		}
		
		context.font = "20px Arial bold";
		context.fillStyle = "white"
		context.fillText("Level : " + level,canvas.width - 100,60);
		context.fillText(box_nb,canvas.width - 75,80);
		
		for (var i = 1; i <= player.getLife(); i++) {
			var img = document.getElementById("heart");
			context.drawImage(img,canvas.width - i * 40,10);
		}
		
    };

    /**
     * The main game Loop.
     * Render, animate game objects.
     */
    var loop = function() {
        render();
		for (var i = 0; i < obstacles.length; i++) {
            if (obstacles[i].isDestroy()) {
                obstacles.splice(i, 1);
				box_nb++;
            }
            // The obstacle is out of the canvas.
			else if (obstacles[i].getX() < 0) {
				obstacles.splice(i, 1);
				box_nb++;
			}
			else {
				obstacles[i].move();
				if (checkColision(player.getHitBox(), obstacles[i].getHitBox())) {
					player.removeLife();
				    obstacles.splice(i, 1);
                }
			}
		}

        for (var j = 0; j < shots.length; j++) {
            for (var i = 0; i < obstacles.length; i++) {
                if (checkColision(shots[j].getHitBox(), obstacles[i].getHitBox())) {
                    obstacles[i].destroy();
				    shots.splice(j, 1);
                    break;
                }
            }
		}
		
		if (player.getLife() <= 0) {
			clearInterval(idLoop);
			var img = document.getElementById("game_over");
			context.fillStyle = "#000";
			context.fillRect(0,0,canvas.width,canvas.height);
			context.drawImage(img,canvas.width / 2 - 250, canvas.height / 2 - 115);
		}
		
		// increase level and speed
		if (box_nb === 10 * level && speed > 300) {
			speed = speed - 100;
			clearInterval(idLoop);
			idLoop = setInterval(loop, speed/FPS);
			level++;
		}
		
    };	
	
	var idGenerateObstacles = setInterval(function() {
		var modulation = Math.random();
		if (modulation >= 0.6) {
			obstacles.push(createObstacle(obstacleSprite, canvas.width, 210));
		}
		else if (modulation < 0.5 && modulation > 0.2) {
			obstacles.push(createObstacle(obstacleSprite, canvas.width, 190));
		}
	}, 1500);

    var idLoop = setInterval(loop, speed/FPS);
};

