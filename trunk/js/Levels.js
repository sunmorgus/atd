var Levels = Class.extend({
    init: function(lvl, windowHeight){
        this.LevelNumber = lvl;
        this.LevelWidth = lvl * 2382;
        
        this.EnemyPositions = [];
        this.PowerUpPositions = [];
        
        this.AddEnemies(lvl, windowHeight);
        this.AddPowerUps(lvl, windowHeight);
    },
    
    AddEnemies: function(lvl, windowHeight){
        switch(lvl){
            case 1:
                this.LevelTitle = "The Dead Planet";
                this.Grayscale = true;
                this.BossLevel = false;
                
                this.LevelBackground0 = 'images/backgrounds/gameBg0.png';
                this.LevelBackground1 = 'images/backgrounds/gameBg1.png';
                this.LevelBackground2 = 'images/backgrounds/gameBg2.png';
                //Other options could be
                //this.LevelTheme
                
                var enemyPosition = {
                    type: 'gold',
                    x: this.LevelWidth / 2,
                    y: windowHeight - 175
                };
                
                this.EnemyPositions.push(enemyPosition);
                
                enemyPosition = {
                    type: 'gold',
                    x: this.LevelWidth - 200,
                    y: windowHeight - 175
                }
                
                this.EnemyPositions.push(enemyPosition);
        }
    },
    AddPowerUps: function(lvl, windowHeight){
        this.PowerUpPositions = [];
    }
});