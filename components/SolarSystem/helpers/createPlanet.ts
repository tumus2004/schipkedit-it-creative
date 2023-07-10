import * as THREE from 'three';
import { EARTH_ORBIT_RADIUS } from '../constants';

interface Planet {
  sphere: THREE.Mesh;
  rotate: () => void;
  orbit: () => void;
}

const createPlanet = (
  radius: number,
  texture: string,
  rotationAxis: THREE.Vector3,
  orbitalSpeed: number,
  rotationSpeed: number,
  textureLoader: THREE.TextureLoader
): Planet => {
  // Load the texture
  const planetTexture = textureLoader.load(texture);

  let angle = 0;

  // Create the orbit
  const orbit = () => {
    angle += orbitalSpeed;
    sphere.position.x = EARTH_ORBIT_RADIUS * Math.cos(angle);
    sphere.position.z = EARTH_ORBIT_RADIUS * Math.sin(angle);
  };

  // Create the sphere
  const geometry = new THREE.SphereGeometry(radius, 64, 64);
  const material = new THREE.MeshStandardMaterial({ map: planetTexture });
  const sphere = new THREE.Mesh(geometry, material);

  const rotate = () => {
    sphere.rotateOnAxis(rotationAxis, rotationSpeed);
  };

  return { sphere, rotate, orbit };
};

export default createPlanet;
