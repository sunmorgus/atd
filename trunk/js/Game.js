var Game = Class.extend({
	init : function() {
        var gameObjManager = new GameObjManager();
		var w = gameObjManager.WindowWidth;
		var h = gameObjManager.WindowHeight;

		var canvasString = '<canvas id="game-field" width="' + w + '" height="' + h + '">To play this game, you need a more <a href="http://lmgtfy.com/?q=Modern+Browser">Modern Browser</a></canvas>';

		$('#gameHolder').empty();
		$(canvasString).appendTo('#gameHolder');

        var canvas = $('#game-field');
		var context = canvas.get(0).getContext('2d');
		context.fillStyle = "rgb(0,0,0)";
        this.context = context;
        this.canvasX = canvas.offset().left;
        this.canvasY = canvas.offset().top;
		this.canvasWidth = w;
		this.canvasHeight = h;
		this.canvasMiddle = w / 2;
		this.canvasVMiddle = h / 2;
        
        this.GameObjManager = gameObjManager;
        
        //Background Objects
        this.Backgrounds = [];
        this.MoveLeft = false;
        
        //Shooting Objects
        this.Shooting = false;
        this.Shots = [];
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
        
		for (var i = 0, len = buttons.length; i < len; i++) {
			var left = buttons[i].x, right = buttons[i].x + buttons[i].width;
			var top = buttons[i].y, bottom = buttons[i].y + buttons[i].height;
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
        if(this.Shooting === false){
            var gameObjManager = this.GameObjManager;
            this.Shots.push(gameObjManager.NewShot());
        }
    },
	//
	//End Event Handlers
	//
    
    //
    //Utility Methods
    //
    
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
    
    DrawImage: function(context, img, x, y){
        try {
            if(img.complete === true){
                context.drawImage(img, x, y);
            } else {            
                (function(img, x, y){
                    img.onload = function(){
                        context.drawImage(img, x, y);
                    };
                })(img, x, y);            
            }
        } catch (err) {}
    },
    
    //
    //End Utility Methods
    //
    
    //
    //Canvas Utility Methods
    //
	DestroyCanvas : function(context, alpha) {
        context.fillStyle = "rgb(0,0,0)";
        if(alpha === true){
            context.fillStyle = "rgba(0,0,0,.5)";
        }
		context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        var nameInput = $('#nameInput').hide();
	},
    DrawButtons : function(context, headerOnly, gameObjManager) {
        var buttonsObj = new Buttons();
        var buttons = [];

        if(!headerOnly){
            switch(gameObjManager.Group){
                case "index": //draw buttons center x,y
                    var indexButtons = buttonsObj.GetButtons(gameObjManager, false);
                    var len = indexButtons.length;
                    for(var i = 0; i < indexButtons.length; i++){
                        var button = indexButtons[i];
                        button.x = this.canvasMiddle - (button.width / 2);
                        button.y = this.canvasVMiddle - (button.height / 2);
                        this.DrawTextButton(context, button);
                        buttons.push(button);
                    }
                    break;
                case "playerSelect":
                    var playerButtons = buttonsObj.GetPlayerButtons(gameObjManager);
                    len = playerButtons.length;
                    for(i = 0; i < len; i++){
                        button = playerButtons[i];
                        if(button.id === "submitName"){
                            button.x = (this.canvasWidth - button.width) - 5;
                            button.y = (this.canvasHeight - button.height) - 5;
                            this.DrawTextButton(context, button);
                        } else {
                            this.DrawTextButton(context, button);
                        }
                        buttons.push(button);
                    }
                    break;
                case "levelSelect":
                    // Show Level Select
                    var levelButtons = buttonsObj.GetLevelButtons(22, gameObjManager.CurrentPlayer.level);
                    len = levelButtons.length;
                    for(i = 0; i < len; i++){
                        button = levelButtons[i];
                        if(button.locked === false){
                            this.DrawTextButton(context, button);
                        } else {
                            this.DrawImageButton(context, button);
                        }
                        buttons.push(button);
                    }
                    break;
                case "eol":
                    indexButtons = buttonsObj.GetButtons(gameObjManager, false);
                    len = indexButtons.length;
                    var health = gameObjManager.CurrentPlayer.health;
                    for(i = 0; i < indexButtons.length; i++){
                        button = indexButtons[i];
                        switch(button.id){
                            case "levelStatus":
                                button.x = this.canvasMiddle - (button.width / 2);
                                button.y = 35;
                                
                                if(health === 0){
                                    button.text = "You Were Exterminated!";
                                }
                                
                                break;
                            case "nextLevel":
                                button.x = this.canvasMiddle - (button.width / 2);
                                button.y = 35 + button.height + 10;
                                
                                if(health === 0){
                                    button.text = "Retry";
                                    
                                    //Reset Health for Restarting Level
                                    button.level = ATD.Level;
                                    gameObjManager.CurrentPlayer.health = 200;
                                    gameObjManager.SavePlayer(gameObjManager.CurrentPlayer);
                                } else {
                                    ATD.Level += 1;
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
            }
        }
        
        var headerButtons = buttonsObj.GetButtons(gameObjManager, true);
        for (i = 0; i < headerButtons.length; i++){
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
                    headerButton.x = this.canvasWidth - headerButton.width;

                    break;
                case "home":
                    if(gameObjManager.Group !== "index"){
                        img.src = headerButton.imgSrc;
                        headerButton.x = this.canvasWidth - (headerButton.width * 2);
                    }
                    break;
            }
            
            headerButton.y = 0;
            this.DrawImage(context, img, headerButton.x, 0);
            
            //add switch on group here to draw header buttons specific to group
            
            buttons.push(headerButton);
        }
        
        this.GameObjManager.Buttons = buttons;
	},
    DrawTextButton: function(context, button){
        //context.fillStyle = "rgb(255,255,255)";
        //context.fillRect(button.x, button.y, button.width, button.height);
        context.fillStyle = button.color;
        context.fillRect(button.x, button.y, button.width, button.height);
        context.fillStyle = button.textColor;
        context.textAlign = "center";
        context.font = button.font;
        var textSize = context.measureText(button.text);
        context.fillText(button.text, button.x + (button.width / 2), button.y + (button.height / 1.7));
    },
    DrawImageButton: function(context, button){
        context.fillStyle = "rgb(255,255,255)";
        context.fillRect(button.x, button.y, button.width, button.height);
        context.fillStyle = button.color;
        context.fillRect(button.x, button.y, button.width, button.height);
        
        var img = new Image();
        img.src = button.imgSrc;
        this.DrawImage(context, img, button.x, button.y);
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
                
                //Draw Level Title
                groupTitle = "Level: " + ATD.Level;
                textSize = context.measureText(groupTitle);
                context.fillText(groupTitle, this.canvasX, 20);
                
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
                context.strokeRect(textSize.width, 6, health, 15);
        }
	},
    DrawFloor: function(context, canvasWidth, obstacle, gameObjManager){
        context.fillStyle = "rgba(0,255,0,.8)";
        context.fillRect(0, gameObjManager.WindowHeight - 25, canvasWidth, 25);
    },
    DrawBackground: function(context, gameObjManager){        
        var backgrounds = this.Backgrounds;
        var len = backgrounds.length;
        var width = backgrounds[(len - 1)].width;
        var bgImg = new Image();
        for(var i = 0; i < len; i++){
            var background = backgrounds[i];
            bgImg.src = background.imgSrc;
            
            var x = background.x;
            
            if(this.MoveLeft === true){
                x -= 8;
            }

            this.DrawImage(context, bgImg, x, background.y);
            background.x = x;
        }
        
        this.ScrollPosition = width + (backgrounds[0].x - 480);
    },
    DrawPlayer: function(context, gameObjManager){
        var currentPlayer = gameObjManager.CurrentPlayer;
        
        var playerImg = new Image();
        playerImg.src = currentPlayer.sprite.imgSrc;
        this.DrawImage(context, playerImg, currentPlayer.sprite.x, currentPlayer.sprite.y);
    },
    DrawShooting: function(context, gameObjManager){
        var shots = this.Shots;
        var len = shots.length;
        var hold = [];
        for(var i = 0; i < len; i++){
            this.Shooting = true;
            context.fillStyle = shots[i].fillStyle;
            context.fillRect(shots[i].x, shots[i].y, shots[i].width, shots[i].height);
            
            shots[i].x += 15;
            
            if(shots[i].x >= this.canvasMiddle * 2){
                hold.push(i);
            }
        }
        for(var c = 0; c < hold.length; c++){
            this.Shots.splice(hold[c], 1);
        }
        this.Shooting = false;
    },
    //
    //End Canvas Utility Methods
    //
    
    //
    //Canvas Draw Group Methods
    //
    DrawIndex : function() {
        //Setup Canvas
        var gameObjManager = this.GameObjManager;
        gameObjManager.Group = "index";
        var context = this.context;
		this.DestroyCanvas(context, false);

		//Draw Header Buttons
        this.DrawHeader(context, this.canvasWidth, gameObjManager);
        this.DrawButtons(context, false, gameObjManager);
        
        //Start Theme Song
        this.PlayAudio("audio-theme", gameObjManager);
        
		// Save Context Object
		this.context = context;
	},
    DrawPlayerSelect: function(){
        //Setup Canvas
        var gameObjManager = this.GameObjManager;
        gameObjManager.Group = "playerSelect";
        var context = this.context;
        this.DestroyCanvas(context, false);
        
        //Draw Header and Buttons
        this.DrawHeader(context, this.canvasWidth, gameObjManager);
        this.DrawButtons(context, false, gameObjManager);
        
        //Show Input Box
        var nameInput = $('#nameInput');
        nameInput.css({top: this.canvasY + 30, left: this.canvasX + 100});
        nameInput.show();
        $('#name').val('');
        $('#name').focus();
    },
	DrawLevelSelect : function() {
        //Setup Canvas
        var gameObjManager = this.GameObjManager;
        gameObjManager.Group = "levelSelect";
		var context = this.context;
		this.DestroyCanvas(context, false);
        
        //Draw Header and Buttons
        this.DrawHeader(context, this.canvasWidth, gameObjManager);
        this.DrawButtons(context, false, gameObjManager);
	},
    DrawLevel: function(lvl){ //this is effectively the "Main Loop"
        //Setup Canvas
        var gameObjManager = this.GameObjManager;
        gameObjManager.Group = "level";
        var context = this.context;
        this.DestroyCanvas(context, false);
        var scrollPosition = this.ScrollPosition;
        var limit = 480 * lvl;
        if(this.MoveLeft === true){
            console.log("scrollPosition: " + scrollPosition + " limit: " + limit);
        }
        if(scrollPosition > (480 * lvl)){            
            //Draw Header, Floor, and Buttons
            this.DrawBackground(context, gameObjManager);
            this.DrawHeader(context, this.canvasWidth, gameObjManager);
            this.DrawButtons(context, false, gameObjManager);
            this.DrawFloor(context, this.canvasWidth, null, gameObjManager);
            this.DrawShooting(context, gameObjManager);
            this.DrawPlayer(context, gameObjManager);
            
            //Save Context Object
            this.context = context;
        } else {
            //End of Level Reached
            this.DrawBackground(context, gameObjManager);
            //Stop Loop
            clearInterval(ATD.MainLoopInterval);
            ATD.MainLoopInterval = null;
            this.DrawEndOfLevel(lvl);
            this.Shots = [];
            this.Shooting = false;
            this.ScrollPosition = (500 * lvl);
            this.Backgrounds = [];
        }
    },
    DrawEndOfLevel: function(lvl){
        //Setup Canvas
        var gameObjManager = this.GameObjManager;
        gameObjManager.Group = "eol";
        var context = this.context;
        
        //Draw Header, Floor, Buttons
        this.DrawFloor(context, this.canvasWidth, null, gameObjManager);
        this.DrawPlayer(context, gameObjManager);
        this.DestroyCanvas(context, true);
        this.DrawHeader(context, this.canvasWidth, gameObjManager);
        this.DrawButtons(context, false, gameObjManager);
    }
    //
    //End Canvas Group Draw Methods
    //
});
