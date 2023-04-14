import * as React from "react";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Physics, usePlane, useSphere } from "@react-three/cannon";
import {
  SSAO,
  EffectComposer,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import {
  Environment,
  MeshTransmissionMaterial,
  ContactShadows,
} from "@react-three/drei";

function InstancedSpheres({ count = 200 }) {
  const { viewport } = useThree();
  const [ref] = useSphere((index) => ({
    mass: 10,
    position: [4 - Math.random() * 8, viewport.height, 0, 0],
    args: [1.4],
  }));

  return (
    <>
      <instancedMesh castShadow ref={ref} args={[null, null, count]}>
        <sphereGeometry args={[1.4, 17, 17]} />
        <meshStandardMaterial fog={false} roughness={0} color="#0080df" />
      </instancedMesh>

      {/*
      <ContactShadows
        scale={100}
        opacity={1}
        position={[0, -viewport.height / 2 + 0.3, 0]}
        color="#000"
      />
      */}
    </>
  );
}

function Plane({ ...props }) {
  usePlane(() => ({ ...props }));
  return null;
}

function Borders() {
  const { viewport } = useThree();

  return (
    <>
      <Plane
        position={[0, -viewport.height / 2 + 0.1, 0]}
        rotation={[-Math.PI * 0.5, 0, 0]}
      />
      <Plane
        position={[-viewport.width / 2 - 4.5, 0, 0]}
        rotation={[0, Math.PI * 0.6, 0]}
      />
      <Plane
        position={[viewport.width / 2 + 4.5, 0, 0]}
        rotation={[0, -Math.PI * 0.6, 0]}
      />
      <Plane position={[0, 0, -1]} rotation={[0, 0, 0]} />
      <Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
    </>
  );
}

function Mouse() {
  const { viewport } = useThree();
  const [, api] = useSphere(() => ({ type: "Kinematic", args: [4.2] }));

  return useFrame((state) => {
    api.position.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      7
    );
  });
}

function MouseSphere() {
  const { viewport } = useThree();
  const mouseSphereRef = useRef();

  useFrame((state) => {
    mouseSphereRef.current.position.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      7
    );
  });

  return (
    <mesh receiveShadow ref={mouseSphereRef}>
      <sphereGeometry args={[4, 20, 20]} />
      <meshStandardMaterial color="#ff8100" roughness={0.2} />
      {/*
      <MeshTransmissionMaterial
        samples={8}
        resolution={768}
        transmission={0.7}
        thickness={3.5}
        roughness={0.0}
        ior={1.5}
        background="orange"
        transmissionSampler={false}
        meshPhysicalMaterial={false}
        backside={false}
        color="#ff8100"
        temporalDistortion={2}
        distortion={0.2}
      />
      */}
    </mesh>
  );
}

function Ground({
  position,
  rotation = [-Math.PI * 0.5, 0, 0],
  color = "#00483f",
}) {
  const { viewport } = useThree();

  return (
    <>
      <mesh
        scale={[1000, 100, 10]}
        position={[0, -viewport.height / 2 + 0.3, 0]}
        rotation={rotation}
      >
        <planeGeometry />
        <meshPhongMaterial
          attach="material"
          receiveShadow
          opacity={0.4}
          transparent
          fog={false}
          color={color}
        />
      </mesh>

      <mesh
        scale={[1000, 100, 10]}
        position={[0, -viewport.height / 2 + 0.3, -100]}
        rotation={[0, 0, 0]}
      >
        <planeGeometry />
        <meshPhongMaterial
          attach="material"
          receiveShadow
          opacity={0.4}
          transparent
          fog={false}
          color={color}
        />
      </mesh>
    </>
  );
}

function Experience() {
  return (
    <div
      id="gradient-bg"
      className="flex h-[90%] bg-gradient-to-t from-[#00164b] from-5% from-[#004b98] from-15% via-[#00aaff] via-35% to-[#0068ab] to-114% relative"
    >
      <Canvas
        shadows
        camera={{
          position: [0, 0, 20],
          fov: 50,
          near: 0.1,
          far: 100,
        }}
      >
        <fog attach="fog" near={23} far={28} color="#08539f" />
        <Environment preset="warehouse" blur={1} resolution={256} />
        {/*<color attach="background" args={["#147AC5"]} />*/}

        <ambientLight intensity={0} />
        <directionalLight
          color="#06B4FF"
          position={[0, 10, -10]}
          intensity={4}
          castShadow
        />

        <Suspense>
          <Physics
            gravity={[0, -30, 0]}
            defaultContactMaterial={{ restitution: 0.5 }}
          >
            <group position={[0, 0, -10]}>
              <Mouse />
              <MouseSphere />
              <Borders />
              <InstancedSpheres castShadow count={175} />
            </group>
          </Physics>
        </Suspense>

        <EffectComposer>
          <SSAO
            radius={0.1}
            intensity={40}
            luminanceInfluence={0.4}
            color="#025d8d"
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default Experience;
