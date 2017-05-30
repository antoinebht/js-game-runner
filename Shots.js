var createShots = function(sprite, x, y) {

    var move = function() {
        x += 5;
    }

    var idMoveLoop = setInterval(move, sprite.speed);

    return {
        render : function(context) {
            context.drawImage(
                document.getElementById(sprite["file"]), 
                sprite["x"], 
                sprite["y"],
                sprite["width"], 
                sprite["height"], 
                x,
                y,
                sprite["width"], 
                sprite["height"]
            );
        },
        getHitBox : function() {
            return {
                "x" : x,
                "y" : y,
                "width" : sprite["width"],
                "heigth" : sprite["height"],
            };
        },
        getX : function() {
            return x;
        },
        getY : function() {
            return y;
        },
    };
}