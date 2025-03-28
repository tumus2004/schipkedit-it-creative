import * as THREE from 'three';

export const setPosition = (
  planet: { sphere: THREE.Mesh },
  orbitRadius: number,
  timeFactor: number
) => {
  const orbitAngle =
    (new Date().getTime() / (24 * 60 * 60 * 1000)) * timeFactor;
  const position = new THREE.Vector3(
    orbitRadius * Math.cos(orbitAngle),
    0,
    orbitRadius * Math.sin(orbitAngle)
  );
  planet.sphere.position.copy(position);
};

// Overload to set position from a Vector3
export const setPositionFromVector = (
  planet: { sphere: THREE.Mesh },
  position: THREE.Vector3
) => {
  planet.sphere.position.copy(position);
};
