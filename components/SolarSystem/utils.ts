import axios from 'axios';
import * as THREE from 'three';

interface PlanetPosition {
  x: number;
  y: number;
  z: number;
}

export interface PlanetPositions {
  Mercury: PlanetPosition;
  Venus: PlanetPosition;
  Earth: PlanetPosition;
  Mars: PlanetPosition;
}

// JPL Horizons object IDs:
// 199 = Mercury
// 299 = Venus
// 399 = Earth
// 499 = Mars
const PLANET_IDS = {
  Mercury: '199',
  Venus: '299',
  Earth: '399',
  Mars: '499'
};

// Default orbital angles (in radians) - these will be used if API fails
const DEFAULT_ORBITAL_POSITIONS = {
  Mercury: Math.PI * 0.5,    // 90 degrees
  Venus: Math.PI * 1.2,      // ~216 degrees
  Earth: Math.PI * 1.8,      // ~324 degrees
  Mars: Math.PI * 0.3        // ~54 degrees
};

export const fetchPlanetData = async (): Promise<PlanetPositions> => {
  console.log("Fetching planet data...");
  const today = new Date().toISOString().split('T')[0];
  
  // Start with default positions that are guaranteed to work
  const planetPositions: PlanetPositions = {
    Mercury: getDefaultPosition(DEFAULT_ORBITAL_POSITIONS.Mercury),
    Venus: getDefaultPosition(DEFAULT_ORBITAL_POSITIONS.Venus),
    Earth: getDefaultPosition(DEFAULT_ORBITAL_POSITIONS.Earth),
    Mars: getDefaultPosition(DEFAULT_ORBITAL_POSITIONS.Mars)
  };
  
  try {
    const BASE_URL = 'https://ssd.jpl.nasa.gov/api/horizons.api';
    
    // Fetch positions for each planet
    for (const [planet, id] of Object.entries(PLANET_IDS)) {
      const CONFIG_PARAMS = `?format=json&COMMAND='${id}'&MAKE_EPHEM='YES'&EPHEM_TYPE='VECTORS'&CENTER='@10'&START_TIME='${today}'&STOP_TIME='${today}'&STEP_SIZE='1%20d'`;
      
      try {
        const response = await axios.get(`${BASE_URL}${CONFIG_PARAMS}`);
        
        // Parse the vector data
        if (response.data && response.data.result) {
          // Extract the X, Y, Z position from the response
          const vectorData = parseVectorDataFromHorizons(response.data.result);
          if (vectorData) {
            console.log(`Fetched position for ${planet}:`, vectorData);
            planetPositions[planet as keyof PlanetPositions] = vectorData;
          }
        }
      } catch (error) {
        console.error(`Error fetching data for ${planet}:`, error);
        // Keep using the default position for this planet
      }
    }
    
    console.log("Final planet positions:", planetPositions);
    return planetPositions;
  } catch (error) {
    console.error('Error in fetchPlanetData:', error);
    // Return default positions if API fails
    return planetPositions;
  }
};

// Helper function to create a default position based on an angle
function getDefaultPosition(angle: number): PlanetPosition {
  return {
    x: Math.cos(angle),
    y: 0,
    z: Math.sin(angle)
  };
}

// Helper function to extract vector data from Horizons API response
function parseVectorDataFromHorizons(resultText: string): PlanetPosition | null {
  try {
    // The vector data in the response is in a specific format
    // This regex tries to find the X, Y, Z coordinates
    const vectorMatch = resultText.match(/X\s*=\s*([\-\d\.]+)\s*Y\s*=\s*([\-\d\.]+)\s*Z\s*=\s*([\-\d\.]+)/i);
    
    if (vectorMatch && vectorMatch.length >= 4) {
      // Create a position with the raw data
      const position = {
        x: parseFloat(vectorMatch[1]),
        y: parseFloat(vectorMatch[3]), // Note: In Three.js, Y is up, but in astronomical data, Z is often up
        z: parseFloat(vectorMatch[2])
      };
      
      // Normalize the position to create a unit vector (direction only)
      return normalizePosition(position);
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing vector data:', error);
    return null;
  }
}

// Converts astronomical position data to Three.js scene coordinates
export const convertAstronomicalToSceneCoordinates = (
  astronomicalPosition: PlanetPosition,
  orbitRadius: number
): THREE.Vector3 => {
  // Scale to fit the orbit radius in our model
  const scaledPosition = new THREE.Vector3(
    astronomicalPosition.x * orbitRadius,
    astronomicalPosition.y * orbitRadius,
    astronomicalPosition.z * orbitRadius
  );
  
  return scaledPosition;
};

// Normalizes a position vector to have a magnitude of 1
function normalizePosition(position: PlanetPosition): PlanetPosition {
  const magnitude = Math.sqrt(
    position.x * position.x + 
    position.y * position.y + 
    position.z * position.z
  );
  
  if (magnitude === 0) return { x: 1, y: 0, z: 0 }; // Default to x-axis if magnitude is 0
  
  return {
    x: position.x / magnitude,
    y: position.y / magnitude,
    z: position.z / magnitude
  };
}
