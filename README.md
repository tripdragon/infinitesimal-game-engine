
# infinitesimal-game-engine
chibi quarky
chiuarky

web
https://tripdragon.github.io/infinitesimal-game-engine/

local
```
python3 -m http.server 8001
```

## Things to do like

* ~~webgl view~~
* drag input
* button to make an object
* edit ui viewy
* food
* ~~compile to something~~ We do it live!!
* ~~loopy loop~~
* increase loopy loop
* script based animations from text box

### features
* webgl view!
* text box typing!
* listener poking system!
* lv 1 scripting animations!
* UTZ UTZ UTZ
* AABB box hit collisions
* Keyboard audio sound board
* player movement 2d
* 2d view
* some 3d view
* loop system, for animations and collisions
* live game swapping without reloading
* direct url game loading



## dev derps
so the idea is everything has a lv:n attribute, and the whole box is System1
if something gets a significant upgrade lv:2+ versioning is changed. Nothing complex just a stupid way to track the complexity of the file as it progresses at the start of reading

IF a System2 comes, we freeze everything into the folder and start on a new copy.
This way games have compatibility with previous


### Making a game
Right now the basics are. Copy a game from /System1/Discs/...
Rename the game in the Game("n") function
In /System1/index.html
add a copy of the path with ```import { disc as mousetest } from  "./Discs/mousetest.js";```
add game to catalog ```APPPP.addGameToCatalog(mousetest);```
you can swap out a default game with ```APPPP.insertDisc(superjumpybocky);```
or you can directly load the game in the url with ```?game=name```
```http://localhost:8001/System1/index.html?game=soundboard```

### animation
Animation can be had via the main loop hook
```this.system.loopHookPoints.beforeDraw = function(){```
time functions are not yet fully in so just do deltatime with
```mTime = Date.now(); and Date.now() - mTime; mTime = Date.now();```
