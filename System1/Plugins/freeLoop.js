

// TOOOOOO heavy in a loop per frame
// need a greater queue


// we need a SIMPLE function like setTimeOut and setInterval
// that uses requestAnimationFrame
// with a one liner function and internal timer to complete and delete
// when x.normalizedTime reaches 1 it stops

function wexample(){

  // freeLoop(function(x){
  // 	console.log("???");
  // 	console.log(x.currentTime);
  // 	console.log(x.normalizedTime);
  // }, 1)
  
  freeLoop(1, function(x){
    console.log("???");
    console.log(x.currentTime);
    console.log(x.normalizedTime);
  })

}

// time is at the front!!!
export function freeLoop(runtime = 2, func){

	var data = {
		loopID : 0,
		time : 0,
		delta : 0,
		// cancelAnimationFrame(loopID)
		startTime : -1,
		runTime : runtime, //seconds
		currentTime : 0,
		mTime : 0,
		normalizedTime : 0,
    isDone : false
	}


	var loop = function(){

		// data.loopID = requestAnimationFrame( loop.bind(this) );
		data.loopID = requestAnimationFrame( loop );

		data.time = Date.now();
		if(data.startTime === -1){
			data.startTime = data.time;
			data.mTime = data.time;
		}

		data.delta = (data.time - data.mTime) / 1000;
		// console.log(delta);
		data.currentTime += data.delta;
		data.normalizedTime = data.currentTime / data.runTime;
		
		data.mTime = data.time;


		func(data);
		
		// console.log(currentTime);

		if(data.currentTime >= data.runTime){
			console.log("pop", data.currentTime);
      this.isDone = true;
			cancelAnimationFrame(data.loopID);
		}
    

	};

	loop();

	
}



// https://en.wikipedia.org/wiki/Linear_interpolation
function lerp( x, y, t ) {

  return ( 1 - t ) * x + t * y;

}





// other examples 


function sdkjfbdifjniusdfg(){


  setTimeout(function(){console.log("fish");}, 1000);
  setInterval(function(){console.log("fish");}, 1000);


  
  // ____

  var ii = 0;
  intervalID = setInterval(function(){console.log("fish", ii++);}, 1);
  setTimeout(function(){ clearInterval(intervalID); console.log("pop"); }, 1000);


}
