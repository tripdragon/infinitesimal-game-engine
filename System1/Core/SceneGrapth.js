
import {Quark} from '../Primitives/Quark.js';

// BAAAASIC for now

export class SceneGrapth{
  
  system = null;
  
  constructor(system){
    this.system = system;
  }
  
  lv = 1;
  
  // this should be a "Group class"
  objects = [];
  actors = [];
  
  // borrowing this from unity
  layers = {
    main: [],
    colliders : [], // if it collides you can then deicde if it was just a trigger
    // triggers : []
  }
  
  // need to add compare istype etc
  add(thingy){
    if(thingy instanceof Quark){
      this.objects.push(thingy);
      if(!thingy.system){
        thingy.system = this.system;
      }
      if(thingy.canCollide){
        this.layers.colliders.push(thingy);
      }
    }
  }
  
  remove(thingy){
    if(thingy instanceof Quark){
      
      var index = this.objects.indexOf(thingy);
      if (index > -1) {
        this.objects.splice(index,1);
      }
      // colliders
      index = this.layers.colliders.indexOf(thingy);
      if (index > -1) {
        this.layers.colliders.splice(index,1);
      }
      
    }
  }
  
  // actors move around
  // addActor(thingy){
  //   if(thingy.isType === "Quark"){
  //     actors.push(thingy);
  //   }
  // }
  
}
