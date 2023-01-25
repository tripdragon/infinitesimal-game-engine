




// temp for now place to hit test
// y is flipped in screenspace
// grrrrrr
export function AABBTestScreenSpace(object1, object2){
  
  var isINnnn = false;

  // winner function! from internets :<
  if(object1.min.x < object2.max.x &&
    object1.max.x > object2.min.x &&
    -object1.min.y < -object2.max.y &&
    -object1.max.y > -object2.min.y)
  {
      isINnnn = true;
  }
  
  return isINnnn;
  
}


// y is not flipped
export function AABBTest3D(object1, object2){
  
  var isINnnn = false;

  // winner function! from internets boo
  if(object1.min.x < object2.max.x &&
    object1.max.x > object2.min.x &&
    -object1.min.y < object2.max.y &&
    -object1.max.y > object2.min.y)
  {
      isINnnn = true;
  }
  
  return isINnnn;
  
} 


// temp for now place to hit test
export function AABBTest(object1, object2){
  
  var isINnnn = false;
  
  // this only works for left, top rectangles
  // of which should have its own min max
  // so they can expand themselves
  var p_minX = object1.x; // if top left is origin
  var p_maxX = object1.width + object1.x;
  var p_minY = object1.y; // if top lft is origin
  var p_maxY = object1.height + object1.y;
  
  var w_minX = object2.x; // if top left is origin
  var w_maxX = object2.width + object2.x;
  var w_minY = object2.y; // if top lft is origin
  var w_maxY = object2.height + object2.y;
  
  
  // if(p_minX >= w_minX && p_minX <= w_maxX ||
  //   p_maxX >= w_minY && p_maxX <= w_maxX) {
  //     if (p_minY >= w_minY && p_minY <= w_maxY ||
  //       p_maxY >= w_minY && p_maxY <= w_maxY) {
  //       console.log("in");
  //       isINnnn = true;
  //     }
  //     else {
  //       console.log("ouuttt¿¿¿");
  //     }
  //   }  
  // else {
  //   console.log("out");
  // }
  // 
    
  // winner function! from internets :<
  if(p_minX < w_maxX &&
    p_maxX > w_minX &&
    p_minY < w_maxY &&
    p_maxY > w_minY)
  {
      isINnnn = true;
  }
  
  return isINnnn;
  
} // AABBTest


// 
// in world space for now
export function pointInRect(point, rect){
  var wasin = false;
  if(point.x > rect.x && point.y > rect.y && point.x < rect.width + rect.x && point.y < rect.height + rect.y){
    return true;
  }
  return wasin;
}
