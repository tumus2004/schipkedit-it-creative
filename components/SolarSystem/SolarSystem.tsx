import axios from 'axios';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  createStars,
  setSolarSystemSize,
  createSunGlowTexture,
} from './helpers';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import configurationConstants from './constants/configurationConstants';
import { lights } from './constants/lightsConfiguration';
// import { fetchPlanetData } from './utils';

// fetchPlanetData();

/*
 ** PLANET DATA
 */
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
  Moon: 27.3,
  Sun: 0,
};

export const distancePerOrbitInKm = {
  Earth: 94000000,
  Mars: 1430000000,
  Venus: 679000000,
  Mercury: 363000000,
  Moon: 2415000,
  Sun: 0,
};

export const rotationDegreesPerMillisecond = {
  Earth: 0.000004167 * BASE_SPEED,
  Mars: 0.000004057 * BASE_SPEED,
  Venus: -0.00000001714 * BASE_SPEED,
  Mercury: 0.0000000711 * BASE_SPEED,
  Sun: 0.0000001643 * BASE_SPEED,
  Moon: 0.000000152625153 * BASE_SPEED,
};

export const orbitDegreesPerMillisecond = {
  Earth: 0.0000000114077 * BASE_SPEED,
  Mars: 0.000000006067 * BASE_SPEED,
  Venus: 0.00000001854 * BASE_SPEED,
  Mercury: 0.00000004736 * BASE_SPEED,
  Moon: 0.000000152625153 * BASE_SPEED,
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

  MARS_SIZE: 0.532,
  MARS_TEXTURE: '/marstexture.png',
  MARS_ORBIT_RADIUS: 15.3,
  MARS_AXIS_TILT_ANGLE: 25.19,

  VENUS_SIZE: 0.949,
  VENUS_TEXTURE: '/venustexture.jpg',
  VENUS_ORBIT_RADIUS: 7.2,
  VENUS_AXIS_TILT_ANGLE: 3,

  MERCURY_SIZE: 0.383,
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
  MOON_ORBIT_RADIUS: 1.5257,
  MOON_AXIS_TILT_ANGLE: 5.875,
};
/*
 ** END PLANET DATA
 */

/*
 ** HELPER FUNCTIONS
 */

