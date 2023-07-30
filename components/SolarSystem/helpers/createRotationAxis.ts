import * as THREE from 'three';

export function createRotationAxis(tiltAngle: number) {
	return new THREE.Vector3(
	  Math.sin(THREE.MathUtils.degToRad(tiltAngle)),
	  Math.cos(THREE.MathUtils.degToRad(tiltAngle)),
	  0
	);
  }