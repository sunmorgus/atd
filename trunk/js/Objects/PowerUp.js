var PowerUp = GameObj.extend({
    init: function(type){
        this.ObjType = "powerup";
        switch(type){
            case "health":
                this.id = GUID();
                this.health = 10;
                this.imgSrc = "images/sprites/powerups/ss.png";
                this.width = 75;
                this.height = 75;
                break;
            case "tardis":
                this.id = GUID();
                this.imgSrc = "images/sprites/tardis.png";
                this.width = 135;
                this.height = 282;
                break;
        }
    }
});