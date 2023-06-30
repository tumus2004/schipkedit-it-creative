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
    const texture = textureLoader.load('/texture.jpg');

    // Create the central, larger sphere
    const centerGeometry = new THREE.SphereGeometry(4, 64, 64);
    const centerMaterial = new THREE.MeshStandardMaterial({ color: 'yellow' });
    const centerSphere = new THREE.Mesh(centerGeometry, centerMaterial);

    scene.add(centerSphere);

    // Create a sphere geometry with radius 1, and 32 vertical and horizontal segments
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);

    // Position the sphere at the edge of the orbital path
    sphere.position.x = 15;

    // Create a parent object and add the sphere to it
    const parentObject = new THREE.Object3D();
    parentObject.add(sphere);

    scene.add(parentObject);

    // Add lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 5);
    scene.add(light);

    camera.position.z = 15;
    camera.position.y = 2;

    // Create a new rotation axis that is tilted 23.5 degrees from the y-axis
    const rotationAxis = new THREE.Vector3(
      Math.sin(THREE.MathUtils.degToRad(23.5)),
      Math.cos(THREE.MathUtils.degToRad(23.5)),
      0
    );

    // Adjust the speed of rotation to match Earth's
    const rotationSpeed = 0.05; 
    const orbitalSpeed = rotationSpeed / 365; 

    const animate = function () {
      requestAnimationFrame(animate);

      // Rotate the sphere around the new axis
      sphere.rotateOnAxis(rotationAxis, rotationSpeed);

      // Rotate the parent object around the y-axis
      parentObject.rotation.y += orbitalSpeed;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Cleanup on unmount
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      centerMaterial.dispose();
      centerGeometry.dispose();
    };
  }, [isBrowser]);

  return <div ref={containerRef} />;
};

export default SolarSystem;
