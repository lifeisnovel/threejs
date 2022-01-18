<template>
  <div>
    <h3>2022. 1. 19.</h3>
    <h4>A text sea</h4>
    <h5>#GENUARY2022</h5>
    <div id="targetCanvas"></div>
  </div>
</template>

<script>
import * as THREE from 'three';

function drawCanvas(){
  const sceneWidth = window.innerWidth * 0.8;
  const sceneHeight = window.innerHeight * 0.8;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, sceneWidth / sceneHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( sceneWidth, sceneHeight );
  document.getElementById("targetCanvas").append( renderer.domElement );

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
  }

  animate();
}

export default {

  mounted(){
    drawCanvas();
  }
}
</script>

<style scoped>
</style>
