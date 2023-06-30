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

    // Create a sphere geometry with radius 1, and 32 vertical and horizontal segments
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);

    // Add lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 8);
    scene.add(light);

    camera.position.z = 5;

    // Create a new rotation axis that is tilted 23.5 degrees from the y-axis
    const rotationAxis = new THREE.Vector3(
      Math.sin(THREE.MathUtils.degToRad(-23.5)),
      Math.cos(THREE.MathUtils.degToRad(-23.5)),
      0
    );

    const animate = function () {
      requestAnimationFrame(animate);

      // Rotate the sphere around the new axis
      sphere.rotateOnAxis(rotationAxis, 0.01);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Cleanup on unmount
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, [isBrowser]);

  return <div ref={containerRef} />;
};

export default SolarSystem;
