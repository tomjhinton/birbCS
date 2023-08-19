export default /* glsl */`uniform float uTime;

varying vec2 vUv;
uniform vec2 uResolution;
uniform vec2  uMousePosition;
float PI = 3.142;

  
vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;

}

void coswarp(inout vec3 trip, float warpsScale ){

  trip.xyz += warpsScale * .1 * sin(3. * trip.yzx + (1. * .15));
  trip.xyz += warpsScale * .05 * sin(11. * trip.yzx + (1. * .15));
  trip.xyz += warpsScale * .025 * sin(17. * trip.yzx + (1. * .15));
  
}  

void uvRipple(inout vec2 uv, float intensity){

vec2 p = uv -.5;


  float cLength=length(p);

   uv= uv +(p/cLength)*cos(cLength*15.0-uTime*.5)*intensity;

} 


float shape( in vec2 p, float sides ,float size)
{
  
   float d = 0.0;
  vec2 st = p *2.-1.;

  // Number of sides of your shape
  float N = sides ;

  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+PI ;
  float r = (2.* PI)/(N) ;

  // Shaping function that modulate the distance
  d = cos(floor(.5+a/r)*r-a)*length(st);
  

  return  1.0-smoothstep(size,size +.1,d);
}





void main() {
  vec2 uv = vUv;
  vec2 uv2 = uv;
  uv = (gl_FragCoord.xy - uResolution * .5) / uResolution.yy + 0.5;
 
 vec3 color = vec3(0.);
  
 

      float t = (uTime) + length(uv-.5);

   float alpha = 1.;


     

        vec3 color2 = vec3(uv.x, uv.y, 1.);
        coswarp(color, 3.);
        coswarp(color, 3.);
        coswarp(color, 3.);

      //  color = vec3(step(color.r, .5), step(color.g, .5), step(color.b, .5)) ;
      // color = mix(color, color2, .5);

      color = mix(color2, color, length(uMousePosition.xy));

        float distanceToCenter = distance(gl_PointCoord, vec2(.5));
    alpha = 1.-step(shape(gl_PointCoord, 4., .5), .5);

    alpha = mix(alpha, 1.-step(shape(gl_PointCoord, 40., .5), .5), sin(uTime) );
      
    

  
    gl_FragColor = vec4(vec3(color.r, color.g, color.b), alpha);
}`