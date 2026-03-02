/**
 * Three.js Scene Module
 * Optimized 3D laptop disassembly visualization
 */

import { debounce, throttle, prefersReducedMotion, isMobile } from './utils.js';

let scene, camera, renderer, laptopGroup;
let raycaster, mouse, tooltip;
let interactables = [];
let animationId = null;
let isPaused = false;

// Component references
let mobo, cpu, ram1, ram2, ssd, battery, fanGroup, lidGroup, keyboardGroup, base;

/**
 * Initialize Three.js scene
 */
export function initThreeScene() {
  if (!window.THREE || !window.gsap) {
    console.error('Three.js or GSAP not loaded');
    return;
  }
  
  const canvas = document.querySelector('#webgl-canvas');
  if (!canvas) return;
  
  // Scene setup
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xfafbfc, 0.012);
  
  // Camera setup
  const sizes = { width: window.innerWidth, height: window.innerHeight };
  camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
  camera.position.set(0, 3, 12);
  scene.add(camera);
  
  // Renderer setup
  renderer = new THREE.WebGLRenderer({ 
    canvas, 
    alpha: true, 
    antialias: !isMobile(),
    powerPreference: 'high-performance'
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = !isMobile();
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  // Lighting - simplified for performance
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
  mainLight.position.set(5, 10, 5);
  if (!isMobile()) {
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
  }
  scene.add(mainLight);
  
  const rimLight = new THREE.PointLight(0x3b82f6, 0.8, 15);
  rimLight.position.set(-5, 2, -5);
  scene.add(rimLight);
  
  // Create laptop model
  createLaptopModel();
  
  // Setup scroll animations
  if (!prefersReducedMotion()) {
    setupScrollAnimations();
  }
  
  // Setup interactivity
  setupInteractivity();
  
  // Handle window resize
  window.addEventListener('resize', debounce(handleResize, 250));
  
  // Handle visibility change
  window.addEventListener('pause-animations', () => {
    isPaused = true;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  });
  
  window.addEventListener('resume-animations', () => {
    isPaused = false;
    if (!animationId) {
      animate();
    }
  });
  
  // Start animation loop
  animate();
}

/**
 * Create laptop 3D model
 */
function createLaptopModel() {
  laptopGroup = new THREE.Group();
  
  // Materials - matte finish for ambient background
  const darkMetal = new THREE.MeshStandardMaterial({ 
    color: 0x3a3a3a, 
    roughness: 0.8, 
    metalness: 0.2 
  });
  const silverMetal = new THREE.MeshStandardMaterial({ 
    color: 0x9a9a9a, 
    roughness: 0.7, 
    metalness: 0.3 
  });
  const pcbGreen = new THREE.MeshStandardMaterial({ 
    color: 0x1a5a2f, 
    roughness: 0.9, 
    metalness: 0.1 
  });
  const chipBlack = new THREE.MeshStandardMaterial({ 
    color: 0x2a2a2a, 
    roughness: 0.8, 
    metalness: 0.2 
  });
  const copper = new THREE.MeshStandardMaterial({ 
    color: 0xb87333, 
    roughness: 0.6, 
    metalness: 0.4 
  });
  const screenMat = new THREE.MeshStandardMaterial({ 
    color: 0x1a1a1a, 
    emissive: 0x3b82f6, 
    emissiveIntensity: 0.2 
  });
  
  // Base
  const baseGeo = new THREE.BoxGeometry(6, 0.2, 4);
  base = new THREE.Mesh(baseGeo, darkMetal);
  base.castShadow = true;
  base.receiveShadow = true;
  
  // Lid with screen
  lidGroup = new THREE.Group();
  const lidBack = new THREE.Mesh(new THREE.BoxGeometry(6, 4, 0.1), darkMetal);
  const displayPanel = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 3.6), screenMat);
  displayPanel.position.set(0, 0, 0.06);
  
  const screenGlow = new THREE.PointLight(0x3b82f6, 0.2, 4);
  screenGlow.position.set(0, 0, 0.5);
  
  lidGroup.add(lidBack, displayPanel, screenGlow);
  lidGroup.position.set(0, 2.1, -2);
  
  // Motherboard group
  mobo = new THREE.Group();
  const pcb = new THREE.Mesh(new THREE.BoxGeometry(5, 0.05, 2.5), pcbGreen);
  mobo.add(pcb);
  
  // CPU
  cpu = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.05, 0.8), silverMetal);
  cpu.position.set(0, 0.06, 0);
  cpu.userData = { name: "Intel Core i7", info: "High Performance CPU Repair" };
  mobo.add(cpu);
  
  // RAM modules
  ram1 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.05, 0.4), pcbGreen);
  ram1.position.set(1.5, 0.06, -0.5);
  ram1.userData = { name: "16GB RAM", info: "DDR4 Memory Upgrade" };
  mobo.add(ram1);
  
  ram2 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.05, 0.4), pcbGreen);
  ram2.position.set(1.5, 0.06, 0.5);
  ram2.userData = { name: "RAM Slot 2", info: "Upgrade to 32GB" };
  mobo.add(ram2);
  
  // SSD
  ssd = new THREE.Mesh(new THREE.BoxGeometry(1, 0.05, 0.5), chipBlack);
  ssd.position.set(-1.5, 0.06, 0);
  ssd.userData = { name: "512GB SSD", info: "Fast Storage Upgrades" };
  mobo.add(ssd);
  
  mobo.position.set(0, 0.1, -0.5);
  
  // Battery
  battery = new THREE.Mesh(new THREE.BoxGeometry(4, 0.3, 0.8), chipBlack);
  battery.position.set(0, 0.1, 1.2);
  battery.userData = { name: "Battery Cell", info: "Original Replacements" };
  
  // Cooling system
  fanGroup = new THREE.Group();
  const fanHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.15, 16), chipBlack);
  const heatPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2.5), copper);
  heatPipe.rotation.z = Math.PI / 2;
  heatPipe.position.set(-1.2, 0, 0);
  fanGroup.add(fanHousing, heatPipe);
  fanGroup.position.set(-1.5, 0.1, -0.8);
  fanGroup.userData = { name: "Thermal Cooling", info: "Paste & Fan Cleaning" };
  
  // Keyboard (simplified for performance)
  keyboardGroup = new THREE.Group();
  const keyGeo = new THREE.BoxGeometry(0.25, 0.05, 0.25);
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 12; c++) {
      const key = new THREE.Mesh(keyGeo, chipBlack);
      key.position.set(c * 0.35 - 2, 0, r * 0.35 - 0.5);
      keyboardGroup.add(key);
    }
  }
  keyboardGroup.position.set(0, 0.15, 0.5);
  
  // Add all to laptop group
  laptopGroup.add(base, lidGroup, mobo, battery, fanGroup, keyboardGroup);
  laptopGroup.rotation.y = Math.PI / 6;
  laptopGroup.rotation.x = Math.PI / 12;
  scene.add(laptopGroup);
  
  // Store interactable objects
  interactables = [cpu, ram1, ram2, ssd, battery, fanHousing];
}

