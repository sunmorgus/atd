var ATD = {};
ATD.CurrentGame = null;
ATD.MilleInterval = 1 / 30;
ATD.MainLoopInterval = null;
ATD.Level = null;
//
//Page Events
//

function deviceIsReady () {
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
            } else {
            	if(ATD.CurrentGame.GameObjManager.Group === "level"){
	            	ATD.CurrentGame.Shooting = true;
	            	setTimeout(function(){
	            		ATD.CurrentGame.Shooting = false;
	            	}, 1000);
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
                    //ATD.CurrentGame.Shoot();
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
}
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
            	currentGame.MoveLeft = true;
                currentGame.DrawLevel(level);
            }, ATD.MilleInterval);
        }, 2000);
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

jQuery.fn.mousehold = function(timeout, f) {
	if (timeout && typeof timeout == 'function') {
		f = timeout;
		timeout = 100;
	}
	if (f && typeof f == 'function') {
		var timer = 0;
		var fireStep = 0;
		return this.each(function() {
			jQuery(this).mousedown(function() {
				fireStep = 1;
				var ctr = 0;
				var t = this;
				timer = setInterval(function() {
					ctr++;
					f.call(t, ctr);
					fireStep = 2;
				}, timeout);
			})

			clearMousehold = function() {
				clearInterval(timer);
				if (fireStep == 1) f.call(this, 1);
				fireStep = 0;
			}
			
			jQuery(this).mouseout(clearMousehold);
			jQuery(this).mouseup(clearMousehold);
		})
	}
}

//
//End Utility Functions
//