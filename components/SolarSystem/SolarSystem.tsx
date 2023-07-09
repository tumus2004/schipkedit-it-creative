import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import createPlanet from './helpers/createPlanet';

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

    // Adjust the speed of rotation to match each planet's rotation period
    const earthRotationSpeed = 0.1; // 1 rotation per day
    const marsRotationSpeed = earthRotationSpeed * 1.03; // 1.03 rotations per day

    // Adjust the speed of orbit to match each planet's orbital period
    const earthOrbitalSpeed = earthRotationSpeed / 365.25; // 1 orbit per 365.25 days
    const marsOrbitalSpeed = earthRotationSpeed / 687; // 1 orbit per 687 days

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
    sun.sphere.add(earthPivot); // Add the pivot to the sun

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
    marsPivot.rotateZ(THREE.MathUtils.degToRad(1.85)); // Tilt the pivot by 1.85 degrees
    marsPivot.add(mars.sphere);
    sun.sphere.add(marsPivot);

    // Create the Mars's orbit
    const marsOrbitGeometry = new THREE.RingGeometry(14.99, 15.3, 64);
    marsOrbitGeometry.rotateX(Math.PI / 2); // Align the geometry on the xz plane
    marsOrbitGeometry.rotateZ(THREE.MathUtils.degToRad(1.85)); // Tilt the orbit by 1.85 degrees
    const marsOrbit = new THREE.Line(
      marsOrbitGeometry,
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    scene.add(marsOrbit);

    const earthOrbitRadius = 10; // Distance from the Sun
    const marsOrbitRadius = 15.3; // Distance from the Sun

    // Set the positions of Mars and Earth based on current date
    const setDatePositions = () => {
      const currentDate = new Date();

      // Calculate Earth's position
      const earthOrbitAngle =
        (2 * Math.PI * currentDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000); // Earth's orbital angle
      const earthPosition = new THREE.Vector3(
        earthOrbitRadius * Math.cos(earthOrbitAngle),
        0,
        earthOrbitRadius * Math.sin(earthOrbitAngle)
      );
      earthPivot.position.copy(earthPosition);

      // Calculate Mars' position
      const marsOrbitAngle =
        (2 * Math.PI * currentDate.getTime()) / (687 * 24 * 60 * 60 * 1000); // Mars' orbital angle
      const marsPosition = new THREE.Vector3(
        marsOrbitRadius * Math.cos(marsOrbitAngle),
        0,
        marsOrbitRadius * Math.sin(marsOrbitAngle)
      );
      marsPivot.position.copy(marsPosition);
    };

    setDatePositions();

    // Animation
    // Animation
    const animate = function () {
      requestAnimationFrame(animate);

      // Apply the rotation
      earth.rotate();
      mars.rotate();
      sun.rotate();

      // Update the position of the planets along their orbits
      const currentDate = new Date();

      // Calculate Earth's position
      const earthOrbitAngle =
        (2 * Math.PI * currentDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000); // Earth's orbital angle
      const earthPosition = new THREE.Vector3(
        earthOrbitRadius * Math.cos(earthOrbitAngle),
        0,
        earthOrbitRadius * Math.sin(earthOrbitAngle)
      );
      earthPivot.position.copy(earthPosition);

      // Calculate Mars' position
      const marsOrbitAngle =
        (2 * Math.PI * currentDate.getTime()) / (687 * 24 * 60 * 60 * 1000); // Mars' orbital angle
      const marsPosition = new THREE.Vector3(
        marsOrbitRadius * Math.cos(marsOrbitAngle),
        0,
        marsOrbitRadius * Math.sin(marsOrbitAngle)
      );
      marsPivot.position.copy(marsPosition);

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
