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

        var getCurrentAction = function() {
            for (var i=0; i<sprite["actions"].length; i++) {
                if (sprite["actions"][i]["name"] === state) {
                    return sprite["actions"][i];
                }
            }
        };

        var idAnimate = setInterval(function() {
            var action = getCurrentAction();
            step = (step+1)% action.number;
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
					200,
                    action["width"], 
                    action["height"]
                );
            },
            setAction : function(name) {
                state = name;
                step = step%getCurrentAction().number;
            },
            loadShot : function() {
                shootLoad++;
                if (shootLoad == 13) {
                    this.shoot();
                }
            },
            shoot : function() {
                shootLoad = 0;
                console.log("shoot");
            }
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
                player.setAction("jump");
                player.move();
                break;
            case KEY_SPACE:
                player.setAction("shoot");
                player.loadShot();
                break;
        }
    };
    window.document.addEventListener("keydown", handleKeyPressed, false);

    var handleKeyUp = function(e) {
        switch (e.keyCode) {
            case KEY_SPACE:
                player.shoot();
                break;
        }
    };
    window.document.addEventListener("keyup", handleKeyUp, false);


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

