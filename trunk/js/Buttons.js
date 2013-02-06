var Buttons = Class.extend({
    init: function(){
    },
    GetButtons: function(gameObjManager, headerOnly){
        var group = gameObjManager.Group;
        var buttons = [];
        switch(group){
            case "index":
                buttons = [
                    {
                        id: "title",
                        group: group,
                        width: 762,
                        height: 88,
                        x: 0, //x & y get set when the button is drawn
                        y: 0,
                        color: "rgba(0,0,0,.6)",
                        imgSrc: "images/title.png"
                    },
                    {
                        id: "start",
                        group: group,
                        width: 200,
                        height: 50,
                        x: 0, //x & y get set when the button is drawn
                        y: 0,
                        color: "rgba(0,0,0,.7)",
                        text: "Start",
                        textColor: "rgb(255,255,255)",
                        font: gameObjManager.DefaultFont
                    },
                    {
                        id: "credits",
                        group: group,
                        width: 200,
                        height: 50,
                        x: 0, //x & y get set when the button is drawn
                        y: 0,
                        color: "rgba(0,0,0,.7)",
                        text: "Credits",
                        textColor: "rgb(255,255,255)",
                        font: gameObjManager.DefaultFont
                    },
                    {
                        id: "help",
                        group: group,
                        width: 200,
                        height: 50,
                        x: 0, //x & y get set when the button is drawn
                        y: 0,
                        color: "rgba(0,0,0,.7)",
                        text: "Help",
                        textColor: "rgb(255,255,255)",
                        font: gameObjManager.DefaultFont
                    },
                    {
                        id: "player",
                        group: group,
                        width: 125,
                        height: 150,
                        x: 0,
                        y: 0,
                        imgSrc: "images/sprites/player2.png"
                    }
                ]
                break;
            case "playerSelect":
                buttons = [{}];
                break;
            case "levelSelect":
                buttons = [{}];
                break;
            case "sol":
                buttons = [
                    {
                        id: "levelTitle",
                        group: group,
                        width: 200,
                        height: 50,
                        x: 0,
                        y: 0,
                        color: "rgba(0,0,0,0)",
                        text: "",
                        textColor: "rgb(255,255,255)",
                        font: gameObjManager.DefaultFont
                    }
                ];
                break;
            case "eol":
                buttons = [
                    {
                        id: "levelStatus",
                        group: group,
                        width: 200,
                        height: 50,
                        x: 0,
                        y: 0,
                        color: "rgba(0,0,0,0)",
                        text: "You Won!",
                        textColor: "rgb(255,255,255)",
                        font: gameObjManager.DefaultFont
                    },
                    {
                        id: "nextLevel",
                        group: group,
                        width: 200,
                        height: 50,
                        x: 0,
                        y: 0,
                        color: "rgba(255,0,0,.9)",
                        text: "Next Level ->",
                        textColor: "rgb(255,255,255)",
                        font: gameObjManager.DefaultFont,
                        level: 0
                    }
                ]
                break;
        }
        
        if(headerOnly === true){
            return [
                    //music on/off button
                    {
                        id: "music",
                        group: group,
                        width: 25,
                        height: 25,
                        x: 0, //x & y get set when the button is drawn
                        y: 0,
                        imgSrcOn: "images/buttons/music_on.png",
                        imgSrcOff: "images/buttons/music_off.png",
                        state: gameObjManager.Music
                    },
                    //return home button
                    {
                        id: "home",
                        group: group,
                        width: 25,
                        height: 25,
                        x: 0,
                        y: 0,
                        imgSrc: "images/buttons/home.png",
                    }
            ]
        } else {
            return buttons;
        }
    },
    GetPlayerButtons: function(gameObjManager){
        var playerButtons = [];
        var submitButton = {
            id: "submitName",
            group: gameObjManager.Group,
            width: 200,
            height: 37,
            x: 0,
            y: 0,
            color: "rgba(255,0,0,.9)",
            text: "Submit",
            textColor: "rgb(255,255,255)",
            font: gameObjManager.DefaultFont
        }
        playerButtons.push(submitButton);
        
        var players = gameObjManager.GetPlayers();
        var len = players.length;
        var x = 100;
        var y = 155;
        if(len > 0){
            for (var i = 0; i < len; i++){
                var player = players[i];
                var playerButton = {
                    id: "player",
                    group: gameObjManager.Group,
                    width: 520,
                    height: 50,
                    x: x,
                    y: y,
                    color: "rgba(255,0,0,.9)",
                    name: player.name,
                    text: player.name + " | Level: " + player.level,
                    textColor: "rgb(255,255,255)",
                    font: gameObjManager.DefaultFont
                }
                playerButtons.push(playerButton);
                
                y += 60;
            }
        }
        
        return playerButtons;
    },
    GetLevelButtons: function(gameObjManager, count, level){
        var levelButtons = [];
        var buttonXPadding = 60;
        var buttonYPadding = 40;
        var buttonWidth = 50;
        var buttonHeight = 50;
        var x = 140;
        var y = 35;
        var row = 1;
        var column = 1;
        var columns = 6;
        if(gameObjManager.WindowWidth < 1000){
            columns = 4;
        } else if(gameObjManager.WindowWidth < 500){
            columns = 2;
        }
        for(var i = 1; i <= count; i++){
            var locked = true;
            if(i <= level){
                locked = false;
            }
            var button = {
                id: "lvlButton",
                group: "level",
                width: buttonWidth,
                height: buttonHeight,
                x: x,
                y: y,
                color: "rgba(255,0,0,.9)",
                text: i < 10 ? "0" + i : i,
                textColor: "rgb(255,255,255)",
                font: gameObjManager.DefaultFont,
                imgSrc: "images/buttons/lock.png",
                locked: locked,
                level: new Levels(i, gameObjManager.WindowHeight, gameObjManager.WindowWidth)
            }
            levelButtons.push(button);
            
            if(column <= columns){
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
    },
    GetLabelButton: function(group, gameObjManager){
        var labelButton = {

                    };
        return labelButton;
    },
    GetLinkButton: function(group, gameObjManager){
        var linkButton = {
                        id: "creditLink",
                        group: group,
                        width: 0,
                        height: 50,
                        x: 0,
                        y: 0,
                        color: "rgba(0,0,0,0)",
                        text: "",
                        textColor: "rgb(46,154,254)",
                        font: gameObjManager.DefaultFont
                    };
        return linkButton;
    },
});
var LabelButton = Class.extend({
    init: function(group, gameObjManager){
        this.id = "credit";
        this.group = group;
        this.width = 0;
        this.height = 50;
        this.x = 0;
        this.y = 0;
        this.color = "rgba(0,0,0,0)";
        this.text = "";
        this.textColor = "rgb(255,255,255)";
        this.font = gameObjManager.DefaultFont;
    }
});
var LinkButton = Class.extend({
    init: function(group, gameObjManager){
        this.id = "creditLink";
        this.group = group;
        this.width = 0;
        this.height = 50;
        this.x = 0;
        this.y = 0;
        this.color = "rgba(0,0,0,0)";
        this.text = "";
        this.textColor = "rgb(46,154,254)";
        this.font = gameObjManager.DefaultFont;
    }
});