import { useEffect, useRef } from 'react';
import * as THREE from 'three';
interface Planet {
  sphere: THREE.Mesh;
  rotate: () => void;
}

const createPlanet = (
  radius: number,
  texture: string,
  rotationAxis: THREE.Vector3,
  rotationSpeed: number,
  textureLoader: THREE.TextureLoader
): Planet => {
  const planetTexture = textureLoader.load(texture);
  const geometry = new THREE.SphereGeometry(radius, 64, 64);
  const material = new THREE.MeshStandardMaterial({ map: planetTexture });
  const sphere = new THREE.Mesh(geometry, material);

  const rotate = () => {
    sphere.rotateOnAxis(rotationAxis, rotationSpeed);
  };

  return { sphere, rotate };
};

export const BASE_SPEED = 0.1; // Set this to any positive number to adjust the overall speed of the simulation

export const RELATIVE_EARTH_ROTATION_SPEED = 1;
export const RELATIVE_SUN_ROTATION_SPEED = 1 / 27;
export const RELATIVE_MARS_ROTATION_SPEED = 1 / 1.027;

export const RELATIVE_EARTH_ORBITAL_SPEED = 1 / 365.25;
export const RELATIVE_MARS_ORBITAL_SPEED = 1 / (1.88 * 365.25);

export const EARTH_ROTATION_SPEED = BASE_SPEED * RELATIVE_EARTH_ROTATION_SPEED;
export const SUN_ROTATION_SPEED = BASE_SPEED * RELATIVE_SUN_ROTATION_SPEED;
export const MARS_ROTATION_SPEED = BASE_SPEED * RELATIVE_MARS_ROTATION_SPEED;

export const EARTH_ORBITAL_SPEED = BASE_SPEED * RELATIVE_EARTH_ORBITAL_SPEED;
export const MARS_ORBITAL_SPEED = BASE_SPEED * RELATIVE_MARS_ORBITAL_SPEED;

export const CAMERA_FOV = 50;
export const CAMERA_NEAR = 0.1;
export const CAMERA_FAR = 2000;

export const LIGHT_COLOR = 0xffffff;
export const LIGHT_INTENSITY = 1;
export const LIGHT_DISTANCE = 100;

export const SUN_SIZE = 4;
export const SUN_TEXTURE = '/thesun.png';
export const SUN_AXIS_TILT_ANGLE = 7.25;

export const EARTH_SIZE = 1;
export const EARTH_TEXTURE = '/texture.png';
export const EARTH_ORBIT_RADIUS = 10;
export const EARTH_AXIS_TILT_ANGLE = 23.5;

export const MARS_SIZE = 0.53;
export const MARS_TEXTURE = '/marstexture.png';
export const MARS_ORBIT_RADIUS = 15.3;
export const MARS_AXIS_TILT_ANGLE = 25.19;

export const ORBIT_SEGMENTS = 512;
export const ORBIT_LINE_COLOR = 0xffffff;
export const ORBIT_INNER_RADIUS = 9.95;
export const ORBIT_OUTER_RADIUS = 10.05;
export const ORBIT_TILT_ANGLE = 1.85;

const createOrbit = (
  innerRadius: number,
  outerRadius: number,
  segments: number,
  scene: THREE.Scene
) => {
  const orbitGeometry = new THREE.RingGeometry(
    innerRadius,
    outerRadius,
    segments
  );
  orbitGeometry.rotateX(Math.PI / 2);
  const orbit = new THREE.Line(
    orbitGeometry,
    new THREE.LineBasicMaterial({ color: 0xffffff })
  );
  scene.add(orbit);
  return orbit;
};

const createPivot = (scene: THREE.Scene) => {
  const pivot = new THREE.Object3D();
  scene.add(pivot);
  return pivot;
};

const setPosition = (
  planet: { sphere: THREE.Mesh },
  orbitRadius: number,
  timeFactor: number
) => {
  const orbitAngle =
    (new Date().getTime() / (24 * 60 * 60 * 1000)) * timeFactor;
  const position = new THREE.Vector3(
    orbitRadius * Math.cos(orbitAngle),
    0,
    orbitRadius * Math.sin(orbitAngle)
  );
  planet.sphere.position.copy(position);
};

