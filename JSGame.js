window.onload = function() {

    var createShots = function(x, y, v) {
        return {
            move : function() {

            }
        };
    };

    var canvas = document.getElementById("game-canvas");
    if (!canvas || !canvas.getContext) {
        return;
    }

    var context = canvas.getContext('2d');
    if (!context) {
        return;
    }

    var player = createPlayer(knightSprite,20, canvas.height/2);
	var obstacles = [];
	
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


    var render = function() {
        context.clearRect(0,0,canvas.width, canvas.height);
        player.render(context);
		for (var i = 0; i < obstacles.length; i++) {
			obstacles[i].render(context);
		}
    };


    var loop = function() {
        render();
		for (var i = 0; i < obstacles.length; i++) {
			if (obstacles[i].getX() < 0) {
				obstacles.shift();
			}
			else {
				obstacles[i].move();
				checkColision(obstacles[i]);
			}
		}
        // player.animate();
    };

	var checkColision = function(box) {
		if (box.getX() < player.getX() && box.getY() > player.getY()) {
			console.log("perdu");
		}
	};
	
	
	var idGenerateObstackes = setInterval(function() {
		var modulation = Math.random();
		if (modulation >= 0.5) {
			obstacles.push(createObstacle(obstacleSprite, canvas.width, canvas.height/2+40));
		}
		else if (modulation < 0.5 && modulation > 0.4) {
			obstacles.push(createObstacle(obstacleSprite, canvas.width, canvas.height/2+20));
		}
	},1300);

    var idLoop = setInterval(loop, 1000/FPS);
};

