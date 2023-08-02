import axios from 'axios';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { setPosition } from './helpers/setPosition';
import { createOrbit } from './helpers/createOrbit';
import { createPivot } from './helpers/createPivot';
import { createPlanet } from './helpers/createPlanet';
import { setSolarSystemSize } from './helpers/setSolarSystemSize';
import {
  EARTH_AXIS_TILT_ANGLE,
  EARTH_ORBIT_RADIUS,
  EARTH_SIZE,
  EARTH_TEXTURE,
  MARS_AXIS_TILT_ANGLE,
  MARS_ORBIT_RADIUS,
  MARS_SIZE,
  MARS_TEXTURE,
  MERCURY_AXIS_TILT_ANGLE,
  MERCURY_ORBIT_RADIUS,
  MERCURY_SIZE,
  MERCURY_TEXTURE,
  MOON_AXIS_TILT_ANGLE,
  MOON_ORBIT_RADIUS,
  MOON_SIZE,
  MOON_TEXTURE,
  ORBIT_SEGMENTS,
  SUN_AXIS_TILT_ANGLE,
  SUN_SIZE,
  SUN_TEXTURE,
  VENUS_AXIS_TILT_ANGLE,
  VENUS_ORBIT_RADIUS,
  VENUS_SIZE,
  VENUS_TEXTURE,
  orbitDegreesPerMillisecond,
  rotationDegreesPerMillisecond,
} from './constants/planetConstants';
import { createRotationAxis } from './helpers/createRotationAxis';
import {
  CAMERA_FAR,
  CAMERA_NEAR,
  LIGHT_COLOR,
  LIGHT_DISTANCE,
  LIGHT_FOUR_COLOR,
  LIGHT_FOUR_DISTANCE,
  LIGHT_FOUR_INTENSITY,
  LIGHT_INTENSITY,
  LIGHT_THREE_COLOR,
  LIGHT_THREE_DISTANCE,
  LIGHT_THREE_INTENSITY,
  LIGHT_TWO_COLOR,
  LIGHT_TWO_DISTANCE,
  LIGHT_TWO_INTENSITY,
  YOUR_MAX_ZOOM,
  YOUR_MIN_ZOOM,
} from './constants/configurationConstants';
import { createAndAddLight } from './helpers/createAndAddLight';
interface SolarSystemProps {
  className?: string;
  setBaseSpeed: (speed: number) => void;
  baseSpeed: number;
}

axios
  .get(
    "https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND='199'&MAKE_EPHEM='YES'&EPHEM_TYPE='VECTORS'&CENTER='@10'&START_TIME='2022-01-01'&STOP_TIME='2022-01-02'&STEP_SIZE='1%20d'"
  )
  .then((response) => {
    const mercuryData = response.data;
    console.log(mercuryData);
  })
  .catch((error) => {
    console.log(error);
  });

