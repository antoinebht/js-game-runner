/**
 * Create an obstacle for the player.
 * @param {*} sprite The JSON description of the sprite Sheet.
 * @param {*} x The x-axis position.
 * @param {*} y The y-axis position.
 */
var createObstacle = function(sprite, x, y) {
    /**
     * The name of the current action of the player.
     * Used to get the right sprite in the JSON.
     */
    var currentActionName = "normal";
    /**
     * The current step of the animation of the player.
     */
    var step = 0;

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

    var endDestruction = false;
    var inDestruction = false;

    return {
        move : function() {
            x -= 5;
        },
        destroy : function() {
            currentActionName = "destruction";
            inDestruction = true;
            setInterval(function(){
                step++;
                if (step == 9) {
                    endDestruction = true;
                }
            }, 100);
        },
        getX : function() {
            return x;
        },
        getY : function() {
            return y;
        },
        isDestroy : function(){
            return endDestruction;    
        },
        isInDestruction : function() {
            return inDestruction;
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
        },
        getHitBox : function() {
            return {
                "x" : x,
                "y" : y,
                "width" : 24,
                "height" : 24             
            };
        }
    };
};