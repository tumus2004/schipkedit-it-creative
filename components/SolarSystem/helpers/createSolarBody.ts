import configurationConstants from './../constants/configurationConstants';
import { Vector3 } from 'three';
import { createPlanet } from './createPlanet';
import { createPivot } from './createPivot';
import { createOrbit } from './createOrbit';
import { setPosition } from './setPosition';
import planetConstants from '../constants/planetConstants';

interface SolarBodyProps {
  size: number;
  texture: string;
  rotationAxis: Vector3;
  rotationDegrees: number;
  orbitRadius: number;
  scene: THREE.Scene;
  textureLoader: THREE.TextureLoader;
  orbitMultiplier?: number;
}

export const createSolarBody = ({
  size,
  texture,
  rotationAxis,
  rotationDegrees,
  orbitRadius,
  scene,
  orbitMultiplier = 1,
  textureLoader,
}: SolarBodyProps) => {
  const planet = createPlanet(
    size,
    texture,
    rotationAxis,
    rotationDegrees,
    textureLoader
  );

  // 2. Create the pivot.
  const pivot = createPivot(scene, orbitMultiplier);

  // 3. Add the planet to the pivot.
  pivot.add(planet.sphere);

  // 4. Create the orbit.
  createOrbit(
    orbitRadius,
    orbitRadius,
    planetConstants.ORBIT_SEGMENTS,
    scene,
    orbitMultiplier
  );

  // 5. Set the position of the planet.
  setPosition(planet, orbitRadius, rotationDegrees / orbitMultiplier);

  return { planet, pivot };
};
