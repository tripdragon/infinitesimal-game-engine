

// convert these to js as needed

function sdkjgndflg(){
  
//   using System.Collections;
// using System.Collections.Generic;
// using UnityEngine;



// 
// just common maths or routines not a static based class of functions yet
// well ok lets use it now no furthjer namespace 
// 
// 

// Timer stuff is in TimerZ

// 
// Ooo! Unity has a Mathimatics api pligin so you can write GLSL finctions instead of namespaced
// long form stuff, gonna refresh this and throughout the app with it maybe
// 

// see TimerZ for MoveTowards

// Matyh
public static class MathZ
{

    public static int RandomSign()
    {
        return UnityEngine.Random.value < 0.5f ? 1 : -1;
    }

    // these two are from shaders
    public static float InverseLerp(float from, float to, float value){
        return (value - from) / (to - from);
    }
    public static float Remap(float origFrom, float origTo, float targetFrom, float targetTo, float value){
        float rel = InverseLerp(origFrom, origTo, value);
        return Mathf.Lerp(targetFrom, targetTo, rel);
    }

    // this remap is typical in c and js
    public static float RemapRange (float from0, float to0, float from1, float to1, float value) {
        return from1 + (to1 - from1) * (value - from0) / (to0 - from0);
    }
    // this is wrong
    public static float RemapRangeNormal (float from1, float to1, float value) {
        return from1 + (to1 - from1) * value / 1f;
    }

    // given an array length, get its index within a normilized alpha 0 : 1
    // lim 50, alpha 0 => 0, 0.5 => 25, 1 => 50
    /*
        int lim = 10;
        for (int i = 0; i < lim; i++)
        {   
            float alpha = int/lim;
            print(GetIndexAtAlpha(alpha));
        }

        [Range(0,1)]
        public float valAlpha = 0;
        public int ggggg = 0;
        public int limity = 12;

        ggggg = MathZ.GetIndexAtAlpha(limity,valAlpha);
    
    */
    public static int GetIndexAtAlpha(int limit, float alpha){
        return (int)Mathf.Round( limit * alpha / 1f );   
    }


    // shuffle array, use mpostly as a template?
    // public static void Reshuffle(int[] indexes)
    // {
    //     // Knuth shuffle algorithm :: courtesy of Wikipedia wow
    //     for (int t = 0; t < indexes.Length; t++ )
    //     {
    //         int tmp = indexes[t];
    //         int r = Random.Range(t, indexes.Length);
    //         indexes[t] = indexes[r];
    //         indexes[r] = tmp;
    //     }
    // }

    public static void Reshuffle<T>(IList<T> indexes)
    {
        // Debug.Log("--------- reshuffle "+ Time.time);
        // Knuth shuffle algorithm :: courtesy of Wikipedia wow
        for (int t = 0; t < indexes.Count; t++ )
        {
            var tmp = indexes[t];
            int r = Random.Range(t, indexes.Count);
            indexes[t] = indexes[r];
            indexes[r] = tmp;
        }
    }

    // moves index 0 to the back of the array
    public static void ShiftArrayToLeft<T>(IList<T> listy){
        var t = listy[0];
        for (int i = 0; i < listy.Count-1; i++) {
            listy[i] = listy[i+1];
        }
        listy[listy.Count-1] = t;
    }


    public static bool IsWithinRange(float val, float min, float max){
        if(val >= min && val <= max){
            return true;
        }
        return false;
    }

    // shouldnt this just be is point in radius?
    public static bool IsWithinRange(Vector3 subject, Vector3 min, Vector3 max){
        float minMaxDistance = (max-min).magnitude;
        float subjectDistance = (max-subject).magnitude;
        if (subjectDistance <= minMaxDistance )
        {
            return true;
        }
        return false;
    }


    // works!! kinda, had to add a distance checker 
    // https://answers.unity.com/questions/1279384/capsule-calculations.html
    public static bool PointInCapsule(Vector3 point, Vector3 capstart, Vector3 capend, Vector3 origin, float radius)
    {    
        //get the height of the triangle 
        float[] sides = new float[] { Vector3.Distance(capstart, capend), Vector3.Distance(capend, point), Vector3.Distance(point, capstart) };
        float s = (sides[0] + sides[1] + sides[2]) / 2;
        float a = Mathf.Sqrt(s * (s - sides[0]) * (s - sides[1]) * (s - sides[2]));
        float h = a / (sides[0] * 0.5f);
        //  Debug.Log("sides " + sides);
        //  Debug.Log("s " + s);
        //  Debug.Log("a " + a);
        //  Debug.Log("h " + h);
        //check if the height is within radius of the cylinder or the 2 spheres
        bool isIn = false;
        if (h <= radius || sides[1] <= radius || sides[2] <= radius) isIn = true;
        
        //  adding extra distance checks
        float pointToOriginDis = (point-origin).magnitude;
        float backDis = (capend-origin).magnitude;
        float frontDis = (capstart-origin).magnitude;
        if (pointToOriginDis > backDis && pointToOriginDis > frontDis)
        {
            isIn = false;
        }
        
        return isIn;
    }


    public static float RandomWithinPadding(float val, float padding){
        return Random.Range(val - padding, val + padding );
    }


    /*
      if(MathZ.IsWithinCameraView(handCenterPoint.transform.position, _camera)){
    */
    public static bool IsWithinCameraView(Vector3 position, Camera _camera){
        Vector3 pos = _camera.WorldToViewportPoint(position);
        bool a = IsWithinRange(pos.x, 0,1);
        bool b = IsWithinRange(pos.y, 0,1);
        if (a && b)
        {
            return true;
        }
        return false;
    }

    // closeEnoughLike(6.8999999,7,0.1) false
    // closeEnoughLike(6.9,7,0.1) true
    // closeEnoughLike(7,7,0.1) true
    // closeEnoughLike(7.1,7,0.1) true
    // closeEnoughLike(7.11,7,0.1) false
    public static bool CloseEnoughLike(float val, float target, float fudge) {
        if (val >= target - fudge && val <= target + fudge ) {
            return true;
        }
        return false;
    }



    // vectors
    // could make these into transform.position functions as well but Loooong form

    // p0 and p1 are directional vectors here
    public static Vector3 GetDirectionBetweenVectors(Vector3 p0, Vector3 p1){
        return (p0 +  p1).normalized;
    }
    
    public static Quaternion GetRotationDirectionBetweenVectors(Vector3 p0, Vector3 p1){
        return Quaternion.LookRotation(GetDirectionBetweenVectors(p0,p1));
    }
    
    public static Vector3 GetCenterBetweenTwoPoints(Vector3 p0, Vector3 p1){
        return Vector3.Lerp(p0, p1, 0.5f);
    }

    // 
    public static Vector3 GetCentroidFromPoints(Vector3[] points){
        Vector3 _v = Vector3.zero;
        for (int i = 0; i < points.Length; i++) _v += points[i];
        return _v / points.Length;
    }
    public static Vector3 GetCentroidFromPoints(Vector3 p0, Vector3 p1, Vector3 p2){
        return (p0+p1+p2)/3;
    }

    // note array is 3 points
    // order matter otherwise just negate the vector -Vector
    public static Vector3 GetNormalFromTrianglePoints(Vector3[] points){
        return Vector3.Cross( points[0] - points[1], points[1] - points[2] );
    }
    public static Vector3 GetNormalFromTrianglePoints(Vector3 p0, Vector3 p1, Vector3 p2){
        return Vector3.Cross( p0 - p1, p1 - p2 );
    }
    
    // wut this for???
    // Quaternion.LookRotation(-normal);
    public static Quaternion GetLookRotation(Vector3 direction){
        return Quaternion.LookRotation(direction);
    }
    
    /*
         var lookPos = target.position - transform.position;
     lookPos.y = 0;
     var rotation = Quaternion.LookRotation(lookPos);
     rotation *= Quaternion.Euler(0, 90, 0); // this adds a 90 degrees Y rotation
     var adjustRotation = transform.rotation.y + rotationAdjust; //<- this is wrong!
     transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * damping);
    */

    // 
    // Statistics data smoothing
    // FIDDDLY you need to debug in javascript
    // and look at the values out and determine for yourself if the values its clamping are what ypou are expecting
    // spikes like 0.01 in time can toss your average out of wack with BasicAverage()
    // but the others like in stocks are tools to reach something
    // 
    
    // these kinda belong in MathZ
    // its statistics stuff to weighted clamp down the sampling values that
    // handles spikes in a basic averge mean
    // ref https://blog.oliverjumpertz.dev/the-moving-average-simple-and-exponential-theory-math-and-implementation-in-javascript
    // https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
    
    /*
    // this produces an array or you can pass in an array
    // dont need this right now so just leaving it here
    // this prints out one less in the length of the array
    function simpleMovingAverage222Array(data) {
    var out = [];
    var v = 0;
    for (var i = 1; i < data.length; i++) {
        v += data[i-1]+data[i];
        out[i-1] = v/data.length;
    }
    return out;
    }
    a = [5/0.2, 5/0.4, 5/0.4, 5/0.1, 5/0.2, 5/0.5, 5/0.4, 5/0.4]
    g = simpleMovingAverage222Array(a)
    */

    // like the above array version but skips the array and gives the most recent
    // computes the most recent val without making an array
    // float[] a = [1/0.2, 1/0.4, 1/0.401, 1/0.4, 1/0.01]
    // gg = SimpleMovingAverage(a)


    // Ehhhhhhhhhh ( (9+9)+(9+9)+(9+9)+(9+9)+(9+9)) / 5 -> 18
    // ( (9+9)+(9+9)+(9+9)+(9+9) ) / 5 -> 14.5
    // (9+9+9+9+9)/5 -> 9
    // so that proves THAT this formula not work!!!!
    // back to basic averging for now

    public static float SimpleMovingAverage(float[] data) {
        float v = 0;
        for (int i = 1; i < data.Length; i++) {
            v += data[i-1]+data[i];
        }
        return v/data.Length;
    }

    // vector form
    public static Vector3 SimpleMovingAverageVector3(Vector3[] data) {
        Vector3 v = Vector3.zero;
        for (int i = 1; i < data.Length; i++) {
            v += data[i-1]+data[i];
        }
        return v/data.Length;
    }

    /*
    
        same as above for the array version but dont need oit for now
                
        function exponentialMovingAverage2222(data) {
        var out = [];
        var v = 0;
        var weight = 2 / (data.length + 1);
        var gg = simpleMovingAverage222(data);
        out[0] = gg[gg.length-1];
        var pre = 0;
        var cur = 0;
        for (var i = 0; i < data.length; i++) {
            pre = out[i];
            cur = (data[i] - pre) * weight + pre;
            // out.push(cur);
            out[i+1] = cur;
            // v += data[i-1]+data[i];
            // out[i-1] = v/data.length;
        }
        
        return out;
        }

        a = [1/0.2, 1/0.4, 1/0.401, 1/0.4, 1/0.01]
        gg = exponentialMovingAverage2222(a)

    */

    // float[] a = [1/0.2, 1/0.4, 1/0.401, 1/0.4, 1/0.01]
    // gg = ExponentialMovingAverage(a)
    public static float ExponentialMovingAverage(float[] data) {
        float weight = 2 / (data.Length + 1);
        float pre = SimpleMovingAverage(data);
        float cur = 0;
        for (var i = 0; i < data.Length; i++) {
            cur = (data[i] - pre) * weight + pre;
            pre = cur;
        }
        return cur/data.Length;
    }

    // its actually instant velocity but its not a vector so its speed
    // this just takes the two most recent in the array and computes
    // this leads to stop visual not useful values if the values are really close
    // also some times negative
    // float[] a = [1/0.2, 1/0.4, 1/0.401, 1/0.4, 1/0.01]
    // gg = InstantSpeed(a)
    public static float InstantSpeed(float[] data){
        return (data[data.Length-1]-data[data.Length-2])/2;
    }

    // float[] a = [1/0.2, 1/0.4, 1/0.401, 1/0.4, 1/0.01]
    // gg = BasicAverage(a)
    public static float BasicAverage(float[] data){
        float v = 0;
        for (var i = 0; i < data.Length; i++) {
            v+=data[i];
        }
        return v/data.Length;
    }


    // since this in vr units
    // and untiys idea of zero in float eventurally but imediately turns into scientific notation
    // which like breaks EVERYTHING 
    // and from reading anything past 6 points of percision is iffy and mm is 0.001
    // we can devise that beyond 0.00001 is zero nurp that 0.0001 one more and its back to scientific notation
    // Mathf.Approximately(val, 0.0f) does not work it is one value before Mathf.Epsilon
    // also Mathf.Max() also does not behave right

    static float prettyMuchZero = 0.0001f;
    // getZeroish
    public static float GetPrettyMuchZero (float val){
        float min = prettyMuchZero;
        if ( Mathf.Abs(val) <= min)
        {
            // handle negative
            if (val < 0) min = -min;
            return min;
        }
        return val;
    }

    // public static Vector3 GetPrettyMuchZero (Vector3 val){
    //     float min = prettyMuchZero;
    //     // not sure this is dependable if one is greater
    //     if (Mathf.Abs(val.x) <= min && Mathf.Abs(val.y) <= min && Mathf.Abs(val.z) <= min)
    //     {
    //         // retain negatives
    //         float minx = min;
    //         float miny = min;
    //         float minz = min;
    //         if (val.x < 0) minx = -min;
    //         if (val.y < 0) miny = -min;
    //         if (val.z < 0) minz = -min;
            
    //         return new Vector3(minx, miny, minz);
    //     }
    //     return val;
    // }

    public static Vector3 GetPrettyMuchZero (Vector3 val){
        
        // here we just return the vector if all are large
        float min = prettyMuchZero;
        if (Mathf.Abs(val.x) >= min && Mathf.Abs(val.y) >= min && Mathf.Abs(val.z) >= min)
        {
            return val;
        }

        // otherwise forget it well make a new vector
        float xx = GetPrettyMuchZero(val.x);
        float yy = GetPrettyMuchZero(val.y);
        float zz = GetPrettyMuchZero(val.z);

        return new Vector3(xx, yy, zz);

    }

    public static bool IsPrettyMuchZero (float val){
        float min = prettyMuchZero;
        if (Mathf.Abs(val) <= min)
        {
            return true;
        }
        return false;
    }

    public static bool IsPrettyMuchZero (Vector3 val){
        float min = prettyMuchZero;
        if (Mathf.Abs(val.x) <= min && Mathf.Abs(val.y) <= min && Mathf.Abs(val.z) <= min)
        {
            return true;
        }
        return false;
    }

    public static float DistanceFixed(Vector3 p0, Vector3 p1){
        return GetPrettyMuchZero(Vector3.Distance(p0, p1));
    }



    // deailing with scientific notation
    // b = 1.732051E-05 => 0.00001732051
    // b = 1.732051E+05 => 173205.1
    // a = -2.107223E+15 => -2107223000000000
    // note the operator being + or -
    // Soooooooo for hand tracking its OFF INTO SPACE!!!!
    // so we need to simply crudely CLAMP max dis
    // well take a 
    // public static bool IsWaayToFar(Vector3 p0, Vector3 p1, float maxDis = 3f){
        
    // }


        // feed this bone joints for near joints
    // but flap joints will need a different config
    public static float GetAngleFromThreePointsNormalized(Vector3 p0, Vector3 center, Vector3 p1){
        Vector3 v0 = p1 - center;
        Vector3 v1 = p0 - center;
        float dot = Vector3.Dot(v1.normalized,v0.normalized);
        float angle = Vector3.Angle(v0,v1);
        // normalizing the dot product gives us a 0-1 which is workable
        // we can now in the app look for a decent angle to declare ranges to say its open or closed
        return dot * 0.5f + 0.5f;
    }

    // isFacing = MathZ.TestIsFacing(transform.forward, _collider.gameObject.transform.forward, maxAngle, out dotVal);
    public static bool TestIsFacing(Vector3 p0, Vector3 p1, out float dotVal, float maxAngle = 0.2f){
        dotVal = Vector3.Dot(p0, p1);
        dotVal = (dotVal + 1)/2;
        if (dotVal < maxAngle) return true;
        return false;
    }


}



}
