// Multiples of 60 is 1 hour per second. 120 is 2 hours per second etc...
let BASE_SPEED = 480;

// Planet rotation time in real world days
export const rotationTimeInDays = {
  Earth: 1,
  Sun: 25.38,
  Mars: 1.03,
  Venus: 243,
  Mercury: 58.6,
  Moon: 27.3,
};

// Planet orbit time in real world days
export const orbitTimeInDays = {
  Earth: 365.25,
  Mars: 687,
  Venus: 224.7,
  Mercury: 88,
  Sun: 0,
  Moon: 27.3,
};

export const distancePerOrbitInKm = {
  Earth: 94000000,
  Mars: 1430000000,
  Venus: 679000000,
  Mercury: 363000000,
  Sun: 0,
};

export const rotationDegreesPerMillisecond = {
  Earth: 0.000004167 * BASE_SPEED,
  Mars: 0.000004057 * BASE_SPEED,
  Venus: 0.00000001714 * BASE_SPEED,
  Mercury: 0.0000000711 * BASE_SPEED,
  Sun: 0.0000001643 * BASE_SPEED,
  Moon: 0.0000001643 * BASE_SPEED,
};

export const orbitDegreesPerMillisecond = {
  Earth: 0.0000000114077 * BASE_SPEED,
  Mars: 0.000000006067 * BASE_SPEED,
  Venus: 0.00000001854 * BASE_SPEED,
  Mercury: 0.00000004736 * BASE_SPEED,
  Moon: 0.00000004736 * BASE_SPEED,
  Sun: 0,
};

export const SUN_SIZE = 3;
export const SUN_TEXTURE = '/thesun.jpg';
export const SUN_AXIS_TILT_ANGLE = 7.25;

export const EARTH_SIZE = 1;
export const EARTH_TEXTURE = '/earthtexture.jpg';
export const EARTH_ORBIT_RADIUS = 10;
export const EARTH_AXIS_TILT_ANGLE = 23.5;

export const MARS_SIZE = 0.53;
export const MARS_TEXTURE = '/marstexture.png';
export const MARS_ORBIT_RADIUS = 15.3;
export const MARS_AXIS_TILT_ANGLE = 25.19;

export const VENUS_SIZE = 0.949;
export const VENUS_TEXTURE = '/venustexture.jpg';
export const VENUS_ORBIT_RADIUS = 7.2;
export const VENUS_AXIS_TILT_ANGLE = 3;

export const MERCURY_SIZE = 0.38;
export const MERCURY_TEXTURE = '/mercurytexture.jpg';
export const MERCURY_ORBIT_RADIUS = 3.9;
export const MERCURY_AXIS_TILT_ANGLE = 0.03;

export const ORBIT_SEGMENTS = 1024;
export const ORBIT_LINE_COLOR = 0xffffff;
export const ORBIT_INNER_RADIUS = 9.95;
export const ORBIT_OUTER_RADIUS = 10.05;
export const ORBIT_TILT_ANGLE = 1.85;

export const MOON_SIZE = 0.272;
export const MOON_TEXTURE = '/moontexture.jpg';
export const MOON_ORBIT_RADIUS = EARTH_SIZE + 0.5257;

// Assuming same tilt axis as earth for simplicity
export const MOON_AXIS_TILT_ANGLE = (1 / 4) * EARTH_AXIS_TILT_ANGLE;
