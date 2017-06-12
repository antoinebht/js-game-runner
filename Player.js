/**
 * Create an object Player.
 * @param {*} sprite The sprite JSON description of the sprite sheet.
 * @param {*} x The x position in the canvas.
 * @param {*} y The y position in the canvas.
 */
var createPlayer = function(sprite, x, y) {
    /**
     * The name of the current action of the player.
     * Used to get the right sprite in the JSON.
     */
    var currentActionName = "walk";
    /**
     * The current step of the animation of the player.
     */
    var step = 0;
    /**
     * The speed of the player animation.
     */
    var speed = 100;
    /**
     * A function execute during an action.
     */
    var doDuringAction = undefined;
	/**
	* life
	*/
	var life = 3;

    /**
     * Get the json sprite representation for the current action name.
     */
    var getCurrentAction = function() {
        for (var i=0; i<sprite["actions"].length; i++) {
            if (sprite["actions"][i]["name"] === currentActionName) {
                return sprite["actions"][i];
            }
        }
    };

    /**
     * The jump action of the player.
     * Move the player in the y-axis.
     */
    var jump = function() {
        if (doDuringAction === undefined) {
            currentActionName = "jump";
            step = 0;
            doDuringAction = function() {
                if (step >= getCurrentAction().number/2) {
                    y += 10;
                }
                else {
                    y -= 10;
                }
                if (step == getCurrentAction().number-1) {
                    walk();
                    return;
                }
            }
        }
    };

    var shoot = function(shotsContainer) {
        if (doDuringAction === undefined) {
            step = 0;
            currentActionName = "shoot";
            doDuringAction = function() {
                step++;
                if (step === 8){
                    shotsContainer.push(createShots(arrow, x+30, y+30));
                }
                if (step === getCurrentAction().number-1) {
                    walk();
                    actionInProgress = false;
                }
            }
        }
    }

    var walk = function() {
        currentActionName = "walk";
        step = 0;
        doDuringAction = undefined;
    }

    var idAnimate = setInterval(function() {
        var action = getCurrentAction();
        step = (step+1) % action.number;
        if (doDuringAction !== undefined) {
            doDuringAction();
        }
    }, speed);

    // Expose Player properties & methods
    return {
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
                action["width"], 
                action["height"]
            );
        },
        jump : jump,
        walk : walk,
        shoot : shoot,
        getX : function() {
            return x;
        },
        getY : function() {
            return y;
        },
		removeLife : function() {
			life = life - 1;
		},
        addLife : function () {
            life = life + 1;
        },
		getLife : function() {
			return life;
		},
        getHitBox : function() {
            var hitbox = sprite["hitbox"]["standing"];
            return {
                x : hitbox["x"] + x,
                y : hitbox["y"] + y,
                width : hitbox["width"],
                height : hitbox["height"]
            }
        }
    }
};