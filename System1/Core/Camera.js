
// not used yet

import { Matrix4 } from "../Modules/GL-Matrix.js";

import { Quark } from "../Primitives/Quark.js";
import { Vector3 } from "../Modules/Vector3.js";




export class Camera extends Quark {
  
    // this could use some of that fancy {deconstructor} or ... new stuff
    constructor(name, x, y, width, height, color, system) {
      super(name, x, y, width, height, color, system);
    }
    
  }
