var GameObjManager = Class.extend({
	init : function() {
		this.WindowWidth = 800;
		//window.innerWidth;
		this.WindowHeight = 480;
		//window.innerHeight;
        var buttonsClass = new Buttons();
		this.Buttons = buttonsClass.GetButtons();
		this.PlayerVersion = 1;
		this.Players = localStorage['players'] === undefined || localStorage['players'] === null ? [] : JSON.parse(localStorage['players']);
		this.CurrentPlayer = {};
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
		var player = this.CurrentPlayer;
		var len = players.length;
		if (len > 0) {
			for (var i = 0; i < len; i++) {
				if (name === players[i].name) {
					player = players[i];
				}
			}
		} else {
			player = this.NewPlayer(name);
			players.push(player);
		}

		this.Players = players;
		this.CurrentPlayer = player;
		localStorage['players'] = JSON.stringify(players);
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
	}
	//
	//End Storage Methods
	//
})