


/*
function onPointerMove( event ) {

  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components
  
  // need for when camera is in 3d
  // pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  // pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  // pointer.x = ( event.clientX / window.innerWidth );
  // pointer.y = - ( event.clientY / window.innerHeight ) * -1;
  pointer.x = event.clientX ;
  pointer.y = event.clientY;
  // console.log(pointer);
}

window.addEventListener( 'pointermove', onPointerMove );
*/




//     window.addEventListener( 'pointermove', this.pointer.onPointerMove.bind(this.pointer), true );


// import { SceneGrapth } from "./SceneGrapth.js";

// import { loop as _loop } from "./loop.js";
// 

// import { Vector2 } from "../Modules/Vector2.js";
import { Vector3 } from "../Modules/Vector3.js";

import { Matrix4 } from "../Modules/GL-Matrix.js";


export class Pointer {
  
  system;
  
  client = new Vector3();
  worldCenter = new Vector3(); // cartesian
  
  // y starts from screen bottom
  // this would be screenscreenUV
  // as worldSpace is proper mouse to inverse of world
  // screenUV = new Vector3();
  screenUV = new Vector3();
  
  // this is not right, but for now we shall carry on
  // the screenUV looks good for picking, and this looks good for drawing
  // this handles the world being offset
  // screenUVOffset = new Vector3();
  worldSpace = new Vector3();
  // now we need world offset off
  worldSpaceSans = new Vector3();
  
  
  
  inverseMat = new Matrix4();
  
  constructor(system){
    this.system = system;
    window.mmmm = 0;
  }
  
  onPointerMove( event ) {
    // debugger
    // return
    // cartesian
    this.worldCenter.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.worldCenter.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    // screen y top mouse
    this.client.x = event.clientX;
    this.client.y = event.clientY;
    
    
    // y bottom in 3d space
    // this should become a matrix later
    // OR replace with a raycast
    // later need this
    // https://stackoverflow.com/questions/39905892/three-js-orthographic-camera-zoom-to-mouse-point
    // https://threejs.org/docs/#api/en/core/Raycaster
    // https://threejs.org/docs/?q=vect#api/en/math/Vector3.unproject
    // this.screenUV.x = this.client.x - this.system.world.position.x;
    // this.screenUV.y = this.system.gameHeight - this.client.y - this.system.world.position.y;

    this.screenUV.x = this.client.x;
    this.screenUV.y = this.system.gameHeight - this.client.y;
    

    // this.screenUV.y = this.system.gameHeight - this.client.y;
    
    
    
    this.worldSpace.x = this.client.x + -this.system.world.position.x;
    this.worldSpace.y = this.system.gameHeight - this.client.y + -this.system.world.position.y;
    
    // SAME as screenUV but better name
    this.worldSpaceSans.x = this.client.x;
    this.worldSpaceSans.y = this.system.gameHeight - this.client.y;
    
    
    
    
    // this.inverseMat.copy(this.system.world.worldMatrix).invert();
    // window.onConsole.log("inverseMat", this.inverseMat.getPosition());
    
    // window.onConsole.log("screenUVoffset", this.screenUV.clone().applyMatrix4(this.system.world.worldMatrix.clone().invert()).toArray());
    // window.onConsole.log("negate x", this.screenUV.x + -this.system.world.position.x );
    
    
    
    
    
    
    
    // this.screenUV.applyMatrix4(this.inverseMat);
    
    // 
    // this.screenUV.x -= this.system.world.position.x;
    // this.screenUV.y += -this.system.world.position.y;
    
    // not an apply matrix yet
    // this.screenUV.sub(this.system.world.position);
    // this.screenUV.y *= -1;
    
    // see decalaration notes
    // this.screenUVOffset.copy(this.screenUV);
    // 
    // this.screenUVOffset.x -= this.system.world.position.x;
    // this.screenUVOffset.y += -this.system.world.position.y;
    
    
    // only y needs the adjustment?!
    // this.screenUVWorldSpace.x = this.screenUV.x;
    // this.screenUVWorldSpace.y = this.screenUV.y + -this.system.world.position.y;


  }
  
}
