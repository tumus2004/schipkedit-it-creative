import axios from 'axios';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  setPosition,
  createOrbit,
  createPivot,
  createPlanet,
  setSolarSystemSize,
  createRotationAxis,
  createSunGlowTexture,
  createAndAddLight,
  createStars,
} from './helpers';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import planetConstants, {
  orbitDegreesPerMillisecond,
  rotationDegreesPerMillisecond,
} from './constants/planetConstants';
import configurationConstants from './constants/configurationConstants';
import { lights } from './constants/lightsConfiguration';
import { fetchPlanetData } from './utils';
import { createSolarBody } from './helpers/createSolarBody';
interface SolarSystemProps {
  className?: string;
  setBaseSpeed: (speed: number) => void;
  baseSpeed: number;
}

fetchPlanetData();

const SolarSystem = ({
  className,
  setBaseSpeed,
  baseSpeed,
}: SolarSystemProps) => {
  // Multiples of 60 is 1 hour per second. 120 is 2 hours per second etc...
  let BASE_SPEED = baseSpeed;

  // Assuming the orbit speed of the moon, you can adjust it to the actual value
  const orbitDegreesPerMillisecondMoon = 0.000001 * BASE_SPEED;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const isBrowser = typeof window !== 'undefined';

  if (containerRef.current) {
    containerRef.current.style.background = 'transparent';
  }

  const stars = createStars();

  useEffect(() => {
    setSolarSystemSize();

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
      textureLoader
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
      orbitMultiplier: 1.88,
    });

    const venus = createSolarBody({
      size: planetConstants.VENUS_SIZE,
      texture: planetConstants.VENUS_TEXTURE,
      rotationAxis: venusRotationAxis,
      rotationDegrees: rotationDegreesPerMillisecond.Venus,
      orbitRadius: planetConstants.VENUS_ORBIT_RADIUS,
      scene,
      textureLoader,
    });

    const mercury = createSolarBody({
      size: planetConstants.MERCURY_SIZE,
      texture: planetConstants.MERCURY_TEXTURE,
      rotationAxis: mercuryRotationAxis,
      rotationDegrees: rotationDegreesPerMillisecond.Mercury,
      orbitRadius: planetConstants.MERCURY_ORBIT_RADIUS,
      scene,
      textureLoader,
    });

    const moon = createPlanet(
      planetConstants.MOON_SIZE,
      planetConstants.MOON_TEXTURE,
      moonRotationAxis,
      rotationDegreesPerMillisecond.Moon,
      textureLoader
    );

    setPosition(
      moon,
      planetConstants.MOON_ORBIT_RADIUS,
      orbitDegreesPerMillisecondMoon
    );

    earth.planet.sphere.add(moon.sphere);

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
      sun.rotate(deltaTime);
      moon.rotate(deltaTime);

      controls.update();

      earth.pivot.rotation.y += orbitDegreesPerMillisecond.Earth * deltaTime;
      mars.pivot.rotation.y += orbitDegreesPerMillisecond.Mars * deltaTime;
      venus.pivot.rotation.y += orbitDegreesPerMillisecond.Venus * deltaTime;
      mercury.pivot.rotation.y +=
        orbitDegreesPerMillisecond.Mercury * deltaTime;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBrowser, stars]);

  return (
    <div className='absolute left-0 top-0 w-full z-50 h-full'>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default SolarSystem;
