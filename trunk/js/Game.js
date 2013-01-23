var Game = Class.extend({
	init : function(gameObjManager) {
		this.GameObjManager = gameObjManager;
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
	//
	//End Event Handlers
	//
    
    //
    //Canvas Methods
    //
	SetupCanvas : function() {
		var gameObjManager = this.GameObjManager;
		var w = gameObjManager.WindowWidth;
		var h = gameObjManager.WindowHeight;

		var canvasString = '<canvas id="game-field" width="' + w + '" height="' + h + '"></canvas>';

		$('#gameHolder').empty();
		$(canvasString).appendTo('#gameHolder');

        var canvas = $('#game-field');
		var context = canvas.get(0).getContext('2d');
		context.fillStyle = "rgb(0,0,0)";
        this.canvasX = canvas.offset().left;
        this.canvasY = canvas.offset().top;
		this.canvasWidth = w;
		this.canvasHeight = h;
		this.canvasMiddle = w / 2;
		this.canvasVMiddle = h / 2;

		this.DestroyCanvas(context);

		// Draw Index Buttons
		this.DrawButtons(context, this.canvasMiddle, this.canvasVMiddle, "index");
        this.DrawHeader(context, w);

		// Save Context Object
		this.context = context;
	},
	DestroyCanvas : function(context) {
        context.fillStyle = "rgb(0,0,0)";
		context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
	},
    DrawButtons : function(context, canvasMiddle, canvasVMiddle, group) {
        var buttons = this.GameObjManager.Buttons;

		for (var i = 0; i < buttons.length; i++) {
			var button = buttons[i];
            if(button.group === group){
                switch(group){
                    case "index": //draw buttons center x,y
                        button.x = canvasMiddle - (button.width / 2);
                        button.y = canvasVMiddle - (button.height / 2);
                        context.fillStyle = "rgb(255,255,255)";
                        context.fillRect(button.x, button.y, button.width, button.height);
                        context.fillStyle = button.color;
                        context.fillRect(button.x, button.y, button.width, button.height);
                        context.fillStyle = button.textColor;
                        context.textAlign = "center";
                        context.font = button.font;
                        var textSize = context.measureText(button.text);
                        context.fillText(button.text, button.x + textSize.width, button.y + (button.height / 1.7));
                        break;
                    case "header":
                        break;
                }
            }
		}
	},
	DrawHeader : function(context, canvasWidth) {
		context.fillStyle = "rgba(255,255,255,.9)";
		context.fillRect(0, 0, canvasWidth, 25);
	},
	DrawLevelSelect : function() {
		var context = this.context;
		this.DestroyCanvas(context);
        this.DrawHeader(context, this.canvasWidth);

        // Show Level Select
        var buttons = new Buttons();
        var levelButtons = buttons.GetLevelButtons(20, 1);
        var len = levelButtons.length;
        for(var i = 0; i < len; i++){
            var button = levelButtons[i];
            context.fillStyle = "rgb(255,255,255)";
            context.fillRect(button.x, button.y + this.canvasY, button.width, button.height);
            context.fillStyle = button.color;
            context.fillRect(button.x, button.y + this.canvasY, button.width, button.height);
            context.fillStyle = button.textColor;
            context.textAlign = "center";
            context.font = button.font;
            var textSize = context.measureText(button.text);
            context.fillText(button.text, button.x + textSize.width, button.y + (button.height / 2));
        }
	}
    //
    //End Canvas Methods
    //
});
