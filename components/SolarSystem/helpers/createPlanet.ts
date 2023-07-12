import * as THREE from 'three';

interface Planet {
  sphere: THREE.Mesh;
  rotate: () => void;
}

const createPlanet = (
  radius: number,
  texture: string,
  rotationAxis: THREE.Vector3,
  rotationSpeed: number,
  textureLoader: THREE.TextureLoader
): Planet => {
  // Load the texture
  const planetTexture = textureLoader.load(texture);

  // Create the sphere
  const geometry = new THREE.SphereGeometry(radius, 64, 64);
  const material = new THREE.MeshStandardMaterial({ map: planetTexture });
  const sphere = new THREE.Mesh(geometry, material);

  const rotate = () => {
    sphere.rotateOnAxis(rotationAxis, rotationSpeed);
  };

  return { sphere, rotate };
};

export default createPlanet;
