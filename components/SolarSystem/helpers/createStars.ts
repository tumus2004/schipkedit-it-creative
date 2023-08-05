import * as THREE from 'three';

export function createStars(numStars = 1000, spread = 1000, color = 0xaaaaaa) {
  const starCoords = [];

  for (let i = 0; i < numStars; i++) {
    const x = THREE.MathUtils.randFloatSpread(spread);
    const y = THREE.MathUtils.randFloatSpread(spread);
    const z = THREE.MathUtils.randFloatSpread(spread);

    starCoords.push(x, y, z);
  }

  const starsGeometry = new THREE.BufferGeometry();
  starsGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(starCoords, 3)
  );

  const starsMaterial = new THREE.PointsMaterial({ color: color });

  return new THREE.Points(starsGeometry, starsMaterial);
}
