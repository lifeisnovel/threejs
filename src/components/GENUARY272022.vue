<template>
  <div>
    <h3>2022. 1. 27. / 2022. 1. 28.</h3>
    <h4>Self portrait by #2E294E #541388 #F1E9DA #FFD400 #D90368</h4>
    <h5><a href="https://genuary.art/prompts#jan27" target="_blank">#GENUARY2022</a></h5>
    <p>
      <button id="toggleVideo">Turn off camera</button>
      <button id="capture">Capture</button>
    </p>
    <video id="originVideo"></video>
    <canvas id="filterCanvas"></canvas>
    <div id="targetCanvas"></div>
  </div>
</template>

<script>
/*
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
 */

function toggleVideo(stream){
  const tracks = stream.getTracks();
  const videoTrack = tracks.filter(track => track.kind === 'video')[0];
  if(videoTrack.enabled){
    videoTrack.stop();
  }else{
    getVideo();
  }
}

function getVideo(){
  const video = document.getElementById('originVideo');
  const sceneWidth = window.innerWidth * 0.2;
  const sceneHeight = window.innerHeight * 0.2;

  // Prefer camera resolution nearest to 1280x720.
  var constraints = { audio: false, video: { width: sceneWidth, height: sceneHeight } };

  navigator.mediaDevices.getUserMedia(constraints)
      .then(function(mediaStream) {
        video.srcObject = mediaStream;
        video.onloadedmetadata = function() {
          video.play();
          video.addEventListener('canplay', function(){
            filterVideo(video);
          });

          // Toggle Video
          const btnToggleVideo = document.getElementById('toggleVideo');
          btnToggleVideo.addEventListener('click', function(){
            toggleVideo(mediaStream);
          });
        }
      })
      .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
}

function filterVideo(video){
  const sceneWidth = video.videoWidth;
  const sceneHeight = video.videoHeight;
  const canvas = document.getElementById('filterCanvas');
  const ctx = canvas.getContext('2d');

  const btnCapture = document.getElementById('capture');
  btnCapture.addEventListener('click', function(){
    ctx.drawImage(video, 0, 0, sceneWidth, sceneHeight);
    let pixels = ctx.getImageData(0, 0, sceneWidth, sceneHeight);
    pixels = filterPixels(pixels);
    ctx.putImageData(pixels, 0, 0);
  })

  /*
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, sceneWidth, sceneHeight);
    let pixels = ctx.getImageData(0, 0, sceneWidth, sceneHeight);
    pixels = filterPixels(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 10000);
  */

}

function filterPixels(pixels){
  /**
   * #2E294E dark violet rgb(46, 41, 78)
   * #541388 violet rgb(84, 19, 136)
   * #F1E9DA ivory rgb(241, 233, 218)
   * #FFD400 yellow rgb(255, 212, 0)
   * #D90368 red rgb(217, 3, 104)
   */
  const themeColor = [[46, 41, 78], [84, 19, 136], [241, 233, 218], [255, 212, 0], [217, 3, 104]];

  for (let i = 0; i < pixels.data.length; i += 4){
    const red = pixels.data[i];
    const green = pixels.data[i + 1];
    const blue = pixels.data[i + 2];
    let valueList = [];
    for(let j = 0; j < themeColor.length; j++){
      const themeRed = themeColor[j][0];
      const themeGreen = themeColor[j][1];
      const themeBlue = themeColor[j][2];
      valueList[j] = Math.abs(red - themeRed) + Math.abs(green - themeGreen) + Math.abs(blue - themeBlue);
    }
    let colorNum = valueList.indexOf(Math.min(...valueList));
    pixels.data[i] = themeColor[colorNum][0];
    pixels.data[i + 1] = themeColor[colorNum][1];
    pixels.data[i + 2] = themeColor[colorNum][2];

    // don't use alpha
  }
  return pixels;
}


export default {

  mounted(){
    //drawCanvas();
    getVideo();
  }
}
</script>

<style scoped>
#filterCanvas {
  display: block;
  width: 60vw;
}
</style>
