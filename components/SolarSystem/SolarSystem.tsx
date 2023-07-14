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

export const BASE_SPEED = 0.1;

export const RELATIVE_EARTH_ROTATION_SPEED = 1;
export const RELATIVE_SUN_ROTATION_SPEED = 1 / 27;
export const RELATIVE_MARS_ROTATION_SPEED = 1 / 1.027;
export const RELATIVE_VENUS_ROTATION_SPEED = 1 / 243;
export const RELATIVE_MERCURY_ROTATION_SPEED = 1 / 176;

export const RELATIVE_EARTH_ORBITAL_SPEED = 1 / 365.25;
export const RELATIVE_MARS_ORBITAL_SPEED = 1 / (1.88 * 365.25);
export const RELATIVE_VENUS_ORBITAL_SPEED = 1 / 224.7;
export const RELATIVE_MERCURY_ORBITAL_SPEED = 1 / 88;

export const EARTH_ROTATION_SPEED = BASE_SPEED * RELATIVE_EARTH_ROTATION_SPEED;
export const SUN_ROTATION_SPEED = BASE_SPEED * RELATIVE_SUN_ROTATION_SPEED;
export const MARS_ROTATION_SPEED = BASE_SPEED * RELATIVE_MARS_ROTATION_SPEED;
export const VENUS_ROTATION_SPEED = BASE_SPEED * RELATIVE_VENUS_ROTATION_SPEED;
export const MERCURY_ROTATION_SPEED =
  BASE_SPEED * RELATIVE_MERCURY_ROTATION_SPEED;

export const EARTH_ORBITAL_SPEED = BASE_SPEED * RELATIVE_EARTH_ORBITAL_SPEED;
export const MARS_ORBITAL_SPEED = BASE_SPEED * RELATIVE_MARS_ORBITAL_SPEED;
export const VENUS_ORBITAL_SPEED = BASE_SPEED * RELATIVE_VENUS_ORBITAL_SPEED;
export const MERCURY_ORBITAL_SPEED =
  BASE_SPEED * RELATIVE_MERCURY_ORBITAL_SPEED;

export const CAMERA_FOV = 50;
export const CAMERA_NEAR = 0.1;
export const CAMERA_FAR = 2000;

export const LIGHT_COLOR = 0xffffff;
export const LIGHT_INTENSITY = 1;
export const LIGHT_DISTANCE = 100;

export const SUN_SIZE = 3;
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

export const VENUS_SIZE = 0.949;
export const VENUS_TEXTURE = '/venustexture.png';
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

const createOrbit = (
  innerRadius: number,
  outerRadius: number,
  segments: number,
  scene: THREE.Scene,
  tiltAngle: number = 0
) => {
  const orbitGeometry = new THREE.RingGeometry(
    innerRadius,
    outerRadius,
    segments
  );
  orbitGeometry.rotateX(Math.PI / 2 + THREE.MathUtils.degToRad(tiltAngle));
  const orbit = new THREE.Line(
    orbitGeometry,
    new THREE.LineBasicMaterial({ color: 0xffffff })
  );
  scene.add(orbit);
  return orbit;
};

