

// Obsolete???

/*
var array_of_functions = [
    function() { first_function('a string') },
    function() { second_function('a string') },
    function() { third_function('a string') },
    function() { fourth_function('a string') }
]

for (i = 0; i < array_of_functions.length; i++) {
    array_of_functions[i]();
}
*/

import { randomBetween } from "../Modules/mathness.js";
import { setRectangle } from "../Modules/setRectangle.js";

export function loadSquares(gl, colorUniformLocation){
  
  return [
    function() {
      gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
      setRectangle(gl, randomBetween(-4,4), 8, 12, 8) 
    },
    function() { 
      gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
      setRectangle(gl, -9, randomBetween(-4,4), 8, 8) 
    },
    function() { 
      gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
      setRectangle(gl,-24, randomBetween(-4,4) + -22, 8, 12) 
    },
  ];

}
