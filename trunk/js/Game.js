var Game = Class.extend({
	init : function(gameObjManager) {
        if(gameObjManager === undefined || gameObjManager === null){
            gameObjManager = new GameObjManager();
        }
		var w = gameObjManager.WindowWidth;
		var h = gameObjManager.WindowHeight;

		var canvasString = '<canvas id="game-field" width="' + w + '" height="' + h + '">To play this game, you need a more <a href="http://lmgtfy.com/?q=Modern+Browser">Modern Browser</a></canvas>';

        $('#loader').hide();
		$('#gameHolder').empty();
		$(canvasString).appendTo('#gameHolder');

        var canvas = $('#game-field');
		var context = canvas.get(0).getContext('2d');
		context.fillStyle = "rgb(0,0,0)";
        this.context = context;
        this.canvasX = 0;
        this.canvasY = 0;
		this.canvasWidth = w;
		this.canvasHeight = h;
		this.canvasMiddle = w / 2;
		this.canvasVMiddle = h / 2;
        
        this.backBuffer = document.createElement('canvas');
        this.backBuffer.width = this.canvasWidth;
        this.backBuffer.height = this.canvasHeight;
        this.backBufferContext = this.backBuffer.getContext('2d');
        
        this.GameObjManager = gameObjManager;
        
        this.SetDefaults();
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
        if(this.Shooting === false && this.Shots.length < 6){
            var gameObjManager = this.GameObjManager;
            this.Shots.push(gameObjManager.NewShot());
        }
    },
    EnemyShoot: function(gameObjManager, enemy){
        if(this.EnemyShooting === false && this.EnemyShots.length < enemy.frequency){
            this.EnemyShots.push(gameObjManager.NewEnemyShot(enemy, this.canvasWidth - 200));
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
        //Background Objects
        this.ScrollPosition = this.canvasWidth + 1;
        this.Backgrounds = [];
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
        this.Fighting = false;
        this.EnemyShots = [];
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
            var grayscale = false; //moves way too slow now...maybe due to the back buffer?
            if(img.complete === true){
                context.drawImage(img, x, y, width, height);
                if(grayscale === true){
                    var imageData = context.getImageData(x, y, width, height);
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
                    context.putImageData(imageData, x, y, width, height);
                }
            } else {            
                (function(img, x, y){
                    img.onload = function(){
                        context.drawImage(img, x, y, width, height);
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
	DestroyCanvas : function(context, bbcontext, alpha) {
        context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        bbcontext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        var nameInput = $('#nameInput').hide();
	},
    DrawButtons : function(context, headerOnly, gameObjManager) {
        var buttonsObj = new Buttons();
        var buttons = [];

        if(!headerOnly){
            switch(gameObjManager.Group){
                case "index": //draw buttons center x,y
                    var indexButtons = buttonsObj.GetButtons(gameObjManager, false);
                    //var len = indexButtons.length;
                    for(var i in indexButtons){
                        var button = indexButtons[i];
                        button.x = this.canvasMiddle - (button.width / 2);
                        button.y = this.canvasVMiddle - (button.height / 2);
                        this.DrawTextButton(context, button);
                        buttons.push(button);
                    }
                    break;
                case "playerSelect":
                    var playerButtons = buttonsObj.GetPlayerButtons(gameObjManager);
                    //len = playerButtons.length;
                    for(var i in playerButtons){
                        button = playerButtons[i];
                        if(button.id === "submitName"){
                            button.x = 420;
                            button.y = 68;
                            this.DrawTextButton(context, button);
                        } else {
                            this.DrawTextButton(context, button);
                        }
                        buttons.push(button);
                    }
                    break;
                case "levelSelect":
                    // Show Level Select
                    var levelButtons = buttonsObj.GetLevelButtons(gameObjManager, 44, gameObjManager.CurrentPlayer.level);
                    //len = levelButtons.length;
                    for(var i in levelButtons){
                        button = levelButtons[i];
                        if(button.locked === false){
                            this.DrawTextButton(context, button);
                        } else {
                            this.DrawImageButton(context, button);
                        }
                        buttons.push(button);
                    }
                    break;
                case "sol":
                    var solButtons = buttonsObj.GetButtons(gameObjManager, false);
                    for(var i in solButtons){
                        button = solButtons[i];
                        button.x = this.canvasMiddle - (button.width / 2);
                        button.y = this.canvasVMiddle - button.height;
                        button.text = this.LevelTitle;
                        this.DrawTextButton(context, button);
                        buttons.push(button);
                    }
                case "eol":
                    indexButtons = buttonsObj.GetButtons(gameObjManager, false);
                    //len = indexButtons.length;
                    var health = gameObjManager.CurrentPlayer.health;
                    for(var i in indexButtons){
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
                                    button.level = new Levels(ATD.Level, gameObjManager.WindowHeight, gameObjManager.WindowWidth);
                                    gameObjManager.CurrentPlayer.health = 200;
                                    gameObjManager.SavePlayer(gameObjManager.CurrentPlayer);
                                } else {
                                    ATD.Level += 1;
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
            }
        }
        
        var headerButtons = buttonsObj.GetButtons(gameObjManager, true);
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
            this.DrawImage(context, img, headerButton.x, 0, headerButton.width, headerButton.height);
            
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
        this.DrawImage(context, img, button.x, button.y, button.width, button.height);
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
                //groupTitle = "Level: " + ATD.Level;
                //textSize = context.measureText(groupTitle);
                //context.fillText(groupTitle, this.canvasWidth / 2, 20);
                
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
        var width = backgrounds[(len - 1)].width0;
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
            
            if(this.MoveLeft === true && this.Fighting === false){
                x0 -= 6;
                x1 -= 9;
                x2 -= 12;
            }

            if(this.MoveRight === true && x0 < background.startX0){
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

        this.ScrollPosition = backgrounds[0].x0 + width;
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
        var enemyImg = new Image();
        var canvasRight = this.canvasWidth / 2;
        for(var i in enemies){
            var enemy = enemies[i];
            if(enemy.hit === false){
                enemyImg.src = enemy.imgSrc;
            }
            else {
                enemyImg.src = enemy.imgSrcInvert;
            }
            
            var x = enemy.x;

            var enemyRight = (enemy.width + (x - canvasRight));
            //console.log("x: " + (enemy.width + (x - 480)) + " canvasRigth: " + canvasRight);
            //console.log(this.Fighting);
            if(this.MoveLeft === true && this.Fighting === false){
                if(enemyRight > canvasRight){
                    x -= 8;
                } else {
                    this.Fighting = true;
                }
            }
            if(this.MoveRight === true && x < enemy.startX){
                x += 8;
                if(x > 320){
                    this.Fighting = false
                }
            }
            
            this.DrawImage(context, enemyImg, x, enemy.y, enemy.width, enemy.height);
            if(enemy.hitCount === 6){
                enemy.hit = false;
                enemy.hitCount = 0;
            }
            enemy.hitCount++;
            enemy.x = x;
            this.Enemies[i] = enemy;
        }
    },
    DrawPlayer: function(context, gameObjManager){
        var currentPlayer = gameObjManager.CurrentPlayer;
        
        var playerImg = new Image();
        if(this.PlayerHit === false){
            playerImg.src = currentPlayer.sprite.imgSrc;
        } else {
            playerImg.src = currentPlayer.sprite.imgSrcInvert;
        }
        
        var y = currentPlayer.sprite.y;
        
        if(this.MoveUp === true && y > 25){
            y -= 8;
        }
        
        if(this.MoveDown === true && y < currentPlayer.sprite.startY){
            y += 8;
        }
        
        this.DrawImage(context, playerImg, currentPlayer.sprite.x, y, currentPlayer.sprite.width, currentPlayer.sprite.height);
        if(this.PlayerInvertCount === 6){
            this.PlayerHit = false;
            this.PlayerInvertCount = 0;
        }
        this.PlayerInvertCount++;
        
        gameObjManager.CurrentPlayer.sprite.y = y;
    },
    DrawShooting: function(context, gameObjManager){
        var shots = this.Shots;
        //var len = shots.length;
        var hold = [];
        for(var i in shots){
            this.Shooting = true;
            context.fillStyle = shots[i].fillStyle;
            context.fillRect(shots[i].x, shots[i].y, shots[i].width, shots[i].height);
            
            shots[i].x += 25;
            var hit = this.DetectCollision(shots[i].x, shots[i].y, shots[i].width, shots[i].height, true, shots[i].damage);
            if(shots[i].x >= this.canvasMiddle * 2 || hit === true){
                hold.push(i);
            }
        }
        for(var c in hold){
            this.Shots.splice(hold[c], 1);
        }
        this.Shooting = false;
    },
    DrawFight: function(context, gameObjManager){
        if(this.Fighting === true){
            var enemies = this.Enemies;
            //var elen = enemies.length;
            //var canvasRight = this.canvasX + this.canvasWidth;
            for(var e in enemies){
                var enemy = enemies[e];
                this.EnemyShoot(gameObjManager, enemy);
                var shots = this.EnemyShots;
                //var len = shots.length;
                var hold = [];
                for(var i in shots){
                    this.EnemyShooting = true;
                    //var shot = shots[i];
                    context.fillStyle = shots[i].fillStyle;
                    context.fillRect(shots[i].x, shots[i].y, shots[i].width, shots[i].height);

                    
                    shots[i].x -= 15;
                    var hit = this.DetectCollision(shots[i].x, shots[i].y, shots[i].width, shots[i].height, false, shots[i].damage);
                    if((shots[i].x + shots[i].width) <= this.canvasX / 10 || hit === true){
                        hold.push(i);
                    }
                }
                for(var c in hold){
                    this.EnemyShots.splice(hold[c], 1);
                }
                this.EnemyShooting = false;
            }
        }
    },
    DetectCollision: function(x, y, width, height, isPlayer, damage){
        var left = x;
        var right = x + width;
        var top = y;
        var bottom = y + height;
        if(isPlayer === true){
            var enemies = this.Enemies;
            //var eLen = enemies.length;
            var hold = [];
            var hit = false;
            for(var ei in enemies){
                var enemy = enemies[ei];
                if(right >= enemy.x && top >= enemy.y && bottom <= enemy.y + enemy.height){
                    enemy.health -= damage;
                    enemy.hit = true;
                    if(enemy.health <= 0){
                        hold.push(enemy);
                    }
                    hit = true;
                }
            }
            
            for(var i in hold){
                this.Fighting = false;
                this.EnemyShots = [];
                this.Enemies.splice(hold[i], 1);
            }
            return hit;
        } else {
            var currentPlayer = this.GameObjManager.CurrentPlayer;
            if(left <= (currentPlayer.sprite.x + currentPlayer.sprite.width) && top >= currentPlayer.sprite.y && bottom <= currentPlayer.sprite.y + currentPlayer.sprite.height){
                this.PlayerHit = true;
                this.GameObjManager.CurrentPlayer.health -= damage;
                return true;
            }
        }
        
        return false;
    },
    ExplodeEnemy: function(enemy){
        
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
        
        this.Fighting = false;
        
		// Save Context Object
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
        
        bbcontext.fillStyle = "rgba(0,0,0,.7)";
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
        var context = this.context;
        var bbcontext = this.backBufferContext;
        this.DestroyCanvas(context, bbcontext, true);
        
        this.LevelTitle = level.LevelTitle;
        
        //Draw Header, Floor, Buttons
        this.DrawBackground(bbcontext, gameObjManager);
        this.DrawFloor(bbcontext, this.canvasWidth, null, gameObjManager);
        this.DrawPlayer(bbcontext, gameObjManager);
        this.DrawEol(context, bbcontext, true);
        this.DrawHeader(bbcontext, this.canvasWidth, gameObjManager);
        this.DrawButtons(bbcontext, false, gameObjManager);
        
        context.drawImage(this.backBuffer, 0, 0);
    },
    DrawLevel: function(level){ //this is effectively the "Main Loop"
        //Setup Canvas
        var gameObjManager = this.GameObjManager;
        gameObjManager.Group = "level";
        var context = this.context;
        var bbcontext = this.backBufferContext;
        this.DestroyCanvas(context, bbcontext, false);
        var scrollPosition = this.ScrollPosition;
        var limit = this.canvasWidth; //480 * level.LevelNumber;
        if(scrollPosition > limit && gameObjManager.CurrentPlayer.health > 0){            
            //Draw Header, Floor, and Buttons
            this.DrawBackground(bbcontext, gameObjManager);
            this.DrawEnemies(bbcontext, gameObjManager);
            this.DrawHeader(bbcontext, this.canvasWidth, gameObjManager);
            this.DrawButtons(bbcontext, false, gameObjManager);
            this.DrawFloor(bbcontext, this.canvasWidth, null, gameObjManager);
            this.DrawShooting(bbcontext, gameObjManager);
            this.DrawPlayer(bbcontext, gameObjManager);
            this.DrawFight(bbcontext, gameObjManager);
            
            context.drawImage(this.backBuffer, 0, 0);
        } else {
            this.MoveLeft = false;
            this.DrawEndOfLevel(level);
        }
    },
    DrawEndOfLevel: function(level){
        clearInterval(ATD.MainLoopInterval);
        ATD.MainLoopInterval = null;
        //Setup Canvas
        var gameObjManager = this.GameObjManager;
        gameObjManager.Group = "eol";
        var context = this.context;
        var bbcontext = this.backBufferContext;
        this.DestroyCanvas(context, bbcontext, true);
        
        //Draw Header, Floor, Buttons
        this.DrawBackground(bbcontext, gameObjManager);
        this.DrawFloor(bbcontext, this.canvasWidth, null, gameObjManager);
        this.DrawPlayer(bbcontext, gameObjManager);
        this.DrawEol(context, bbcontext, true);
        this.DrawHeader(bbcontext, this.canvasWidth, gameObjManager);
        this.DrawButtons(bbcontext, false, gameObjManager);
        
        this.SetDefaults();
        
        context.drawImage(this.backBuffer, 0, 0);
    }
    //
    //End Canvas Group Draw Methods
    //
});
