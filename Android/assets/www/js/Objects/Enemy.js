var Enemy = GameObj.extend({
    init: function(type){
        this.ObjType = "enemy";
        switch(type){
            case "gold":
                this.health = 50;
                this.damage = 10;
                this.frequency = 1;
                this.shotspeed = 25;
                this.imgSrc = "images/sprites/enemies/gold.png";
                this.imgSrcInvert = "images/sprites/enemies/gold_invert.png";
                break;
            case "army":
                break;
            case "white":
                break;
            case "orange":
                break;
            case "blue":
                break;
            case "yellow":
                break;
        }
        this.width = 125;
        this.height = 150;
        this.hit = false;
        this.hitCount = 0;
        this.fighting = false;
    }
});
var Boss = GameObj.extend({
    init: function(type){
        this.ObjType = "boss";
        switch(type){
            case "dalek-supreme":
                this.health = 150;
                this.damage = 20;
                this.frequency = 1;
                this.shotspeed = 35;
                this.imgSrc = "images/sprites/enemies/dalek-supreme.png";
                this.imgSrcInvert = "images/sprites/enemies/dalek-supreme-invert.png";
                this.width = 150;
                this.height = 175;
                break;
        }
        this.hit = false;
        this.hitCount = 0;
        this.fighting = false;
        this.moveUp = true;
        this.moveDown = false;
    }
});