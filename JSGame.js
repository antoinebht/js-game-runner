var knightSprite = {
    "file": "sprites/knight.png",
    "actions" : [
        {
            "name" : "walk",
            "x" : 0,
            "y" : 704,
            "width" : 64,
            "height" : 64,
            "number" : 9
        },
		{
			"name" : "jump",
            "x" : 0,
            "y" : 192,
            "width" : 64,
            "height" : 64,
            "number" : 13
		},
        {
            "name" : "shoot",
            "x" : 0,
            "y" : 1216,
            "width" : 64,
            "height" : 64,
            "number" : 13
        }
    ],
    "hitbox": {
        "standing" : {
            "x" : 23,
            "y" : 18,
            "width" : 17,
            "height" : 43             
        }
    }
}

var obstacleSprite = {
    "file": "sprites/box.png",
    "actions" : [
        {
            "name" : "normal",
            "x" : 0,
            "y" : 0,
            "width" : 64,
            "height" : 64,
            "number" : 1
        },
		{
            "name" : "destruction",
            "x" : 0,
            "y" : 0,
            "width" : 64,
            "height" : 64,
            "number" : 9
        }
    ]
}


const KEY_ARROW_UP = 38;
const KEY_SPACE = 32;

window.onload = function() {
	
	var createObstacle = function(sprite,x,y) {
		var state = "normal";
        var step = 0;

		var getCurrentAction = function() {
            for (var i=0; i<sprite["actions"].length; i++) {
                if (sprite["actions"][i]["name"] === state) {
                    return sprite["actions"][i];
                }
            }
        };

		return {
			move : function() {
				x -= 5;
			},	
			getX : function() {
				return x;
			},
			getY : function() {
				return y;
			},
			render : function(context) {
				var action = getCurrentAction();
                context.drawImage(
                    document.getElementById(sprite["file"]), 
                    action["x"]+step*action["width"], 
                    action["y"],
                    action["width"], 
                    action["height"], 
		 			x,
					y,
                    24,
					24
                );
			}
		};
	};

    var createShots = function(x, y, v) {
        return {
            move : function() {

            }
        };
    };

   
    const FPS = 24;

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

