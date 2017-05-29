/**
 * Check the collision between 2 hitbox.
 * An hitbox is represented by the position of the left-up corner coords and its width and height.
 * @param {*} hb1 the first hitbox
 * @param {*} hb2 The second hitbox
 */
var checkColision = function(hb1, hb2) {
    var colX = false;
    var colY = false;

    // Check the collision on the x-axis
    if (hb2.x < hb1.x + hb1.width && hb2.x > hb1.x)
        colX = true;
    if (hb1.x < hb2.x + hb2.width && hb1.x > hb2.x)
        colX = true;

    // Check the collision on the y-axis
    if (hb2.y < hb1.y + hb1.height && hb2.y > hb1.y)
        colY = true;
    if (hb1.y < hb2.y + hb2.height && hb1.y > hb2.y)
        colY = true;

    return colX && colY;
};