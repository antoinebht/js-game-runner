var knightSprite = {
    "file": "sprites/knight.png",
    "actions" : [
        {
            "name" : "stop",
            "direction" : "left", 
            "x" : 0,
            "y" : 64,
            "width" : 64,
            "height" : 64,
            "number" : 1
        },
        {
            "name" : "stop",
            "direction" : "right", 
            "x" : 0,
            "y" : 192,
            "width" : 64,
            "height" : 64,
            "number" : 1
        },
        {
            "name" : "stop",
            "direction" : "up", 
            "x" : 0,
            "y" : 0,
            "width" : 64,
            "height" : 64,
            "number" : 1
        },
        {
            "name" : "stop",
            "direction" : "down", 
            "x" : 0,
            "y" : 128,
            "width" : 64,
            "height" : 64,
            "number" : 1
        },
        {
            "name" : "walk",
            "direction" : "right", 
            "x" : 0,
            "y" : 704,
            "width" : 64,
            "height" : 64,
            "number" : 9
        },
        {
            "name" : "walk",
            "direction" : "left", 
            "x" : 0,
            "y" : 576,
            "width" : 64,
            "height" : 64,
            "number" : 9
        },
        {
            "name" : "walk",
            "direction" : "up", 
            "x" : 0,
            "y" : 512,
            "width" : 64,
            "height" : 64,
            "number" : 9
        },
        {
            "name" : "walk",
            "direction" : "down", 
            "x" : 0,
            "y" : 640,
            "width" : 64,
            "height" : 64,
            "number" : 9
        },
        {
            "name" : "shoot",
            "direction" : "up", 
            "x" : 0,
            "y" : 1024,
            "width" : 64,
            "height" : 64,
            "number" : 13
        },
        {
            "name" : "shoot",
            "direction" : "down", 
            "x" : 0,
            "y" : 1152,
            "width" : 64,
            "height" : 64,
            "number" : 13
        },
        {
            "name" : "shoot",
            "direction" : "left", 
            "x" : 0,
            "y" : 1088,
            "width" : 64,
            "height" : 64,
            "number" : 13
        },
        {
            "name" : "shoot",
            "direction" : "right", 
            "x" : 0,
            "y" : 1216,
            "width" : 64,
            "height" : 64,
            "number" : 13
        },
    ]
}

const KEY_ARROW_LEFT = 37;
const KEY_ARROW_UP = 38;
const KEY_ARROW_RIGHT = 39;
const KEY_ARROW_DOWN = 40;
const KEY_SPACE = 32;


var physic = function() {

    /**
     * Acceleration g (m.s-2)
     */
    const g = 9.80665;
    return {
        positionNewton : function(vitInit, alpha, time) {
            var vit = [
                vitInit*Math.cos(alpha),
                -g*time+vitInit*Math.sin(alpha)
            ];
            var x = vitInit*Math.cos(alpha)*time;
            var y = -g/(2*vitInit*vitInit*Math.cos(alpha)*Math.cos(alpha))*x*x + Math.tan(alpha)*x;
            var pos = [x, y];
            console.log("x,y : "+x+","+y);
            return pos;
        }
    };
}();


