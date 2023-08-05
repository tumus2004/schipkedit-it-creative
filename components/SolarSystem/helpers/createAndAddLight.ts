import * as THREE from 'three';

export function createAndAddLight(
  color: THREE.ColorRepresentation | undefined,
  intensity: number | undefined,
  distance: number | undefined,
  position: [number, number, number],
  scene: THREE.Scene
) {
  const light = new THREE.PointLight(color, intensity, distance);
  light.position.set(...position);
  scene.add(light);
}
