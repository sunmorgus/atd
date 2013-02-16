var GameObj = Class.extend({
    init: function(){
        this.startX = 0;
        this.x = 0;
        this.startY = 0;
        this.y = 0;
    }
});var Enemy = GameObj.extend({
    init: function(type){
        this.ObjType = "enemy";
        switch(type){
            case "gold":
                this.health = 50;
                this.startHealth = 50;
                this.damage = 10;
                this.frequency = 1;
                this.shotspeed = 25;
                this.imgSrc = "images/sprites/enemies/gold.png";
                this.imgSrcInvert = "images/sprites/enemies/gold_invert.png";
                break;
            case "green":
                this.health = 80;
                this.startHealth = 80;
                this.damage = 12;
                this.frequency = 1;
                this.shotspeed = 25;
                this.imgSrc = "images/sprites/enemies/green.png";
                this.imgSrcInvert = "images/sprites/enemies/green_invert.png";
                break;
            case "white":
                break;
            case "orange":
                break;
            case "blue":
                break;
            case "yellow":
                break;
        }
        this.width = 125;
        this.height = 140;
        this.hit = false;
        this.hitCount = 0;
        this.fighting = false;
        this.shots = [];
    }
});
var Boss = GameObj.extend({
    init: function(type){
        this.ObjType = "boss";
        switch(type){
            case "dalek-supreme":
                this.health = 150;
                this.startHealth = 150;
                this.damage = 20;
                this.frequency = 2;
                this.shotspeed = 35;
                this.imgSrc = "images/sprites/enemies/dalek-supreme.png";
                this.imgSrcInvert = "images/sprites/enemies/dalek-supreme-invert.png";
                this.width = 150;
                this.height = 175;
                break;
        }
        this.hit = false;
        this.hitCount = 0;
        this.fighting = false;
        this.moveUp = true;
        this.moveDown = false;
        this.shots = [];
    }
});var PowerUp = GameObj.extend({
    init: function(type){
        this.ObjType = "powerup";
        switch(type){
            case "health":
                this.id = GUID();
                this.type = "health",
                this.health = 20;
                this.imgSrc = "images/sprites/powerups/ss.png";
                this.width = 75;
                this.height = 75;
                break;
            case "tardis":
                this.id = GUID();
                this.type = "tardis",
                this.imgSrc = "images/sprites/tardis.png";
                this.width = 135;
                this.height = 282;
                break;
            case "doctor_1":
                this.id = GUID();
                this.type = "doctor";
                this.imgSrc = "images/sprites/doctors/doctor_1.png",
                this.width = 48;
                this.height = 150;
                this.message = "Yes, there are very few of us left. Now let's get out of here, and be crafty! Come along!";
                this.speechTime = 4500;
                this.saved = false;
                break;
        }
    }
});var Levels = Class.extend({
    init: function(lvl, windowHeight, windowWidth){
        this.LevelNumber = lvl;
        
        this.LevelTiles = [];
        this.TileTypes = ["empty", "empty", "empty", "enemy", "enemy", "enemy", "powerup", "powerup"];
    },    
    BuildLevel: function(windowWidth, windowHeight){
        var lvl = this.LevelNumber;
        var levelWidth = 2382;
        var tileWidth = 200;
        var tileCount = levelWidth / tileWidth;
        var tileTypes = this.TileTypes;
        
        switch(lvl){
            case 1:
                this.LevelTitle = "The Dead Planet";
                this.Grayscale = false;
                this.BossLevel = false;
                this.RequiredScore = 0;
                
                this.LevelBackground0 = 'images/backgrounds/Part01Bg0.png';
                this.LevelBackground1 = 'images/backgrounds/Part01Bg1.png';
                this.LevelBackground2 = 'images/backgrounds/Part01Bg2.png';
                
                var enemyTypes = ["gold"];
                var powerUpTypes = ["health"];
                this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, false);
                break;
            case 2:
                this.LevelTitle = "The Survivors";
                this.Grayscale = false;
                this.BossLevel = false;
                this.RequiredScore = 200;
                
                this.LevelBackground0 = 'images/backgrounds/Part01Bg0.png';
                this.LevelBackground1 = 'images/backgrounds/Part01Bg1.png';
                this.LevelBackground2 = 'images/backgrounds/Part01Bg2.png';
                
                var enemyTypes = ["gold"];
                var powerUpTypes = ["health"];
                this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, false);
                break;
            case 3:
                this.LevelTitle = "The Escape";
                this.Grayscale = false;
                this.BossLevel = false;
                this.RequiredScore = 400;
                
                this.LevelBackground0 = 'images/backgrounds/Part01Bg0.png';
                this.LevelBackground1 = 'images/backgrounds/Part01Bg1.png';
                this.LevelBackground2 = 'images/backgrounds/Part01Bg2.png';
                
                var enemyTypes = ["gold"];
                var powerUpTypes = ["health"];
                this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, false);
                break;
            case 4:
                this.LevelTitle = "The Ambush";
                this.Grayscale = false;
                this.BossLevel = false;
                this.RequiredScore = 600;
                
                this.LevelBackground0 = 'images/backgrounds/Part01Bg0.png';
                this.LevelBackground1 = 'images/backgrounds/Part01Bg1.png';
                this.LevelBackground2 = 'images/backgrounds/Part01Bg2.png';
                
                var enemyTypes = ["gold"];
                var powerUpTypes = ["health"];
                this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, false);
                break;
            case 5:
                this.LevelTitle = "Dalek Supreme!";
                this.Grayscale = false;
                this.BossLevel = true;
                this.RequiredScore = 800;
                
                this.LevelBackground0 = 'images/backgrounds/Part01Bg0.png';
                this.LevelBackground1 = 'images/backgrounds/Part01Bg1.png';
                this.LevelBackground2 = 'images/backgrounds/Part01Bg2.png';
                
                var enemyTypes = ["dalek-supreme"];
                var powerUpTypes = ["health"];
                
                tileCount = levelWidth / tileWidth;
                this.GetBossTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, false);
                break;
            case 6:
                levelWidth *= 1.5;
                this.LevelTitle = "The Power of the Daleks";
                this.Grayscale = false;
                this.BossLevel = false;
                this.RequiredScore = 1000;
                
                this.LevelBackground0 = 'images/backgrounds/Part02Bg0.png';
                this.LevelBackground1 = 'images/backgrounds/Part02Bg2.png';
                this.LevelBackground2 = 'images/backgrounds/Part02Bg3.png';
                //this.LevelBackground3 = 'images/backgrounds/Part02Bg3.png';
                
                var enemyTypes = ["gold", "green"];
                var powerUpTypes = ["health"];
                this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, true);
                break;
            case 7:
                levelWidth *= 1.5;
                this.LevelTitle = "The Evil of the Daleks";
                this.Grayscale = false;
                this.BossLevel = false;
                this.RequiredScore = 1200;
                
                this.LevelBackground0 = 'images/backgrounds/Part02Bg0.png';
                this.LevelBackground1 = 'images/backgrounds/Part02Bg2.png';
                this.LevelBackground2 = 'images/backgrounds/Part02Bg3.png';
                //this.LevelBackground3 = 'images/backgrounds/Part02Bg3.png';
                
                var enemyTypes = ["gold", "green"];
                var powerUpTypes = ["health"];
                this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, true);
                break;
            case 8:
                levelWidth *= 1.5;
                this.LevelTitle = "The Wheel in Space";
                this.Grayscale = false;
                this.BossLevel = false;
                this.RequiredScore = 1400;
                
                this.LevelBackground0 = 'images/backgrounds/Part02Bg0.png';
                this.LevelBackground1 = 'images/backgrounds/Part02Bg2.png';
                this.LevelBackground2 = 'images/backgrounds/Part02Bg3.png';
                //this.LevelBackground3 = 'images/backgrounds/Part02Bg3.png';
                
                var enemyTypes = ["gold", "green"];
                var powerUpTypes = ["health"];
                this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, true);
                break;
        }
        
        var tardisPosition = {
            type: "powerup",
            powerUpType: "tardis",
            x: levelWidth,
            y: windowHeight - 282
        };
        
        this.LevelTiles.push(tardisPosition);
        this.LevelWidth = levelWidth;
    },
    GetLevelTiles: function(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, randomY){
        var enemyX = (windowWidth + tileWidth) - 600;
        var powerUpX = tileWidth;
        for(var i = 0; i < tileCount; i++){
            tileType = tileTypes[this.GetRandomInt(0, tileTypes.length - 1)];
            switch(tileType){
                case "empty":
                    this.LevelTiles.push(null);
                    break;
                case "enemy":
                    if(this.BossLevel === false){
                        var enemyY = randomY === true ? this.GetRandomInt(25, windowHeight - 140) : windowHeight - 140;
                        if(enemyX < (levelWidth - 200)){
                            var enemyPosition = {
                                type: tileType,
                                enemyType: enemyTypes[this.GetRandomInt(0, enemyTypes.length - 1)],
                                x: enemyX,
                                y: enemyY
                            };
                            this.LevelTiles.push(enemyPosition);
                        } else {
                            this.LevelTiles.push(null);
                        }
                    }
                    break;
                case "powerup":
                    if(powerUpX < (levelWidth - 200)){
                        var powerUpPosition = {
                            type: tileType,
                            powerUpType: powerUpTypes[this.GetRandomInt(0, powerUpTypes.length - 1)],
                            x: powerUpX,
                            y: this.GetRandomInt(25, windowHeight - 150)
                        };
                        this.LevelTiles.push(powerUpPosition);
                    } else {
                        this.LevelTiles.push(null);
                    }
                    break;
            }
            enemyX += tileWidth;
            powerUpX += tileWidth;
        }
    },
    GetBossTiles: function(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, randomY){
        this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, randomY);
        var levelTiles = this.LevelTiles;
        var bossX = levelWidth - (tileWidth * 2);
        var bossY = this.GetRandomInt(25, windowHeight - 175);
        var bossPosition = {
            type: "boss",
            enemyType: enemyTypes[0],
            x: bossX,
            y: bossY
        };
        var doctorPosition = {
            type: "doctor",
            powerUpType: "doctor_1",
            x: levelWidth - 200,
            y: windowHeight - 150
        };
        this.LevelTiles.push(bossPosition);
        this.LevelTiles.push(doctorPosition);
    },
    GetRandomInt: function(min, max) {
        var rand = Math.floor(Math.random() * (max - min + 1)) + min;
        return rand;
    }
});var Buttons = Class.extend({
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
    GetLevelButtons: function(gameObjManager, count, level){
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
                color: i % 5 === 0 && locked === false ? "rgba(255,0,0,.9)" : "rgba(56,77,214,.9)",
                text: i < 10 ? "0" + i : i,
                textColor: "rgb(255,255,255)",
                font: gameObjManager.DefaultFont,
                imgSrc: "images/buttons/lock.png",
                locked: locked,
                level: new Levels(i, gameObjManager.WindowHeight, gameObjManager.WindowWidth)
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
                    var levelButtons = this.GetLevelButtons(gameObjManager, 55, gameObjManager.CurrentPlayer.level);
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
});var GameObjManager = Class.extend({
	init : function() {
        //Page Objects
        var gameWidth = $(window).width();
        var gameHeight = $(window).height();
        var scaleToFitX = gameWidth / 800;
        var scaleToFitY = gameHeight / 480;
        var currentScreenRatio = gameWidth / gameHeight;
        var optimalRatio = Math.min(scaleToFitX, scaleToFitY);
        if(currentScreenRatio >= 1.77 && currentScreenRatio <= 1.79){
            this.WindowWidth = gameWidth;
            this.WindowHeight = gameHeight;
        } else {
            var width = 800 * optimalRatio;
            var height = 480 * optimalRatio;
            
            if(width < 800 || height < 480){
                this.WindowWidth = 800;
                this.WindowHeight = 480;
            } else {
                this.WindowWidth = 800 * optimalRatio;
                this.WindowHeight = 480 * optimalRatio;
            }            
        }
        this.DefaultFont = "bold 2em monospace";
		
        //Group Objects
        this.Level = null;
        this.Group = "index";
        this.Buttons = [];
        
        //Player Info
		this.PlayerVersion = 7;
		this.CurrentPlayer = {};
        
        //Audio Objects
        this.AudioTheme = $('#audio-theme')[0];
	},

	//
	//Storage Methods
	//
    
    GetPlayers: function(){
        var players = this.GetOption("players");
        return players === null ? [] : JSON.parse(players);
    },

	SavePlayer : function(player) {
		var players = this.GetPlayers();
		var len = players.length;
		if (len > 0) {
			for (var i = 0; i < len; i++) {
				if (player.name === players[i].name) {
					players[i] = player;
				}
			}
		}
        
        this.CurrentPlayer = player;
		this.SetOption("players", JSON.stringify(players));
	},

	GetPlayer : function(name) {
		var players = this.GetPlayers();
		var player = null;
		var len = players.length;

		for (var i = 0; i < len; i++) {
			if (name === players[i].name) {
                if(players[i].version !== this.PlayerVersion){
                    player = this.UpdatePlayer(players[i]);
                } else {
				    player = players[i];
                }
			}
		}
        
        if(player === null){
            player = this.NewPlayer(name);
            players.push(player);
        }
        player.sprite.y = this.WindowHeight - 150;
        player.sprite.startY = player.sprite.y;
		this.CurrentPlayer = player;
		this.SetOption("players", JSON.stringify(players));
        
        return player;
	},

	NewPlayer : function(name) {
		var player = {
			id : GUID(),
			name : name,
			score : 0,
			level : 1,
			health : 200,
            score: 0,
			sprite : {
                imgSrc: "images/sprites/player2.png",
                imgSrcRight: "images/sprites/player2-right.png",
                imgSrcInvert: "images/sprites/player_invert.png",
                imgSrcRightInvert: "images/sprites/player2-right_invert.png",
                width: 125,
                height: 150,
                startX: 60,
                startY: this.WindowHeight - 150,
                x: 60,
                y: this.WindowHeight - 150
            },
			version : 7
		}

		return player;
	},
    
    UpdatePlayer: function(player){
        var playerVersion = this.PlayerVersion;
        for(var i = player.version; i <= playerVersion; i++){
            switch(i){
                case 3: //updated imgSrc
                    player.sprite.imgSrc = "images/sprites/player2.png";
                    break;
                case 4: //added startx
                    player.sprite.startX = 60;
                    break;
                case 5: //removed floor
                    player.sprite.startY = this.WindowHeight - 150;
                    player.sprite.y = this.WindowHeight - 150;
                    break;
                case 6: //added score
                    player.score = 0;
                    break;
                case 7: //added right facing images
                    player.sprite.imgSrcRight = "images/sprites/player2-right.png";
                    player.sprite.imgSrcRightInvert = "images/sprites/player2-right_invert.png";
                    break;
            }
        }
        
        player.version = playerVersion;
        return player;
    },
    
    GetBackgrounds: function(level){
        var backgrounds = [];
        var width = 2382;
        var count = level.LevelNumber;
        for(var i = 0; i < count; i++){
            backgrounds.push({
                imgSrc0: level.LevelBackground0,
                imgSrc1: level.LevelBackground1,
                imgSrc2: level.LevelBackground2,
                startX0: i > 0 ? i * width : i,
                startX1: i > 0 ? i * width : i,
                startX2: i > 0 ? i * width : i,
                x0: i > 0 ? i * width : i,
                x1: i > 0 ? i * width : i,
                x2: i > 0 ? i * width : i,
                y: 25,
                width0: count > 1 ? count * width : width,
                width1: width * 2,
                width2: width * 2,
                height: this.WindowHeight
            });
        }
        return backgrounds;
    },
    
    NewShot: function(){
        return {
            id: null,
            x: this.CurrentPlayer.sprite.x + this.CurrentPlayer.sprite.width,
            y: this.CurrentPlayer.sprite.y + 62,
            width: 50,
            height: 5,
            fillStyle: "rgb(0,255,255)",
            damage: 10,
            speed: 100
        };
    },
    
    NewEnemyShot: function(enemy){
        return {
            id: null,
            x: enemy.x - 40,
            y: enemy.y + 52,
            width: 50,
            height: 5,
            fillStyle: "rgb(0,255,255)",
            damage: enemy.damage
        };
    },
    
    NewPowerUp: function(type){
        var powerUp = null;

        return powerUp;
    },
    
    GetLevel: function(level){
        var levelObjects = [];
        //var levelLen = level.EnemyPositions.length;
        
        for(var i in level.LevelTiles){
            tile = level.LevelTiles[i];
            if(tile !== null){
                switch(tile.type){
                    case "enemy":
                        var enemy = new Enemy(tile.enemyType);
                        enemy.startX = tile.x;// - enemy.width;
                        enemy.x = tile.x;// - enemy.width;
                        enemy.startY = tile.y;
                        enemy.y = tile.y;
                        levelObjects.push(enemy);
                        break;
                    case "powerup":
                        var powerUp = new PowerUp(tile.powerUpType);
                        powerUp.startX = tile.x;
                        powerUp.x = tile.x;
                        powerUp.startY = tile.y;
                        powerUp.y = tile.y;
                        levelObjects.push(powerUp);
                        break;
                    case "boss":
                        var boss = new Boss(tile.enemyType);
                        boss.startX = tile.x;
                        boss.x = tile.x;
                        boss.startY = tile.y;
                        boss.y = tile.y;
                        levelObjects.push(boss);
                        break;
                    case "tardis":
                        var powerUp = new PowerUp(tile.powerUpType);
                        powerUp.startX = tile.x;
                        powerUp.x = tile.x;
                        powerUp.startY = tile.y;
                        powerUp.y = tile.y;
                        levelObjects.push(powerUp);
                        break;
                    case "doctor":
                        var doctor = new PowerUp(tile.powerUpType);
                        doctor.startX = tile.x;
                        doctor.x = tile.x;
                        doctor.startY = tile.y;
                        doctor.y = tile.y;
                        levelObjects.push(doctor);
                        break;
                }
            }
        }
        
        return levelObjects;
    },
    
    SetOption: function(option, value){
        localStorage.setItem(option, value);
    },
    
    GetOption: function(option){
        var value = localStorage.getItem(option);
        return value === undefined || value === null ? null : value;
    }
	//
	//End Storage Methods
	//
});var Game = Class.extend({
	init : function(gameObjManager) {
        if(gameObjManager === undefined || gameObjManager === null){
            gameObjManager = new GameObjManager();
        }
		var w = gameObjManager.WindowWidth;
		var h = gameObjManager.WindowHeight;
        this.canvasX = 0;
        this.canvasY = 0;
    	this.canvasWidth = w;
		this.canvasHeight = h;
		this.canvasMiddle = w / 2;
		this.canvasVMiddle = h / 2;

        $('#loader').hide();

        var canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;

		var context = canvas.getContext('2d');
		context.fillStyle = "rgb(0,0,0)";
        this.context = context;
        
        this.backBuffer = document.createElement('canvas');
        this.backBuffer.width = w;
        this.backBuffer.height = h;
        this.backBufferContext = this.backBuffer.getContext('2d');
        
        this.GameObjManager = gameObjManager;
        
        this.SetDefaults();
        
        var gameHolder = document.getElementById('gameHolder');
        gameHolder.appendChild(canvas);
	},
    //
	//Event Handlers
	//
	ButtonClick : function(xIn, yIn) {
		var buttons = this.GameObjManager.Buttons;
		var isCollision = false;
        
        var x, y;
        var canvasX = this.canvasX;
        var canvasY = this.canvasY;
        if(xIn > canvasX){
            x = xIn - canvasX;
        } else {
            x = canvasX - xIn;
        }
        if(yIn > canvasY){
            y = yIn - canvasY;
        } else {
            y = canvasY - yIn;
        }
        
		for (var i in buttons) {
			var left = buttons[i].x, right = buttons[i].x + buttons[i].width;
			var top = buttons[i].y, bottom = buttons[i].y + buttons[i].height;
            //console.log(buttons[i].y);
			if (right >= x && left <= x && bottom >= y && top <= y) {
				isCollision = buttons[i];
			}
		}
		return isCollision;
	},
    ToggleButton: function(button){
        var gameObjManager = this.GameObjManager;
        switch(button.id){
            case "music":
                var audio = (gameObjManager.GetOption("audio") === 'true');
                gameObjManager.SetOption("audio", !audio);
                !audio === true ? this.PlayAudio("audio-theme", gameObjManager) : this.StopAudio("audio-theme", gameObjManager);
                this.DrawButtons(this.context, false, gameObjManager);
                break;
        }
    },
    Shoot: function(){
        if(this.Shooting === true){
            var gameObjManager = this.GameObjManager;
            this.Shots.push(gameObjManager.NewShot());
        }
    },
    EnemyShoot: function(gameObjManager, enemy){
        if(enemy.frequency !== undefined && enemy.frequency !== null){
            if(this.EnemyShooting === false && enemy.shots.length < enemy.frequency){
                enemy.shots.push(gameObjManager.NewEnemyShot(enemy));//this.canvasWidth - 200));
            }
        }
    },
	//
	//End Event Handlers
	//
    
    //
    //Utility Methods
    //
    
    SetDefaults: function(){
        //Level Objects
        this.LevelTitle = "";
        this.EOL = false;
        //Background Objects
        this.ScrollPosition = this.canvasWidth + 1;
        this.Backgrounds = [];
        this.Moving = false;
        this.MoveLeft = false;
        this.MoveRight = false;
        this.MoveUp = false;
        this.MoveDown = false;
        
        //Shooting Objects
        this.Shooting = false;
        this.Shots = [];
        this.PlayerHit = false;
        this.PlayerInvertCount = 0;
        
        //Enemies
        this.Enemies = [];
        this.EnemyShooting = false;
    },
    
    PlayAudio: function(id, gameObjManager){
        var audioOption = (gameObjManager.GetOption("audio") === 'true');
        if(audioOption === true){
            switch(id){
                case "audio-theme":
                    gameObjManager.AudioTheme.play();
                    break;
            }
        }
    },
    
    StopAudio: function(id, gameObjManager){
        gameObjManager.AudioTheme.pause();
    },
    
    DrawImage: function(context, img, x, y, width, height){
        try {
            if(img.complete === true){
                context.drawImage(img, x, y, width, height);
            } else {            
                (function(img, x, y){
                    img.onload = function(){
                        context.drawImage(img, x, y, width, height);
                    };
                })(img, x, y);            
            }
        } catch (err) {}
    },
    
    DrawGrayscale: function(context){
        var canvasWidth = this.canvasWidth;
        var canvasHeight = this.canvasHeight;
        var imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
        var data = imageData.data;

        for(var i = 0; i < data.length; i += 4) {
          var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
          // red
          data[i] = brightness;
          // green
          data[i + 1] = brightness;
          // blue
          data[i + 2] = brightness;
        }

        // overwrite original image
        context.putImageData(imageData, 0, 0, canvasWidth, canvasHeight);
    },
    
    //
    //End Utility Methods
    //
    
    //
    //Canvas Utility Methods
    //
	DestroyCanvas : function(context, bbcontext, alpha) {
        context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        bbcontext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        var nameInput = $('#nameInput').hide();
        var tardis = $("#tardisFade");
        //tardis.fadeTo(10, 1);
        tardis.hide();
	},
    DrawButtons : function(context, headerOnly, gameObjManager) {
        var buttonsObj = new Buttons();
        this.GameObjManager.Buttons = buttonsObj.Draw(context, 
                                                        headerOnly, 
                                                        gameObjManager, 
                                                        this.canvasX, 
                                                        this.canvasWidth, 
                                                        this.canvasHeight, 
                                                        this.canvasMiddle, 
                                                        this.canvasVMiddle, 
                                                        this.LevelTitle,
                                                        this.DrawImage);
	},
    DrawHeader : function(context, canvasWidth, gameObjManager) {
        var group = gameObjManager.Group;
		context.fillStyle = "rgba(255,255,255,.9)";
		context.fillRect(0, 0, canvasWidth, 25);
        
        switch(group){
            case "index":
                break;
            case "playerSelect":
                var groupTitle = "Create or Select Player";
                context.font = gameObjManager.DefaultFont;
                context.fillStyle = "rgb(0,0,0)";
                var textSize = context.measureText(groupTitle);
                context.fillText(groupTitle, this.canvasX - (textSize.width / 1.7), 20);
                break;
            case "levelSelect":
                context.font = gameObjManager.DefaultFont;
                context.fillStyle = "rgb(0,0,0)";
                groupTitle = "Select Level";
                textSize = context.measureText(groupTitle);
                context.fillText(groupTitle, this.canvasX - textSize.width, 20);
                break;
            case "level":
            case "eol":
                //Set Defaul Font/Fill Settings for Text
                context.font = gameObjManager.DefaultFont;
                context.fillStyle = "rgb(0,0,0)";
                
                if(group === "level"){
                    //Draw Level Title
                    groupTitle = "Level: " + ATD.Level;
                    textSize = context.measureText(groupTitle);
                    context.fillText(groupTitle, this.canvasWidth / 2, 20);
                }
                
                                //Draw Score
                var score = gameObjManager.CurrentPlayer.score;
                var scoreLabel = "Score: " + score;
                textSize = context.measureText(scoreLabel);
                context.fillText(scoreLabel, this.canvasWidth - 200, 20);  
                
                //Draw Health Bar
                var healthLabel = "Health: ";
                textSize = context.measureText(healthLabel);
                context.fillText(healthLabel, 50, 20);
                var health = gameObjManager.CurrentPlayer.health;
                if(health >= 100){
                    context.fillStyle = "rgba(0,255,0,.8)";
                } else if(health > 50 && health < 100) {
                    context.fillStyle = "rgba(255,255,0,.8)";
                } else {
                    context.fillStyle = "rgba(255,0,0,.8)";
                }
                context.fillRect(textSize.width, 6, health, 15);
                context.strokeStyle = "rgba(0,0,0,1)";
                context.strokeRect(textSize.width, 6, 200, 15);
        }
	},
    DrawBackground: function(context, gameObjManager){        
        var backgrounds = this.Backgrounds;
        var len = backgrounds.length;
        var width = gameObjManager.Level.LevelWidth;//backgrounds[(len - 1)].width0;
        var bgImg0 = new Image();
        var bgImg1 = new Image();
        var bgImg2 = new Image();
        for(var i in backgrounds){
            var background = backgrounds[i];
            bgImg0.src = background.imgSrc0;
            bgImg1.src = background.imgSrc1;
            bgImg2.src = background.imgSrc2;
            
            var x0 = background.x0;
            var x1 = background.x1;
            var x2 = background.x2;
            if(this.MoveLeft === true && this.Moving === true && 
                (gameObjManager.CurrentPlayer.sprite.x + gameObjManager.CurrentPlayer.sprite.width) >= this.canvasMiddle - 100){
                x0 -= 6;
                x1 -= 9;
                x2 -= 12;
            }

            if(this.MoveRight === true && x0 < background.startX0 && gameObjManager.CurrentPlayer.sprite.x <= 60){
                x0 += 6;
                x1 += 9;
                x2 += 12;
            }

            this.DrawImage(context, bgImg0, x0, background.y, background.width0, background.height);
            this.DrawImage(context, bgImg1, x1, background.y, background.width1, background.height);
            this.DrawImage(context, bgImg2, x2, background.y, background.width2, background.height);
            
            background.x0 = x0;
            background.x1 = x1;
            background.x2 = x2;
        }

        this.ScrollPosition = backgrounds[0].x0 - width;
    },
    DrawEol: function(context, bbcontext, alpha){
        context.fillStyle = "rgb(0,0,0)";
        bbcontext.fillStyle = "rgb(0,0,0)";
        if(alpha === true){
            context.fillStyle = "rgba(0,0,0,.5)";
            bbcontext.fillStyle = "rgba(0,0,0,.5)";
        }
        context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        bbcontext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    },
    DrawEnemies: function(context, gameObjManager){
        var enemies = this.Enemies;
        //var len = enemies.length;
        var canvasRight = this.canvasWidth;
        var hold = [];
        var endLevelFunc = function(){
                                ATD.Level += 1;
                                this.DrawEndOfLevel(gameObjManager.Level); 
                            };
        var doctorSpeechFunc = function(){
                                speech.hide();
                                ATD.MainLoopInterval = setInterval(function (){
                                    ATD.CurrentGame.DrawLevel(ATD.CurrentGame.GameObjManager.Level);
                                }.bind(this), ATD.MilleInterval);
                            };
        for(var i in enemies){
            var enemyImg = new Image();
            var enemy = enemies[i];
            var x = enemy.x;
            var y = enemy.y;
            var enemyRight = enemy.width + x;
            if(enemy.ObjType === "enemy" || enemy.ObjType === "boss"){
                if(enemy.hit === false){
                    enemyImg.src = enemy.imgSrc;
                }
                else {
                    enemyImg.src = enemy.imgSrcInvert;
                }

                if(this.MoveLeft === true && this.Moving === true &&
                    (gameObjManager.CurrentPlayer.sprite.x + gameObjManager.CurrentPlayer.sprite.width) >= this.canvasMiddle - 100){
                        x -= 12;
                        this.Moving = true;
                }
                
                if(x < canvasRight){
                    enemy.fighting = true;
                    //this.Fighting = true;
                }
                
                if(this.MoveRight === true && x < enemy.startX && gameObjManager.CurrentPlayer.sprite.x <= 60){
                    x += 12;
                    this.Moving = true;
                    if(x > canvasRight){
                        enemy.fighting = false;
                    }
                }

                if(enemy.ObjType === "boss"){
                    if(enemyRight < canvasRight){
                        this.Moving = false;
                    }
                    var top = 25;
                    var bottom = this.canvasHeight - 25;                    
                    var enemyBottom = y + enemy.height;
                    if(y >= top && enemy.moveUp === true){
                        y -= 8;
                        enemy.moveUp = true;
                        enemy.moveDown = false;
                    } else {
                        enemy.moveUp = false;
                        enemy.moveDown = true;
                    }
                    
                    if(y <= top || (y >= top && enemyBottom <= bottom && enemy.moveDown === true)){
                        y += 8;
                        enemy.moveUp = false;
                        enemy.moveDown = true;
                    } else {
                        enemy.moveUp = true;
                        enemy.moveDown = false;
                    }
                }
                
                if(enemy.hitCount === 6){
                    enemy.hit = false;
                    enemy.hitCount = 0;
                }
                enemy.hitCount++;
            } else {
                enemyImg.src = enemy.imgSrc;
                if(this.MoveLeft === true && this.Moving === true && this.EOL === false &&
                    (gameObjManager.CurrentPlayer.sprite.x + gameObjManager.CurrentPlayer.sprite.width) >= this.canvasMiddle - 100){
                    x -= 12;
                    this.Moving = true;
                }
                
                if(this.MoveRight === true && x < enemy.startX && gameObjManager.CurrentPlayer.sprite.x <= 60){
                    x += 12;
                    this.Moving = true;
                }
                
                if(enemy.type === "tardis"){
                    if(enemyRight < canvasRight){
                        this.EOL = true;
                    }
                }
                
                if(enemy.type === "doctor" && enemy.saved === true){
                    x += 12;
                    if(enemyRight >= canvasRight - 100){
                       hold.push(enemy);
                    }
                }
                
                var hit = this.DetectPowerUpCollision(x, y, enemy.width, enemy.height, enemy.health, enemy.type);
                if(hit === true){
                    switch(enemy.type){
                        case "tardis":
                            hold.push(enemy);
                            setTimeout(endLevelFunc.bind(this), ATD.MilleInterval);
                            break;
                        case "doctor":
                            clearInterval(ATD.MainLoopInterval);
                            ATD.MainLoopInterval = null;
                            enemy.saved = true;
                            var speech = $('#speech');
                            speech.html(enemy.message);
                            var width = speech.width();
                            var height = speech.outerHeight(true);
                            speech.width(speech.outerWidth() / 2);
                            speech.css({left: enemy.x - 40, top: (enemy.y - height) + 15});
                            speech.show();
                            setTimeout(doctorSpeechFunc.bind(this), enemy.speechTime);
                            break;
                        default:
                            hold.push(enemy);
                            break;
                    }
                }
            }
            
            this.DrawImage(context, enemyImg, x, y, enemy.width, enemy.height);
            
            if(enemy.ObjType === "enemy" || enemy.ObjType === "boss"){
                var health = enemy.health;
                var healthX = enemy.x + (enemy.width / 2) - (enemy.startHealth / 2);
                context.fillStyle = "rgba(0,255,0,.6)";
                context.fillRect(healthX, y + enemy.height - 30, health, 10);
                context.strokeStyle = "rgba(255,255,255,1)";
                context.strokeRect(healthX, y + enemy.height - 30, enemy.startHealth, 10);
            }

            enemy.x = x;
            enemy.y = y;
            this.Enemies[i] = enemy;
        }
        
        for(var i in hold){
            this.Enemies.splice($.inArray(hold[i], this.Enemies), 1);
        }
    },
    DrawPlayer: function(context, gameObjManager){
        var currentPlayer = gameObjManager.CurrentPlayer;
        
        var playerImg = new Image();
        var moveLeft = this.MoveLeft;
        var moveRight = this.MoveRight;
        if(this.PlayerHit === false){
            if((moveLeft === true && moveRight === false) || 
               (moveLeft === false && moveRight === false) || 
               (moveLeft === true && moveRight === true)){
                playerImg.src = currentPlayer.sprite.imgSrc;
            } else if((moveLeft === false && moveRight === true))  {
                playerImg.src = currentPlayer.sprite.imgSrcRight;
            }
        } else {            
            if((moveLeft === true && moveRight === false) || 
               (moveLeft === false && moveRight === false) || 
               (moveLeft === true && moveRight === true)){
                playerImg.src = currentPlayer.sprite.imgSrcInvert;
            } else if((moveLeft === false && moveRight === true))  {
                playerImg.src = currentPlayer.sprite.imgSrcRightInvert;
            }
        }
        
        var x = currentPlayer.sprite.x;
        
        if(this.MoveLeft === true && (x + currentPlayer.sprite.width) <= this.canvasMiddle - 100){
            x += 12;
            this.Moving = true;
        }
        
        if(this.MoveLeft === true && this.EOL === true){
            x += 12;
            this.Moving = false;
        }
        
        if(this.MoveRight === true && (x >= currentPlayer.sprite.startX)){
            x -= 12;
            this.Moving = true;
        }
        
        var y = currentPlayer.sprite.y;
        
        if(this.MoveUp === true && y >= 25){
            y -= 12;
        }
        
        if(this.MoveDown === true && y < currentPlayer.sprite.startY){
            y += 12;
        }

        this.DrawImage(context, playerImg, currentPlayer.sprite.x, y, currentPlayer.sprite.width, currentPlayer.sprite.height);

        if(this.PlayerInvertCount === 6){
            this.PlayerHit = false;
            this.PlayerInvertCount = 0;
        }
        this.PlayerInvertCount++;
        
        gameObjManager.CurrentPlayer.sprite.x = x;
        gameObjManager.CurrentPlayer.sprite.y = y;
    },
    DrawShooting: function(context, gameObjManager){
        var shots = this.Shots;
        if(this.Shooting === true){
            this.Shoot();
        }
        var hold = [];
        for(var i in shots){
            context.fillStyle = shots[i].fillStyle;
            context.fillRect(shots[i].x, shots[i].y, shots[i].width, shots[i].height);
            var prevI = i - 1;
            if(prevI !== -1){
                if(shots[prevI].x - shots[i].speed > shots[i].x + shots[i].width){
                    shots[i].x += 25;
                } else {
                    hold.push(shots[i]);
                }
            } else {
                shots[i].x += 25;
            }

            var hit = this.DetectCollision(shots[i].x, shots[i].y, shots[i].width, shots[i].height, true, shots[i].damage);
            if(shots[i].x >= this.canvasMiddle * 2 || hit === true){
                hold.push(shots[i]);
            }
        }
        for(var c in hold){
            this.Shots.splice($.inArray(hold[c], this.Shots), 1);
        }
    },
    DrawFight: function(context, gameObjManager){
        //if(this.Fighting === true){
            var enemies = this.Enemies;
            for(var e in enemies){
                var enemy = enemies[e];
                if(enemy.fighting === true){
                    this.EnemyShoot(gameObjManager, enemy);
                    var shots = enemy.shots;
                    var hold = [];
                    for(var i in shots){
                        this.EnemyShooting = true;
                        context.fillStyle = shots[i].fillStyle;
                        context.fillRect(shots[i].x, shots[i].y, shots[i].width, shots[i].height);
    
                        var hit = this.DetectCollision(shots[i].x, shots[i].y, shots[i].width, shots[i].height, false, shots[i].damage);
                        shots[i].x -= enemy.shotspeed;
                        if((shots[i].x + shots[i].width) <= this.canvasX / 10 || hit === true){
                            hold.push(shots[i]);
                        }
                    }
                    for(var c in hold){
                        enemy.shots.splice($.inArray(hold[c], enemy.shots), 1);
                    }
                    this.EnemyShooting = false;
                }
            }
        //}
    },
    DetectCollision: function(x, y, width, height, isPlayer, damage){
        var left = x;
        var right = x + width;
        var top = y;
        var bottom = y + height;
        var currentPlayer = this.GameObjManager.CurrentPlayer;
        if(isPlayer === true){
            var enemies = this.Enemies;
            var hold = [];
            var hit = false;
            for(var ei in enemies){
                var enemy = enemies[ei];
                if(enemy.ObjType === "enemy" || enemy.ObjType === "boss"){
                    if(right >= enemy.x && top >= enemy.y && bottom <= enemy.y + enemy.height){
                        enemy.health -= damage;
                        enemy.hit = true;
                        if(enemy.health <= 0){
                            hold.push(enemy);
                            currentPlayer.score += enemy.startHealth;
                        }
                        hit = true;
                    }
                }
            }
            
            for(var i in hold){
                //this.Fighting = false;
                if(this.MoveLeft === true || this.MoveRight === true){
                    this.Moving = true;
                }
                //this.EnemyShots = [];
                this.Enemies.splice($.inArray(hold[i], this.Enemies), 1);
            }
            return hit;
        } else {
            var currentPlayerRight = currentPlayer.sprite.x + currentPlayer.sprite.width;
            if(left <= currentPlayerRight && right >= currentPlayerRight && top >= currentPlayer.sprite.y && bottom <= currentPlayer.sprite.y + currentPlayer.sprite.height){
                this.PlayerHit = true;
                var health = currentPlayer.health;
                if(health - damage < 0){
                    health = 0;
                } else {
                    health -= damage;
                }
                currentPlayer.health = health;
                return true;
            }
        }
        
        return false;
    },
    DetectPowerUpCollision: function(px, py, pwidth, pheight, health, type){
        var gameObjManager = this.GameObjManager;
        if(gameObjManager.Group === "level"){
            var left = px;
            //var right = px + pwidth;
            var top = py;
            var bottom = py + pheight;
            var currentPlayer = gameObjManager.CurrentPlayer;
    
            switch(type){
                case "health":
                    if(left <= (currentPlayer.sprite.x + currentPlayer.sprite.width) && 
                        (
                            (top <= currentPlayer.sprite.y && bottom >= currentPlayer.sprite.y) || 
                            (top <= currentPlayer.sprite.y + currentPlayer.sprite.height && bottom >= currentPlayer.sprite.y + currentPlayer.sprite.height) || 
                            (top >= currentPlayer.sprite.y && bottom <= currentPlayer.sprite.y + currentPlayer.sprite.height)
                        )
                    ){
                        var currentHealth = gameObjManager.CurrentPlayer.health;
                        if(currentHealth + health > 200){
                            currentHealth = 200;
                        } else {
                            currentHealth += health;
                        }
                        //if(currentHealth < 200){
                            this.GameObjManager.CurrentPlayer.health = currentHealth;
                        //}
                        return true;
                    }
                    break;
                case "doctor":
                    if(left <= (currentPlayer.sprite.x + currentPlayer.sprite.width) && 
                        (
                            (top <= currentPlayer.sprite.y && bottom >= currentPlayer.sprite.y) || 
                            (top <= currentPlayer.sprite.y + currentPlayer.sprite.height && bottom >= currentPlayer.sprite.y + currentPlayer.sprite.height) || 
                            (top >= currentPlayer.sprite.y && bottom <= currentPlayer.sprite.y + currentPlayer.sprite.height)
                        )
                    ){
                        return true;
                    }
                    break;
                case "tardis":
                    if (left <= currentPlayer.sprite.x && bottom >= currentPlayer.sprite.y && top <= currentPlayer.sprite.y) {
                        this.MoveLeft = false;
                        return true;
                    }
                    break;
            }
    
            return false;
        }
    },
    ExplodeEnemy: function(enemy){
        
    },
    FadeTardis: function(context, gameObjManager){
        ATD.Fading = true;
        var tardis = $("#tardisFade");
        var group = gameObjManager.Group;
        switch(group){
            case "sol":
                tardis.css({left: gameObjManager.CurrentPlayer.sprite.x - 5, top: this.canvasHeight - 282});
                tardis.fadeTo(1000, 0.5).fadeTo(1000, 0).fadeTo(1000, 0.8).fadeTo(1000, 0).fadeTo(1000, 1, function(){
                    ATD.Fading = false;
                }.bind(this));
                break;
            case "eol":
                this.DrawEndOfLevel(gameObjManager.Level, true);
                tardis.css({left: gameObjManager.CurrentPlayer.sprite.x - 15, top: this.canvasHeight - 282});
                tardis.fadeTo(10, 1).fadeTo(1000, 0.8).fadeTo(1000, 1).fadeTo(1000, 0.5).fadeTo(1000, 1).fadeTo(1000, 0, function(){
                    ATD.Fading = false;
                }.bind(this));
                break;
        }
    },
    //
    //End Canvas Utility Methods
    //
    
    //
    //Canvas Draw Group Methods
    //
    DrawIndex : function() {
        this.SetDefaults();
        //Setup Canvas
        var gameObjManager = this.GameObjManager;
        gameObjManager.Group = "index";
        var context = this.context;
        var bbcontext = this.backBufferContext;
		this.DestroyCanvas(context, bbcontext, false);

        var bgImg = new Image();
        bgImg.src = 'images/bg.jpg';
        this.DrawImage(bbcontext, bgImg, 0, 0, this.canvasWidth, this.canvasHeight);

		//Draw Header Buttons
        this.DrawHeader(bbcontext, this.canvasWidth, gameObjManager);
        this.DrawButtons(bbcontext, false, gameObjManager);
        
        //Start Theme Song
        this.PlayAudio("audio-theme", gameObjManager);
        
		// Save Context Object
        context.drawImage(this.backBuffer, 0, 0);
	},
    DrawCredits: function(){
        //Setup Canvas
        var gameObjManager = this.GameObjManager;
        gameObjManager.Group = "credits";
        var context = this.context;
        var bbcontext = this.backBufferContext;
        this.DestroyCanvas(context, bbcontext, false);
        
        var bgImg = new Image();
        bgImg.src = 'images/bg.jpg';
        this.DrawImage(bbcontext, bgImg, 0, 0, this.canvasWidth, this.canvasHeight);
        
        this.DrawHeader(bbcontext, this.canvasWidth, gameObjManager);
        
        bbcontext.fillStyle = "rgba(0,0,0,.7)";
        bbcontext.fillRect(10, 35, this.canvasWidth - 20, this.canvasHeight - 45);
        
        this.DrawButtons(bbcontext, false, gameObjManager);
        
        context.drawImage(this.backBuffer, 0, 0);
    },
    DrawPlayerSelect: function(){
        //Setup Canvas
        var gameObjManager = this.GameObjManager;
        gameObjManager.Group = "playerSelect";
        var context = this.context;
        var bbcontext = this.backBufferContext;
        this.DestroyCanvas(context, bbcontext, false);
        
        var bgImg = new Image();
        bgImg.src = 'images/bg.jpg';
        this.DrawImage(bbcontext, bgImg, 0, 0, this.canvasWidth, this.canvasHeight);
        
        //Draw Header and Buttons
        this.DrawHeader(bbcontext, this.canvasWidth, gameObjManager);
        
        bbcontext.fillStyle = "rgba(0,0,0,.5)";
        bbcontext.fillRect(this.canvasX + 90, this.canvasY + 30, 550, this.canvasHeight);
        
        this.DrawButtons(bbcontext, false, gameObjManager);
        
        //Show Input Box
        var nameInput = $('#nameInput');
        nameInput.css({top: this.canvasY + 40, left: this.canvasX + 100});
        nameInput.show();
        $('#name').val('');
        $('#name').focus();
        
        context.drawImage(this.backBuffer, 0, 0);
    },
	DrawLevelSelect : function() {
        //Setup Canvas
        var gameObjManager = this.GameObjManager;
        gameObjManager.Group = "levelSelect";
		var context = this.context;
        var bbcontext = this.backBufferContext;
		this.DestroyCanvas(context, bbcontext, false);
        
        var bgImg = new Image();
        bgImg.src = 'images/bg.jpg';
        this.DrawImage(bbcontext, bgImg, 0, 0, this.canvasWidth, this.canvasHeight);
        
        //Draw Header and Buttons
        this.DrawHeader(bbcontext, this.canvasWidth, gameObjManager);
        this.DrawButtons(bbcontext, false, gameObjManager);
        
        context.drawImage(this.backBuffer, 0, 0);
	},
    DrawLevelStart: function(level){
        //Setup Canvas
        var gameObjManager = this.GameObjManager;
        gameObjManager.Group = "sol";
        gameObjManager.Level = level;
        gameObjManager.CurrentPlayer.sprite.x = 60;
        var context = this.context;
        var bbcontext = this.backBufferContext;
        this.DestroyCanvas(context, bbcontext, true);
        
        this.LevelTitle = level.LevelTitle;
        
        //Draw Header, Floor, Buttons
        this.DrawBackground(bbcontext, gameObjManager);
        //this.DrawFloor(bbcontext, this.canvasWidth, null, gameObjManager);
        
        this.FadeTardis(bbcontext, gameObjManager);
        
        //this.DrawPlayer(bbcontext, gameObjManager);
        this.DrawEnemies(bbcontext, gameObjManager);
        this.DrawEol(context, bbcontext, true);
        this.DrawHeader(bbcontext, this.canvasWidth, gameObjManager);
        this.DrawButtons(bbcontext, false, gameObjManager);
        
        context.drawImage(this.backBuffer, 0, 0);
        
        if(level.Grayscale === true){
            this.DrawGrayscale(context);
        }
    },
    DrawLevel: function(level){ //this is effectively the "Main Loop"
        //Setup Canvas
        var gameObjManager = this.GameObjManager;
        gameObjManager.Group = "level";
        gameObjManager.Level = level;
        var context = this.context;
        var bbcontext = this.backBufferContext;
        this.DestroyCanvas(context, bbcontext, false);
        if(gameObjManager.CurrentPlayer.health > 0){            
            //Draw Header, Floor, and Buttons
            this.DrawBackground(bbcontext, gameObjManager);
            this.DrawPlayer(bbcontext, gameObjManager);
            this.DrawEnemies(bbcontext, gameObjManager);
            this.DrawHeader(bbcontext, this.canvasWidth, gameObjManager);
            this.DrawButtons(bbcontext, false, gameObjManager);
            //this.DrawFloor(bbcontext, this.canvasWidth, null, gameObjManager);
            this.DrawShooting(bbcontext, gameObjManager);
            this.DrawFight(bbcontext, gameObjManager);
            
            context.drawImage(this.backBuffer, 0, 0);
            if(level.Grayscale === true){
                this.DrawGrayscale(context);
            }
        } else {
            this.MoveLeft = false;
            ATD.Level = level.LevelNumber;
            this.DrawEndOfLevel(level);
        }
    },
    DrawEndOfLevel: function(level, headerOnly){
        if(headerOnly === undefined || headerOnly === null){
            headerOnly = false;
        }
        clearInterval(ATD.MainLoopInterval);
        ATD.MainLoopInterval = null;
        //Setup Canvas
        var gameObjManager = this.GameObjManager;
        gameObjManager.Group = "eol";
        gameObjManager.Level = level;
        var context = this.context;
        var bbcontext = this.backBufferContext;
        this.DestroyCanvas(context, bbcontext, true);
        
        if(gameObjManager.CurrentPlayer.health > 0){
            $('#tardisFade').css({left: gameObjManager.CurrentPlayer.sprite.x - 10, top: this.canvasHeight - 282}).show();
        }
        
        //Draw Header, Floor, Buttons
        this.DrawBackground(bbcontext, gameObjManager);
        //this.DrawFloor(bbcontext, this.canvasWidth, null, gameObjManager);
        
        //this.DrawPlayer(bbcontext, gameObjManager);
        this.DrawEol(context, bbcontext, true);
        this.DrawHeader(bbcontext, this.canvasWidth, gameObjManager);
        this.DrawButtons(bbcontext, headerOnly, gameObjManager);
        
        if(headerOnly === true){
            this.SetDefaults();
        }
        //this.GameObjManager.CurrentPlayer.sprite.x = this.GameObjManager.CurrentPlayer.sprite.startX;
        
        context.drawImage(this.backBuffer, 0, 0);
        
        if(level.Grayscale === true){
            this.DrawGrayscale(context);
        }
        gameObjManager.SavePlayer(gameObjManager.CurrentPlayer);
    },
    DrawRequiredScore: function(level){
        //Setup Canvas
        var gameObjManager = this.GameObjManager;
        gameObjManager.Group = "requiredScore";
        gameObjManager.Level = level;
        var context = this.context;
        var bbcontext = this.backBufferContext;
        //this.DestroyCanvas(context, bbcontext, true);
        
        this.DrawEol(context, bbcontext, true);
        this.DrawHeader(bbcontext, this.canvasWidth, gameObjManager);
        this.DrawButtons(bbcontext, false, gameObjManager);
        
        context.drawImage(this.backBuffer, 0, 0);
    }
    //
    //End Canvas Group Draw Methods
    //
});
var ATD = {};
ATD.CurrentGame = null;
ATD.MilleInterval = 1 / 30;
ATD.MainLoopInterval = null;
ATD.Level = null;
ATD.Fading = false;
//
//Page Events
//

$(window).load(function() {
    if(supports_html5_storage() === true){
        var currentGame = new Game();
        
        currentGame.DrawIndex();
        ATD.CurrentGame = currentGame;
        $('#gameHolder').bind('click', function(e) {
            var currentGame = ATD.CurrentGame;
            var button = currentGame.ButtonClick(e.pageX, e.pageY);
            if (button !== false) {
                switch(button.id) {
                    case "start":
                        currentGame.DrawPlayerSelect();
                        break;
                    case "credits":
                        currentGame.DrawCredits();
                        break;
                    case "creditLink":
                        window.open(button.text, "_blank");
                        break;
                    case "submitName":
                        var name = $('#name').val();
                        if(name !== ''){
                            SubmitNameTap($('#name').val());
                        }
                        break;
                    case "player":
                        SubmitNameTap(button.name);
                        break;
                    case "music":
                        currentGame.ToggleButton(button);
                        break;
                    case "home":
                        if(ATD.Fading === false){
                            clearInterval(ATD.MainLoopInterval);
                            ATD.MainLoopInterval = null;
                            currentGame.DrawIndex();
                        }
                        break;
                    case "nextLevel":
                        if(ATD.Fading === false){
                            if(currentGame.GameObjManager.CurrentPlayer.health > 0){
                                currentGame.GameObjManager.SavePlayer(currentGame.GameObjManager.CurrentPlayer);
                                currentGame.FadeTardis(currentGame, currentGame.GameObjManager);
                                setTimeout(function(){
                                    StartLevel(button.level, currentGame);
                                }.bind(this), 5500);
                            } else {
                                currentGame.GameObjManager.CurrentPlayer.health = 200;
                                currentGame.GameObjManager.SavePlayer(currentGame.GameObjManager.CurrentPlayer);
                                StartLevel(button.level, currentGame);
                            }
                        }
                        break;
                    case "lvlButton": //level buttons
                        if(button.locked === false){
                            ATD.Level = button.level.LevelNumber;
                            StartLevel(button.level, currentGame);
                        }
                        break;
                    case "rsOk":
                        currentGame.DrawLevelSelect();
                }
            }
        });
        $(document).keydown(function(e){
            switch(e.keyCode){
                case 17: //ctrl
                case 32:
                    e.preventDefault();
                    ATD.CurrentGame.Shooting = true;
                    break;
                case 39:
                    e.preventDefault();
                    ATD.CurrentGame.MoveLeft = true;
                    break;
                case 37:
                    e.preventDefault();
                    ATD.CurrentGame.MoveRight = true;
                    break;
                case 38: //up
                    e.preventDefault();
                    ATD.CurrentGame.MoveUp = true;
                    break;
                case 40:
                    e.preventDefault();
                    ATD.CurrentGame.MoveDown = true;
                    break;
            }
        });
        $(document).keyup(function(e){
            switch(e.keyCode){
                case 17: //ctrl
                case 32:
                    e.preventDefault();
                    ATD.CurrentGame.Shooting = false;
                    break;
                case 39:
                    e.preventDefault();
                    ATD.CurrentGame.MoveLeft = false;
                    break;
                case 37:
                    e.preventDefault();
                    ATD.CurrentGame.MoveRight = false;
                    break;
                case 38: //up
                    e.preventDefault();
                    ATD.CurrentGame.MoveUp = false;
                    break;
                case 40:
                    e.preventDefault();
                    ATD.CurrentGame.MoveDown = false;
                    break;
            }
        });
    }
});
//
//End Page Events
//

//
//Utility Functions
//
function SubmitNameTap(name) {
	var gameObjManager = ATD.CurrentGame.GameObjManager;
	var player = gameObjManager.GetPlayer(name);
    ATD.CurrentGame.DrawLevelSelect();
}

function StartLevel(level, currentGame){
    var gameObjManager = currentGame.GameObjManager;
    level.BuildLevel(gameObjManager.WindowWidth, gameObjManager.WindowHeight);
    var score = gameObjManager.CurrentPlayer.score;
    if(level.LevelTiles.length > 1 && score >= level.RequiredScore){
        currentGame.Backgrounds = gameObjManager.GetBackgrounds(level);
        currentGame.Enemies = gameObjManager.GetLevel(level);
        currentGame.PowerUps = gameObjManager.GetLevel(level);
        currentGame.DrawLevelStart(level);
        setTimeout(function(){
            ATD.MainLoopInterval = setInterval(function (){
                currentGame.DrawLevel(level);
            }.bind(this), ATD.MilleInterval);
        }.bind(this), 5500);
    } else {
        currentGame.DrawLevelSelect();
        if(score < level.RequiredScore){
            currentGame.DrawRequiredScore(level);
        }
    }
}

function supports_html5_storage() {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
}

//
//End Utility Functions
//