


// need a simple visaul grid and the logic
// also need to figure out the origin for rectangles and polygons

//
import { Game } from "../Core/Game.js";
import { Rectangle } from "../Primitives/Rectangle.js";
import { Plane } from "../Primitives/Plane.js";
import { Grid } from "../Modules/Grid.js";

// import { Quark } from "../Primitives/Quark.js";

export let disc = new Game("griddemo");

disc.load = function(){

  // changing the screen space mode for a platformer game
  this.system.screenSpaceMode = this.system.screenModes.screen;
  this.system.reboot();

  
  // we need a useable object center
  // and we dont have parenting yet
  // to display extra objects and they themselves are not center
  // so we use divs for now
  
  
  var gg = document.getElementById("gamespace");
  gg.innerHTML = "";
  // document.body.appendChild(controls);
  var gamestyles = document.getElementById("gamestyles");
  
  var griddivs = document.createElement('div');
  griddivs.id = "griddivs";
  griddivs.style.cssText = `
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 0;
  ___background: green;
  
  padding: 0;
  
  /* flex box */
  
  `;
  gg.appendChild(griddivs);
  
    // 
    // // this needs to be a webcompontent for the css to not get duplicated
    // // or we cram css into the dom since we can select the syle tag with an id!
  var item = document.createElement('div');
  item.classList.add("item");
  var radiusLike = 8;
  var itemstyle = `
  #griddivs .item {
    background: #444444;
    width: ${radiusLike}px;
    height: ${radiusLike}px;
    ___border : 1px white solid;
    border-radius: 100%;
  }
  `;
  gamestyles.innerHTML += itemstyle;
  // 
  // item.style.cssText = `
  // position: absolute;
  // left: -${radiusLike/2}px;
  // top: -${radiusLike/2}px;
  // `;
  // 
  // griddivs.appendChild(item);
  // 
  
  // var grid = {
  //   space : 40,
  //   rows : 20,
  //   columns : 40  
  // }
  var grid = new Grid(40,20,40, this.system);
  
  for (var ii = 0; ii < grid.rows; ii++) {
    for (var mm = 0; mm < grid.columns; mm++) {
      let item2 = item.cloneNode();
      var x = (-radiusLike/2) + (mm*grid.size);
      var y = (-radiusLike/2) + (ii*grid.size);
      item2.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      `;
      griddivs.appendChild(item2);
    }
  }

  
  // 
  // focus item
  var focusItem = document.createElement('div');
  focusItem.classList.add("item");
  var scalar = 10;
  var x = (-(radiusLike+scalar)/2) + (18*grid.size);
  var y = (-(radiusLike+scalar)/2) + (8*grid.size);
  focusItem.style.cssText = `
  background: white;
  opacity: 0.6;
  position: absolute;
  width: ${radiusLike+scalar}px;
  height: ${radiusLike+scalar}px;
  left: ${x}px;
  top: ${y}px;
  `;
  griddivs.appendChild(focusItem);
  


var _this = this;

// later need this
// https://stackoverflow.com/questions/39905892/three-js-orthographic-camera-zoom-to-mouse-point
// https://threejs.org/docs/#api/en/core/Raycaster
// https://threejs.org/docs/?q=vect#api/en/math/Vector3.unproject


// there should already be a mouse event
// oh we did not dumb this into a render hook
/// div griid test
function onPointerMove( event ) {

  // console.log(_this.system.pointer);
  // console.log("?");
  // pointer.x = event.clientX ;
  // pointer.y = event.clientY;
  // console.log(pointer);
  
  // we have to also calculate the center of the div
  // within these calculations
  
  // find snap
  // find the index of the mouse * space
  // can do this differently, as it snaps hard to the left top most
  // instead of compariing the half
  // var gx = Math.floor(_this.system.pointer.x / grid.size) * grid.size;
  // var gy = Math.floor(_this.system.pointer.y / grid.size) * grid.size;
  
  // more work but it snaps at the half with this stack
  // var ix = Math.floor(_this.system.pointer.x / grid.size);
  // var iy = Math.floor(_this.system.pointer.y / grid.size);
  // 
  // var minX = ix * grid.size;
  // var maxX = (ix+1) * grid.size;
  // 
  // var minY = iy * grid.size;
  // var maxY = (iy+1) * grid.size;
  // 
  // var xx = minX;
  // if (_this.system.pointer.x > minX + (grid.size/2) ) { xx = maxX };
  // var yy = minY;
  // if (_this.system.pointer.y > minY + (grid.size/2) ) { yy = maxY };
  // 
  // var gx = xx;
  // var gy = yy;
  // 
  
  
  
  // the _this.system.gameHeight - is to move the mouse point into y bottom space
  // HOWEVER this wont work with the world offset just yet
  // need to EITHER raycast and convert
  // OR and multyply by the worlds matrix
  
  grid.snap(_this.system.pointer.client.x, _this.system.pointer.client.y).screenTo3D();
  // console.log("screen", _this.system.pointer.screen);
  // console.log("3d", _this.system.pointer.world);
  
  // console.log("_this.system.pointer.y", _this.system.pointer.y);
  var gx = grid.position.x;
  // var gy = _this.system.gameHeight - grid.position.y;
  var gy = grid.position.y;
  
  // simpler left top hard snap
  // var gx = Math.floor(_this.system.pointer.x / grid.size) * grid.size;
  // var gy = Math.floor(_this.system.pointer.y / grid.size) * grid.size;
  // 
  
  // var fx = (-(radiusLike+scalar)/2) + (_this.system.pointer.x);
  // var fy = (-(radiusLike+scalar)/2) + (_this.system.pointer.y);
  
  // place and offset for the divs center
  var fx = (-(radiusLike+scalar)/2) + (gx);
  var fy = (-(radiusLike+scalar)/2) + (gy);
  
  
  focusItem.style.left = `${fx}px`;
  focusItem.style.top = `${fy}px`;
  
  // box1.x = fx;
  // box1.y = fy;
  
  // box2.x = gx;
  // box2.x = gx - _this.system.world.position.x;
  box2.x = grid.position3D.x;
  // box2.y = gy;
  box2.y = grid.position3D.y;
  // box2.y = _this.system.gameHeight - gy;
  // box2.y = (_this.system.gameHeight - gy) - _this.system.world.position.y;
  // console.log(gy);
  
  box3.x = gx + grid.size;
  // box3.y = _this.system.gameHeight - gy;
  // box3.y = gy;
  box3.y = grid.position3D.y;
  
}

window.addEventListener( 'pointermove', onPointerMove );



console.log("grid.size", grid.size);

// rectangle to debug with
var box1 = new Rectangle("box", 100, 100, grid.size, grid.size, {r:0.4,g:0.4,b:0.7,a:1}, this.system);
var box2 = new Plane("plane", 0, 0, 0, grid.size, grid.size, {r:0.4,g:0.4,b:0.7,a:1}, this.system);
var box3 = new Plane("plane", 0, 0, 0, grid.size, grid.size, {r:0.4,g:0.5,b:0.2,a:1}, this.system);
// debugger
// this.system.sceneGrapth.add(box1);
// this.system.sceneGrapth.add(box2);
// this.system.sceneGrapth.add(box3);
this.system.add(box1);
this.system.add(box2);
this.system.add(box3);
// debugger
window.box1 = box1;
window.box2 = box2;





};
