var GameObjManager = Class.extend({
	init : function() {
		this.WindowWidth = 800;
		//window.innerWidth;
		this.WindowHeight = 480;
		//window.innerHeight;
		this.CurrentGame = new Game(this);
		this.IndexButtons = [];
		this.PlayerVersion = 1;
		this.Players = localStorage['players'] === undefined || localStorage['players'] === null ? [] : JSON.parse(localStorage['players']);
		this.CurrentPlayer = {};
	},
	//
	//Draw Methods
	//
	DrawIndexButtons : function(context, canvasMiddle, canvasVMiddle) {
		//creates an array holding x, y, and img params
		//for main menu buttons. see http://jsfiddle.net/9WWqG/2/
		//for more info
		var indexButtons = [];
		var buttonWidth = 200;
		var buttonHeight = 50;
		var newGameButton = {
			id : "newGame",
			x : canvasMiddle - (buttonWidth / 2),
			y : canvasVMiddle - (buttonHeight / 2),
			width : buttonWidth,
			height : buttonHeight,
			color : "rgba(255,0,0,.9)",
			text : "New Game",
			textColor : "rgb(255,255,255)"
		};

		indexButtons.push(newGameButton);

		for (var i = 0; i < indexButtons.length; i++) {
			var button = indexButtons[i];
			context.fillStyle = "rgb(255,255,255)";
			context.fillRect(button.x, button.y, button.width, button.height);
			context.fillStyle = button.color;
			context.fillRect(button.x, button.y, button.width, button.height);
			context.fillStyle = button.textColor;
			context.textAlign = "center";
			context.font = "bold 1.5em monospace";
			var textSize = context.measureText(button.text);
			context.fillText(button.text, button.x + textSize.width, button.y + (button.height / 1.7));
		}

		this.IndexButtons = indexButtons;
	},
	DrawHeader : function(context, canvasWidth) {
		context.fillStyle = "rgba(255,255,255,.9)";
		context.fillRect(0, 0, canvasWidth, 25);
	},
	//
	//End Draw Methods
	//

	//
	//Event Handlers
	//
	ButtonClick : function(x, y) {
		var buttons = this.IndexButtons;
		var isCollision = false;
		for (var i = 0, len = buttons.length; i < len; i++) {
			var left = buttons[i].x, right = buttons[i].x + buttons[i].width;
			var top = buttons[i].y, bottom = buttons[i].y + buttons[i].height;
			if (right >= x && left <= x && bottom >= y && top <= y) {
				isCollision = buttons[i];
			}
		}
		return isCollision;
	},
	//
	//End Event Handlers
	//

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
		var players = localStorage['players'] === undefined || localStorage['players'] === null ? [] : JSON.parse(localStorage['players']);
		var player = {};
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