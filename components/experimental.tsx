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
    const earthTexture = textureLoader.load('/texture.jpg');
    const sunTexture = textureLoader.load('./thesun.jpg');
    const marsTexture = textureLoader.load('/marsTexture.jpg'); // Load Mars texture

    // Create the central, larger sphere
    const centerGeometry = new THREE.SphereGeometry(4, 64, 64);
    const centerMaterial = new THREE.MeshStandardMaterial({ map: sunTexture });
    const centerSphere = new THREE.Mesh(centerGeometry, centerMaterial);
    scene.add(centerSphere);

    // Create a sphere geometry with radius 1, and 64 vertical and horizontal segments
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshStandardMaterial({ map: earthTexture });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = 15;
    const parentObject = new THREE.Object3D();
    parentObject.add(sphere);
    scene.add(parentObject);

    // Add Mars
    const marsGeometry = new THREE.SphereGeometry(0.53, 64, 64); // Mars is approximately half the size of Earth
    const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
    const mars = new THREE.Mesh(marsGeometry, marsMaterial);
    mars.position.x = 23; // Mars is further from the Sun
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
    const rotationSpeed = 0.5;
    const orbitalSpeed = rotationSpeed / 365;
    const marsOrbitalSpeed = rotationSpeed / 687; // Mars orbital speed

    // Sun rotation speed
    const sunRotationSpeed = rotationSpeed / 27;

    // Fetch or calculate current orientation data
    // For demonstration, let's assume these values represent the current angles
    // of Earth and Mars in their orbits (in degrees)
    const currentEarthAngle = 120; // replace with actual fetched or calculated value
    const currentMarsAngle = 240; // replace with actual fetched or calculated value

    // Convert the angles to radians
    const earthRad = THREE.MathUtils.degToRad(currentEarthAngle);
    const marsRad = THREE.MathUtils.degToRad(currentMarsAngle);

    parentObject.rotation.y = earthRad;
    marsParentObject.rotation.y = marsRad;

    const animate = function () {
      requestAnimationFrame(animate);

      // Rotate the spheres around the new axis
      sphere.rotateOnAxis(rotationAxis, rotationSpeed);
      mars.rotateOnAxis(rotationAxis, rotationSpeed); // Mars day/night cycle
      centerSphere.rotateOnAxis(sunRotationAxis, sunRotationSpeed);

      // Rotate the parent objects around the y-axis
      parentObject.rotation.y += orbitalSpeed;
      marsParentObject.rotation.y += marsOrbitalSpeed; // Mars orbit

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Cleanup on unmount
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      marsMaterial.dispose();
      marsGeometry.dispose();
      centerMaterial.dispose();
      centerGeometry.dispose();
    };
  }, [isBrowser]);

  return <div ref={containerRef} />;
};

export default SolarSystem;
