

// https://www.youtube.com/watch?v=mr5xkf6zSzk
//  Math for Game Programmers: Fast and Funky 1D Nonlinear Transformations 

// https://gist.github.com/cjddmut/d789b9eb78216998e95c

/*
 * Created by C.J. Kimberlin
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2019
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 * 
 * TERMS OF USE - EASING EQUATIONS
 * Open source under the BSD License.
 * Copyright (c)2001 Robert Penner
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the author nor the names of contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, 
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE 
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT 
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *
 * ============= Description =============
 *
 * Below is an example of how to use the easing functions in the file. There is a getting function that will return the function
 * from an enum. This is useful since the enum can be exposed in the editor and then the function queried during Start().
 * 
 * EasingFunction.Ease ease = EasingFunction.Ease.EaseInOutQuad;
 * EasingFunction.EasingFunc func = GetEasingFunction(ease;
 * 
 * value = func(0, 10, 0.67f);
 * 
 * EasingFunction.EaseingFunc derivativeFunc = GetEasingFunctionDerivative(ease);
 * 
 * derivativeValue = derivativeFunc(0, 10, 0.67f);
 */


import {lerp, clamp} from "./mathness.js"

const sin = Math.sin;
const cos = Math.cos;
const pow = Math.pow;

const NATURAL_LOG_OF_2 = 0.693147181;