const SolarSystem = ({ className, setBaseSpeed, baseSpeed }: SolarSystemProps) => {
  // Multiples of 60 is 1 hour per second. 120 is 2 hours per second etc...
  let BASE_SPEED = baseSpeed;

  // Assuming the orbit speed of the moon, you can adjust it to the actual value
  const orbitDegreesPerMillisecondMoon = 0.000001 * BASE_SPEED;

  const starCoords = [];

  for (let i = 0; i < 10000; i++) {
    const x = THREE.MathUtils.randFloatSpread(1000);
    const y = THREE.MathUtils.randFloatSpread(1000);
    const z = THREE.MathUtils.randFloatSpread(1000);

    starCoords.push(x, y, z);
  }

  const starsGeometry = new THREE.BufferGeometry();

  starsGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(starCoords, 3)
  );

  const starsMaterial = new THREE.PointsMaterial({ color: 0xaaaaaa });
  const stars = new THREE.Points(starsGeometry, starsMaterial);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const isBrowser = typeof window !== 'undefined';

  if (containerRef.current) {
    containerRef.current.style.background = 'transparent';
  }

  useEffect(() => {
    setSolarSystemSize();

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

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);

    createAndAddLight(
      LIGHT_COLOR,
      LIGHT_INTENSITY,
      LIGHT_DISTANCE,
      [0, 15, 25],
      scene
    );
    createAndAddLight(
      LIGHT_TWO_COLOR,
      LIGHT_TWO_INTENSITY,
      LIGHT_TWO_DISTANCE,
      [0, -15, -25],
      scene
    );

    createAndAddLight(
      LIGHT_THREE_COLOR,
      LIGHT_THREE_INTENSITY,
      LIGHT_THREE_DISTANCE,
      [-10, 5, 10],
      scene
    );

    createAndAddLight(
      LIGHT_FOUR_COLOR,
      LIGHT_FOUR_INTENSITY,
      LIGHT_FOUR_DISTANCE,
      [10, -5, -10],
      scene
    );

    camera.position.z = 30;
    camera.position.y = 9;

    camera.lookAt(new THREE.Vector3(0, -1, 0));

    scene.add(stars);

    const earthRotationAxis = createRotationAxis(EARTH_AXIS_TILT_ANGLE);
    const marsRotationAxis = createRotationAxis(MARS_AXIS_TILT_ANGLE);
    const venusRotationAxis = createRotationAxis(VENUS_AXIS_TILT_ANGLE);
    const mercuryRotationAxis = createRotationAxis(MERCURY_AXIS_TILT_ANGLE);
    const sunRotationAxis = createRotationAxis(SUN_AXIS_TILT_ANGLE);
    const moonRotationAxis = createRotationAxis(MOON_AXIS_TILT_ANGLE);

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
      rotationDegreesPerMillisecond.Sun,
      textureLoader
    );

    const sunPivot = createPivot(scene);
    sunPivot.add(sun.sphere);

    const earth = createPlanet(
      EARTH_SIZE,
      EARTH_TEXTURE,
      earthRotationAxis,
      rotationDegreesPerMillisecond.Earth,
      textureLoader
    );
    const earthPivot = createPivot(scene);
    earthPivot.add(earth.sphere);

    createOrbit(EARTH_ORBIT_RADIUS, EARTH_ORBIT_RADIUS, ORBIT_SEGMENTS, scene);
    setPosition(earth, EARTH_ORBIT_RADIUS, rotationDegreesPerMillisecond.Earth);

    const mars = createPlanet(
      MARS_SIZE,
      MARS_TEXTURE,
      marsRotationAxis,
      rotationDegreesPerMillisecond.Mars,
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
    setPosition(
      mars,
      MARS_ORBIT_RADIUS,
      rotationDegreesPerMillisecond.Earth / 1.88
    );

    const venus = createPlanet(
      VENUS_SIZE,
      VENUS_TEXTURE,
      venusRotationAxis,
      rotationDegreesPerMillisecond.Venus,
      textureLoader
    );
    const venusPivot = createPivot(scene);
    venusPivot.add(venus.sphere);

    createOrbit(VENUS_ORBIT_RADIUS, VENUS_ORBIT_RADIUS, ORBIT_SEGMENTS, scene);
    setPosition(venus, VENUS_ORBIT_RADIUS, orbitDegreesPerMillisecond.Venus);

    const mercury = createPlanet(
      MERCURY_SIZE,
      MERCURY_TEXTURE,
      mercuryRotationAxis,
      rotationDegreesPerMillisecond.Mercury,
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
    setPosition(
      mercury,
      MERCURY_ORBIT_RADIUS,
      orbitDegreesPerMillisecond.Mercury
    );

    const moon = createPlanet(
      MOON_SIZE,
      MOON_TEXTURE,
      moonRotationAxis,
      rotationDegreesPerMillisecond.Moon,
      textureLoader
    );

    setPosition(moon, MOON_ORBIT_RADIUS, orbitDegreesPerMillisecondMoon);

    earth.sphere.add(moon.sphere);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxDistance = YOUR_MAX_ZOOM;
    controls.minDistance = YOUR_MIN_ZOOM;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.enableRotate = true;

    let lastRenderTime = performance.now();

    const animate = function () {
      const currentRenderTime = window.performance.now();
      const deltaTime = currentRenderTime - lastRenderTime;

      earth.rotate(deltaTime);
      mars.rotate(deltaTime);
      venus.rotate(deltaTime);
      sun.rotate(deltaTime);
      mercury.rotate(deltaTime);
      moon.rotate(deltaTime);

      controls.update();

      earthPivot.rotation.y += orbitDegreesPerMillisecond.Earth * deltaTime;
      marsPivot.rotation.y += orbitDegreesPerMillisecond.Mars * deltaTime;
      venusPivot.rotation.y += orbitDegreesPerMillisecond.Venus * deltaTime;
      sunPivot.rotation.y += rotationDegreesPerMillisecond.Sun * deltaTime;
      mercuryPivot.rotation.y += orbitDegreesPerMillisecond.Mercury * deltaTime;

      requestAnimationFrame(animate);

      lastRenderTime = currentRenderTime;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      controls.dispose();
      renderer.dispose();
      window.removeEventListener('resize', onWindowResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBrowser, stars]);

  return (
    <div className='absolute left-0 top-0 w-full z-50 h-full'>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default SolarSystem;
