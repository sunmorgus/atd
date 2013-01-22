var Game = Class.extend({
	init : function(gameObjManager) {
        this.GameObjManager = gameObjManager;
	},
	SetupCanvas : function() {
        var gameObjManager = this.GameObjManager;
		var w = gameObjManager.WindowWidth - 30;
		var h = gameObjManager.WindowHeight - 35;

		var canvasString = '<canvas id="game-field" width="' + w + '" height="' + h + '"></canvas>';

		$('#gameHolder').empty();
		$(canvasString).appendTo('#gameHolder');
        
		var context = $('#game-field').get(0).getContext('2d');
		context.fillStyle = "rgb(0,0,0)";
		this.canvasWidth = w;
		this.canvasHeight = h;
		this.canvasMiddle = w / 2;
        this.canvasVMiddle = h / 2;
		
		this.DestroyCanvas(context);
        
        // Draw Index Buttons
        gameObjManager.DrawIndexButtons(context, this.canvasMiddle, this.canvasVMiddle);
        
        // Save Context Object
        this.context = context;
	},
    DestroyCanvas: function(context){
        context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    },
    NewGame: function(){
        var context = this.context;
        this.DestroyCanvas(context);
        
        // Show Level Select
    }
});
