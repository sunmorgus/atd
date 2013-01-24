ATD = {};
ATD.GameObjManager = null;
ATD.CurrentGame = null;
//
//Page Events
//
$(document).ready(function() {
	var gameObjManager = new GameObjManager();
    var currentGame = new Game(gameObjManager);

	if (gameObjManager.WindowWidth < gameObjManager.WindowHeight) {
		$.mobile.changePage("#orientation", {
			transition : "pop",
			role : "dialog",
			reverse : false
		});
	} else {
		currentGame.DrawIndex();
		ATD.GameObjManager = gameObjManager;
        ATD.CurrentGame = currentGame;
	}
});
$('#game-field').live('tap', function(e) {
    var currentGame = ATD.CurrentGame;
    var gameObjManager = ATD.GameObjManager;
	var button = currentGame.ButtonClick(e.pageX, e.pageY);
	if (button !== false) {
		switch(button.id) {
			case "newGame":
                currentGame.DrawPlayerSelect();
				break;
            case "submitName":
                var name = $('#name').val();
                if(name !== ''){
                    SubmitNameTap($('#name').val());
                }
                break;
            case "player":
                SubmitNameTap(button.text);
                break;
            case "music":
                currentGame.ToggleButton(button);
                break;
            case "home":
                currentGame.DrawIndex();
                break;
		}
	}
});
//
//End Page Events
//

//
//Utility Functions
//
function SubmitNameTap(name) {
	var gameObjManager = ATD.GameObjManager;
	var player = gameObjManager.GetPlayer(name);
    ATD.CurrentGame.DrawLevelSelect();
}

function supports_html5_storage() {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
}

function StopDefaults(e) {
	e.stopImmediatePropagation();
	e.preventDefault();
}

//
//End Utility Functions
//