export var easing = {
  
    
    

    linear : function(start, end, value) {
        return lerp(start, end, value);
    },
    
    easeOutExpo : function(start, end, value)
    {
        end -= start;
        return end * (-pow(2, -10 * value) + 1) + start;
    },
    
    easeInExpo : function(start, end, value)
    {
        end -= start;
        return end * pow(2, 10 * (value - 1)) + start;
    },
    
    easeInCubic : function(start, end, value)
    {
        end -= start;
        return end * value * value * value + start;
    }
    
    // bring back in the ones you need, but was too lazy to figure of converting them roboticly
    // 
    // Spring(start, end, value)
    // {
    //     value = Math.Clamp01(value);
    //     value = (sin(value * Math.PI * (0.2f + 2.5f * value * value * value)) * pow(1f - value, 2.2f) + value) * (1f + (1.2f * (1f - value)));
    //     return start + (end - start) * value;
    // }
    // 
    // EaseInQuad(start, end, value)
    // {
    //     end -= start;
    //     return end * value * value + start;
    // }
    // 
    // EaseOutQuad(start, end, value)
    // {
    //     end -= start;
    //     return -end * value * (value - 2) + start;
    // }
    // 
    // EaseInOutQuad(start, end, value)
    // {
    //     value /= .5f;
    //     end -= start;
    //     if (value < 1) return end * 0.5f * value * value + start;
    //     value--;
    //     return -end * 0.5f * (value * (value - 2) - 1) + start;
    // }
    // 

    // 
    // EaseOutCubic(start, end, value)
    // {
    //     value--;
    //     end -= start;
    //     return end * (value * value * value + 1) + start;
    // }
    // 
    // EaseInOutCubic(start, end, value)
    // {
    //     value /= .5f;
    //     end -= start;
    //     if (value < 1) return end * 0.5f * value * value * value + start;
    //     value -= 2;
    //     return end * 0.5f * (value * value * value + 2) + start;
    // }
    // 
    // EaseInQuart(start, end, value)
    // {
    //     end -= start;
    //     return end * value * value * value * value + start;
    // }
    // 
    // EaseOutQuart(start, end, value)
    // {
    //     value--;
    //     end -= start;
    //     return -end * (value * value * value * value - 1) + start;
    // }
    // 
    // EaseInOutQuart(start, end, value)
    // {
    //     value /= .5f;
    //     end -= start;
    //     if (value < 1) return end * 0.5f * value * value * value * value + start;
    //     value -= 2;
    //     return -end * 0.5f * (value * value * value * value - 2) + start;
    // }
    // 
    // EaseInQuint(start, end, value)
    // {
    //     end -= start;
    //     return end * value * value * value * value * value + start;
    // }
    // 
    // EaseOutQuint(start, end, value)
    // {
    //     value--;
    //     end -= start;
    //     return end * (value * value * value * value * value + 1) + start;
    // }
    // 
    // EaseInOutQuint(start, end, value)
    // {
    //     value /= .5f;
    //     end -= start;
    //     if (value < 1) return end * 0.5f * value * value * value * value * value + start;
    //     value -= 2;
    //     return end * 0.5f * (value * value * value * value * value + 2) + start;
    // }
    // 
    // EaseInSine(start, end, value)
    // {
    //     end -= start;
    //     return -end * cos(value * (Math.PI * 0.5f)) + end + start;
    // }
    // 
    // EaseOutSine(start, end, value)
    // {
    //     end -= start;
    //     return end * sin(value * (Math.PI * 0.5f)) + start;
    // }
    // 
    // EaseInOutSine(start, end, value)
    // {
    //     end -= start;
    //     return -end * 0.5f * (cos(Math.PI * value) - 1) + start;
    // }
    // 

    // 

    // 
    // EaseInOutExpo(start, end, value)
    // {
    //     value /= .5f;
    //     end -= start;
    //     if (value < 1) return end * 0.5f * pow(2, 10 * (value - 1)) + start;
    //     value--;
    //     return end * 0.5f * (-pow(2, -10 * value) + 2) + start;
    // }
    // 
    // EaseInCirc(start, end, value)
    // {
    //     end -= start;
    //     return -end * (Math.Sqrt(1 - value * value) - 1) + start;
    // }
    // 
    // EaseOutCirc(start, end, value)
    // {
    //     value--;
    //     end -= start;
    //     return end * Math.Sqrt(1 - value * value) + start;
    // }
    // 
    // EaseInOutCirc(start, end, value)
    // {
    //     value /= .5f;
    //     end -= start;
    //     if (value < 1) return -end * 0.5f * (Math.Sqrt(1 - value * value) - 1) + start;
    //     value -= 2;
    //     return end * 0.5f * (Math.Sqrt(1 - value * value) + 1) + start;
    // }
    // 
    // EaseInBounce(start, end, value)
    // {
    //     end -= start;
    //     d = 1f;
    //     return end - EaseOutBounce(0, end, d - value) + start;
    // }
    // 
    // EaseOutBounce(start, end, value)
    // {
    //     value /= 1f;
    //     end -= start;
    //     if (value < (1 / 2.75f))
    //     {
    //         return end * (7.5625f * value * value) + start;
    //     }
    //     else if (value < (2 / 2.75f))
    //     {
    //         value -= (1.5f / 2.75f);
    //         return end * (7.5625f * (value) * value + .75f) + start;
    //     }
    //     else if (value < (2.5 / 2.75))
    //     {
    //         value -= (2.25f / 2.75f);
    //         return end * (7.5625f * (value) * value + .9375f) + start;
    //     }
    //     else
    //     {
    //         value -= (2.625f / 2.75f);
    //         return end * (7.5625f * (value) * value + .984375f) + start;
    //     }
    // }
    // 
    // EaseInOutBounce(start, end, value)
    // {
    //     end -= start;
    //     d = 1f;
    //     if (value < d * 0.5f) return EaseInBounce(0, end, value * 2) * 0.5f + start;
    //     else return EaseOutBounce(0, end, value * 2 - d) * 0.5f + end * 0.5f + start;
    // }
    // 
    // EaseInBack(start, end, value)
    // {
    //     end -= start;
    //     value /= 1;
    //     s = 1.70158f;
    //     return end * (value) * value * ((s + 1) * value - s) + start;
    // }
    // 
    // EaseOutBack(start, end, value)
    // {
    //     s = 1.70158f;
    //     end -= start;
    //     value = (value) - 1;
    //     return end * ((value) * value * ((s + 1) * value + s) + 1) + start;
    // }
    // 
    // EaseInOutBack(start, end, value)
    // {
    //     s = 1.70158f;
    //     end -= start;
    //     value /= .5f;
    //     if ((value) < 1)
    //     {
    //         s *= (1.525f);
    //         return end * 0.5f * (value * value * (((s) + 1) * value - s)) + start;
    //     }
    //     value -= 2;
    //     s *= (1.525f);
    //     return end * 0.5f * ((value) * value * (((s) + 1) * value + s) + 2) + start;
    // }
    // 
    // EaseInElastic(start, end, value)
    // {
    //     end -= start;
    // 
    //     d = 1f;
    //     p = d * .3f;
    //     s;
    //     a = 0;
    // 
    //     if (value == 0) return start;
    // 
    //     if ((value /= d) == 1) return start + end;
    // 
    //     if (a == 0f || a < Math.Abs(end))
    //     {
    //         a = end;
    //         s = p / 4;
    //     }
    //     else
    //     {
    //         s = p / (2 * Math.PI) * Math.Asin(end / a);
    //     }
    // 
    //     return -(a * pow(2, 10 * (value -= 1)) * sin((value * d - s) * (2 * Math.PI) / p)) + start;
    // }
    // 
    // EaseOutElastic(start, end, value)
    // {
    //     end -= start;
    // 
    //     d = 1f;
    //     p = d * .3f;
    //     s;
    //     a = 0;
    // 
    //     if (value == 0) return start;
    // 
    //     if ((value /= d) == 1) return start + end;
    // 
    //     if (a == 0f || a < Math.Abs(end))
    //     {
    //         a = end;
    //         s = p * 0.25f;
    //     }
    //     else
    //     {
    //         s = p / (2 * Math.PI) * Math.Asin(end / a);
    //     }
    // 
    //     return (a * pow(2, -10 * value) * sin((value * d - s) * (2 * Math.PI) / p) + end + start);
    // }
    // 
    // EaseInOutElastic(start, end, value)
    // {
    //     end -= start;
    // 
    //     d = 1f;
    //     p = d * .3f;
    //     s;
    //     a = 0;
    // 
    //     if (value == 0) return start;
    // 
    //     if ((value /= d * 0.5f) == 2) return start + end;
    // 
    //     if (a == 0f || a < Math.Abs(end))
    //     {
    //         a = end;
    //         s = p / 4;
    //     }
    //     else
    //     {
    //         s = p / (2 * Math.PI) * Math.Asin(end / a);
    //     }
    // 
    //     if (value < 1) return -0.5f * (a * pow(2, 10 * (value -= 1)) * sin((value * d - s) * (2 * Math.PI) / p)) + start;
    //     return a * pow(2, -10 * (value -= 1)) * sin((value * d - s) * (2 * Math.PI) / p) * 0.5f + end + start;
    // }
    // 
    // //
    // // These are derived functions that the motor can use to get the speed at a specific time.
    // //
    // // The easing functions all work with a normalized time (0 to 1) and the returned value here
    // // reflects that. Values returned here should be divided by the actual time.
    // //
    // // TODO: These functions have not had the testing they deserve. If there is odd behavior around
    // //       dash speeds then this would be the first place I'd look.
    // 
    // LinearD(start, end, value)
    // {
    //     return end - start;
    // }
    // 
    // EaseInQuadD(start, end, value)
    // {
    //     return 2f * (end - start) * value;
    // }
    // 
    // EaseOutQuadD(start, end, value)
    // {
    //     end -= start;
    //     return -end * value - end * (value - 2);
    // }
    // 
    // EaseInOutQuadD(start, end, value)
    // {
    //     value /= .5f;
    //     end -= start;
    // 
    //     if (value < 1)
    //     {
    //         return end * value;
    //     }
    // 
    //     value--;
    // 
    //     return end * (1 - value);
    // }
    // 
    // EaseInCubicD(start, end, value)
    // {
    //     return 3f * (end - start) * value * value;
    // }
    // 
    // EaseOutCubicD(start, end, value)
    // {
    //     value--;
    //     end -= start;
    //     return 3f * end * value * value;
    // }
    // 
    // EaseInOutCubicD(start, end, value)
    // {
    //     value /= .5f;
    //     end -= start;
    // 
    //     if (value < 1)
    //     {
    //         return (3f / 2f) * end * value * value;
    //     }
    // 
    //     value -= 2;
    // 
    //     return (3f / 2f) * end * value * value;
    // }
    // 
    // EaseInQuartD(start, end, value)
    // {
    //     return 4f * (end - start) * value * value * value;
    // }
    // 
    // EaseOutQuartD(start, end, value)
    // {
    //     value--;
    //     end -= start;
    //     return -4f * end * value * value * value;
    // }
    // 
    // EaseInOutQuartD(start, end, value)
    // {
    //     value /= .5f;
    //     end -= start;
    // 
    //     if (value < 1)
    //     {
    //         return 2f * end * value * value * value;
    //     }
    // 
    //     value -= 2;
    // 
    //     return -2f * end * value * value * value;
    // }
    // 
    // EaseInQuintD(start, end, value)
    // {
    //     return 5f * (end - start) * value * value * value * value;
    // }
    // 
    // EaseOutQuintD(start, end, value)
    // {
    //     value--;
    //     end -= start;
    //     return 5f * end * value * value * value * value;
    // }
    // 
    // EaseInOutQuintD(start, end, value)
    // {
    //     value /= .5f;
    //     end -= start;
    // 
    //     if (value < 1)
    //     {
    //         return (5f / 2f) * end * value * value * value * value;
    //     }
    // 
    //     value -= 2;
    // 
    //     return (5f / 2f) * end * value * value * value * value;
    // }
    // 
    // EaseInSineD(start, end, value)
    // {
    //     return (end - start) * 0.5f * Math.PI * sin(0.5f * Math.PI * value);
    // }
    // 
    // EaseOutSineD(start, end, value)
    // {
    //     end -= start;
    //     return (Math.PI * 0.5f) * end * cos(value * (Math.PI * 0.5f));
    // }
    // 
    // EaseInOutSineD(start, end, value)
    // {
    //     end -= start;
    //     return end * 0.5f * Math.PI * sin(Math.PI * value);
    // }
    // EaseInExpoD(start, end, value)
    // {
    //     return (10f * NATURAL_LOG_OF_2 * (end - start) * pow(2f, 10f * (value - 1)));
    // }
    // 
    // EaseOutExpoD(start, end, value)
    // {
    //     end -= start;
    //     return 5f * NATURAL_LOG_OF_2 * end * pow(2f, 1f - 10f * value);
    // }
    // 
    // EaseInOutExpoD(start, end, value)
    // {
    //     value /= .5f;
    //     end -= start;
    // 
    //     if (value < 1)
    //     {
    //         return 5f * NATURAL_LOG_OF_2 * end * pow(2f, 10f * (value - 1));
    //     }
    // 
    //     value--;
    // 
    //     return (5f * NATURAL_LOG_OF_2 * end) / (pow(2f, 10f * value));
    // }
    // 
    // EaseInCircD(start, end, value)
    // {
    //     return ((end - start) * value) / Math.Sqrt(1f - value * value);
    // }
    // 
    // EaseOutCircD(start, end, value)
    // {
    //     value--;
    //     end -= start;
    //     return (-end * value) / Math.Sqrt(1f - value * value);
    // }
    // 
    // EaseInOutCircD(start, end, value)
    // {
    //     value /= .5f;
    //     end -= start;
    // 
    //     if (value < 1)
    //     {
    //         return (end * value) / (2f * Math.Sqrt(1f - value * value));
    //     }
    // 
    //     value -= 2;
    // 
    //     return (-end * value) / (2f * Math.Sqrt(1f - value * value));
    // }
    // 
    // EaseInBounceD(start, end, value)
    // {
    //     end -= start;
    //     d = 1f;
    // 
    //     return EaseOutBounceD(0, end, d - value);
    // }
    // 
    // EaseOutBounceD(start, end, value)
    // {
    //     value /= 1f;
    //     end -= start;
    // 
    //     if (value < (1 / 2.75f))
    //     {
    //         return 2f * end * 7.5625f * value;
    //     }
    //     else if (value < (2 / 2.75f))
    //     {
    //         value -= (1.5f / 2.75f);
    //         return 2f * end * 7.5625f * value;
    //     }
    //     else if (value < (2.5 / 2.75))
    //     {
    //         value -= (2.25f / 2.75f);
    //         return 2f * end * 7.5625f * value;
    //     }
    //     else
    //     {
    //         value -= (2.625f / 2.75f);
    //         return 2f * end * 7.5625f * value;
    //     }
    // }
    // 
    // EaseInOutBounceD(start, end, value)
    // {
    //     end -= start;
    //     d = 1f;
    // 
    //     if (value < d * 0.5f)
    //     {
    //         return EaseInBounceD(0, end, value * 2) * 0.5f;
    //     }
    //     else
    //     {
    //         return EaseOutBounceD(0, end, value * 2 - d) * 0.5f;
    //     }
    // }
    // 
    // EaseInBackD(start, end, value)
    // {
    //     s = 1.70158f;
    // 
    //     return 3f * (s + 1f) * (end - start) * value * value - 2f * s * (end - start) * value;
    // }
    // 
    // EaseOutBackD(start, end, value)
    // {
    //     s = 1.70158f;
    //     end -= start;
    //     value = (value) - 1;
    // 
    //     return end * ((s + 1f) * value * value + 2f * value * ((s + 1f) * value + s));
    // }
    // 
    // EaseInOutBackD(start, end, value)
    // {
    //     s = 1.70158f;
    //     end -= start;
    //     value /= .5f;
    // 
    //     if ((value) < 1)
    //     {
    //         s *= (1.525f);
    //         return 0.5f * end * (s + 1) * value * value + end * value * ((s + 1f) * value - s);
    //     }
    // 
    //     value -= 2;
    //     s *= (1.525f);
    //     return 0.5f * end * ((s + 1) * value * value + 2f * value * ((s + 1f) * value + s));
    // }
    // 
    // EaseInElasticD(start, end, value)
    // {
    //     return EaseOutElasticD(start, end, 1f - value);
    // }
    // 
    // EaseOutElasticD(start, end, value)
    // {
    //     end -= start;
    // 
    //     d = 1f;
    //     p = d * .3f;
    //     s;
    //     a = 0;
    // 
    //     if (a == 0f || a < Math.Abs(end))
    //     {
    //         a = end;
    //         s = p * 0.25f;
    //     }
    //     else
    //     {
    //         s = p / (2 * Math.PI) * Math.Asin(end / a);
    //     }
    // 
    //     return (a * Math.PI * d * pow(2f, 1f - 10f * value) *
    //         cos((2f * Math.PI * (d * value - s)) / p)) / p - 5f * NATURAL_LOG_OF_2 * a *
    //         pow(2f, 1f - 10f * value) * sin((2f * Math.PI * (d * value - s)) / p);
    // }
    // 
    // EaseInOutElasticD(start, end, value)
    // {
    //     end -= start;
    // 
    //     d = 1f;
    //     p = d * .3f;
    //     s;
    //     a = 0;
    // 
    //     if (a == 0f || a < Math.Abs(end))
    //     {
    //         a = end;
    //         s = p / 4;
    //     }
    //     else
    //     {
    //         s = p / (2 * Math.PI) * Math.Asin(end / a);
    //     }
    // 
    //     if (value < 1)
    //     {
    //         value -= 1;
    // 
    //         return -5f * NATURAL_LOG_OF_2 * a * pow(2f, 10f * value) * sin(2 * Math.PI * (d * value - 2f) / p) -
    //             a * Math.PI * d * pow(2f, 10f * value) * cos(2 * Math.PI * (d * value - s) / p) / p;
    //     }
    // 
    //     value -= 1;
    // 
    //     return a * Math.PI * d * cos(2f * Math.PI * (d * value - s) / p) / (p * pow(2f, 10f * value)) -
    //         5f * NATURAL_LOG_OF_2 * a * sin(2f * Math.PI * (d * value - s) / p) / (pow(2f, 10f * value));
    // }
    // 
    // SpringD(start, end, value)
    // {
    //     value = Math.Clamp01(value);
    //     end -= start;
    // 
    //     // Damn... Thanks http://www.derivative-calculator.net/
    //     // TODO: And it's a little bit wrong
    //     return end * (6f * (1f - value) / 5f + 1f) * (-2.2f * pow(1f - value, 1.2f) *
    //         sin(Math.PI * value * (2.5f * value * value * value + 0.2f)) + pow(1f - value, 2.2f) *
    //         (Math.PI * (2.5f * value * value * value + 0.2f) + 7.5f * Math.PI * value * value * value) *
    //         cos(Math.PI * value * (2.5f * value * value * value + 0.2f)) + 1f) -
    //         6f * end * (pow(1 - value, 2.2f) * sin(Math.PI * value * (2.5f * value * value * value + 0.2f)) + value
    //         / 5f);
    // 
    // }

}
