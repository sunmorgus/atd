ATD = {};
ATD.CurrentGame = null;
ATD.MilleInterval = 33;
ATD.MainLoopInterval = null;
ATD.Level = null;
//
//Page Events
//

$(window).load(function() {
    if(supports_html5_storage() === true){
        var currentGame = new Game();
        
        currentGame.DrawIndex();
        ATD.CurrentGame = currentGame;
    }
});
$('#game-field').live('tap', function(e) {
    var currentGame = ATD.CurrentGame;
	var button = currentGame.ButtonClick(e.pageX, e.pageY);
	if (button !== false) {
		switch(button.id) {
			case "start":
                currentGame.DrawPlayerSelect();
				break;
            case "submitName":
                var name = $('#name').val();
                if(name !== ''){
                    SubmitNameTap($('#name').val());
                }
                break;
            case "player":
                SubmitNameTap(button.name);
                break;
            case "music":
                currentGame.ToggleButton(button);
                break;
            case "home":
                clearInterval(ATD.MainLoopInterval);
                ATD.MainLoopInterval = null;
                currentGame.DrawIndex();
                break;
            case "nextLevel":
                currentGame.Backgrounds = currentGame.GameObjManager.GetBackgrounds(ATD.Level);
                currentGame.ScrollPosition = 500 * ATD.Level;
                ATD.MainLoopInterval = setInterval(function(){
                    currentGame.DrawLevel(ATD.Level);
                }.bind(this), ATD.MilleInterval);
                break;
            default: //level buttons
                if(button.locked === false){
                    ATD.Level = parseInt(button.id);
                    currentGame.Backgrounds = currentGame.GameObjManager.GetBackgrounds(ATD.Level);
                    currentGame.ScrollPosition = 500 * ATD.Level;
                    ATD.MainLoopInterval = setInterval(function (){
                        currentGame.DrawLevel(ATD.Level);
                    }.bind(this), ATD.MilleInterval);
                }
                break;
		}
	}
});
$(document).keydown(function(e){
    //console.log(e);
    switch(e.keyCode){
        case 17: //ctrl
            //ATD.CurrentGame.ShotCount += 1;
            break;
        case 39:
            ATD.CurrentGame.MoveLeft = true;
            break;
    }
});
$(document).keyup(function(e){
    switch(e.keyCode){
        case 17: //ctrl
            ATD.CurrentGame.Shoot();
            break;
        case 39:
            ATD.CurrentGame.MoveLeft = false;
            break;
    }
});
//
//End Page Events
//

//
//Utility Functions
//
function SubmitNameTap(name) {
	var gameObjManager = ATD.CurrentGame.GameObjManager;
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