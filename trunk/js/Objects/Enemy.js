var Enemy = GameObj.extend({
    init: function(type){
        this.ObjType = "enemy";
        switch(type){
            case "gold":
                this.health = 50;
                this.startHealth = 50;
                this.damage = 5;
                this.frequency = 1;
                this.shotspeed = 25;
                this.imgSrc = "images/sprites/enemies/gold.png";
                this.imgSrcInvert = "images/sprites/enemies/gold_invert.png";
                this.imgSrcRight = "images/sprites/enemies/gold-right.png";
                this.imgSrcInvertRight = "images/sprites/enemies/gold-right_invert.png";
                break;
            case "green":
                this.health = 80;
                this.startHealth = 80;
                this.damage = 6;
                this.frequency = 1;
                this.shotspeed = 25;
                this.imgSrc = "images/sprites/enemies/green.png";
                this.imgSrcInvert = "images/sprites/enemies/green_invert.png";
                this.imgSrcRight = "images/sprites/enemies/green-right.png";
                this.imgSrcInvertRight = "images/sprites/enemies/green-right_invert.png";
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
        this.height = 140;
        this.hit = false;
        this.hitCount = 0;
        this.fighting = false;
        this.shots = [];
        this.dir = 'left';
    }
});
var Boss = GameObj.extend({
    init: function(type){
        this.ObjType = "boss";
        switch(type){
            case "dalek-supreme":
                this.health = 150;
                this.startHealth = 150;
                this.damage = 20;
                this.frequency = 2;
                this.shotspeed = 35;
                this.imgSrc = "images/sprites/enemies/dalek-supreme.png";
                this.imgSrcInvert = "images/sprites/enemies/dalek-supreme-invert.png";
                this.width = 150;
                this.height = 175;
                break;
            case "dalek-sec":
                this.health = 160;
                this.startHealth = 160;
                this.damage = 30;
                this.frequency = 3;
                this.shotspeed = 40;
                this.imgSrc = "images/sprites/enemies/dalek-sec.png";
                this.imgSrcInvert = "images/sprites/enemies/dalek-sec-invert.png";
                this.width = 160;
                this.height = 175;
                break;
        }
        this.hit = false;
        this.hitCount = 0;
        this.fighting = false;
        this.moveUp = true;
        this.moveDown = false;
        this.shots = [];
    }
});