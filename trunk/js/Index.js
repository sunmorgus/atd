ATD = {};
ATD.GameObjManager = null;
//
//Page Events
//
$(document).ready(function() {
	var gameObjManager = new GameObjManager();

	if (gameObjManager.WindowWidth < gameObjManager.WindowHeight) {
		$.mobile.changePage("#orientation", {
			transition : "pop",
			role : "dialog",
			reverse : false
		});
	} else {
		gameObjManager.CurrentGame.SetupCanvas();
		ATD.GameObjManager = gameObjManager;
	}
});
$('#game-field').live('tap', function(e) {
	var button = ATD.GameObjManager.ButtonClick(e.clientX, e.clientY);
	if (button !== false) {
		switch(button.id) {
			case "newGame":
				$.mobile.changePage("#login", {
					transition : "pop",
					role : "dialog",
					reverse : false
				});
				break;
		}
	}
});
$('#submitName').live('tap', function(e) {
	StopDefaults(e);
	var name = $('#name').val();
	if (name !== "") {
		SubmitNameTap($('#name').val());
	}
});
$('#login').live('pageshow', function(e, data) {
	$('#nameList').html('');
	$('#name').val('');
	$('#name').focus();
	if (supports_html5_storage() === false) {
		$('#error').html('Local Storage not Supported');
		//$.mobile.changePage($('#home'));
	} else {
		var players = ATD.GameObjManager.Players;
		var len = players.length;
		if (len > 0) {
			for (var i = 0; i < len; i++) {
				var player = players[i];
				$('#nameList').append('<li><a onclick="SubmitNameTap(\'' + player.name + '\')">' + player.name + '</a></li>');
			}

			$('#nameList').listview('refresh');
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
	gameObjManager.GetPlayer(name);
	console.log(gameObjManager.CurrentPlayer);
	$.mobile.changePage($('#main'));
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