'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 50;
    camera.position.y = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create grid floor
    const gridSize = 100;
    const gridDivisions = 30;
    const gridGeometry = new THREE.BufferGeometry();
    const gridPositions: number[] = [];

    // Horizontal lines
    for (let i = 0; i <= gridDivisions; i++) {
      const z = (i / gridDivisions) * gridSize - gridSize / 2;
      gridPositions.push(-gridSize / 2, 0, z);
      gridPositions.push(gridSize / 2, 0, z);
    }
    // Vertical lines
    for (let i = 0; i <= gridDivisions; i++) {
      const x = (i / gridDivisions) * gridSize - gridSize / 2;
      gridPositions.push(x, 0, -gridSize / 2);
      gridPositions.push(x, 0, gridSize / 2);
    }

    gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(gridPositions, 3));
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0x5EA1D6,
      transparent: true,
      opacity: 0.15,
    });
    const grid = new THREE.LineSegments(gridGeometry, gridMaterial);
    grid.position.y = -15;
    grid.rotation.x = -Math.PI / 6;
    scene.add(grid);

    // Floating tech nodes (connection points)
    const nodeCount = 60;
    const nodes: THREE.Vector3[] = [];
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 40 - 10;
      nodes.push(new THREE.Vector3(x, y, z));
      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;
    }

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 2,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    const nodesMesh = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodesMesh);

    // Connection lines between nearby nodes
    const connectionGeometry = new THREE.BufferGeometry();
    const connectionPositions: number[] = [];
    const connectionThreshold = 20;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < connectionThreshold) {
          connectionPositions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          connectionPositions.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }

    connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectionPositions, 3));
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x5EA1D6,
      transparent: true,
      opacity: 0.2,
    });
    const connections = new THREE.LineSegments(connectionGeometry, connectionMaterial);
    scene.add(connections);

    // Floating geometric shapes (tech elements)
    const shapes: THREE.Mesh[] = [];
    const shapeGeometries = [
      new THREE.OctahedronGeometry(1.5, 0),
      new THREE.TetrahedronGeometry(1.2, 0),
      new THREE.IcosahedronGeometry(1, 0),
    ];

    for (let i = 0; i < 8; i++) {
      const geometry = shapeGeometries[i % shapeGeometries.length];
      const material = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x5EA1D6 : 0x22d3ee,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20 - 15
      );
      mesh.userData = {
        rotationSpeed: { x: (Math.random() - 0.5) * 0.02, y: (Math.random() - 0.5) * 0.02 },
        floatSpeed: Math.random() * 0.5 + 0.5,
        floatOffset: Math.random() * Math.PI * 2,
        originalY: mesh.position.y,
      };
      shapes.push(mesh);
      scene.add(mesh);
    }

    // Data stream particles (vertical rising particles)
    const streamCount = 200;
    const streamGeometry = new THREE.BufferGeometry();
    const streamPositions = new Float32Array(streamCount * 3);
    const streamVelocities: number[] = [];

    for (let i = 0; i < streamCount; i++) {
      streamPositions[i * 3] = (Math.random() - 0.5) * 100;
      streamPositions[i * 3 + 1] = Math.random() * 60 - 30;
      streamPositions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 20;
      streamVelocities.push(Math.random() * 0.1 + 0.05);
    }

    streamGeometry.setAttribute('position', new THREE.BufferAttribute(streamPositions, 3));
    const streamMaterial = new THREE.PointsMaterial({
      color: 0x5EA1D6,
      size: 0.5,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const streamMesh = new THREE.Points(streamGeometry, streamMaterial);
    scene.add(streamMesh);

    // Mouse handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Camera parallax based on mouse
      camera.position.x += (mouseRef.current.x * 5 - camera.position.x) * 0.02;
      camera.position.y += (mouseRef.current.y * 3 + 5 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, -10);

      // Grid animation
      grid.position.z = (elapsedTime * 2) % (gridSize / gridDivisions) - gridSize / gridDivisions;

      // Animate shapes
      shapes.forEach((shape) => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.position.y = shape.userData.originalY + Math.sin(elapsedTime * shape.userData.floatSpeed + shape.userData.floatOffset) * 2;
      });

      // Animate data stream
      const positions = streamMesh.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < streamCount; i++) {
        positions[i * 3 + 1] += streamVelocities[i];
        if (positions[i * 3 + 1] > 30) {
          positions[i * 3 + 1] = -30;
        }
      }
      streamMesh.geometry.attributes.position.needsUpdate = true;

      // Rotate nodes slightly
      nodesMesh.rotation.y = elapsedTime * 0.05;
      connections.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      gridGeometry.dispose();
      gridMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      connectionGeometry.dispose();
      connectionMaterial.dispose();
      streamGeometry.dispose();
      streamMaterial.dispose();
      shapes.forEach((shape) => {
        shape.geometry.dispose();
        (shape.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1525 40%, #0a1628 100%)'
      }}
    />
  );
};

export default ParticleBackground;