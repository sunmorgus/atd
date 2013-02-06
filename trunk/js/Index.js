var ATD = {};
ATD.CurrentGame = null;
ATD.MilleInterval = 1 / 30;
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
        $('#game-field').bind('click', function(e) {
            var currentGame = ATD.CurrentGame;
            var button = currentGame.ButtonClick(e.pageX, e.pageY);
            if (button !== false) {
                switch(button.id) {
                    case "start":
                        currentGame.DrawPlayerSelect();
                        break;
                    case "credits":
                        currentGame.DrawCredits();
                        break;
                    case "creditLink":
                        window.open(button.text, "_blank");
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
                        StartLevel(button.level, currentGame);
                        break;
                    case "lvlButton": //level buttons
                        if(button.locked === false){
                            ATD.Level = button.level.LevelNumber;
                            StartLevel(button.level, currentGame);
                        }
                        break;
                }
            }
        });
        $(document).keydown(function(e){
            e.preventDefault();
            switch(e.keyCode){
                case 17: //ctrl
                case 32:
                    ATD.CurrentGame.Shooting = true;
                    break;
                case 39:
                    ATD.CurrentGame.MoveLeft = true;
                    break;
                case 37:
                    ATD.CurrentGame.MoveRight = true;
                    break;
                case 38: //up
                    ATD.CurrentGame.MoveUp = true;
                    break;
                case 40:
                    ATD.CurrentGame.MoveDown = true;
                    break;
            }
        });
        $(document).keyup(function(e){
            e.preventDefault();
            switch(e.keyCode){
                case 17: //ctrl
                case 32:
                    //ATD.CurrentGame.Shoot();
                    ATD.CurrentGame.Shooting = false;
                    break;
                case 39:
                    ATD.CurrentGame.MoveLeft = false;
                    break;
                case 37:
                    ATD.CurrentGame.MoveRight = false;
                    break;
                case 38: //up
                    ATD.CurrentGame.MoveUp = false;
                    break;
                case 40:
                    ATD.CurrentGame.MoveDown = false;
                    break;
            }
        });
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

function StartLevel(level, currentGame){
    var gameObjManager = currentGame.GameObjManager;
    level.BuildLevel(gameObjManager.WindowWidth, gameObjManager.WindowHeight);
    if(level.LevelTiles.length > 0){
        currentGame.Backgrounds = gameObjManager.GetBackgrounds(level);
        currentGame.Enemies = gameObjManager.GetLevel(level);
        currentGame.PowerUps = gameObjManager.GetLevel(level);
        currentGame.DrawLevelStart(level);
        setTimeout(function(){
            ATD.MainLoopInterval = setInterval(function (){
                currentGame.DrawLevel(level);
            }.bind(this), ATD.MilleInterval);
        }.bind(this), 2000);
    } else {
        currentGame.DrawIndex();
    }
}

function supports_html5_storage() {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
}

//
//End Utility Functions
//