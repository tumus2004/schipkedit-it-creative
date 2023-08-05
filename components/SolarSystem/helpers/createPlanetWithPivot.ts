import { createPivot } from './createPivot';
import { createPlanet } from './createPlanet';

export const createPlanetWithPivot = (
  radius: number,
  texture: string,
  rotationAxis: THREE.Vector3,
  rotationAngle: number,
  textureLoader: THREE.TextureLoader,
  scene: THREE.Scene,
  tiltAngle: number = 0
) => {
  const planet = createPlanet(
    radius,
    texture,
    rotationAxis,
    rotationAngle,
    textureLoader
  );
  const planetPivot = createPivot(scene, tiltAngle);
  planetPivot.add(planet.sphere);
  return { ...planet, pivot: planetPivot };
};
