import THREE from 'three';

export const createPivot = (scene: THREE.Scene) => {
  const pivot = new THREE.Object3D();
  scene.add(pivot);
  return pivot;
};
