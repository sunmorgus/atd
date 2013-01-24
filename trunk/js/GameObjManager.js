var GameObjManager = Class.extend({
	init : function() {
        //Page Objects
		this.WindowWidth = 800;
		this.WindowHeight = 480;
        this.DefaultFont = "bold 1.5em monospace";
		
        //Group Objects
        this.Group = "index";
        this.Buttons = []
        
        //Player Info
		this.PlayerVersion = 1;
		this.Players = localStorage['players'] === undefined || localStorage['players'] === null ? [] : JSON.parse(localStorage['players']);
		this.CurrentPlayer = {};
        
        //Options
        this.Music = true;
	},

	//
	//Storage Methods
	//

	SavePlayer : function(player) {
		var players = localStorage['players'] === undefined || localStorage['players'] === null ? [] : JSON.parse(localStorage['players']);
		var len = players.length;
		if (len > 0) {
			for (var i = 0; i < len; i++) {
				if (player.name === players[i].name) {
					players[i] = player;
				}
			}
		}

		localStorage['players'] = JSON.stringify(players);
	},

	GetPlayer : function(name) {
		var players = this.Players;
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

		this.Players = players;
		this.CurrentPlayer = player;
		localStorage['players'] = JSON.stringify(players);
        
        return player;
	},

	NewPlayer : function(name) {
		var player = {
			id : GUID(),
			name : name,
			score : 0,
			level : 1,
			life : 300,
			sprite : "dalek",
			version : 1
		}

		return player;
	},
    
    SetOption: function(option, value){
        switch(option){
            case "music":
                this.Music = value;
                break;
        }
    }
	//
	//End Storage Methods
	//
})