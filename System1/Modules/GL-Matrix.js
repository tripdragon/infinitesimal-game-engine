

// THIS IS A FULL copy from 
// https://github.com/toji/gl-matrix

// https://math.hws.edu/graphicsbook/c7/s1.html#webgl3d.1.2

// its not a class based though, so mat.multiply(mat) is not available
// unless we make a wrapper class


// BUT only for the parts we need as it goes along
// cause its a learning ex task

// mm = new mat4.create()

// Ok so instead bringing in parts of THREE.js
// https://github.com/mrdoob/three.js/blob/master/src/math/Matrix4.js
// import { Matrix4 } from "../Modules/GL-Matrix.js";

export class Matrix4{
  
  
	constructor() {
    
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array
		// https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/uniformMatrix
    
    Matrix4.prototype.isMatrix4 = true;

    this.elements = create();
		// this.elements = [
    // 
		// 	1, 0, 0, 0,
		// 	0, 1, 0, 0,
		// 	0, 0, 1, 0,
		// 	0, 0, 0, 1
    // 
		// ];

	}
  
  
  copy( m ) {

		const te = this.elements;
		const me = m.elements;

		te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ]; te[ 3 ] = me[ 3 ];
		te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ]; te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ];
		te[ 8 ] = me[ 8 ]; te[ 9 ] = me[ 9 ]; te[ 10 ] = me[ 10 ]; te[ 11 ] = me[ 11 ];
		te[ 12 ] = me[ 12 ]; te[ 13 ] = me[ 13 ]; te[ 14 ] = me[ 14 ]; te[ 15 ] = me[ 15 ];

		return this;

	}
  
  clone() {

    return new Matrix4().fromArray( this.elements );

  }
  
  
  fromArray( array, offset = 0 ) {

		for ( let i = 0; i < 16; i ++ ) {

			this.elements[ i ] = array[ i + offset ];

		}

		return this;

	}
  
  
	set( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

		const te = this.elements;

		te[ 0 ] = n11; te[ 4 ] = n12; te[ 8 ] = n13; te[ 12 ] = n14;
		te[ 1 ] = n21; te[ 5 ] = n22; te[ 9 ] = n23; te[ 13 ] = n24;
		te[ 2 ] = n31; te[ 6 ] = n32; te[ 10 ] = n33; te[ 14 ] = n34;
		te[ 3 ] = n41; te[ 7 ] = n42; te[ 11 ] = n43; te[ 15 ] = n44;

		return this;

	}

	identity() {

		this.set(

			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		);

		return this;

	}
  
  
	multiply( m ) {

		return this.multiplyMatrices( this, m );

	}

	premultiply( m ) {

		return this.multiplyMatrices( m, this );

	}

	multiplyMatrices( a, b ) {

		const ae = a.elements;
		const be = b.elements;
		const te = this.elements;

		const a11 = ae[ 0 ], a12 = ae[ 4 ], a13 = ae[ 8 ], a14 = ae[ 12 ];
		const a21 = ae[ 1 ], a22 = ae[ 5 ], a23 = ae[ 9 ], a24 = ae[ 13 ];
		const a31 = ae[ 2 ], a32 = ae[ 6 ], a33 = ae[ 10 ], a34 = ae[ 14 ];
		const a41 = ae[ 3 ], a42 = ae[ 7 ], a43 = ae[ 11 ], a44 = ae[ 15 ];

		const b11 = be[ 0 ], b12 = be[ 4 ], b13 = be[ 8 ], b14 = be[ 12 ];
		const b21 = be[ 1 ], b22 = be[ 5 ], b23 = be[ 9 ], b24 = be[ 13 ];
		const b31 = be[ 2 ], b32 = be[ 6 ], b33 = be[ 10 ], b34 = be[ 14 ];
		const b41 = be[ 3 ], b42 = be[ 7 ], b43 = be[ 11 ], b44 = be[ 15 ];

		te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		te[ 4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		te[ 8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		te[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

		te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		te[ 5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		te[ 9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		te[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

		te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		te[ 6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		te[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		te[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

		te[ 3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		te[ 7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		te[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		te[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

		return this;

	}
  
  
	setTranslation( x, y, z ) {
	// makeTranslation( x, y, z ) {

		this.set(

			1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1

		);

		return this;

	}
  
  // THIS one is not in threejs's
  // its brought over from a few others
  // goal is to multiply a translation in
  // to save store a matrix, woo...
  translate(x,y,z){
    var gg = this.elements;
    // the others are not mutated so we dont bother
    /*
    x -  -  px
    - y  -  py
    - - z - pz
    -  -  - 1?
    
    0 1 2 3
    4 5 6 7
    8 9 10 11
    12 13 14 15
    
    */
    gg[12] = gg[0] * x + gg[4] * y + gg[8]  * z + gg[12];
    gg[13] = gg[1] * x + gg[5] * y + gg[9]  * z + gg[13];
    gg[14] = gg[2] * x + gg[6] * y + gg[10] * z + gg[14];
    gg[15] = gg[3] * x + gg[7] * y + gg[11] * z + gg[15];


    // gg[12] = gg[0] * x + gg[4] * y + gg[8]  * z + gg[12];
    // gg[13] = gg[1] * x + gg[5] * y + gg[9]  * z + gg[13];
    // gg[14] = gg[2] * x + gg[6] * y + gg[10] * z + gg[14];
    // gg[15] = gg[3] * x + gg[7] * y + gg[11] * z + gg[15];
    // 
    // gg[3] += 100;
    

    return this;
  }
  
  // just a debugger tool
  getPosition(){
    return [this.elements[12], this.elements[13], this.elements[14], this.elements[15]];
  }
  
  
  
	makePerspective( left, right, top, bottom, near, far ) {

		const te = this.elements;
		const x = 2 * near / ( right - left );
		const y = 2 * near / ( top - bottom );

		const a = ( right + left ) / ( right - left );
		const b = ( top + bottom ) / ( top - bottom );
		const c = - ( far + near ) / ( far - near );
		const d = - 2 * far * near / ( far - near );

		te[ 0 ] = x;	te[ 4 ] = 0;	te[ 8 ] = a;	te[ 12 ] = 0;
		te[ 1 ] = 0;	te[ 5 ] = y;	te[ 9 ] = b;	te[ 13 ] = 0;
		te[ 2 ] = 0;	te[ 6 ] = 0;	te[ 10 ] = c;	te[ 14 ] = d;
		te[ 3 ] = 0;	te[ 7 ] = 0;	te[ 11 ] = - 1;	te[ 15 ] = 0;

		return this;

	}

  /*
    // https://webglfundamentals.org/webgl/lessons/webgl-3d-orthographic.html
    var left = 0;
    var right = gl.canvas.clientWidth;
    var bottom = gl.canvas.clientHeight;
    var top = 0;
    var near = 400;
    var far = -400;
    var matrix = m4.orthographic(left, right, bottom, top, near, far);
  */
	makeOrthographic( left, right, top, bottom, near, far ) {

		const te = this.elements;
		const w = 1.0 / ( right - left );
		const h = 1.0 / ( top - bottom );
		const p = 1.0 / ( far - near );

		const x = ( right + left ) * w;
		const y = ( top + bottom ) * h;
		const z = ( far + near ) * p;

		te[ 0 ] = 2 * w;	te[ 4 ] = 0;	    te[ 8 ] = 0;	       te[ 12 ] = - x;
		te[ 1 ] = 0;	    te[ 5 ] = 2 * h;	te[ 9 ] = 0;	       te[ 13 ] = - y;
		te[ 2 ] = 0;	    te[ 6 ] = 0;	    te[ 10 ] = - 2 * p;	 te[ 14 ] = - z;
		te[ 3 ] = 0;	    te[ 7 ] = 0;	    te[ 11 ] = 0;	       te[ 15 ] = 1;

		return this;

	}
  
  // 2d maybe
  /*

  // vec2 zeroToOne = aVertexPosition.xy / u_resolution;
  vec2 zeroToOne = (u_matrix * aVertexPosition).xy / u_resolution;
  
  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;
  
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = zeroToTwo - 1.0;

  gl_Position = vec4(clipSpace * vec2(1, 1), 0, 1);
  
  */
  /*
    var projectionMatrix = m3.projection(
    gl.canvas.clientWidth, gl.canvas.clientHeight);
    
        
     // Multiply the matrices.
     var matrix = m3.multiply(projectionMatrix, translationMatrix);
     matrix = m3.multiply(matrix, rotationMatrix);
     matrix = m3.multiply(matrix, scaleMatrix);
     
     //
     
     // Compute the matrix
    var matrix = m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400);
    matrix = m4.translate(matrix, translation[0], translation[1], translation[2]);
    matrix = m4.xRotate(matrix, rotation[0]);
    matrix = m4.yRotate(matrix, rotation[1]);
    matrix = m4.zRotate(matrix, rotation[2]);
    matrix = m4.scale(matrix, scale[0], scale[1], scale[2]);

    // Set the matrix.
    gl.uniformMatrix4fv(matrixLocation, false, matrix);
    
  */
  // projection(width, height) {
  // // Note: This matrix flips the Y axis so that 0 is at the top.
  //   return [
  //     2 / width, 0, 0,
  //     0, -2 / height, 0,
  //     -1, 1, 1
  //   ];
  // }
  // projection(width, height, depth) {
  //   // Note: This matrix flips the Y axis so 0 is at the top.
  //   return [
  //      2 / width, 0, 0, 0,
  //      0, -2 / height, 0, 0,
  //      0, 0, 2 / depth, 0,
  //     -1, 1, 0, 1,
  //   ];
  // }
  
  /*
    // https://webglfundamentals.org/webgl/lessons/webgl-3d-orthographic.html
    var left = 0;
    var right = gl.canvas.clientWidth;
    var bottom = gl.canvas.clientHeight;
    var top = 0;
    var near = 400;
    var far = -400;
    var matrix = m4.orthographic(left, right, bottom, top, near, far);
  */
  // orthographic: function(left, right, bottom, top, near, far) {
  // return [
  //   2 / (right - left), 0, 0, 0,
  //   0, 2 / (top - bottom), 0, 0,
  //   0, 0, 2 / (near - far), 0,
  // 
  //   (left + right) / (left - right),
  //   (bottom + top) / (bottom - top),
  //   (near + far) / (near - far),
  //   1,
  // ];
  
}


// 
// GL Matrix
// 

export const EPSILON = 0.000001;
export let ARRAY_TYPE =
  typeof Float32Array !== "undefined" ? Float32Array : Array;
export let RANDOM = Math.random;
export let ANGLE_ORDER = "zyx";


/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
export function create() {
  let out = new ARRAY_TYPE(16);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}


/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */
export function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}




/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to translate
 * @param {ReadonlyVec3} v vector to translate by
 * @returns {mat4} out
 */
export function translate(out, a, v) {
  let x = v[0],
    y = v[1],
    z = v[2];
  let a00, a01, a02, a03;
  let a10, a11, a12, a13;
  let a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;

    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}




/**
 * Generates a orthogonal projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
 * which matches WebGL/OpenGL's clip volume.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
export function orthoNO(out, left, right, bottom, top, near, far) {
  const lr = 1 / (left - right);
  const bt = 1 / (bottom - top);
  const nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
