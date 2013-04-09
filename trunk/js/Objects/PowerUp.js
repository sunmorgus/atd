var PowerUp = GameObj.extend({
    init: function(type){
        this.ObjType = "powerup";
        switch(type){
            case "health":
                this.id = GUID();
                this.type = "health";
                this.health = 20;
                this.imgSrc = "images/sprites/powerups/ss.png";
                this.width = 75;
                this.height = 75;
                break;
            case "tardis":
                this.id = GUID();
                this.type = "tardis";
                this.imgSrc = "images/sprites/tardis.png";
                this.width = 135;
                this.height = 282;
                break;
            case "doctor_1":
                this.id = GUID();
                this.type = "doctor";
                this.imgSrc = "images/sprites/doctors/doctor_1.png";
                this.width = 48;
                this.height = 150;
                this.message = "Yes, there are very few of us left. Now let's get out of here, and be crafty! Come along!";
                this.speechTime = 4500;
                this.saved = false;
                break;
            case "doctor_2":
                this.id = GUID();
                this.type = "doctor";
                this.imgSrc = "images/sprites/doctors/doctor_2.png";
                this.width = 45;
                this.height = 150;
                this.message = "There are some corners of the universe which have bred the most terrible things. Things which act against everything we believe in. They must be fought. When I say run, run. ...RUN!";
                this.speechTime = 6000;
                this.saved = false;
                break;
        }
    }
});