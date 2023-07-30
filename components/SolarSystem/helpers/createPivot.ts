import * as THREE from 'three';

export const createPivot = (scene: THREE.Scene, tiltAngle: number = 0) => {
  const pivot = new THREE.Object3D();
  pivot.rotation.x = THREE.MathUtils.degToRad(tiltAngle);
  scene.add(pivot);
  return pivot;
};
