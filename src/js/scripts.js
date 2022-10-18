import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
renderer.setClearColor(0xfefefe);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(6, 8, 14);

// Sets orbit control to move the camera around
const orbit = new OrbitControls(camera, renderer.domElement);
// Camera positioning
orbit.update();
orbit.enableDamping = true;
orbit.maxAzimuthAngle = Math.PI / 4;
orbit.minAzimuthAngle = Math.PI / 2;
orbit.maxPolarAngle = Math.PI / 2;
orbit.minPolarAngle = Math.PI / 4;
orbit.minDistance = 2;
orbit.maxDistance = 14;

const gltfLoader = new GLTFLoader();
gltfLoader.load("/assets/still_life_with_orange.glb", function (gltf) {
  scene.add(gltf.scene);
});

function animate() {
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
