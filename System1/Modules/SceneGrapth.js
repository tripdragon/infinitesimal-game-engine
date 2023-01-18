

// BAAAASIC for now

export class SceneGrapth{
  
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
    if(thingy.isType === "Quark"){
      this.objects.push(thingy);
      if(thingy.canCollide){
        this.layers.colliders.push(thingy);
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
