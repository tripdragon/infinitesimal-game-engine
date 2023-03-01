
                          // 
                          // // each side/edge as an aposing 
                          // // thus only 4 options
                          // // NOW the tricky part is how to logicly decide WHICH is the active
                          // // the other is dragging it to the location
                          // 
                          // var vv = new Vector3();
                          // function snap(main, subject, side){
                          // 
                          //   vv.copy(main.position);
                          // 
                          //   if(side === "top"){
                          //     vv.y = subject.edges.bottom(true).y - main.edges.top(false).y;
                          //   }
                          //   else if(side === "bottom"){
                          //     vv.y = subject.edges.top(true).y - main.edges.bottom(false).y;
                          //   }
                          //   else if(side === "left"){
                          //     vv.x = subject.edges.left(true).x - main.edges.right(false).x;
                          //   }
                          //   else if(side === "right"){
                          //     vv.x = subject.edges.right(true).x - main.edges.left(false).x;
                          //   }
                          // 
                          // 
                          //   main.position.copy(vv);
                          // 
                          //   // return vv;
                          // }
                          // 
                          // 
                          // snap(box5, box4, "top")
                          // snap(box5, box4, "left")
                          // snap(box5, box4, "bottom")
                          // snap(box5, box4, "right")
                          // 
                          // 
                          // ++++
                          // 
                          // var vv = new Vector3();
                          // main = box5;
                          // subject = box4;
                          // 
                          // 
                          // 
                          // 
                          // // main.position.y = subject.edges.bottom(true).y - main.edges.top(false).y;
                          // main.position.x = subject.edges.right(true).x - main.edges.left(false).x;
                          // 
                          // 
                          // box5.edges.top(true).y
                          // box5.boundingBoxWorld.max.y
                          // 
                          // return box.max.x < this.min.x || box.min.x > this.max.x ||
                          //   box.max.y < this.min.y || box.min.y > this.max.y ? false : true;
                          // 
                          main = box5
                          subject = box4;
                          if(main.boundingBoxWorld.max.y > subject.boundingBoxWorld.min.y ){
                            main.visualEdges.top.color.setHex(0x170fff);
                          }
                          else {
                            main.visualEdges.top.color.setHex(0xffffff);
                          }
                          
                          
                          
                          main = box5
                          subject = box4;
                          if(main.boundingBoxWorld.intersectsBox(subject.boundingBoxWorld) ) {
                            main.color.setHex(0x170fff);
                          }
                          else {
                            main.color.setHex(0xffffff);
                          }
                          


// 
// 
// 
// 
// 
// 

system = APPPP
center = new VisualPlane("boxlike", 0, 0, 0, 10, 10, {r:0,g:0,b:1,a:1});
system.add(center);
box5.add(center)


system = APPPP
p0 = new VisualPlane("boxlike", 400, 400, 0, 10, 10, {r:1,g:1,b:1,a:1});
system.add(p0);
p0.position.copy(box5.position)


box5.position.fromArray([605, 358, 0])
box5.refreshMatrixes()
box5.bbb()

box5.boundingBoxWorld.max.y
box5.edges.top(true).y

system = APPPP
p1 = new VisualPlane("boxlike", 400, 400, 0, 10, 10, {r:1,g:1,b:1,a:1});
system.add(p1);
p1.position.copy(box5.position)




var points = [
  p0.position, p1.position
];
var line = new Polygon("plwoeir", points, 0,0,0,  1, {r:0.0,g:0.9,b:0.2,a:1}, this.system);
this.system.add(line);
window.line = line;





vv = new Vector3();
vv.lerpVectors(p0.position,p1.position,0) // 0.46) visually, here we flipped the direction of the lerp walk
box5.position.copy(vv)
box5.refreshMatrixes()
box5.bbb()




function onPointerMove( event ) {
  w = Math.abs(box5.boundingBoxWorld.min.x - box4.boundingBoxWorld.max.x);
  h = Math.abs(box5.boundingBoxWorld.max.y - box4.boundingBoxWorld.min.y);
  dis = Math.sqrt(w*w+h*h)
  onConsole.log("dis", dis);
  
  if( ! system.keysDown.a ){
    return;
  }
  
  if(IS_DOWN && currentLine !== null){
    currentLine.points[1].copy(system.pointer.worldSpace);
    currentLine.updatePositions();
    currentLine.bbb();
  }
}

window.addEventListener( 'pointermove', onPointerMove );



var IS_DOWN = false
var tt = []
var currentLine;
function onPointerDown( event ) {
  
  if( ! system.keysDown.a ){
    return;
  }

  var q0 = new VisualPlane("box2", 0, 0, 0, 10, 10, new Color().setHex(0x170fff), system);
  system.add(q0);
  q0.position.set(system.pointer.worldSpace.x, system.pointer.worldSpace.y, 0)
  tt.push(q0)
  
  
  
  if(IS_DOWN === false){
    IS_DOWN = true;
    var points = [
      system.pointer.worldSpace.clone(), system.pointer.worldSpace.clone(),
    ];
    currentLine = new Polygon("plwoeir", points, 0,0,0,  1, {r:0.0,g:0.9,b:0.2,a:1}, this.system);
    currentLine.canCollide = false;
    system.add(currentLine);
    // window.line = line;
  }
  
}

window.addEventListener( 'pointerdown', onPointerDown );





function onPointerUp( event ) {
  
  if( ! system.keysDown.a ){
    return;
  }
  
  IS_DOWN = false;
  currentLine = null;
  var q0 = new VisualPlane("box2", 0, 0, 0, 10, 10, new Color().setHex(0x170fff), system);
  system.add(q0);
  q0.position.set(system.pointer.worldSpace.x, system.pointer.worldSpace.y, 0)
  tt.push(q0)
  

}

