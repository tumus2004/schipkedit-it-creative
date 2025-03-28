import configurationConstants from './../constants/configurationConstants';
import { Vector3 } from 'three';
import { createPlanet } from './createPlanet';
import { createPivot } from './createPivot';
import { createOrbit } from './createOrbit';
import { setPosition, setPositionFromVector } from './setPosition';
import planetConstants from '../constants/planetConstants';
import * as THREE from 'three';

interface SolarBodyProps {
  size: number;
  texture: string;
  rotationAxis: Vector3;
  rotationDegrees: number;
  orbitRadius: number;
  scene: THREE.Scene;
  textureLoader: THREE.TextureLoader;
  orbitMultiplier?: number;
  initialPosition?: Vector3;
  name: string;
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
  initialPosition,
  name,
}: SolarBodyProps) => {
  const planet = createPlanet(
    size,
    texture,
    rotationAxis,
    rotationDegrees,
    textureLoader,
    name
  );

  // Add click handler if needed
  if (name) {
    planet.sphere.userData.planetName = name;
    planet.sphere.userData.clickable = true;
  }

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
  if (initialPosition && isValidPosition(initialPosition)) {
    console.log(`Setting ${name} to API-provided position:`, initialPosition);
    planet.sphere.position.copy(initialPosition);
  } else {
    console.log(`Using default position calculation for ${name}`);
    // Use default position with a random offset to avoid all planets being in the same place
    const randomOffset = Math.random() * 0.5; // Small random offset to stagger planets
    const angle = (name === 'earth') ? 0 : 
                  (name === 'mars') ? Math.PI * (0.3 + randomOffset) : 
                  (name === 'venus') ? Math.PI * (1.2 + randomOffset) : 
                  (name === 'mercury') ? Math.PI * (0.5 + randomOffset) : 0;
                  
    const defaultPosition = new THREE.Vector3(
      orbitRadius * Math.cos(angle),
      0,
      orbitRadius * Math.sin(angle)
    );
    
    planet.sphere.position.copy(defaultPosition);
  }

  return { planet, pivot };
};

// Check if a position is valid (not NaN, finite, and within reasonable bounds)
function isValidPosition(position: Vector3): boolean {
  // Check if any component is NaN or not finite
  if (isNaN(position.x) || !isFinite(position.x) ||
      isNaN(position.y) || !isFinite(position.y) ||
      isNaN(position.z) || !isFinite(position.z)) {
    return false;
  }
  
  // Check if position magnitude is within a reasonable range
  const magnitude = position.length();
  return magnitude > 0 && magnitude < 1000; // Arbitrary large upper bound
}