/**
 * Setup scroll-triggered animations
 */
function setupScrollAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return;
  
  gsap.registerPlugin(ScrollTrigger);
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".scroll-container",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
    }
  });
  
  // Disassembly animation
  tl.to(lidGroup.position, { y: 3.5, z: -3.5, duration: 2, ease: "power2.inOut" }, 0)
    .to(lidGroup.rotation, { x: -0.2, duration: 2, ease: "power2.inOut" }, 0)
    .to(keyboardGroup.position, { y: 1.5, z: 0.5, duration: 2, ease: "power2.inOut" }, 0)
    .to(mobo.position, { y: 0.8, duration: 2, ease: "power2.inOut" }, 0)
    .to(fanGroup.position, { y: 1.2, x: -2, duration: 2, ease: "power2.inOut" }, 0)
    .to(battery.position, { y: -0.8, z: 2.5, duration: 2, ease: "power2.inOut" }, 0)
    .to(base.position, { y: -1.5, duration: 2, ease: "power2.inOut" }, 0)
    .to(laptopGroup.rotation, { y: Math.PI / 2, duration: 2, ease: "power2.inOut" }, 0)
    .to(camera.position, { z: 10, duration: 2, ease: "power2.inOut" }, 0);
  
  // Rotate for different sections
  tl.to(laptopGroup.rotation, { x: Math.PI / 3, y: 0, duration: 2, ease: "power2.inOut" }, 2)
    .to(camera.position, { z: 13, x: 1, duration: 2, ease: "power2.inOut" }, 2);
  
  tl.to(laptopGroup.rotation, { x: 0, y: -Math.PI / 3, duration: 2, ease: "power2.inOut" }, 4)
    .to(camera.position, { x: 0, z: 11, duration: 2, ease: "power2.inOut" }, 4);
}

/**
 * Setup raycasting interactivity
 */
function setupInteractivity() {
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  tooltip = document.getElementById('3d-tooltip');
  
  if (!tooltip) return;
  
  // Throttled mousemove for performance
  const handleMouseMove = throttle((e) => {
    if (isPaused) return;
    
    // Subtle parallax effect
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    
    if (!prefersReducedMotion() && laptopGroup) {
      gsap.to(laptopGroup.rotation, {
        x: laptopGroup.rotation.x + (y * 0.05),
        y: laptopGroup.rotation.y + (x * 0.05),
        duration: 0.5,
        ease: "power2.out"
      });
    }
    
    // Raycasting for tooltip
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    
    tooltip.style.left = `${e.clientX}px`;
    tooltip.style.top = `${e.clientY}px`;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactables, true);
    
    if (intersects.length > 0) {
      const obj = intersects[0].object;
      const data = obj.userData.name ? obj.userData : obj.parent?.userData;
      
      if (data && data.name) {
        tooltip.innerHTML = `<strong>${data.name}</strong><br>${data.info}`;
        tooltip.classList.remove('hidden');
        document.body.style.cursor = 'help';
      }
    } else {
      tooltip.classList.add('hidden');
      document.body.style.cursor = 'default';
    }
  }, 60);
  
  window.addEventListener('mousemove', handleMouseMove);
}

/**
 * Animation loop
 */
const clock = new THREE.Clock();
function animate() {
  if (isPaused) return;
  
  animationId = requestAnimationFrame(animate);
  
  const time = clock.getElapsedTime();
  
  // Subtle floating animation for disassembled parts
  if (mobo && mobo.position.y > 0.2) {
    mobo.position.y += Math.sin(time * 1.5) * 0.0008;
    if (ram1) ram1.rotation.z += 0.008;
    if (ram2) ram2.rotation.z += 0.008;
    if (fanGroup) fanGroup.children[0].rotation.y -= 0.08;
  }
  
  renderer.render(scene, camera);
}

/**
 * Handle window resize
 */
function handleResize() {
  const sizes = { width: window.innerWidth, height: window.innerHeight };
  
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

/**
 * Cleanup function
 */
export function cleanup() {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  
  if (renderer) {
    renderer.dispose();
  }
  
  if (scene) {
    scene.traverse((object) => {
      if (object.geometry) {
        object.geometry.dispose();
      }
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
  }
}
