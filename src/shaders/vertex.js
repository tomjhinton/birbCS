export default /* glsl */ `
varying vec2 vUv;
uniform float uTime;
uniform vec2 uMousePosition;
attribute vec3 position2;
float PI = 3.142;


void coswarp(inout vec3 trip, float warpsScale ){

    trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (uTime * .15));
    trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (uTime * .15));
    trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (uTime * .15));
    
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

  

  void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.);
       

      // modelPosition.z += (length(modelPosition.xy) * uMousePosition.x) *.2 ;


  
   

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectionPosition;
    gl_PointSize = mix( (350. * (2.-length(modelPosition.xy))) * 1. * 1. , 350., sin(uTime) );
    gl_PointSize *= (1.0/ -viewPosition.z);

    vUv = uv;
}`