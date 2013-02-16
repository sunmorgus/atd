#!/bin/bash

#Already Minned
#cat jQuery/jquery-1.8.2.min.js Utility/GUID.js Utility/class.js Utility/JSON2.js > atd.js

#My Scripts
cat Objects/GameObj.js >> atd.js
cat Objects/Enemy.js >> atd.js
cat Objects/PowerUp.js >> atd.js
cat Levels.js >> atd.js
cat Buttons.js >> atd.js
cat GameObjManager.js >> atd.js
cat Game.js >> atd.js
cat Index.js >> atd.js

minifyjs -v atd.js > atd.min.js
echo "done"