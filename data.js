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
};

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
};

const FPS = 24;
const KEY_ARROW_UP = 38;
const KEY_SPACE = 32;