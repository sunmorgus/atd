var Levels = Class.extend({
    init: function(lvl, windowHeight, windowWidth){
        this.LevelNumber = lvl;
        
        this.LevelTiles = [];
        this.TileTypes = ["empty", "empty", "enemy", "enemy", "powerup"];
    },    
    BuildLevel: function(windowWidth, windowHeight){
        var lvl = this.LevelNumber;
        var levelWidth = lvl * 2382;
        var tileWidth = 200;
        var tileCount = levelWidth / tileWidth;
        var tileTypes = this.TileTypes;
        switch(lvl){
            case 1:
                this.LevelTitle = "The Dead Planet";
                this.Grayscale = true;
                this.BossLevel = false;
                
                this.LevelBackground0 = 'images/backgrounds/gameBg0.png';
                this.LevelBackground1 = 'images/backgrounds/gameBg1.png';
                this.LevelBackground2 = 'images/backgrounds/gameBg2.png';
                var enemyTypes = ["gold"];
                var powerUpTypes = ["health"];
                this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, false);
                break;
            case 2:
                this.LevelTitle = "The Survivors";
                this.Grayscale = true;
                this.BossLevel = false;
                
                this.LevelBackground0 = 'images/backgrounds/gameBg0.png';
                this.LevelBackground1 = 'images/backgrounds/gameBg1.png';
                this.LevelBackground2 = 'images/backgrounds/gameBg2.png';
                
                var enemyTypes = ["gold"];
                var powerUpTypes = ["health"];
                this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, false);
                break;
            case 3:
                this.LevelTitle = "The Escape";
                this.Grayscale = true;
                this.BossLevel = false;
                
                this.LevelBackground0 = 'images/backgrounds/gameBg0.png';
                this.LevelBackground1 = 'images/backgrounds/gameBg1.png';
                this.LevelBackground2 = 'images/backgrounds/gameBg2.png';
                
                var enemyTypes = ["gold"];
                var powerUpTypes = ["health"];
                this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, false);
                break;
            case 4:
                this.LevelTitle = "The Ambush";
                this.Grayscale = true;
                this.BossLevel = true;
                
                this.LevelBackground0 = 'images/backgrounds/gameBg0.png';
                this.LevelBackground1 = 'images/backgrounds/gameBg1.png';
                this.LevelBackground2 = 'images/backgrounds/gameBg2.png';
                
                var enemyTypes = ["gold"];
                var powerUpTypes = ["health"];
                this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, false);
        }
    },
    GetLevelTiles: function(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, randomY){
        var enemyX = windowWidth + tileWidth;
        var powerUpX = tileWidth;
        for(var i = 0; i < tileCount; i++){
            tileType = tileTypes[this.GetRandomInt(0, tileTypes.length - 1)];
            switch(tileType){
                case "empty":
                    this.LevelTiles.push(null);
                    break;
                case "enemy":
                    if(enemyX < (levelWidth - 200)){
                        var enemyPosition = {
                            type: tileType,
                            enemyType: enemyTypes[this.GetRandomInt(0, enemyTypes.length - 1)],
                            x: enemyX,
                            y: windowHeight - 175
                        };
                        this.LevelTiles.push(enemyPosition);
                    } else {
                        this.LevelTiles.push(null);
                    }
                    break;
                case "powerup":
                    if(powerUpX < (levelWidth - 200)){
                        var powerUpPosition = {
                            type: tileType,
                            powerUpType: powerUpTypes[this.GetRandomInt(0, powerUpTypes.length - 1)],
                            x: powerUpX,
                            y: this.GetRandomInt(25, windowHeight - 175)
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
    GetRandomInt: function(min, max) {
        var rand = Math.floor(Math.random() * (max - min + 1)) + min;
        return rand;
    }
});