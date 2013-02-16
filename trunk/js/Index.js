var ATD = {};
ATD.CurrentGame = null;
ATD.MilleInterval = 1 / 30;
ATD.MainLoopInterval = null;
ATD.Level = null;
ATD.Fading = false;
//
//Page Events
//

$(window).load(function() {
    if(supports_html5_storage() === true){
        var currentGame = new Game();
        
        currentGame.DrawIndex();
        ATD.CurrentGame = currentGame;
        $('#gameHolder').bind('click', function(e) {
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
                        if(ATD.Fading === false){
                            clearInterval(ATD.MainLoopInterval);
                            ATD.MainLoopInterval = null;
                            currentGame.DrawIndex();
                        }
                        break;
                    case "nextLevel":
                        if(ATD.Fading === false){
                            if(currentGame.GameObjManager.CurrentPlayer.health > 0){
                                currentGame.GameObjManager.SavePlayer(currentGame.GameObjManager.CurrentPlayer);
                                currentGame.FadeTardis(currentGame, currentGame.GameObjManager);
                                setTimeout(function(){
                                    StartLevel(button.level, currentGame);
                                }.bind(this), 5500);
                            } else {
                                currentGame.GameObjManager.CurrentPlayer.health = 200;
                                currentGame.GameObjManager.SavePlayer(currentGame.GameObjManager.CurrentPlayer);
                                StartLevel(button.level, currentGame);
                            }
                        }
                        break;
                    case "lvlButton": //level buttons
                        if(button.locked === false){
                            ATD.Level = button.level.LevelNumber;
                            StartLevel(button.level, currentGame);
                        }
                        break;
                    case "rsOk":
                        currentGame.DrawLevelSelect();
                }
            }
        });
        $(document).keydown(function(e){
            switch(e.keyCode){
                case 17: //ctrl
                case 32:
                    e.preventDefault();
                    ATD.CurrentGame.Shooting = true;
                    break;
                case 39:
                    e.preventDefault();
                    ATD.CurrentGame.MoveLeft = true;
                    break;
                case 37:
                    e.preventDefault();
                    ATD.CurrentGame.MoveRight = true;
                    break;
                case 38: //up
                    e.preventDefault();
                    ATD.CurrentGame.MoveUp = true;
                    break;
                case 40:
                    e.preventDefault();
                    ATD.CurrentGame.MoveDown = true;
                    break;
            }
        });
        $(document).keyup(function(e){
            switch(e.keyCode){
                case 17: //ctrl
                case 32:
                    e.preventDefault();
                    ATD.CurrentGame.Shooting = false;
                    break;
                case 39:
                    e.preventDefault();
                    ATD.CurrentGame.MoveLeft = false;
                    break;
                case 37:
                    e.preventDefault();
                    ATD.CurrentGame.MoveRight = false;
                    break;
                case 38: //up
                    e.preventDefault();
                    ATD.CurrentGame.MoveUp = false;
                    break;
                case 40:
                    e.preventDefault();
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
    var score = gameObjManager.CurrentPlayer.score;
    if(level.LevelTiles.length > 1 && score >= level.RequiredScore){
        currentGame.Backgrounds = gameObjManager.GetBackgrounds(level);
        currentGame.Enemies = gameObjManager.GetLevel(level);
        currentGame.PowerUps = gameObjManager.GetLevel(level);
        currentGame.DrawLevelStart(level);
        setTimeout(function(){
            ATD.MainLoopInterval = setInterval(function (){
                currentGame.DrawLevel(level);
            }.bind(this), ATD.MilleInterval);
        }.bind(this), 5500);
    } else {
        currentGame.DrawLevelSelect();
        if(score < level.RequiredScore){
            currentGame.DrawRequiredScore(level);
        }
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