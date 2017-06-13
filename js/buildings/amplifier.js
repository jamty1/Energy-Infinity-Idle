﻿var ampCount = 0;
var ampCost = 500;
var ampLocations = [];

class Amplifier {
    place(x, y) {
        var newAmp = new Image();
        newAmp.onload = function () {
            context.drawImage(newAmp, x, y);
        }
        newAmp.src = "images/Amp.png";

        ampLocations.push({ x: x / 25, y: y / 25 });
    }

    buy() {
        if (totalGold >= ampCost) {
            totalGold -= ampCost;
            ampCount += 1;
            ampCost *= 2;
            return true;
        } else {
            displayInformationText("Not enough gold.", "red");
            return false;
        }
    }

    sell(x, y) {
        ampCount -= 1;
        ampCost /= 2;
        addGold(ampCost);

        var index = ampLocations.indexOf({ x: x, y: y });
        ampLocations.splice(index, 1);
    }

    icon() {
        var location = {
            top: 70 + canvasRect.top,
            bottom: 70 + 25 + canvasRect.top,
            left: canvasWidth - 105 + canvasRect.left,
            right: canvasWidth - 105 + cellSizeX + canvasRect.left
        };
        return location;
    }
}

function amplifyCells() {
    var e = 0;
    var s = 0;
    var l = 0;
    // Check which type of buildings are on top or bottom.
    for (var i = 0; i < ampLocations.length; i++) {
        var gridX = ampLocations[i].x;
        var gridY = ampLocations[i].y;
        if (grid[gridX][gridY - 1].id == 1) {
            e++;
        } else if (grid[gridX][gridY - 1].id == 2) {
            s++;
        } else if (grid[gridX][gridY - 1].id == 3) {
            l++;
        }
        if (grid[gridX][gridY + 1].id == 1) {
            e++;
        } else if (grid[gridX][gridY + 1].id == 2) {
            s++;
        } else if (grid[gridX][gridY + 1].id == 3) {
            l++;
        }
    }
    return {energy: e, seller: s, lab: l};
}