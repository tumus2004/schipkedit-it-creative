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

const planetConstants = {
  SUN_SIZE: 3,
  SUN_TEXTURE: '/thesun.jpg',
  SUN_AXIS_TILT_ANGLE: 7.25,

  EARTH_SIZE: 1,
  EARTH_TEXTURE: '/earthtexture.jpg',
  EARTH_ORBIT_RADIUS: 10,
  EARTH_AXIS_TILT_ANGLE: 23.5,

  MARS_SIZE: 0.53,
  MARS_TEXTURE: '/marstexture.png',
  MARS_ORBIT_RADIUS: 15.3,
  MARS_AXIS_TILT_ANGLE: 25.19,

  VENUS_SIZE: 0.949,
  VENUS_TEXTURE: '/venustexture.jpg',
  VENUS_ORBIT_RADIUS: 7.2,
  VENUS_AXIS_TILT_ANGLE: 3,

  MERCURY_SIZE: 0.38,
  MERCURY_TEXTURE: '/mercurytexture.jpg',
  MERCURY_ORBIT_RADIUS: 3.9,
  MERCURY_AXIS_TILT_ANGLE: 0.03,

  ORBIT_SEGMENTS: 1024,
  ORBIT_LINE_COLOR: 0xffffff,
  ORBIT_INNER_RADIUS: 9.95,
  ORBIT_OUTER_RADIUS: 10.05,
  ORBIT_TILT_ANGLE: 1.85,

  MOON_SIZE: 0.272,
  MOON_TEXTURE: '/moontexture.jpg',
  MOON_ORBIT_RADIUS: 0.5257,

  MOON_AXIS_TILT_ANGLE: 5.875,
};

// // Constants for planets
// export const PLANETS_CONFIGURATION = [
//   {
//     name: 'Sun',
//     size: 3,
//     texture: '/thesun.jpg',
//     axisTiltAngle: 7.25,
//     rotationSpeed: 0.0000001643 * BASE_SPEED,
//     orbitRadius: 0,
//     orbitSpeed: 0,
//   },
//   {
//     name: 'Earth',
//     size: 1,
//     texture: '/earthtexture.jpg',
//     axisTiltAngle: 23.5,
//     orbitRadius: 10,
//     rotationSpeed: 0.000004167 * BASE_SPEED,
//     orbitSpeed: 0.0000000114077 * BASE_SPEED,
//     moon: {
//       size: 0.272,
//       texture: '/moontexture.jpg',
//       orbitRadius: 1 + 0.5257,
//       axisTiltAngle: (1 / 4) * 23.5,
//       rotationSpeed: 0.0000001643 * BASE_SPEED,
//       orbitSpeed: 0.00000004736 * BASE_SPEED,
//     },
//   },
//   {
//     name: 'Mars',
//     size: 0.53,
//     texture: '/marstexture.png',
//     axisTiltAngle: 25.19,
//     orbitRadius: 15.3,
//     rotationSpeed: 0.000004057 * BASE_SPEED,
//     orbitSpeed: 0.000000006067 * BASE_SPEED,
//   },
//   {
//     name: 'Venus',
//     size: 0.949,
//     texture: '/venustexture.jpg',
//     axisTiltAngle: 3,
//     orbitRadius: 7.2,
//     rotationSpeed: 0.00000001714 * BASE_SPEED,
//     orbitSpeed: 0.00000001854 * BASE_SPEED,
//   },
//   {
//     name: 'Mercury',
//     size: 0.38,
//     texture: '/mercurytexture.jpg',
//     axisTiltAngle: 0.03,
//     orbitRadius: 3.9,
//     rotationSpeed: 0.0000000711 * BASE_SPEED,
//     orbitSpeed: 0.00000004736 * BASE_SPEED,
//   },
// ];

export default planetConstants;
