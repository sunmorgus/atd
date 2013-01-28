var Game = Class.extend({
	init : function(gameObjManager) {
		var w = gameObjManager.WindowWidth;
		var h = gameObjManager.WindowHeight;

		var canvasString = '<canvas id="game-field" width="' + w + '" height="' + h + '"></canvas>';

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
                gameObjManager.SetOption("music", !gameObjManager.Music);
                this.DrawButtons(this.context, false);
                break;
        }
    },
	//
	//End Event Handlers
	//
    
    //
    //Canvas Utility Methods
    //
	DestroyCanvas : function(context) {
        context.fillStyle = "rgb(0,0,0)";
		context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        var nameInput = $('#nameInput');
        nameInput.hide();
	},
    DrawButtons : function(context, headerOnly) {
        var buttonsObj = new Buttons();
        var buttons = [];

        if(!headerOnly){
            switch(this.GameObjManager.Group){
                case "index": //draw buttons center x,y
                    var indexButtons = buttonsObj.GetButtons(this.GameObjManager, false);
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
                    var playerButtons = buttonsObj.GetPlayerButtons(this.GameObjManager);
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
                    var levelButtons = buttonsObj.GetLevelButtons(22, 1);
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
            }
        }
        
        var headerButtons = buttonsObj.GetButtons(this.GameObjManager, true);
        for (i = 0; i < headerButtons.length; i++){
            var headerButton = headerButtons[i];
            var img = new Image();
            switch(headerButton.id){
                case "music":
                    if(this.GameObjManager.Music === true){
                        img.src = headerButton.imgSrcOn;
                    } else {
                        img.src = headerButton.imgSrcOff;
                    }
                    headerButton.x = this.canvasWidth - headerButton.width;

                    break;
                case "home":
                    img.src = headerButton.imgSrc;
                    headerButton.x = this.canvasWidth - (headerButton.width * 2);
                    break;
            }
            
            headerButton.y = 0;
            context.drawImage(img, headerButton.x, 0);
            
            //add switch on group here to draw header buttons specific to group
            
            buttons.push(headerButton);
        }
        
        this.GameObjManager.Buttons = buttons;
	},
    DrawTextButton: function(context, button){
        context.fillStyle = "rgb(255,255,255)";
        context.fillRect(button.x, button.y, button.width, button.height);
        context.fillStyle = button.color;
        context.fillRect(button.x, button.y, button.width, button.height);
        context.fillStyle = button.textColor;
        context.textAlign = "center";
        context.font = button.font;
        var textSize = context.measureText(button.text);
        context.fillText(button.text, button.x + textSize.width, button.y + (button.height / 1.7));
    },
    DrawImageButton: function(context, button){
        context.fillStyle = "rgb(255,255,255)";
        context.fillRect(button.x, button.y, button.width, button.height);
        context.fillStyle = button.color;
        context.fillRect(button.x, button.y, button.width, button.height);
        
        var img = new Image();
        img.src = button.imgSrc;
        context.drawImage(img, button.x, button.y);
    },
    DrawHeader : function(context, canvasWidth) {
        var group = this.GameObjManager.Group;
		context.fillStyle = "rgba(255,255,255,.9)";
		context.fillRect(0, 0, canvasWidth, 25);
        
        switch(group){
            case "index":
                //draw index header buttons (audio pref)
                break;
            case "playerSelect":
                var groupTitle = "Create or Select Player";
                context.font = this.GameObjManager.DefaultFont;
                context.fillStyle = "rgb(0,0,0)";
                var textSize = context.measureText(groupTitle);
                context.fillText(groupTitle, this.canvasX - (textSize.width / 1.7), 20);
                break;
            case "levelSelect":
                //var gameObjManager = this.GameObjManager;
                //var playerName = "Player: " + gameObjManager.CurrentPlayer.name;
                context.font = this.GameObjManager.DefaultFont;
                context.fillStyle = "rgb(0,0,0)";
                //context.fillText(playerName, 80, 20);
                groupTitle = "Select Level";
                textSize = context.measureText(groupTitle);
                context.fillText(groupTitle, this.canvasX - textSize.width, 20);
                break;
        }
	},
    //
    //End Canvas Utility Methods
    //
    
    //
    //Canvas Draw Group Methods
    //
    DrawIndex : function() {
        this.GameObjManager.Group = "index";
        var context = this.context;
		this.DestroyCanvas(context);

		// Draw Index Buttons
        this.DrawHeader(context, this.canvasWidth);
        this.DrawButtons(context, false);

		// Save Context Object
		this.context = context;
	},
    DrawPlayerSelect: function(){
        this.GameObjManager.Group = "playerSelect";
        var context = this.context;
        this.DestroyCanvas(context);
        this.DrawHeader(context, this.canvasWidth);
        this.DrawButtons(context, false);
        
        //show input box
        var nameInput = $('#nameInput');
        nameInput.css({top: this.canvasY + 30, left: this.canvasX + 100});
        nameInput.show();
        $('#name').val('');
        $('#name').focus();
    },
	DrawLevelSelect : function() {
        this.GameObjManager.Group = "levelSelect";
		var context = this.context;
		this.DestroyCanvas(context);
        this.DrawHeader(context, this.canvasWidth);
        this.DrawButtons(context, false);
	}
    //
    //End Canvas Group Draw Methods
    //
});
