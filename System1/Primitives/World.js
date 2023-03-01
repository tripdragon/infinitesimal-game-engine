



// holds all the things
// unless there are universes at some point

// import {Layers} from './Layers.js';
// import {Vector3} from '../Modules/Vector3.js';
// import {Box3} from '../Modules/Box3.js';
// import {Matrix4} from '../Modules/GL-Matrix.js';
import {Quark} from './Quark.js';
import {Plane} from './Plane.js';


export class World extends Quark {
// export class World extends Plane {

  subType = "world";
  canCollide = false;
  
  constructor(system) {
    // name, x, y, width, height, depth, color = {r:1.0, g:1.0, b:1.0, a:1.0}, system) {
    super("world", 0, 0, 0, 0, 0, 0, {r:1.0, g:1.0, b:1.0, a:1.0}, system);
    this.canCollide = false;
  }
  
  draw(){
    
  }

}
