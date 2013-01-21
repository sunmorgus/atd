var Game = Class.extend({
	init : function() {
	},
	SetupCanvas : function() {
		var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;

		var w = windowWidth - 30;
		var h = windowHeight - 180;

		var canvasString = '<canvas id="game-field" width="' + w + '" height="' + h + '"></canvas>';

		$('#gameHolder').empty();
		$(canvasString).appendTo('#gameHolder');

		this.context = $('#game-field').get(0).getContext('2d');
		this.context.fillStyle = "rgb(255,255,255)";
		this.canvasWidth = w;
		this.canvasHeight = h;
		this.canvasMiddle = w / 2;
		
		this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
	}
});
