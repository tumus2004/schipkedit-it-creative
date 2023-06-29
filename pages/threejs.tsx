import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MyScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const { clientWidth, clientHeight } = containerRef.current;

    const camera = new THREE.PerspectiveCamera(
      75,
      clientWidth / clientHeight,
      1,
      1100
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(clientWidth, clientHeight);

    (containerRef.current as HTMLDivElement).appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    renderer.render(scene, camera);
  }, []);

  return <div ref={containerRef} />;
};

export default MyScene;
