import * as THREE from 'three';

export const createOrbit = (
  innerRadius: number,
  outerRadius: number,
  segments: number,
  scene: THREE.Scene,
  glow: boolean = false,
  tiltAngle: number = 0
) => {
  const orbitGeometry = new THREE.RingGeometry(
    innerRadius,
    outerRadius,
    segments
  );
  orbitGeometry.rotateX(Math.PI / 2 + THREE.MathUtils.degToRad(tiltAngle));
  const material = new THREE.LineBasicMaterial({
    color: glow ? 0xff0000 : 0xffffff, // Red color if glow is enabled
  });
  const orbit = new THREE.Line(
    orbitGeometry,
    new THREE.LineBasicMaterial({ color: 0xffffff })
  );
  scene.add(orbit);
  return orbit;
};
