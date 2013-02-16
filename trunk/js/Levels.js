var Levels = Class.extend({
    init: function(lvl, windowHeight, windowWidth){
        this.LevelNumber = lvl;
        
        this.LevelTiles = [];
        this.TileTypes = ["empty", "empty", "empty", "enemy", "enemy", "enemy", "powerup", "powerup"];
    },    
    BuildLevel: function(windowWidth, windowHeight){
        var lvl = this.LevelNumber;
        var levelWidth = 2382;
        var tileWidth = 200;
        var tileCount = levelWidth / tileWidth;
        var tileTypes = this.TileTypes;
        
        switch(lvl){
            case 1:
                this.LevelTitle = "The Dead Planet";
                this.Grayscale = false;
                this.BossLevel = false;
                this.RequiredScore = 0;
                
                this.LevelBackground0 = 'images/backgrounds/Part01Bg0.png';
                this.LevelBackground1 = 'images/backgrounds/Part01Bg1.png';
                this.LevelBackground2 = 'images/backgrounds/Part01Bg2.png';
                
                var enemyTypes = ["gold"];
                var powerUpTypes = ["health"];
                this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, false);
                break;
            case 2:
                this.LevelTitle = "The Survivors";
                this.Grayscale = false;
                this.BossLevel = false;
                this.RequiredScore = 200;
                
                this.LevelBackground0 = 'images/backgrounds/Part01Bg0.png';
                this.LevelBackground1 = 'images/backgrounds/Part01Bg1.png';
                this.LevelBackground2 = 'images/backgrounds/Part01Bg2.png';
                
                var enemyTypes = ["gold"];
                var powerUpTypes = ["health"];
                this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, false);
                break;
            case 3:
                this.LevelTitle = "The Escape";
                this.Grayscale = false;
                this.BossLevel = false;
                this.RequiredScore = 400;
                
                this.LevelBackground0 = 'images/backgrounds/Part01Bg0.png';
                this.LevelBackground1 = 'images/backgrounds/Part01Bg1.png';
                this.LevelBackground2 = 'images/backgrounds/Part01Bg2.png';
                
                var enemyTypes = ["gold"];
                var powerUpTypes = ["health"];
                this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, false);
                break;
            case 4:
                this.LevelTitle = "The Ambush";
                this.Grayscale = false;
                this.BossLevel = false;
                this.RequiredScore = 600;
                
                this.LevelBackground0 = 'images/backgrounds/Part01Bg0.png';
                this.LevelBackground1 = 'images/backgrounds/Part01Bg1.png';
                this.LevelBackground2 = 'images/backgrounds/Part01Bg2.png';
                
                var enemyTypes = ["gold"];
                var powerUpTypes = ["health"];
                this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, false);
                break;
            case 5:
                this.LevelTitle = "Dalek Supreme!";
                this.Grayscale = false;
                this.BossLevel = true;
                this.RequiredScore = 800;
                
                this.LevelBackground0 = 'images/backgrounds/Part01Bg0.png';
                this.LevelBackground1 = 'images/backgrounds/Part01Bg1.png';
                this.LevelBackground2 = 'images/backgrounds/Part01Bg2.png';
                
                var enemyTypes = ["dalek-supreme"];
                var powerUpTypes = ["health"];
                
                tileCount = levelWidth / tileWidth;
                this.GetBossTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, false);
                break;
            case 6:
                levelWidth *= 1.5;
                this.LevelTitle = "The Power of the Daleks";
                this.Grayscale = false;
                this.BossLevel = false;
                this.RequiredScore = 1000;
                
                this.LevelBackground0 = 'images/backgrounds/Part02Bg0.png';
                this.LevelBackground1 = 'images/backgrounds/Part02Bg2.png';
                this.LevelBackground2 = 'images/backgrounds/Part02Bg3.png';
                //this.LevelBackground3 = 'images/backgrounds/Part02Bg3.png';
                
                var enemyTypes = ["gold", "green"];
                var powerUpTypes = ["health"];
                this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, true);
                break;
            case 7:
                levelWidth *= 1.5;
                this.LevelTitle = "The Evil of the Daleks";
                this.Grayscale = false;
                this.BossLevel = false;
                this.RequiredScore = 1200;
                
                this.LevelBackground0 = 'images/backgrounds/Part02Bg0.png';
                this.LevelBackground1 = 'images/backgrounds/Part02Bg2.png';
                this.LevelBackground2 = 'images/backgrounds/Part02Bg3.png';
                //this.LevelBackground3 = 'images/backgrounds/Part02Bg3.png';
                
                var enemyTypes = ["gold", "green"];
                var powerUpTypes = ["health"];
                this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, true);
                break;
            case 8:
                levelWidth *= 1.5;
                this.LevelTitle = "The Wheel in Space";
                this.Grayscale = false;
                this.BossLevel = false;
                this.RequiredScore = 1400;
                
                this.LevelBackground0 = 'images/backgrounds/Part02Bg0.png';
                this.LevelBackground1 = 'images/backgrounds/Part02Bg2.png';
                this.LevelBackground2 = 'images/backgrounds/Part02Bg3.png';
                //this.LevelBackground3 = 'images/backgrounds/Part02Bg3.png';
                
                var enemyTypes = ["gold", "green"];
                var powerUpTypes = ["health"];
                this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, true);
                break;
        }
        
        var tardisPosition = {
            type: "powerup",
            powerUpType: "tardis",
            x: levelWidth,
            y: windowHeight - 282
        };
        
        this.LevelTiles.push(tardisPosition);
        this.LevelWidth = levelWidth;
    },
    GetLevelTiles: function(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, randomY){
        var enemyX = (windowWidth + tileWidth) - 600;
        var powerUpX = tileWidth;
        for(var i = 0; i < tileCount; i++){
            tileType = tileTypes[this.GetRandomInt(0, tileTypes.length - 1)];
            switch(tileType){
                case "empty":
                    this.LevelTiles.push(null);
                    break;
                case "enemy":
                    if(this.BossLevel === false){
                        var enemyY = randomY === true ? this.GetRandomInt(25, windowHeight - 140) : windowHeight - 140;
                        if(enemyX < (levelWidth - 200)){
                            var enemyPosition = {
                                type: tileType,
                                enemyType: enemyTypes[this.GetRandomInt(0, enemyTypes.length - 1)],
                                x: enemyX,
                                y: enemyY
                            };
                            this.LevelTiles.push(enemyPosition);
                        } else {
                            this.LevelTiles.push(null);
                        }
                    }
                    break;
                case "powerup":
                    if(powerUpX < (levelWidth - 200)){
                        var powerUpPosition = {
                            type: tileType,
                            powerUpType: powerUpTypes[this.GetRandomInt(0, powerUpTypes.length - 1)],
                            x: powerUpX,
                            y: this.GetRandomInt(25, windowHeight - 150)
                        };
                        this.LevelTiles.push(powerUpPosition);
                    } else {
                        this.LevelTiles.push(null);
                    }
                    break;
            }
            enemyX += tileWidth;
            powerUpX += tileWidth;
        }
    },
    GetBossTiles: function(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, randomY){
        this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, randomY);
        var levelTiles = this.LevelTiles;
        var bossX = levelWidth - (tileWidth * 2);
        var bossY = this.GetRandomInt(25, windowHeight - 175);
        var bossPosition = {
            type: "boss",
            enemyType: enemyTypes[0],
            x: bossX,
            y: bossY
        };
        var doctorPosition = {
            type: "doctor",
            powerUpType: "doctor_1",
            x: levelWidth - 200,
            y: windowHeight - 150
        };
        this.LevelTiles.push(bossPosition);
        this.LevelTiles.push(doctorPosition);
    },
    GetRandomInt: function(min, max) {
        var rand = Math.floor(Math.random() * (max - min + 1)) + min;
        return rand;
    }
});