window.addEventListener( 'pointerup', onPointerUp );









w = Math.abs(box5.boundingBoxWorld.min.x - box4.boundingBoxWorld.max.x);
// 75
h = Math.abs(box5.boundingBoxWorld.max.y - box4.boundingBoxWorld.min.y);

zerodis = Math.sqrt(w*w+h*h)
156.60459763365824


vv = new Vector3();
vv.lerpVectors(p0.position,p1.position,1) // 0.46) visually, here we flipped the direction of the lerp walk
box5.position.copy(vv)
box5.refreshMatrixes()
box5.bbb()

w = Math.abs(box5.boundingBoxWorld.min.x - box4.boundingBoxWorld.max.x);
// 75
h = Math.abs(box5.boundingBoxWorld.max.y - box4.boundingBoxWorld.min.y);

topdis = Math.sqrt(w*w+h*h)

91.83681179135085  / 156.60459763365824
0.5864247485644242 

1 - 0.5864247485644242 
0.41357525143557583 



// NO
vv = new Vector3();
vv.lerpVectors(p0.position,p1.position,0.41357525143557583 ) // 0.46) visually, here we flipped the direction of the lerp walk
box5.position.copy(vv)
box5.refreshMatrixes()
box5.bbb()






rangedis = p1.position.distanceTo(p0.position)
// 123.40583454602137 
1/ 0.008103344575876378 
// 0.008103344575876378 

0.008103344575876378  * 0.5864247485644242 
0.004752001805439195






// top
156 / 91
1.7142857142857142
91 / 156
0.5833333333333334 


// bottom
91 / 123.40583454602137
0.7374043564047504
123 / 91
1.3516483516483517 

0.5833333333333334  * 0.7374043564047504
0.43015254123610447  // INTRESTING NUMBER


123.40583454602137 * 0.46 
// 56.76668389116983



tt[0].position.distanceTo(tt[1].position)





p1.position.distanceTo(p0.position)
// 123.40583454602137 
1/ 0.008103344575876378 
// 0.008103344575876378 


w = Math.abs(box5.boundingBoxWorld.min.x - box4.boundingBoxWorld.max.x);
// 75
h = Math.abs(box5.boundingBoxWorld.max.y - box4.boundingBoxWorld.min.y);
// 53

Math.sqrt(w*w+h*h)
// 91.83681179135085 


91.83681179135085  * 0.008103344575876378 
// 0.7441853306952227 


// https://www.gamedev.net/tutorials/programming/general-and-gameplay-programming/inverse-lerp-a-super-useful-yet-often-overlooked-function-r5230/
function inverseLerp( x, y, value ) {

	if ( x !== y ) {

		return ( value - x ) / ( y - x );

	} else {

		return 0;

	}

}



123.40583454602137 / 91.83681179135085 
// 1.3437512925252013 
91.83681179135085 /  123.40583454602137 
// 0.7441853306952227 

123.40583454602137/ 227  = 0.5436380376476713

123.40583454602137 * 0.54
// 66.63915065485155





var q0 = new VisualPlane("box2", 0, 0, 0, 10, 10, new Color().setHex(0x170fff), this.system);
this.system.add(wewer);
wewer.position.set(box5.position)






vv = new Vector3();
vv.lerpVectors(p1.position,p0.position,0.54)
box5.position.copy(vv)
box5.refreshMatrixes()
box5.bbb()

p0.position.distanceTo(box5.position)
// 56.76668389116982

p1.position.distanceTo(box5.position)
// 66.63915065485155 


// 66 here is still yet to be derived, for now its the visual aproxomation
// of which is * 0.54
123.40583454602137  - 66.63915065485155 
// 56.76668389116982 



var wewer = new VisualPlane("box2", 0, 0, 0, 10, 10, new Color().setHex(0x170fff), this.system);
this.system.add(wewer);
wewer.position.copy(box5.position)

// visually alpha is 0.54
// p1.position.distanceTo(p0.position)
// 123.40583454602137 
// p0.position.distanceTo(box5.position) // 56.76668389116982 





w/h 1.4150943396226414
h/w 0.7066666666666667 



box5.position.set(box5.position.x - w, box5.position.y - h, 0)

box5.position.y -= h



var wewer = new VisualPlane("box2", 0, 0, 0, 10, 10, new Color().setHex(0x170fff), this.system);
this.system.add(wewer);
wewer.position.set(box4.boundingBoxWorld.max.x, box4.boundingBoxWorld.min.y, 0);

box5.boundingBoxWorld.min.y  = 375
375 - 45 = 330

yy = box5.boundingBoxWorld.max.y

y = 358
// box5.position.y = 305

box5.position.y -= h
box5.position.set(box5.position.x - w, box5.position.y - h, 0)

w/h 3.3333333333333335
h/w 0.3333333
1-0.3333333    0.6666667 

p1.position.distanceTo(p0.position)


new Vector3(601, 427, 0).distanceTo(new Vector3(526, 375, 0))

91.2633551870629 
91.2633551870629  / 123.40583454602137 
// 0.7395384142313655
123.40583454602137  / 91.2633551870629 
// 1.3521948025368549 

c0 601 427
c1 526 375


var wewer = new VisualPlane("box2", 0, 0, 0, 10, 10, new Color().setHex(0x170fff), this.system);
this.system.add(wewer);
wewer.position.set(box4.boundingBoxWorld.max.x, box4.boundingBoxWorld.min.y, 0);
