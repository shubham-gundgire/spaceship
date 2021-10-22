import "./styles.css";
import {Canvas,useLoader,useFrame} from '@react-three/fiber';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {Suspense,useRef,useState} from 'react';
import {OrbitControls} from '@react-three/drei'
const GROUND_HEIGHT = -50; // A Constant to store the ground height of the game.

// A Ground plane that moves relative to the player. The player stays at 0,0
function Terrain() {
  const terrain = useRef();

  useFrame(() => {
    terrain.current.position.z += 0.9;
  });
  return (
    <mesh
      visible
      position={[0, GROUND_HEIGHT, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      ref={terrain}
    >
      <planeBufferGeometry attach="geometry" args={[5000, 5000, 128, 128]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        roughness={1}
        metalness={0}
        wireframe
      />
    </mesh>
  );
}
const Cube=()=>{
  return(
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
     <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
      </mesh>
  )
}
function ArWing() {
  const ship=useRef()
  const [shipPosition, setShipPosition] = useState();
  
  const { nodes } = useLoader(GLTFLoader, "model/arwing.glb");
  


 
 
 
  return (
    <group ref={ship}>
      <mesh visible geometry={nodes.Default.geometry}>
        <meshStandardMaterial
          attach="material"
          color="grey"
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
    </group>
  );
}
export default function App() {
  return (
    <>
    <Canvas>
    <directionalLight intensity={0.5} />
      <Suspense fallback={<Cube />}>
        <ArWing />
      </Suspense>
      <Terrain/>
      <OrbitControls/>
      </Canvas>
    </>
  );
}
