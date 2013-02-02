var GameObjManager = Class.extend({
	init : function() {
        //Page Objects
        var gameWidth = window.innerWidth;
        var gameHeight = window.innerHeight;
        var scaleToFitX = gameWidth / 800;
        var scaleToFitY = gameHeight / 480;
        var currentScreenRatio = gameWidth / gameHeight;
        var optimalRatio = Math.min(scaleToFitX, scaleToFitY);
        if(currentScreenRatio >= 1.77 && currentScreenRatio <= 1.79){
            this.WindowWidth = gameWidth;
            this.WindowHeight = gameHeight;
        } else {
            this.WindowWidth = 800 * optimalRatio;
            this.WindowHeight = 480 * optimalRatio;
        }
		//this.WindowWidth = 800;
		//this.WindowHeight = 480;
        this.DefaultFont = "bold 2em monospace";
		
        //Group Objects
        this.Group = "index";
        this.Buttons = [];
        
        //Player Info
		this.PlayerVersion = 2;
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
				player = players[i];
			}
		}
        
        if(player === null){
            player = this.NewPlayer(name);
            players.push(player);
        }
        player.sprite.y = this.WindowHeight - 175;
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
			sprite : {
                imgSrc: "images/sprites/player2.png",
                imgSrcInvert: "images/sprites/player_invert.png",
                width: 125,
                height: 150,
                startY: this.WindowHeight - 175,
                x: 60,
                y: this.WindowHeight - 175
            },
			version : 2
		}

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
                x2: i > 0 ? i * widht : i,
                y: 25,
                width0: count > 1 ? count * width : width,
                width1: (count > 1 ? count * width : width) + 480,
                width2: (count > 1 ? count * width : width) + 480,
                height: this.WindowHeight
            });
        }
        return backgrounds;
    },
    
    NewShot: function(){
        return {
            id: null,
            x: 135,
            y: this.CurrentPlayer.sprite.y + 83,
            width: 50,
            height: 5,
            fillStyle: "rgb(0,255,255)",
            damage: 10
        };
    },
    
    NewEnemyShot: function(enemy, x){
        return {
            id: null,
            x: x,
            y: enemy.y + 83,
            width: 50,
            height: 5,
            fillStyle: "rgb(0,255,255)",
            damage: enemy.damage
        };
    },
    
    NewEnemy: function(type){
        var enemy = null;
        switch(type){
            case "gold":
                enemy = {
                    health: 50,
                    damage: 10,
                    frequency: 1,
                    imgSrc: "images/sprites/enemies/gold.png",
                    imgSrcInvert: "images/sprites/enemies/gold_invert.png",
                    startX: 0,
                    x: 0,
                    startY: 0,
                    y: 0,
                    width: 125,
                    height: 150,
                    hit: false,
                    hitCount: 0
                }
                break;
            case "army":
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
        return enemy;
    },
    
    GetEnemies: function(level){
        var enemies = [];
        var levelLen = level.EnemyPositions.length;
        
        for(var i = 0; i < levelLen; i++){
            enemyPosition = level.EnemyPositions[i];
            var enemy = this.NewEnemy(enemyPosition.type);
            enemy.startX = enemyPosition.x;
            enemy.x = enemyPosition.x;
            enemy.startY = enemyPosition.y;
            enemy.y = enemyPosition.y;
            enemies.push(enemy);
        }
        
        return enemies;
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
})