export const createOrbit = (
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

interface Planet {
  sphere: THREE.Mesh;
  rotate: (deltaTime: number) => void;
}

export const createPlanet = (
  radius: number,
  texture: string,
  rotationAxis: THREE.Vector3,
  rotationAngle: number,
  textureLoader: THREE.TextureLoader,
  name: string
): Planet => {
  const planetTexture = textureLoader.load(texture);
  const geometry = new THREE.SphereGeometry(radius, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    map: planetTexture,
    toneMapped: false,
    metalness: 0.3,
    roughness: 0.7,
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.name = name;

  const rotate = (deltaTime: number) => {
    sphere.rotateOnAxis(rotationAxis, rotationAngle * deltaTime);
  };

  return { sphere, rotate };
};

export const createPlanetWithPivot = (
  radius: number,
  texture: string,
  rotationAxis: THREE.Vector3,
  rotationAngle: number,
  textureLoader: THREE.TextureLoader,
  scene: THREE.Scene,
  name: string,
  tiltAngle: number = 0
) => {
  const planet = createPlanet(
    radius,
    texture,
    rotationAxis,
    rotationAngle,
    textureLoader,
    name
  );
  const planetPivot = createPivot(scene, tiltAngle);
  planetPivot.add(planet.sphere);
  return { ...planet, pivot: planetPivot };
};

export function createRotationAxis(tiltAngle: number) {
  return new THREE.Vector3(
    Math.sin(THREE.MathUtils.degToRad(tiltAngle)),
    Math.cos(THREE.MathUtils.degToRad(tiltAngle)),
    0
  );
}

export const setPosition = (
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

interface SolarBodyProps {
  size: number;
  texture: string;
  rotationAxis: THREE.Vector3;
  rotationDegrees: number;
  orbitRadius: number;
  scene: THREE.Scene;
  textureLoader: THREE.TextureLoader;
  name: string;
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
  name,
  textureLoader,
}: SolarBodyProps) => {
  const planet = createPlanet(
    size,
    texture,
    rotationAxis,
    rotationDegrees,
    textureLoader,
    name
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

export function createAndAddLight(
  color: THREE.ColorRepresentation | undefined,
  intensity: number | undefined,
  distance: number | undefined,
  position: [number, number, number],
  scene: THREE.Scene
) {
  const light = new THREE.PointLight(color, intensity, distance);
  light.position.set(...position);
  scene.add(light);
}

export const createPivot = (scene: THREE.Scene, tiltAngle: number = 0) => {
  const pivot = new THREE.Object3D();
  pivot.rotation.x = THREE.MathUtils.degToRad(tiltAngle);
  scene.add(pivot);
  return pivot;
};

export const addToExistingPivot = (
  pivot: THREE.Object3D,
  object: THREE.Object3D
) => {
  pivot.add(object);
  return pivot;
};
/*
 ** END HELPER FUNCTIONS
 */

interface SolarSystemProps {
  className?: string;
  setBaseSpeed: (speed: number) => void;
  baseSpeed: number;
}

const SolarSystem = ({
  className,
  setBaseSpeed,
  baseSpeed,
}: SolarSystemProps) => {
  // Multiples of 60 is 1 hour per second. 120 is 2 hours per second etc...
  let BASE_SPEED = baseSpeed;

  // // Assuming the orbit speed of the moon, you can adjust it to the actual value
  // const orbitDegreesPerMillisecondMoon = 0.000001 * BASE_SPEED;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const isBrowser = typeof window !== 'undefined';

  if (containerRef.current) {
    containerRef.current.style.background = 'transparent';
  }

  const stars = createStars();

  useEffect(() => {
    if (!isBrowser || !containerRef.current) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      setSolarSystemSize(),
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      configurationConstants.CAMERA_NEAR,
      configurationConstants.CAMERA_FAR
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);

    lights.forEach((light) => {
      createAndAddLight(
        light.color,
        light.intensity,
        light.distance,
        light.position,
        scene
      );
    });

    camera.position.z = 30;
    camera.position.y = 9;

    camera.lookAt(new THREE.Vector3(0, -1, 0));

    scene.add(stars);

    scene.add(new THREE.AmbientLight(0xcccccc));
    const pointLight = new THREE.PointLight(0xffffff, 100);
    camera.add(pointLight);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = 0;
    bloomPass.strength = 1.2;
    bloomPass.radius = 0.1;

    const earthRotationAxis = createRotationAxis(
      planetConstants.EARTH_AXIS_TILT_ANGLE
    );
    const marsRotationAxis = createRotationAxis(
      planetConstants.MARS_AXIS_TILT_ANGLE
    );
    const venusRotationAxis = createRotationAxis(
      planetConstants.VENUS_AXIS_TILT_ANGLE
    );
    const mercuryRotationAxis = createRotationAxis(
      planetConstants.MERCURY_AXIS_TILT_ANGLE
    );
    const sunRotationAxis = createRotationAxis(
      planetConstants.SUN_AXIS_TILT_ANGLE
    );
    const moonRotationAxis = createRotationAxis(
      planetConstants.MOON_AXIS_TILT_ANGLE
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

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const shaderPass = new ShaderPass(CopyShader);
    shaderPass.renderToScreen = true;
    composer.addPass(shaderPass);

    window.addEventListener('resize', onWindowResize);
    const textureLoader = new THREE.TextureLoader();

    // Create glow texture
    const glowTexture = createSunGlowTexture();

    // Create glow material
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
    });

    // Create glow sprite
    const glowSprite = new THREE.Sprite(glowMaterial);
    glowSprite.scale.set(
      planetConstants.SUN_SIZE * 3,
      planetConstants.SUN_SIZE * 3,
      1
    ); // Adjust the scale as needed

    const sun = createPlanet(
      planetConstants.SUN_SIZE,
      planetConstants.SUN_TEXTURE,
      sunRotationAxis,
      rotationDegreesPerMillisecond.Sun,
      textureLoader,
      'sun'
    );

    // Add glow sprite to sun
    sun.sphere.add(glowSprite);

    const sunPivot = createPivot(scene);
    sunPivot.add(sun.sphere);

    const earth = createSolarBody({
      size: planetConstants.EARTH_SIZE,
      texture: planetConstants.EARTH_TEXTURE,
      rotationAxis: earthRotationAxis,
      rotationDegrees: rotationDegreesPerMillisecond.Earth,
      orbitRadius: planetConstants.EARTH_ORBIT_RADIUS,
      scene,
      name: 'earth',
      textureLoader,
    });

    const mars = createSolarBody({
      size: planetConstants.MARS_SIZE,
      texture: planetConstants.MARS_TEXTURE,
      rotationAxis: marsRotationAxis,
      rotationDegrees: rotationDegreesPerMillisecond.Mars,
      orbitRadius: planetConstants.MARS_ORBIT_RADIUS,
      scene,
      textureLoader,
      name: 'mars',
      orbitMultiplier: 1.88,
    });

    const venus = createSolarBody({
      size: planetConstants.VENUS_SIZE,
      texture: planetConstants.VENUS_TEXTURE,
      rotationAxis: venusRotationAxis,
      rotationDegrees: rotationDegreesPerMillisecond.Venus,
      orbitRadius: planetConstants.VENUS_ORBIT_RADIUS,
      scene,
      name: 'venus',
      textureLoader,
    });

    const mercury = createSolarBody({
      size: planetConstants.MERCURY_SIZE,
      texture: planetConstants.MERCURY_TEXTURE,
      rotationAxis: mercuryRotationAxis,
      rotationDegrees: rotationDegreesPerMillisecond.Mercury,
      orbitRadius: planetConstants.MERCURY_ORBIT_RADIUS,
      scene,
      name: 'mercury',
      textureLoader,
    });

    /*
     ** MOON
     */
    const moon = createPlanet(
      planetConstants.MOON_SIZE,
      planetConstants.MOON_TEXTURE,
      moonRotationAxis,
      rotationDegreesPerMillisecond.Moon,
      textureLoader,
      'moon'
    );

    setPosition(
      moon,
      planetConstants.MOON_ORBIT_RADIUS,
      orbitDegreesPerMillisecond.Moon
    );

    const moonPivot = createPivot(scene, planetConstants.MOON_AXIS_TILT_ANGLE);
    moonPivot.add(moon.sphere);
    earth.planet.sphere.add(moonPivot);
    /*
     ** END MOON
     */

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxDistance = configurationConstants.YOUR_MAX_ZOOM;
    controls.minDistance = configurationConstants.YOUR_MIN_ZOOM;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.enableRotate = true;

    let lastRenderTime = performance.now();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseMove(event: any) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    const animate = function () {
      const currentRenderTime = window.performance.now();
      const deltaTime = currentRenderTime - lastRenderTime;

      earth.planet.rotate(deltaTime);
      mars.planet.rotate(deltaTime);
      venus.planet.rotate(deltaTime);
      mercury.planet.rotate(deltaTime);
      moon.rotate(deltaTime);
      sun.rotate(deltaTime);

      controls.update();

      earth.pivot.rotation.y += orbitDegreesPerMillisecond.Earth * deltaTime;
      mars.pivot.rotation.y += orbitDegreesPerMillisecond.Mars * deltaTime;
      venus.pivot.rotation.y += orbitDegreesPerMillisecond.Venus * deltaTime;
      mercury.pivot.rotation.y +=
        orbitDegreesPerMillisecond.Mercury * deltaTime;
      moonPivot.rotation.y += orbitDegreesPerMillisecond.Moon * deltaTime;
      sunPivot.rotation.y += rotationDegreesPerMillisecond.Sun * deltaTime;

      requestAnimationFrame(animate);

      lastRenderTime = currentRenderTime;
      composer.render();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      controls.dispose();
      renderer.dispose();
      window.removeEventListener('resize', onWindowResize);
    };
  }, [isBrowser, stars]);

  return (
    <div className='absolute flex justify-center items-center left-0 top-0 w-full h-full'>
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: '0',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default SolarSystem;
