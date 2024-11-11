"use client";
import { Box, Torus } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
export default function BackgroundCanvas() {
  return (
    <>
      <Canvas>
        <Suspense>
          <Physics debug>
            <RigidBody colliders={"hull"} restitution={2}>
              <Torus />
            </RigidBody>

            <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  );
}
