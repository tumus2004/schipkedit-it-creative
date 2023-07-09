import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import createPlanet from './helpers/createPlanet';
import * as constants from './constants';

const SolarSystem = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isBrowser = typeof window !== 'undefined';

  useEffect(() => {
    if (!isBrowser || !containerRef.current) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      constants.CAMERA_FOV,
      window.innerWidth / window.innerHeight,
      constants.CAMERA_NEAR,
      constants.CAMERA_FAR
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add lighting
    const light = new THREE.PointLight(
      constants.LIGHT_COLOR,
      constants.LIGHT_INTENSITY,
      constants.LIGHT_DISTANCE
    );
    light.position.set(0, 15, 25);
    scene.add(light);
    camera.position.z = 30;
    camera.position.y = 5;

    // Create a new rotation axis that is tilted 23.5 degrees from the y-axis
    const rotationAxis = new THREE.Vector3(
      Math.sin(THREE.MathUtils.degToRad(constants.EARTH_AXIS_TILT_ANGLE)),
      Math.cos(THREE.MathUtils.degToRad(constants.EARTH_AXIS_TILT_ANGLE)),
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
      constants.SUN_SIZE,
      constants.SUN_TEXTURE,
      sunRotationAxis,
      rotationSpeed,
      textureLoader
    );
    scene.add(sun.sphere);

    // Adjust the speed of rotation to match each planet's rotation period
    const earthRotationSpeed = constants.EARTH_ROTATION_SPEED; // 1 rotation per day
    const marsRotationSpeed = constants.MARS_ROTATION_SPEED; // 1.03 rotations per day

    // Adjust the speed of orbit to match each planet's orbital period
    const earthOrbitalSpeed = constants.EARTH_ORBITAL_SPEED; // 1 orbit per 365.25 days
    const marsOrbitalSpeed = constants.MARS_ORBITAL_SPEED; // 1 orbit per 687 days

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
    const earthOrbitGeometry = new THREE.RingGeometry(
      constants.ORBIT_INNER_RADIUS,
      constants.ORBIT_OUTER_RADIUS,
      constants.ORBIT_SEGMENTS
    );
    earthOrbitGeometry.rotateX(Math.PI / 2); // Align the geometry on the xz plane
    const earthOrbit = new THREE.Line(
      earthOrbitGeometry,
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    scene.add(earthOrbit);

    // Create Mars
    const mars = createPlanet(
      constants.MARS_SIZE,
      constants.MARS_TEXTURE,
      rotationAxis,
      rotationSpeed,
      textureLoader
    );
    const marsPivot = new THREE.Object3D();
    marsPivot.rotateZ(THREE.MathUtils.degToRad(1.85)); // Tilt the pivot by 1.85 degrees
    marsPivot.add(mars.sphere);
    sun.sphere.add(marsPivot);

    // Create the Mars's orbit
    const marsOrbitGeometry = new THREE.RingGeometry(
      constants.MARS_ORBIT_INNER_RADIUS,
      constants.MARS_ORBIT_OUTER_RADIUS,
      constants.ORBIT_SEGMENTS
    );
    marsOrbitGeometry.rotateX(Math.PI / 2); // Align the geometry on the xz plane
    marsOrbitGeometry.rotateZ(THREE.MathUtils.degToRad(1.85)); // Tilt the orbit by 1.85 degrees
    const marsOrbit = new THREE.Line(
      marsOrbitGeometry,
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    scene.add(marsOrbit);

    const earthOrbitRadius = constants.EARTH_ORBIT_RADIUS;
    const marsOrbitRadius = constants.MARS_ORBIT_RADIUS;

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
