ATD = {};
ATD.currentGame = null;

//
//Page Events
//
$(document).ready(function(){
	var game = new Game();
    game.SetupCanvas();
    
    ATD.currentGame = game;
});
//
//End Page Events
//
