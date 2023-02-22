

//     window.addEventListener( 'pointermove', this.pointer.onPointerMove.bind(this.pointer), true );


// import { SceneGrapth } from "./SceneGrapth.js";

// import { loop as _loop } from "./loop.js";
// 

// import { Vector2 } from "../Modules/Vector2.js";
import { Vector3 } from "../Modules/Vector3.js";

// import { Matrix4 } from "../Modules/GL-Matrix.js";


export class Pointer {
  
  system;
  
  client = new Vector3();
  worldCenter = new Vector3(); // cartesian
  
  // y starts from screen bottom
  worldUV = new Vector3();
  
  constructor(system){
    this.system = system;
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
    this.worldUV.x = this.client.x - this.system.world.position.x;
    this.worldUV.y = this.system.gameHeight - this.client.y - this.system.world.position.x;

  }
  
}
