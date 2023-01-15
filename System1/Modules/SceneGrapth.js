

// BAAAASIC for now

export class SceneGrapth{
  
  lv = 1;
  
  // this should be a "Group class"
  objects = [];
  actors = [];
  
  // need to add compare istype etc
  add(thingy){
    if(thingy.isType === "Quark"){
      this.objects.push(thingy);
    }
  }
  
  // actors move around
  // addActor(thingy){
  //   if(thingy.isType === "Quark"){
  //     actors.push(thingy);
  //   }
  // }
  
}
