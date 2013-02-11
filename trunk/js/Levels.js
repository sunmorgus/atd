var Levels = Class.extend({
    init: function(lvl, windowHeight, windowWidth){
        this.LevelNumber = lvl;
        
        this.LevelTiles = [];
        this.TileTypes = ["empty", "empty", "empty", "empty", "enemy", "enemy", "enemy", "powerup"];
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
                this.Grayscale = false;
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
                this.Grayscale = false;
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
                this.Grayscale = false;
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
                this.Grayscale = false;
                this.BossLevel = false;
                
                this.LevelBackground0 = 'images/backgrounds/gameBg0.png';
                this.LevelBackground1 = 'images/backgrounds/gameBg1.png';
                this.LevelBackground2 = 'images/backgrounds/gameBg2.png';
                
                var enemyTypes = ["gold"];
                var powerUpTypes = ["health"];
                this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, false);
                break;
            case 5:
                this.LevelTitle = "Dalek Supreme!";
                this.Grayscale = false;
                this.BossLevel = true;
                
                this.LevelBackground0 = 'images/backgrounds/gameBg0.png';
                this.LevelBackground1 = 'images/backgrounds/gameBg1.png';
                this.LevelBackground2 = 'images/backgrounds/gameBg2.png';
                
                var enemyTypes = ["dalek-supreme"];
                var powerUpTypes = ["health"];
                
                levelWidth = 2382;
                tileCount = levelWidth / tileWidth;
                this.GetBossTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, false)
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
                    if(this.BossLevel === false){
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
    GetBossTiles: function(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, randomY){
        this.GetLevelTiles(windowWidth, tileWidth, tileCount, tileTypes, levelWidth, enemyTypes, powerUpTypes, windowHeight, randomY);
        var levelTiles = this.LevelTiles;
        var bossX = levelWidth - (tileWidth * 2);
        var bossY = this.GetRandomInt(25, windowHeight - 175);
        var tardisX = bossX + tileWidth;
        var bossPosition = {
            type: "boss",
            enemyType: enemyTypes[0],
            x: bossX,
            y: bossY
        };
        this.LevelTiles.push(bossPosition);
        var tardisPosition = {
            type: "powerup",
            powerUpType: "tardis",
            x: tardisX,
            y: windowHeight - 307
        };
        this.LevelTiles.push(tardisPosition);
    },
    GetRandomInt: function(min, max) {
        var rand = Math.floor(Math.random() * (max - min + 1)) + min;
        return rand;
    }
});