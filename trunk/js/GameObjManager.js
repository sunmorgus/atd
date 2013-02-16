var GameObjManager = Class.extend({
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
});