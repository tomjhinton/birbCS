import { OrbitControls , shaderMaterial, Center, Text, Float, Point, Points} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'


function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
  }
  return res;
}


let plane = new THREE.PlaneGeometry( 3.5, 3.5, 30, 30 );




let planeArr = Array.from(sliceIntoChunks(plane.attributes.position.array, 3))

export default function Experience(){
 

    const PointMaterial = shaderMaterial(

        {
            uTime: 0,
            uResolution: {x: screen.width, y: screen.height},
            uMousePosition: {x: 2, y: 2}
            
           
        },
        vertexShader,
        fragmentShader,
    
        
    )
    extend({PointMaterial})

    console.log(PointMaterial)

const ref = useRef()
// Hold state for hovered and clicked events
const [hovered, hover] = useState(false)
const [clicked, click] = useState(false)




const pointMaterial = useRef()
useFrame((state, delta) => {
   pointMaterial.current.uTime += delta
   ref.current.rotation.z +=(delta * .5)

    if (
     pointMaterial.current.uResolution.x === 0 &&
     pointMaterial.current.uResolution.y === 0
    ) {
     pointMaterial.current.uResolution.x = screen.width;
     pointMaterial.current.uResolution.y = screen.height;
     
    }
})


// Subscribe this component to the render-loop, rotate the mesh every frame
// useFrame((state, delta) => (ref.current.rotation.x += delta))
    return(

<>
{/* <OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/> */}




    <Points
  limit={1000} 
  range={1000} 
  ref={ref}
  onPointerOver={ (e)=>{
    pointMaterial.current.uMousePosition = e.pointer
  }}
    >
      
      {planeArr.map( (x, i) => {
        
        return(
          <>
        <Point position={[x[0], x[1], x[2]]}  key={i}   position2={[planeArr[i][0], planeArr[i][1], planeArr[i][2]]}
        />
         <pointMaterial ref={pointMaterial} depthWrite={false} transparent />
        </>
      )} )}
    </Points>
      </>
    )
}