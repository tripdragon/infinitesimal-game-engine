










import { AABBTest } from "./collisions.js";




// use an array for out
// mutates array
export function testColliders(wobject, colliders, out){

log
  
  out = [];
  
  for (var i = 0; i < colliders.length; i++) {
console.log(colliders[i], "colliders");
    // var wasIn = AABBTest(wobject, colliders[i]);
    var wasIn = AABBTestScreenSpace(wobject, colliders[i]);
    if(wasIn){
      debugger
      out.push(colliders[i]);
    }
    
  }
  
  return out;
  
}




// 
// 
// 
// export function testColliders(wobject, colliders){
// 
//   // var system;
// 
//   // var colliders = system.colliders;
//   for (var i = 0; i < colliders.length; i++) {
// 
//     var isInMuch = false;
// 
//     var pick = colliders[i];
// 
//     // cheap for now dont test player collide
//     // if(wall === actor){
//     //   continue;
//     // }
//     // exit loop if its a player or robot
// 
//     // if(pick.subType === "actor" || pick.subType === "bot"){
//     //   continue;
//     // }
// 
//     // do a moving and generative effect
//     // if(wall.shiftLeft){
//     //   wall.x += wall.shiftLeft * 0.05;
//     //   if (wall.x > window.innerWidth){
//     //     wall.x = -wall.width;
//     //         wall.shiftLeft = randomBetween(1,100);
//     //   }
//     // }
// 
//     isInMuch = AABBTest(actor, pick);
//     // 
//     // if(isInMuch){
//     //   // console.log("innnn?");
//     //   if(pick.subType !== "actor"){
//     // 
//     //     pick.color = {r:0,g:0,b:1,a:1};
//     //   }
//     //   pick.onCollide();
//     // }
//     // else {
//     //   if(pick.subType !== "actor"){
//     // 
//     //     pick.color = {r:0,g:0.5,b:0,a:1};
//     // 
//     //   }
//     //   // console.log("ouuuut???");
//     // }
// 
// 
//     // if(wasIn == false && isInMuch == true){
//     //   wasIn = true;
//     //   actor.useGravity = false;
//     // }
// 
//   } // colliders loop
// 
//   // 
//   // if(isINnnn){
//   //   actor.x = previousPos.x;
//   //   actor.y = previousPos.y;
//   // }
//   // else {
//   //   previousPos.x = actor.x;
//   //   previousPos.y = actor.y;
//   // }
//   // 
// 
//   // if(wasIn){
//   //   actor.x = actor.mPos.x;
//   //   actor.y = actor.mPos.y;
//   // }
//   // else {
//   //   actor.mPos.x = actor.x;
//   //   actor.mPos.y = actor.y;
//   // }
//   // 
// 
// 
// }
