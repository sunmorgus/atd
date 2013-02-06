<!DOCTYPE html>
<html>
	<head>
		<title>Acquire the Doctor</title>
		<!--<meta name="viewport" content="width=device-width, initial-scale=1">-->
        <meta charset="UTF-8">
		<link rel="stylesheet" href="css/jquery.mobile-1.2.0.min.css" />

		<!-- custom css -->
		<link rel="stylesheet" href="css/atd.css" />

		<script src="js/jQuery/jquery-1.8.2.min.js"></script>
        
		<!-- custom js -->
        <? if(!isset($_GET['debug'])){ ?>
		<script src="js/Utility/GUID.js"></script>
		<script src="js/Utility/class.js"></script>
		<script src="js/Utility/JSON2.js"></script>
        <script src="js/Objects/GameObj.min.js"></script>
        <script src="js/Objects/Enemy.min.js"></script>
        <script src="js/Objects/PowerUp.min.js"></script>
        <script src="js/Levels.min.js"></script>
		<script src="js/Buttons.min.js"></script>
		<script src="js/GameObjManager.min.js"></script>
		<script src="js/Game.min.js"></script>
		<script src="js/Index.min.js"></script>
        <? } else { ?>
    	<script src="js/Utility/GUID.js"></script>
		<script src="js/Utility/class.js"></script>
		<script src="js/Utility/JSON2.js"></script>
        <script src="js/Objects/GameObj.js"></script>
        <script src="js/Objects/Enemy.js"></script>
        <script src="js/Objects/PowerUp.js"></script>
        <script src="js/Levels.js"></script>
		<script src="js/Buttons.js"></script>
		<script src="js/GameObjManager.js"></script>
		<script src="js/Game.js"></script>
		<script src="js/Index.js"></script>
        <? } ?>
	</head>
	<body>
        <div id="audio-items">
			<audio id="audio-theme" preload="auto" loop="loop">
				<source src="audio/doctor.mp3" type="audio/mp3">
				<source src="audio/doctor.wav" type="audio/wav">
			</audio>
        </div>
        <div id="imageLoader" style="display: none;">
            <!-- Buttons -->
            <img src="images/title.png" />
            <img src="images/buttons/home.png" />
            <img src="images/buttons/lock.png" />
            <img src="images/buttons/music_off.png" />
            <img src="images/buttons/music_on.png" />
            <!-- Sprites -->
            <img src="images/sprites/player2.png" />
            <img src="images/sprites/player_invert.png" />
            <img src="images/sprites/enemies/gold.png" />
            <img src="images/sprites/enemies/gold_invert.png" />
            <img src="images/sprites/powerups/ss.png" />
            <!-- Backgrounds -->
            <img src="images/bg.jpg" />
            <img src="images/backgrounds/gameBg0.png" />
            <img src="images/backgrounds/gameBg1.png" />
            <img src="images/backgrounds/gameBg2.png" />
        </div>
        <div id="nameInput" style="position: fixed; display: none; width: 300px;">
			<label for="name" style="font: 1.5em monospace; color: white;">Enter your Name:</label>
			<input id="name" class="ui-input-text ui-body-d ui-corner-all ui-shadow-inset" name="name" type="text" />
			<span style="font: 1.5em monospace; color: white;">or Select a Name Below:</span>
		</div>
        <div id="loader" style="width: 400; margin-left: auto; margin-right: auto; text-align: center">
            <img src="images/loading.gif" />
            <br />
            <h2>Loading...</h2>
        </div>
		<div id="gameHolder"></div>
	</body>
</html>