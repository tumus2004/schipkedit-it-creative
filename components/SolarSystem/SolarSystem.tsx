import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import createPlanet from './helpers/createPlanet';
import axios from 'axios';
import dotenv from 'dotenv';

const nasakey = process.env.NEXT_PUBLIC_NASA_API_KEY;

const SolarSystem = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isBrowser = typeof window !== 'undefined';

  useEffect(() => {
    if (!isBrowser || !containerRef.current) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 15, 25);
    scene.add(light);
    camera.position.z = 30;
    camera.position.y = 5;

    // Create a new rotation axis that is tilted 23.5 degrees from the y-axis
    const rotationAxis = new THREE.Vector3(
      Math.sin(THREE.MathUtils.degToRad(23.5)),
      Math.cos(THREE.MathUtils.degToRad(23.5)),
      0
    );

    // Sun rotation
    const sunRotationAxis = new THREE.Vector3(
      Math.sin(THREE.MathUtils.degToRad(0.5)),
      Math.cos(THREE.MathUtils.degToRad(0.5)),
      0
    );

    // Adjust the speed of rotation to match Earth's
    const rotationSpeed = 0.1;
    const orbitalSpeed = rotationSpeed / 365;
    const marsOrbitalSpeed = rotationSpeed / 687; // Mars orbital speed

    // Sun rotation speed
    const sunRotationSpeed = rotationSpeed / 27;

    // Load the texture
    const textureLoader = new THREE.TextureLoader();

    // Create the sun
    const sun = createPlanet(
      4,
      '/thesun.png',
      sunRotationAxis,
      sunRotationSpeed,
      textureLoader
    );
    scene.add(sun.sphere);

    // Create Earth
    const earth = createPlanet(
      1,
      '/texture.png',
      rotationAxis,
      rotationSpeed,
      textureLoader
    );
    const earthPivot = new THREE.Object3D();
    earthPivot.add(earth.sphere);
    scene.add(earthPivot);

    // Create the Earth's orbit
    const earthOrbitGeometry = new THREE.RingGeometry(9.99, 10, 64);
    earthOrbitGeometry.rotateX(Math.PI / 2); // Align the geometry on the xz plane
    const earthOrbit = new THREE.Line(
      earthOrbitGeometry,
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    scene.add(earthOrbit);

    // Create Mars
    const mars = createPlanet(
      0.53,
      '/marstexture.png',
      rotationAxis,
      rotationSpeed,
      textureLoader
    );
    const marsPivot = new THREE.Object3D();
    marsPivot.add(mars.sphere);
    scene.add(marsPivot);

    // Create the Mars's orbit
    const marsOrbitGeometry = new THREE.RingGeometry(14.99, 15, 64);
    marsOrbitGeometry.rotateX(Math.PI / 2); // Align the geometry on the xz plane
    const marsOrbit = new THREE.Line(
      marsOrbitGeometry,
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    scene.add(marsOrbit);

    // Fetch current positions of Earth and Mars from NASA HORIZONS API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/insight_weather/?api_key=${nasakey}&feedtype=json&ver=1.0`
        );

        const { mars, earth } = response.data;
        console.log('positions', mars, earth);

        const earthPosition = new THREE.Vector3(
          earth.position.x,
          earth.position.y,
          earth.position.z
        );
        earth.sphere.position.copy(earthPosition);

        const marsPosition = new THREE.Vector3(
          mars.position.x,
          mars.position.y,
          mars.position.z
        );
        mars.sphere.position.copy(marsPosition);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Animation
    const animate = function () {
      requestAnimationFrame(animate);

      // Apply the rotation
      earth.rotate();
      mars.rotate();
      sun.rotate();

      // Rotate the pivot objects around the y-axis
      earthPivot.rotation.y += orbitalSpeed;
      marsPivot.rotation.y += marsOrbitalSpeed;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Cleanup on unmount
      renderer.dispose();
    };
  }, [isBrowser]);

  return <div ref={containerRef} />;
};

export default SolarSystem;
