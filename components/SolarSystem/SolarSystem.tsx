import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SolarSystem = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isBrowser = typeof window !== 'undefined';
  useEffect(() => {
    if (!isBrowser || !containerRef.current) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Load the texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('/texture.png');
    const sunTexture = textureLoader.load('./thesun.png');
    const marsTexture = textureLoader.load('/marstexture.png'); // Load Mars texture

    // Create the central, larger sphere
    const centerGeometry = new THREE.SphereGeometry(4, 64, 64);
    const centerMaterial = new THREE.MeshStandardMaterial({
      map: sunTexture,
      depthTest: true,
      depthWrite: true,
    });
    const centerSphere = new THREE.Mesh(centerGeometry, centerMaterial);
    scene.add(centerSphere);

    // Create a sphere geometry with radius 1, and 64 vertical and horizontal segments
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      map: earthTexture,
      depthTest: true,
      depthWrite: true,
    });
    const sphere = new THREE.Mesh(geometry, material);
    const parentObject = new THREE.Object3D();
    parentObject.add(sphere);
    scene.add(parentObject);

    // Add Mars
    const marsGeometry = new THREE.SphereGeometry(0.53, 64, 64); // Mars is approximately half the size of Earth
    const marsMaterial = new THREE.MeshStandardMaterial({
      map: marsTexture,
      depthTest: true,
      depthWrite: true,
    });
    const mars = new THREE.Mesh(marsGeometry, marsMaterial);
    const marsParentObject = new THREE.Object3D();
    marsParentObject.add(mars);
    scene.add(marsParentObject);

    // Add lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 5);
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
    // Fetch or calculate current orientation data
    // For demonstration, let's assume these values represent the current angles
    // of Earth and Mars in their orbits (in degrees)
    const currentEarthAngle = 102; // replace with actual fetched or calculated value
    const currentMarsAngle = 111; // replace with actual fetched or calculated value

    // Create line circle representing orbital path for Earth
    const points = [];
    for (let i = 0; i < 100; i++) {
      const x = 10 * Math.cos((2 * Math.PI * i) / 100);
      const z = 10 * Math.sin((2 * Math.PI * i) / 100);
      points.push(new THREE.Vector3(x, 0, z));
    }
    const geometryLine = new THREE.BufferGeometry().setFromPoints(points);
    const materialLine = new THREE.LineBasicMaterial({
      color: 0x0000ff,
      linewidth: 1,
    });
    const line = new THREE.Line(geometryLine, materialLine);
    line.position.y += 0.01; // adjust as needed
    line.computeLineDistances();
    scene.add(line);

    // Create solid line circle representing orbit for Mars
    const pointsMars = [];
    for (let i = 0; i < 100; i++) {
      const x = 15.3 * Math.cos((2 * Math.PI * i) / 100);
      const z = 15.3 * Math.sin((2 * Math.PI * i) / 100);
      pointsMars.push(new THREE.Vector3(x, 0, z));
    }
    const geometryLineMars = new THREE.BufferGeometry().setFromPoints(
      pointsMars
    );

    // This will create a solid red line
    const materialLineMars = new THREE.LineBasicMaterial({
      color: 0xff0000,
      linewidth: 1,
    });
    const lineMars = new THREE.Line(geometryLineMars, materialLineMars);
    const marsLineParentObject = new THREE.Object3D(); // New parent object for Mars line
    marsLineParentObject.add(lineMars); // Add Mars line to its parent object
    lineMars.position.y += 0.01; // adjust as needed
    scene.add(marsLineParentObject); // Add Mars line parent object to the scene

    // Convert the inclination angle to radians
    const marsInclinationRad = THREE.MathUtils.degToRad(1.85);
    // Tilt the orbits of Mars
    marsParentObject.rotation.x = marsInclinationRad;
    marsLineParentObject.rotation.x = marsInclinationRad; // Apply inclination to Mars line
    sphere.position.x = 10; // Earth position
    mars.position.x = 15.3; // Mars position

    // Convert the angles to radians
    const earthRad = THREE.MathUtils.degToRad(currentEarthAngle);
    const marsRad = THREE.MathUtils.degToRad(currentMarsAngle);
    parentObject.rotation.y = earthRad;
    marsParentObject.rotation.y = marsRad;
    marsLineParentObject.rotation.y = marsRad; // Set the initial rotation of Mars line to match Mars
    const animate = function () {
      requestAnimationFrame(animate);

      // Rotate the spheres around the new axis
      sphere.rotateOnAxis(rotationAxis, rotationSpeed);
      mars.rotateOnAxis(rotationAxis, rotationSpeed); // Mars day/night cycle
      centerSphere.rotateOnAxis(sunRotationAxis, sunRotationSpeed);

      // Rotate the parent objects around the y-axis
      parentObject.rotation.y += orbitalSpeed;
      marsParentObject.rotation.y += marsOrbitalSpeed; // Mars orbit
      marsLineParentObject.rotation.y += marsOrbitalSpeed; // Mars line orbit
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      // Cleanup on unmount
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      materialLine.dispose();
      marsMaterial.dispose();
      marsGeometry.dispose();
      materialLineMars.dispose();
    };
  }, [isBrowser]);

  return <div ref={containerRef} />;
};

export default SolarSystem;
