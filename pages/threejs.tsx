import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";

const MyScene = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    1,
    1100
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  document.getElementById("scene")?.appendChild(renderer.domElement);

  // Create a cube
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Render the scene
  renderer.render(scene, camera);

  return <div id="scene"></div>;
};

export default MyScene;
