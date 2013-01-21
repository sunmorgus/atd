ATD = {};
ATD.currentGame = null;

//
//Page Events
//
$(document).ready(function(){
	ATD.currentGame = new Game();
	console.log(ATD.currentGame);
});
//
//End Page Events
//

//
//Button Events
//
$('#newGame').live('tap', function(e){
	var game = ATD.currentGame;
	if(game !== null){
		game.SetupCanvas();
	}
});
