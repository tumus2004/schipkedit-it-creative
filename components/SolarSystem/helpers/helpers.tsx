import * as THREE from 'three';
import { Mesh, Object3D } from 'three';

type Planet = {
  sphere: Mesh | Object3D;
  rotate: () => void;
};

export const createPlanet = (
  radius: number,
  texture: string,
  rotationAxis: THREE.Vector3,
  rotationSpeed: number,
  textureLoader: THREE.TextureLoader
): Planet => {
  const planetTexture = textureLoader.load(texture);
  const geometry = new THREE.SphereGeometry(radius, 64, 64);
  const material = new THREE.MeshStandardMaterial({ map: planetTexture });
  const sphere = new THREE.Mesh(geometry, material);

  const rotate = () => {
    sphere.rotateOnAxis(rotationAxis, rotationSpeed);
  };

  return { sphere, rotate };
};

export const createOrbit = (
  innerRadius: number,
  outerRadius: number,
  segments: number,
  scene: THREE.Scene,
  tiltAngle: number = 0
) => {
  const geometry = new THREE.RingGeometry(innerRadius, outerRadius, segments);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = THREE.MathUtils.degToRad(tiltAngle);
  scene.add(mesh);
};

export const createPivot = (scene: THREE.Scene, tiltAngle: number = 0) => {
  const pivot = new THREE.Object3D();
  pivot.rotation.x = THREE.MathUtils.degToRad(tiltAngle);
  scene.add(pivot);
  return pivot;
};

export const setPosition = (
  planet: Planet,
  orbitRadius: number,
  orbitSpeed: number
) => {
  planet.sphere.position.x = orbitRadius * Math.cos(orbitSpeed);
  planet.sphere.position.z = orbitRadius * Math.sin(orbitSpeed);
};
