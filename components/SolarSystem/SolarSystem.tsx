import axios from 'axios';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Planet {
  sphere: THREE.Mesh;
  rotate: (deltaTime: number) => void;
}

const createPlanet = (
  radius: number,
  texture: string,
  rotationAxis: THREE.Vector3,
  rotationAngle: number,
  textureLoader: THREE.TextureLoader
): Planet => {
  const planetTexture = textureLoader.load(texture);
  const geometry = new THREE.SphereGeometry(radius, 64, 64);
  const material = new THREE.MeshStandardMaterial({ map: planetTexture });
  const sphere = new THREE.Mesh(geometry, material);

  const rotate = (deltaTime: number) => {
    sphere.rotateOnAxis(rotationAxis, rotationAngle * deltaTime);
  };

  return { sphere, rotate };
};

// Planet rotation time in real world days
export const rotationTimeInDays = {
  Earth: 1,
  Sun: 25.38,
  Mars: 1.03,
  Venus: 243,
  Mercury: 58.6,
};

// Multiples of 60 is 1 hour per second. 120 is 2 hours per second etc...
let BASE_SPEED = 480;

// Planet orbit time in real world days
export const orbitTimeInDays = {
  Earth: 365.25,
  Mars: 687,
  Venus: 224.7,
  Mercury: 88,
  Sun: 0,
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
};

export const orbitDegreesPerMillisecond = {
  Earth: 0.0000000114077 * BASE_SPEED,
  Mars: 0.000000006067 * BASE_SPEED,
  Venus: 0.00000001854 * BASE_SPEED,
  Mercury: 0.00000004736 * BASE_SPEED,
  Sun: 0,
};

export const CAMERA_FOV = 50;
export const CAMERA_NEAR = 0.1;
export const CAMERA_FAR = 2000;

export const LIGHT_COLOR = 0xffffff;
export const LIGHT_INTENSITY = 1;
export const LIGHT_DISTANCE = 100;

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
    
  if (containerRef.current) {
    containerRef.current.style.background = 'transparent';
  }

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
      return 45;
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

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
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

    camera.position.z = 30;
    camera.position.y = 9;

    camera.lookAt(new THREE.Vector3(0, -1, 0));

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

    const controls = new OrbitControls(camera, renderer.domElement);
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
  }, [isBrowser]);

  return (
    <div className='absolute left-0 top-0 w-full z-50 h-full'>
      <div className='absolute top-10 center w-full text-center'>
        <p>
          1 Second = {BASE_SPEED / 60} {BASE_SPEED === 60 ? `hour` : `hours`}{' '}
          irl
        </p>
      </div>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default SolarSystem;
