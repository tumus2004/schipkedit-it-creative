import * as THREE from 'three';

interface Planet {
  sphere: THREE.Mesh;
  rotate: (deltaTime: number) => void;
}

export const createPlanet = (
  radius: number,
  texture: string,
  rotationAxis: THREE.Vector3,
  rotationAngle: number,
  textureLoader: THREE.TextureLoader,
  name?: string
): Planet => {
  const planetTexture = textureLoader.load(texture);
  const geometry = new THREE.SphereGeometry(radius, 64, 64);
  const material = new THREE.MeshStandardMaterial({ map: planetTexture });
  const sphere = new THREE.Mesh(geometry, material);
  
  if (name) {
    sphere.name = name;
  }

  const rotate = (deltaTime: number) => {
    sphere.rotateOnAxis(rotationAxis, rotationAngle * deltaTime);
  };

  return { sphere, rotate };
};
