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
            "number" : 7
		},
        {
            "name" : "shoot",
            "x" : 0,
            "y" : 1216,
            "width" : 64,
            "height" : 64,
            "number" : 13
        },
    ]
}

const KEY_ARROW_UP = 38;
const KEY_SPACE = 32;

window.onload = function() {

    var createPlayer = function(sprite, posX, posY) {
        var state = "walk";
        var step = 0;
        var speed = 100;
        var shootLoad = 0;
		var animateAction = undefined;
		var actionInProgress = false;

        var getCurrentAction = function() {
            for (var i=0; i<sprite["actions"].length; i++) {
                if (sprite["actions"][i]["name"] === state) {
                    return sprite["actions"][i];
                }
            }
        };

		var jump = function() {
			if (!actionInProgress) {
				actionInProgress = true;
				state = "jump";
		        step = 0;
				animateAction = function() {
					if (step == getCurrentAction().number-1) {
						walk();
						actionInProgress = false;
					}
					if (step >= getCurrentAction().number/2-1) {
						posY += 20;
					}
					else {
						posY -= 20;
					}
				}
			}
		};

		var shoot = function() {
			if (!actionInProgress) {
				actionInProgress = true;
				step = 0;
				state = "shoot";
				animateAction = function() {
				    if (step === getCurrentAction().number-1) {
				       	walk();
						actionInProgress = false;
				    }
				}
			}
		}

		var walk = function() {
			state = "walk";
			step = 0;
			animateAction = undefined;
		}

        var idAnimate = setInterval(function() {
            var action = getCurrentAction();
            step = (step+1) % action.number;
			if (animateAction !== undefined) {
				animateAction();
			}
        }, speed);

        return {
            render : function(context) {
                var action = getCurrentAction();
                context.drawImage(
                    document.getElementById(sprite["file"]), 
                    action["x"]+step*action["width"], 
                    action["y"],
                    action["width"], 
                    action["height"], 
		 			20,
					posY,
                    action["width"], 
                    action["height"]
                );
            },
			jump : jump,
			walk : walk,
            shoot : shoot
        }
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

    var player = createPlayer(knightSprite, canvas.width/2, canvas.height/2);
   
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
    };


    var loop = function() {
        render();
        // player.animate();
    };

    var idLoop = setInterval(loop, 1000/FPS);
};