window.onload = function() {

    var createPlayer = function(sprite, posX, posY) {
        var state = "walk";
        var dir = "right";
        var step = 0;
        var speed = 100;
        var shootLoad = 0;

        var getCurrentAction = function() {
            for (var i=0; i<sprite["actions"].length; i++) {
                if (sprite["actions"][i]["name"] === state && sprite["actions"][i]["direction"] === dir) {
                    return sprite["actions"][i];
                }
            }
        };


        var idAnimate = setInterval(function() {
            var action = getCurrentAction();
            step = (step+1)% action.number;
        }, speed);

        return {
            render : function(context, camera) {
                var action = getCurrentAction();
                context.drawImage(
                    document.getElementById(sprite["file"]), 
                    action["x"]+step*action["width"], 
                    action["y"],
                    action["width"], 
                    action["height"], 
                    camera.getX()-action["width"]/2+canvas.width/2, 
                    camera.getY()-action["height"]/2+canvas.height/2, 
                    action["width"], 
                    action["height"]
                );
            },
            setAction : function(name, direction) {
                state = name;
                if (direction !== undefined)
                    dir = direction;
                step = step%getCurrentAction().number;
            },
            move : function() {
                switch (dir) {
                    case "left":
                        posX-=5;
                        break;
                    case "right":
                        posX+=5;
                        break;
                    case "up":
                        posY-=5;
                        break;
                    case "down":
                        posY+=5;
                        break;
                }
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

    /**
     * 
     * @param {*} width 
     * @param {*} height 
     * @param {*} x the center x of the camara
     * @param {*} y the center y of the camera
     */
    var createCamera = function(width, height, x, y) {
        var speed = 10;
        return {
            moveX : function(right){
                x = x + (right ? +speed : -speed);
            },
            moveY : function(top){
                y = y + (top ? -speed : +speed);
            },
            getHeight : function() {
                return height;
            },
            getWidth : function() {
                return width;
            },
            getX : function() {
                return x;
            },
            getY : function() {
                return y;
            }
        };
    };
    

    var createMap = function(cols, rows, tileSize) {
        return {
            render : function(context, camera) {
                var minX = camera.getX() - camera.getWidth()/2;
                var minY = camera.getY() - camera.getHeight()/2;
                var minC = minX/tileSize;
                minC = minC < 0 ? Math.floor(minC) : Math.ceil(minC);
                var minR = minY/tileSize;
                minR = minR < 0 ? Math.floor(minR) : Math.ceil(minR);

                var maxX = camera.getX() + camera.getWidth()/2;
                var maxY = camera.getY() + camera.getHeight()/2;
                var maxC = maxX/tileSize;
                maxC = maxC < 0 ? Math.floor(maxC) : Math.ceil(maxC);
                var maxR = maxY/tileSize;
                maxR = maxR < 0 ? Math.floor(maxR) : Math.ceil(maxR);
            
                for (var c=minC; c<maxC; c++) {
                    for (var r=minR; r<maxR; r++) {
                        context.drawImage(
                            document.getElementById("grass"), 
                            0, 
                            0,
                            64, 
                            64, 
                            c*64 + canvas.width/2, 
                            r*64 + canvas.height/2, 
                            64, 
                            64
                        );
                    }
                }
                context.fillStyle = "red";
                context.strokeRect(camera.getX() - camera.getWidth()/2+canvas.width/2, camera.getY() - camera.getHeight()/2+canvas.height/2, camera.getWidth(), camera.getHeight());
                
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
    var map = createMap(8,5, 64);
    var camera = createCamera(400, 200, 0, 0);

    var handleKeyPressed = function(e) {
        switch (e.keyCode) {
            case KEY_ARROW_LEFT:
                player.setAction("walk", "left");
                player.move();
                camera.moveX(false);
                break;
            case KEY_ARROW_RIGHT:
                player.setAction("walk", "right");
                player.move();
                camera.moveX(true);
                break;
            case KEY_ARROW_UP:
                player.setAction("walk", "up");
                player.move();
                camera.moveY(false);
                break;
            case KEY_ARROW_DOWN:
                player.setAction("walk", "down");
                player.move();
                camera.moveY(true);
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
            default:
                player.setAction("stop");
                break;
        }
    };
    window.document.addEventListener("keyup", handleKeyUp, false);



    // var test = function(xInit, yInit) {
    //     var x = xInit;
    //     var y = yInit;
    //     var time = 0;
    //     var idTest = setInterval(function(){
    //         var pos = physic.positionNewton(71, 0.3, time*0.05);
    //         x = xInit+pos[0];
    //         y = yInit-pos[1];
    //         time++;
    //     },10);
    //     return {
    //         render : function(context) {
    //             context.fillRect(x,y,5,5);
    //         }
    //     }
    // }(10,200);

    var render = function() {
        context.clearRect(0,0,canvas.width, canvas.height);
        map.render(context, camera);
        player.render(context, camera);
    };


    var loop = function() {
        render();
        // player.animate();
    };

    var idLoop = setInterval(loop, 1000/FPS);
};

