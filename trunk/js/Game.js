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
            if(this.EnemyShooting === false && this.EnemyShots.length < enemy.frequency){
                this.EnemyShots.push(gameObjManager.NewEnemyShot(enemy, this.canvasWidth - 200));
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
                
                //Draw Level Title
                groupTitle = "Level: " + ATD.Level;
                textSize = context.measureText(groupTitle);
                context.fillText(groupTitle, this.canvasWidth / 2, 20);
                
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
        var canvasRight = this.canvasWidth;
        var hold = [];
        for(var i in enemies){
            var enemyImg = new Image();
            var enemy = enemies[i];
            var x = enemy.x;
            var y = enemy.y;
            if(enemy.ObjType === "enemy" || enemy.ObjType === "boss"){
                if(enemy.hit === false){
                    enemyImg.src = enemy.imgSrc;
                }
                else {
                    enemyImg.src = enemy.imgSrcInvert;
                }
                var enemyRight = enemy.width + x;

                if(this.MoveLeft === true && (this.Fighting === false || (this.Fighting === true && enemyRight > canvasRight)) && 
                    (gameObjManager.CurrentPlayer.sprite.x + gameObjManager.CurrentPlayer.sprite.width) >= this.canvasMiddle - 100){
                        x -= 12;
                        this.Moving = true;
                }
                
                if(x < canvasRight){
                    enemy.fighting = true;
                    this.Fighting = true;
                }
                
                if(this.MoveRight === true && x < enemy.startX && gameObjManager.CurrentPlayer.sprite.x <= 60){
                    x += 12;
                    this.Moving = true;
                    if(x > canvasRight){
                        enemy.fighting = false;
                        this.Fighting = false;
                    }
                }
                
                if(enemy.ObjType === "boss"){
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
                if(this.MoveLeft === true && this.Fighting === false && 
                    (gameObjManager.CurrentPlayer.sprite.x + gameObjManager.CurrentPlayer.sprite.width) >= this.canvasMiddle - 100){
                    this.Moving = true;
                    x -= 12;
                }
                
                if(this.MoveRight === true && x < enemy.startX && gameObjManager.CurrentPlayer.sprite.x <= 60){
                    x += 12;
                    this.Moving = true;
                }
                
                var hit = this.DetectPowerUpCollision(x, y, enemy.width, enemy.height, enemy.health);
                if(hit === true){
                    hold.push(enemy);
                }
            }
            
            this.DrawImage(context, enemyImg, x, y, enemy.width, enemy.height);

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
        if(this.PlayerHit === false){
            playerImg.src = currentPlayer.sprite.imgSrc;
        } else {
            playerImg.src = currentPlayer.sprite.imgSrcInvert;
        }
        
        var x = currentPlayer.sprite.x;
        
        if(this.MoveLeft === true && (x + currentPlayer.sprite.width) <= this.canvasMiddle - 100){
            x += 12;
            this.Moving = true;
        }
        
        if(this.MoveRight === true && (x >= currentPlayer.sprite.startX)){
            x -= 12;
            this.Moving = true;
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
        if(this.Fighting === true){
            this.Moving = false;
            var enemies = this.Enemies;
            //var elen = enemies.length;
            //var canvasRight = this.canvasX + this.canvasWidth;
            for(var e in enemies){
                var enemy = enemies[e];
                if(enemy.fighting === true){
                    this.EnemyShoot(gameObjManager, enemy);
                    var shots = this.EnemyShots;
                    //var len = shots.length;
                    var hold = [];
                    for(var i in shots){
                        this.EnemyShooting = true;
                        //var shot = shots[i];
                        context.fillStyle = shots[i].fillStyle;
                        context.fillRect(shots[i].x, shots[i].y, shots[i].width, shots[i].height);
    
                        var hit = this.DetectCollision(shots[i].x, shots[i].y, shots[i].width, shots[i].height, false, shots[i].damage);
                        shots[i].x -= enemy.shotspeed;
                        if((shots[i].x + shots[i].width) <= this.canvasX / 10 || hit === true){
                            hold.push(shots[i]);
                        }
                    }
                    for(var c in hold){
                        this.EnemyShots.splice($.inArray(hold[c], this.EnemyShots), 1);
                    }
                    this.EnemyShooting = false;
                }
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
                        }
                        hit = true;
                    }
                }
            }
            
            for(var i in hold){
                this.Fighting = false;
                if(this.MoveLeft === true || this.MoveRight === true){
                    this.Moving = true;
                }
                this.EnemyShots = [];
                this.Enemies.splice($.inArray(hold[i], this.Enemies), 1);
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
    DetectPowerUpCollision: function(px, py, pwidth, pheight, health){
        var left = px;
        //var right = px + pwidth;
        var top = py;
        var bottom = py + pheight;
        var currentPlayer = this.GameObjManager.CurrentPlayer;
        if(left <= (currentPlayer.sprite.x + currentPlayer.sprite.width) && 
            (
                (top <= currentPlayer.sprite.y && bottom >= currentPlayer.sprite.y) || 
                (top <= currentPlayer.sprite.y + currentPlayer.sprite.height && bottom >= currentPlayer.sprite.y + currentPlayer.sprite.height) || 
                (top >= currentPlayer.sprite.y && bottom <= currentPlayer.sprite.y + currentPlayer.sprite.height)
            )
        ){
            var currentHealth = this.GameObjManager.CurrentPlayer.health;
            if(currentHealth < 200){
                this.GameObjManager.CurrentPlayer.health += health;
            }
            return true;
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
        gameObjManager.CurrentPlayer.sprite.x = 60;
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
        
        if(level.Grayscale === true){
            this.DrawGrayscale(context);
        }
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
            this.DrawPlayer(bbcontext, gameObjManager);
            this.DrawShooting(bbcontext, gameObjManager);
            this.DrawFight(bbcontext, gameObjManager);
            
            context.drawImage(this.backBuffer, 0, 0);
            if(level.Grayscale === true){
                this.DrawGrayscale(context);
            }
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
        this.GameObjManager.CurrentPlayer.sprite.x = this.GameObjManager.CurrentPlayer.sprite.startX;
        
        context.drawImage(this.backBuffer, 0, 0);
        
        if(level.Grayscale === true){
            this.DrawGrayscale(context);
        }
    }
    //
    //End Canvas Group Draw Methods
    //
});
