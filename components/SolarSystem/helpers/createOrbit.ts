import * as THREE from 'three';

export const createOrbit = (
  innerRadius: number,
  outerRadius: number,
  segments: number,
  scene: THREE.Scene,
  glow: boolean = false, // Add a glow parameter with a default value of false
  tiltAngle: number = 0
) => {
  const orbitGeometry = new THREE.RingGeometry(
    innerRadius,
    outerRadius,
    segments
  );
  orbitGeometry.rotateX(Math.PI / 2 + THREE.MathUtils.degToRad(tiltAngle));
  const material = glow
    ? new THREE.MeshBasicMaterial({
        color: 0xff0000, // Red color for glow
        side: THREE.DoubleSide, // Render both sides
      })
    : new THREE.LineBasicMaterial({ color: 0xffffff });

  const orbit = glow
    ? new THREE.Mesh(orbitGeometry, material) // Use Mesh for glow
    : new THREE.Line(orbitGeometry, material); // Use Line for non-glow
  scene.add(orbit);
  return orbit;
};
