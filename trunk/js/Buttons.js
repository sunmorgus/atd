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
                        //color: "rgba(0,0,0,.7)",
                        color: "rgb(56,77,214)",
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
            case "requiredScore":
                buttons = [
                    {
                        id: "requiredScore",
                        group: group,
                        width: 200,
                        height: 50,
                        x: 0,
                        y: 0,
                        color: "rgba(0,0,0,.7)",
                        text: "",
                        textColor: "rgb(255,255,255)",
                        font: gameObjManager.DefaultFont
                    },
                    {
                        id: "yourScore",
                        group: group,
                        width: 200,
                        height: 50,
                        x: 0,
                        y: 0,
                        color: "rgba(0,0,0,.7)",
                        text: "",
                        textColor: "rgb(255,255,255)",
                        font: gameObjManager.DefaultFont
                    },
                    {
                        id: "rsOk",
                        group: group,
                        width: 200,
                        height: 50,
                        x: 0,
                        y: 0,
                        color: "rgba(255,0,0,.9)",
                        text: "OK",
                        textColor: "rgb(255,255,255)",
                        font: gameObjManager.DefaultFont
                    }
                ]
                break;
        }
        
        if(headerOnly === true){
            buttons = [
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
                    {
                        id: "home",
                        group: group,
                        width: 25,
                        height: 25,
                        x: 0,
                        y: 0,
                        imgSrc: "images/buttons/home.png"
                    }
            ]
        }
        
        return buttons;
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
            color: "rgba(0,0,0,.9)",
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
                    //color: "rgba(0,0,0,.9)",
                    color: "rgb(56,77,214)",
                    name: player.name,
                    text: player.name + " | Level: " + player.level + " | Score: " + player.score,
                    textColor: "rgb(255,255,255)",
                    font: gameObjManager.DefaultFont
                }
                playerButtons.push(playerButton);
                
                y += 60;
            }
        }
        
        return playerButtons;
    },
    GetLevelButtons: function(gameObjManager, count, currentPlayer){
        var levelButtons = [];
        var windowWidth = gameObjManager.WindowWidth;
        var windowHeight = gameObjManager.WindowHeight;
        var buttonXPadding = 30;
        var buttonYPadding = 10;
        var buttonWidth = 50;
        var buttonHeight = 50;
        var x = 30;
        var y = 35;
        if(windowHeight >= 510){
            buttonYPadding = 20;
        }
        if(windowHeight >= 600){
            buttonYPadding = 60;
            y = 55;
        }
        
        var totalButtonWidth = buttonWidth + buttonXPadding;
        var columns = Math.floor(windowWidth / totalButtonWidth);
        for (var i = 1; i <= count; i++){
            if(i % (columns - 1) == 1 && i != 1){
                //new row
                y += buttonHeight + buttonYPadding;
                x = 30;
            }
            
            var level = new Levels(i, gameObjManager.WindowHeight, gameObjManager.WindowWidth);
            
            var locked = true;
            if(i <= currentPlayer.level || debug === true){
                locked = false;
            }
            var button = {
                id: "lvlButton",
                group: "level",
                width: buttonWidth,
                height: buttonHeight,
                x: x,
                y: y,
                color: i % 5 === 0 && locked === false ? "rgba(255,0,0,.9)" : "rgba(56,77,214,.9)",
                text: i < 10 ? "0" + i : i,
                textColor: "rgb(255,255,255)",
                font: gameObjManager.DefaultFont,
                imgSrc: "images/buttons/lock.png",
                locked: locked,
                level: level
            }
            levelButtons.push(button);
            
            x += buttonWidth + buttonXPadding;
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
    Draw: function(context, headerOnly, gameObjManager, canvasX, canvasWidth, canvasHeight, canvasMiddle, canvasVMiddle, LevelTitle, DrawImage){
        var buttons = [];
        if(!headerOnly){
            switch(gameObjManager.Group){
                case "index": //draw buttons center x,y
                    var indexButtons = this.GetButtons(gameObjManager, false);
                    var canvasRight = canvasX + canvasWidth;
                    var canvasBottom = canvasHeight;
                    var startY = canvasBottom - 210;
                    for(var i in indexButtons){
                        var button = indexButtons[i];
                        if(button.imgSrc !== undefined && button.imgSrc !== null){
                            if(button.id === "player"){
                                button.x = 60;
                                button.y = canvasBottom - 150;
                                this.DrawImageButton(context, button, false, false, DrawImage);
                            }
                            if(button.id === "title"){
                                button.x = canvasMiddle - (button.width / 2);
                                button.y = 55;
                                this.DrawImageButton(context, button, true, false, DrawImage);
                            }
                        } else {
                            button.x = canvasRight - button.width - 20;
                            button.y = startY;
                            this.DrawTextButton(context, button, true);
                            startY += 70;
                        }
                        
                        buttons.push(button);
                    }
                    break;
                case "credits":
                    var labelButton = new LabelButton("credits", gameObjManager);
                    var startY = 35;
                    
                    //Me
                    labelButton.text = "• Created/Developed/Designed By: Nicklas DeMayo | Url: ";
                    var textSize = context.measureText(labelButton.text);
                    labelButton.width = textSize.width;
                    labelButton.x = 20;
                    labelButton.y = startY;
                    this.DrawTextButton(context, labelButton);
                    
                    //My Website
                    buttons[0] = new LinkButton("credits", gameObjManager);
                    buttons[0].text = "http://www.csbctech.com";
                    textSize = context.measureText(buttons[0].text);
                    buttons[0].width = textSize.width;
                    buttons[0].x = labelButton.x + labelButton.width;
                    buttons[0].y = labelButton.y;
                    this.DrawTextButton(context, buttons[0]);
                    //buttons[0] = linkButton;
                    
                    //Player and Enemy Vector
                    labelButton.text = "• Dalek Character Graphic By: LBondo | Url: ";
                    textSize = context.measureText(labelButton.text);
                    labelButton.width = textSize.width;
                    labelButton.x = 20;
                    labelButton.y += startY + 10;
                    this.DrawTextButton(context, labelButton);
                    
                    //Player and Enemy Vector Website
                    buttons[1] = new LinkButton("credits", gameObjManager);
                    buttons[1].text = "http://lbondo.deviantart.com/";
                    textSize = context.measureText(buttons[1].text);
                    buttons[1].width = textSize.width;
                    buttons[1].x = labelButton.x + labelButton.width;
                    buttons[1].y = labelButton.y;
                    this.DrawTextButton(context, buttons[1]);
                    
                    //Tardis
                    labelButton.text = "• T.A.R.D.I.S. Graphic By: Copiously Geeky | Url: ";
                    textSize = context.measureText(labelButton.text);
                    labelButton.width = textSize.width;
                    labelButton.x = 20;
                    labelButton.y += startY + 10;
                    this.DrawTextButton(context, labelButton);

                    //Tardis Website
                    buttons[2] = new LinkButton("credits", gameObjManager);
                    buttons[2].text = "http://copiouslygeeky.com/";
                    textSize = context.measureText(buttons[2].text);
                    buttons[2].width = textSize.width;
                    buttons[2].x = labelButton.x + labelButton.width;
                    buttons[2].y = labelButton.y;
                    this.DrawTextButton(context, buttons[2]);
                    
                    break;
                case "playerSelect":
                    var playerButtons = this.GetPlayerButtons(gameObjManager);
                    //len = playerButtons.length;
                    for(var i in playerButtons){
                        button = playerButtons[i];
                        if(button.id === "submitName"){
                            button.x = 420;
                            button.y = 68;
                            this.DrawTextButton(context, button, true);
                        } else {
                            this.DrawTextButton(context, button, true);
                        }
                        buttons.push(button);
                    }
                    break;
                case "levelSelect":
                    // Show Level Select
                    var levelButtons = this.GetLevelButtons(gameObjManager, 55, gameObjManager.CurrentPlayer);
                    //len = levelButtons.length;
                    for(var i in levelButtons){
                        button = levelButtons[i];
                        if(button.locked === false){
                            this.DrawTextButton(context, button, true);
                        } else {
                            this.DrawImageButton(context, button, true, true, DrawImage);
                        }
                        buttons.push(button);
                    }
                    break;
                case "sol":
                    var solButtons = this.GetButtons(gameObjManager, false);
                    for(var i in solButtons){
                        button = solButtons[i];
                        button.x = canvasMiddle - (button.width / 2);
                        button.y = canvasVMiddle - button.height;
                        button.text = LevelTitle;
                        this.DrawTextButton(context, button);
                        buttons.push(button);
                    }
                    break;
                case "eol":
                    indexButtons = this.GetButtons(gameObjManager, false);
                    //len = indexButtons.length;
                    var health = gameObjManager.CurrentPlayer.health;
                    for(var i in indexButtons){
                        button = indexButtons[i];
                        switch(button.id){
                            case "levelStatus":
                                button.x = canvasMiddle - (button.width / 2);
                                button.y = 35;
                                
                                if(health <= 0){
                                    button.text = "You Were Exterminated!";
                                }
                                
                                break;
                            case "nextLevel":
                                button.x = canvasMiddle - (button.width / 2);
                                button.y = 35 + button.height + 10;
                                
                                if(health === 0){
                                    button.text = "Retry";
                                    
                                    //Reset Health for Restarting Level
                                    button.level = new Levels(ATD.Level, gameObjManager.WindowHeight, gameObjManager.WindowWidth);
                                } else {
                                    button.level = new Levels(ATD.Level, gameObjManager.WindowHeight, gameObjManager.WindowWidth);
                                    if(ATD.Level > gameObjManager.CurrentPlayer.level){
                                        //Set Current Player to Next Level
                                        gameObjManager.CurrentPlayer.level = ATD.Level;
                                        gameObjManager.SavePlayer(gameObjManager.CurrentPlayer);
                                    }
                                }
                                
                                break;
                        }

                        this.DrawTextButton(context, button);
                        buttons.push(button);
                    }
                    break;
                case "requiredScore":
                    indexButtons = this.GetButtons(gameObjManager, false);
                    var score = gameObjManager.Level.RequiredScore;
                    for(var i in indexButtons){
                        button = indexButtons[i];
                        var y = canvasVMiddle - (button.height * 2);
                        switch(button.id){
                            case "requiredScore":
                                button.text = "A score of " + score + " is required to play level " + gameObjManager.Level.LevelNumber + "!";
                                var textSize = context.measureText(button.text);
                                button.width = textSize.width + 20;
                                button.x = canvasMiddle - (button.width / 2);
                                button.y = y;
                                break;
                            case "yourScore":
                                button.text = "Your score is only " + gameObjManager.CurrentPlayer.score + "!";
                                var textSize = context.measureText(button.text);
                                button.width = textSize.width + 20;
                                button.x = canvasMiddle - (button.width / 2);
                                button.y = y + button.height + 10;
                                break;
                            case "rsOk":
                                button.x = canvasMiddle - (button.width / 2);
                                button.y = y + (button.height * 2) + 20;
                                break;
                        }
                        
                        this.DrawTextButton(context, button);
                        buttons.push(button);
                    }
            }
        }
        
        var headerButtons = this.GetButtons(gameObjManager, true);
        for (var i in headerButtons){
            var headerButton = headerButtons[i];
            var img = new Image();
            switch(headerButton.id){
                case "music":
                    var audio = (gameObjManager.GetOption("audio") === 'true');
                    if(audio === true){
                        img.src = headerButton.imgSrcOn;
                    } else {
                        img.src = headerButton.imgSrcOff;
                    }
                    headerButton.x = canvasWidth - headerButton.width;

                    break;
                case "home":
                    if(gameObjManager.Group !== "index"){
                        img.src = headerButton.imgSrc;
                        headerButton.x = canvasWidth - (headerButton.width * 2);
                    }
                    break;
            }
            
            headerButton.y = 0;
            DrawImage(context, img, headerButton.x, 0, headerButton.width, headerButton.height);
            
            //add switch on group here to draw header buttons specific to group
            
            buttons.push(headerButton);
        }
        
        return buttons;
    },
    DrawTextButton: function(context, button, stroke){
        if(stroke === undefined || stroke === null){
            stroke = false;
        }
        
        if(stroke === true){
            context.strokeStyle = "rgba(255,255,255,1)";
            context.strokeRect(button.x, button.y, button.width, button.height);
        }
        
        context.fillStyle = button.color;
        context.fillRect(button.x, button.y, button.width, button.height);
        context.fillStyle = button.textColor;
        context.textAlign = "center";
        context.font = button.font;
        var textSize = context.measureText(button.text);
        context.fillText(button.text, button.x + (button.width / 2), button.y + (button.height / 1.7));
    },
    DrawImageButton: function(context, button, fill, stroke, DrawImage){
        if(fill === undefined || fill === null){
            fill = true;
        }
        
        if(stroke === undefined || stroke === null){
            stroke = false;
        }
        
        if(fill === true){
            context.fillStyle = button.color;
            context.fillRect(button.x, button.y, button.width, button.height);
        }
        
        if(stroke === true){
            context.strokeStyle = "rgba(255,255,255,1)";
            context.strokeRect(button.x, button.y, button.width, button.height);
        }
        
        var img = new Image();
        img.src = button.imgSrc;
        DrawImage(context, img, button.x, button.y, button.width, button.height);
    }
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