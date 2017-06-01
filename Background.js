var createBackground = function(sprite, canvasW) {
    var back = [];
    back.push({
        "x" : 0,
        "y": 0
    });
    if (sprite.width < canvasW) {
        back.push({
            "x" : sprite.width,
            "y": 0
        });
    }

    var move = function() {
        for (var i=0; i< back.length; i++) {
            back[i].x-=2;
        }

        if (back[back.length-1].x + sprite.width < canvasW) {
            back.push({
                "x" : canvasW-2,
                "y": 0
            });
        }
    };

    var idMove = setInterval(move, sprite.moveSpeed);

    return {
        render : function(context) {
            for (var i=0; i< back.length; i++) {
                context.drawImage(
                    document.getElementById(sprite["file"]), 
                    0, 
                    0,
                    sprite["width"], 
                    sprite["height"], 
                    back[i].x,
                    back[i].y,
                    sprite["width"], 
                    sprite["height"]
                );
            }
        },
        setSprite : function(nSprite) {
            sprite = nSprite;
        }
    }
}