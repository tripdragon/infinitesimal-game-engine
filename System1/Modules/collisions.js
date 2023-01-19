
// temp for now place to hit test
export function AABBTest(object1, object2){
  
  var isINnnn = false;
  
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