interface SolarSystemProps {
  className?: string;
}

const SolarSystem = ({className}: SolarSystemProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isBrowser = typeof window !== 'undefined';

  useEffect(() => {
    if (!isBrowser || !containerRef.current) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      window.innerWidth / window.innerHeight,
      CAMERA_NEAR,
      CAMERA_FAR
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const light = new THREE.PointLight(
      LIGHT_COLOR,
      LIGHT_INTENSITY,
      LIGHT_DISTANCE
    );
    light.position.set(0, 15, 25);
    scene.add(light);

    camera.position.z = 30;
    camera.position.y = 5;

    const earthRotationAxis = new THREE.Vector3(
      Math.sin(THREE.MathUtils.degToRad(EARTH_AXIS_TILT_ANGLE)),
      Math.cos(THREE.MathUtils.degToRad(EARTH_AXIS_TILT_ANGLE)),
      0
    );

    const marsRotationAxis = new THREE.Vector3(
      Math.sin(THREE.MathUtils.degToRad(MARS_AXIS_TILT_ANGLE)),
      Math.cos(THREE.MathUtils.degToRad(MARS_AXIS_TILT_ANGLE)),
      0
    );

    const sunRotationAxis = new THREE.Vector3(
      Math.sin(THREE.MathUtils.degToRad(SUN_AXIS_TILT_ANGLE)),
      Math.cos(THREE.MathUtils.degToRad(SUN_AXIS_TILT_ANGLE)),
      0
    );

    const textureLoader = new THREE.TextureLoader();

    const sun = createPlanet(
      SUN_SIZE,
      SUN_TEXTURE,
      sunRotationAxis,
      SUN_ROTATION_SPEED,
      textureLoader
    );

    const sunPivot = createPivot(scene); // Added
    sunPivot.add(sun.sphere); // Added

    const earth = createPlanet(
      EARTH_SIZE,
      EARTH_TEXTURE,
      earthRotationAxis,
      EARTH_ROTATION_SPEED,
      textureLoader
    );
    const earthPivot = createPivot(scene);
    earthPivot.add(earth.sphere);

    createOrbit(EARTH_ORBIT_RADIUS, EARTH_ORBIT_RADIUS, ORBIT_SEGMENTS, scene);
    setPosition(earth, EARTH_ORBIT_RADIUS, EARTH_ROTATION_SPEED);

    const mars = createPlanet(
      MARS_SIZE,
      MARS_TEXTURE,
      marsRotationAxis,
      MARS_ROTATION_SPEED,
      textureLoader
    );
    const marsPivot = createPivot(scene);
    marsPivot.add(mars.sphere);

    createOrbit(MARS_ORBIT_RADIUS, MARS_ORBIT_RADIUS, ORBIT_SEGMENTS, scene);
    setPosition(mars, MARS_ORBIT_RADIUS, EARTH_ROTATION_SPEED / 1.88);

    const animate = function () {
      requestAnimationFrame(animate);

      earth.rotate();
      mars.rotate();
      sun.rotate();

      earthPivot.rotation.y += EARTH_ORBITAL_SPEED;
      marsPivot.rotation.y += MARS_ORBITAL_SPEED;
      sunPivot.rotation.y += SUN_ROTATION_SPEED; // Added

      // Update positions in the animation loop
      setPosition(earth, EARTH_ORBIT_RADIUS, EARTH_ORBITAL_SPEED);
      setPosition(mars, MARS_ORBIT_RADIUS, MARS_ORBITAL_SPEED);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, [isBrowser]);

  return (
    <div className='absolute left-0 top-0 w-full -z-10 h-full'>
      <div className='flex justify-center items-center w-full h-12 fixed top-0 left-0 bg-black text-white'>
        1 second = {BASE_SPEED} Earth days or {MARS_ROTATION_SPEED.toFixed(3)}{' '}
        Mars days
      </div>
      <div ref={containerRef} />
    </div>
  );
};

export default SolarSystem;
