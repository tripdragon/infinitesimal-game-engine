

import {Vector2} from '../Modules/Vector2.js';




var dir = new Vector2();
var _start = new Vector2(0,0);
var _stop = new Vector2(100,0);
var vv = new Vector2(0,0);



/*


      var vv = new Vector2();
      var offset = 5;
      var _points = getOffsetPoints(points, offset);
      var gg = simpleMovingAverage(_points);
      var len = vv.copy(_points[_points.length-1]).sub(_points[0]).length();
      drawArrow(_points[0], _points[0].clone().add(gg.normalize().multiplyScalar(len/2)), 1.4, 1, "fbff00");
      
      
      
*/


// var angle = 0;
// 
// uses the angle of the line and then turns an offset of that
export function drawArrow(ctx, start = new Vector2(0,200), stop = new Vector2(0,200), extend = 0, width = 2, hexColor = "00d4ff"){
  
  // we cant treat the arrow as a function since its already drawn at that point
  // so we need to precalculate the coords

  _start.set(0,0);
  _stop.set(0,0);
  _start.add(start);
  _stop.add(stop);
  
  var len = _stop.length();
  var sizeout = 1.1 + extend;
  // _stop.sub(_start).normalize().clampLength(len+sizeout, len+sizeout).add(_start);
  _stop.sub(_start).multiplyScalar(sizeout).add(_start);

  dir.copy(_stop).sub(_start).normalize(); 
  var angle = Math.atan2(-dir.y, dir.x);
  
  

  drawLine(ctx, _start, _stop, width, hexColor);
  
  // draw arrow corners
  // was derived through frustration
  var offset = 0.4;
  var size = 20;

  var sl = angle + (offset * Math.PI * 2);
  
  vv.x = Math.cos( sl ) * size;
  vv.y = Math.sin( -sl ) * size;
  
  // vv.y *= -1;

  drawLine(ctx, _stop, vv.add(_stop) , width, hexColor);
  
  
  var sl = angle + (-offset * Math.PI * 2);
  
  vv.x = Math.cos( sl ) * size;
  vv.y = Math.sin( -sl ) * size;

  drawLine(ctx, _stop, vv.add(_stop) , width, hexColor);
  


}


// https://hslpicker.com/#00d4ff
export function drawLine(ctx, start,stop, width, hexColor = "00d4ff"){

  ctx.strokeStyle = "#"+hexColor;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(stop.x, stop.y);
  ctx.stroke(); 
  
}
