var GameObjManager = Class.extend({
	init : function() {
        //Page Objects
		this.WindowWidth = 800;
		this.WindowHeight = 480;
        this.DefaultFont = "bold 1.5em monospace";
		
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
                imgSrc: "images/sprites/player.png",
                width: 125,
                height: 150,
                x: 60,
                y: this.WindowHeight - 175,
                source: 'http://www.facepunch.com/showthread.php?t=964329&s=f0a5695d23382f1eb038fda6d7b8b7f6&p=23108276&viewfull=1#post23108276'
            },
			version : 2
		}

		return player;
	},
    
    GetBackgrounds: function(count){
        var backgrounds = [];
        var width = 2382;
        for(var i = 0; i < count; i++){
            backgrounds.push({
                imgSrc: 'images/gameBg.png',
                x: i > 0 ? i * width : i,
                y: 25,
                width: count > 1 ? count * width : width,
                height: 450
            });
        }
        return backgrounds;
    },
    
    NewShot: function(){
        return {
            id: null,
            x: 135,
            y: 388,
            width: 50,
            height: 5,
            fillStyle: "rgb(0,255,255)"
        };
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