const createPivot = (scene: THREE.Scene, tiltAngle: number = 0) => {
  const pivot = new THREE.Object3D();
  pivot.rotation.x = THREE.MathUtils.degToRad(tiltAngle);
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

const SolarSystem = ({ className }: SolarSystemProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isBrowser = typeof window !== 'undefined';
  const bottomClass =
    isBrowser && window.innerWidth >= 768 ? 'bottom-0' : 'bottom-10';

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const setSolarSystemSize = () => {
      if (window.innerWidth < 500) {
        return 110;
      }
      if (window.innerWidth > 500 && window.innerWidth < 660) {
        return 100;
      }
      if (window.innerWidth > 660 && window.innerWidth < 768) {
        return 90;
      }
      if (window.innerWidth > 768 && window.innerWidth < 1024) {
        return 75;
      }
      return 50;
    };

    if (!isBrowser || !containerRef.current) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      setSolarSystemSize(),
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      CAMERA_NEAR,
      CAMERA_FAR
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);

    const light = new THREE.PointLight(
      LIGHT_COLOR,
      LIGHT_INTENSITY,
      LIGHT_DISTANCE
    );
    light.position.set(0, 15, 25);
    scene.add(light);

    camera.position.z = 32;
    camera.position.y = 10;
    
    camera.lookAt(new THREE.Vector3(0, 0, 0));

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

    const venusRotationAxis = new THREE.Vector3(
      Math.sin(THREE.MathUtils.degToRad(VENUS_AXIS_TILT_ANGLE)),
      Math.cos(THREE.MathUtils.degToRad(VENUS_AXIS_TILT_ANGLE)),
      0
    );

    const mercuryRotationAxis = new THREE.Vector3(
      Math.sin(THREE.MathUtils.degToRad(MERCURY_AXIS_TILT_ANGLE)),
      Math.cos(THREE.MathUtils.degToRad(MERCURY_AXIS_TILT_ANGLE)),
      0
    );

    const sunRotationAxis = new THREE.Vector3(
      Math.sin(THREE.MathUtils.degToRad(SUN_AXIS_TILT_ANGLE)),
      Math.cos(THREE.MathUtils.degToRad(SUN_AXIS_TILT_ANGLE)),
      0
    );

    const onWindowResize = () => {
      if (containerRef.current) {
        // Update the camera's aspect ratio
        camera.aspect =
          containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();

        // Update the renderer's size to match the container's size
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        // Consider devicePixelRatio for high DPI screens
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height, false);
      }
    };

    window.addEventListener('resize', onWindowResize);
    const textureLoader = new THREE.TextureLoader();

    const sun = createPlanet(
      SUN_SIZE,
      SUN_TEXTURE,
      sunRotationAxis,
      SUN_ROTATION_SPEED,
      textureLoader
    );

    const sunPivot = createPivot(scene);
    sunPivot.add(sun.sphere);

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
    const marsPivot = createPivot(scene, 1.88);
    marsPivot.add(mars.sphere);

    createOrbit(
      MARS_ORBIT_RADIUS,
      MARS_ORBIT_RADIUS,
      ORBIT_SEGMENTS,
      scene,
      1.88
    );
    setPosition(mars, MARS_ORBIT_RADIUS, EARTH_ROTATION_SPEED / 1.88);

    const venus = createPlanet(
      VENUS_SIZE,
      VENUS_TEXTURE,
      venusRotationAxis,
      VENUS_ROTATION_SPEED,
      textureLoader
    );
    const venusPivot = createPivot(scene);
    venusPivot.add(venus.sphere);

    createOrbit(VENUS_ORBIT_RADIUS, VENUS_ORBIT_RADIUS, ORBIT_SEGMENTS, scene);
    setPosition(venus, VENUS_ORBIT_RADIUS, VENUS_ORBITAL_SPEED);

    const mercury = createPlanet(
      MERCURY_SIZE,
      MERCURY_TEXTURE,
      mercuryRotationAxis,
      MERCURY_ROTATION_SPEED,
      textureLoader
    );
    const mercuryPivot = createPivot(scene);
    mercuryPivot.add(mercury.sphere);

    createOrbit(
      MERCURY_ORBIT_RADIUS,
      MERCURY_ORBIT_RADIUS,
      ORBIT_SEGMENTS,
      scene
    );
    setPosition(mercury, MERCURY_ORBIT_RADIUS, MERCURY_ROTATION_SPEED);

    const animate = function () {
      requestAnimationFrame(animate);

      earth.rotate();
      mars.rotate();
      venus.rotate();
      sun.rotate();
      mercury.rotate();

      earthPivot.rotation.y += EARTH_ORBITAL_SPEED;
      marsPivot.rotation.y += MARS_ORBITAL_SPEED;
      venusPivot.rotation.y += VENUS_ORBITAL_SPEED;
      sunPivot.rotation.y += SUN_ROTATION_SPEED;
      mercuryPivot.rotation.y += MERCURY_ORBITAL_SPEED;

      setPosition(earth, EARTH_ORBIT_RADIUS, EARTH_ORBITAL_SPEED);
      setPosition(mars, MARS_ORBIT_RADIUS, MARS_ORBITAL_SPEED);
      setPosition(venus, VENUS_ORBIT_RADIUS, VENUS_ORBITAL_SPEED);
      setPosition(mercury, MERCURY_ORBIT_RADIUS, MERCURY_ORBITAL_SPEED);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      window.removeEventListener('resize', onWindowResize);
    };
  }, [isBrowser]);

  return (
    <div className='absolute left-0 top-0 w-full -z-10 h-full'>
      <div
        className={`flex justify-center items-center w-full px-4 h-12 fixed ${bottomClass} left-0 bg-black text-white`}>
        In this simulation: 1 Earth rotation ={' '}
        {RELATIVE_MARS_ROTATION_SPEED.toFixed(3)}
        Mars rotations, {RELATIVE_VENUS_ROTATION_SPEED.toFixed(5)} Venus
        rotations, and {RELATIVE_MERCURY_ROTATION_SPEED.toFixed(5)} Mercury
        rotations, which is approximately proportional to the actual ratio of
        their rotation speeds.
      </div>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default SolarSystem;
