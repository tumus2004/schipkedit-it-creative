export const PLANETS = [
  {
    id: 'Earth',
    texture: '/texture.png',
    size: 1,
    relativeRotationSpeed: 1,
    tiltAngle: 23.44,
    orbitRadius: 10,
    orbitSpeed: 1 / 365.25,
    orbitTiltAngle: 0,
  },
  {
    id: 'Mars',
    texture: '/marstexture.jpg',
    size: 0.53,
    rotationSpeed: 1.03,
    tiltAngle: 25.19,
    orbitRadius: 3,
    orbitSpeed: 0.524,
    orbitTiltAngle: 1.85,
  },
  // ... add other planets here
];

export const ORBIT = {
  innerRadius: 0.7,
  outerRadius: 1,
  segments: 1024,
};

export const CAMERA = {
  aspect: 0.7,
  near: 0.1,
  far: 1000,
};

export const LIGHT = {
  color: 0xffffff,
  intensity: 1,
  distance: 500,
};

export const BASE_SPEED = 0.002;

export const SCENE_SIZE = {
  375: 50,
  768: 55,
  1024: 60,
  1440: 65,
  1920: 70,
};

export const ORBIT_SEGMENTS = 1024;
