var Buttons = Class.extend({
    init: function(){
    },
    GetButtons: function(){
        return [
            // New Game Button
            {
                id: "newGame",
                group: "index",
                width: 200,
                height: 50,
                x: 0, //x & y get set when the button is drawn
                y: 0,
                color: "rgba(255,0,0,.9)",
                text: "New Game",
                textColor: "rgb(255,255,255)",
                font: "bold 1.5em monospace"
            }
        ]
    },
    GetLevelButtons: function(count, level){
        var levelButtons = [];
        var buttonXPadding = 20;
        var buttonYPadding = 20;
        var buttonWidth = 90;
        var buttonHeight = 90;
        var x = 140;
        var y = 20;
        var row = 1;
        var column = 1;
        for(var i = 1; i <= count; i++){
            var button = {
                id: "lvl" + i,
                group: "level",
                width: buttonWidth,
                height: buttonHeight,
                x: x,
                y: y,
                color: "rgba(255,0,0,.9)",
                text: i,
                textColor: "rgb(255,255,255)",
                font: "bold 1.5em monospace"
            }
            levelButtons.push(button);
            
            if(column <= 4){
                x += buttonWidth + buttonXPadding;
                column++;
            } else {
                row++;
                y += buttonHeight + buttonYPadding;
                column = 1;
                x = 140;
            }
    }
        
        return levelButtons;
    }
});