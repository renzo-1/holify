/* eslint-disable */
import * as THREE from "three";
import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { OrbitControls, Stage } from "@react-three/drei";

type GLTFResult = GLTF & {
  nodes: {
    diploma1: THREE.Mesh;
  };
  materials: {};
};

function Diploma(props: JSX.IntrinsicElements["group"]) {
  // This reference will give us direct access to the THREE.Mesh object
  const meshRef = useRef<THREE.Mesh>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => (meshRef.current.rotation.y += 0.01));
  // const gltf = useLoader(GLTFLoader, "/Diploma.gltf");

  const { nodes, materials } = useGLTF("/Diplomav2.glb") as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef}
        // rotation={[-0.5, 0, 0]}
        castShadow
        receiveShadow
        geometry={nodes.diploma1.geometry}
        material={nodes.diploma1.material}
        scale={0.08}
      />
    </group>
  );
}

export default function Hero3d() {
  const ref = useRef<any>();

  return (
    <Canvas
      shadows={"percentage"}
      dpr={[1, 2]}
      camera={{ fov: 50, position: [90, 90, 0] }}
    >
      <Suspense fallback={null}>
        <Stage
          preset="soft"
          intensity={0.5}
          environment="city"
          shadows={"contact"}
        >
          <Diploma position={[0, 0, 0]} />
        </Stage>
      </Suspense>
      <OrbitControls ref={ref} autoRotate minDistance={1.2} maxDistance={1.5} />
    </Canvas>
  );
}
useGLTF.preload("/Diploma.glb");
