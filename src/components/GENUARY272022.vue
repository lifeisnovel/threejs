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
    <div id="targetText"></div>
  </div>
</template>

<script>
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
    drawCanvas(pixels, sceneWidth);
  })

}

const themeColor = [[46, 41, 78], [84, 19, 136], [241, 233, 218], [255, 212, 0], [217, 3, 104]];

function filterPixels(pixels){
  /**
   * #2E294E dark violet rgb(46, 41, 78)
   * #541388 violet rgb(84, 19, 136)
   * #F1E9DA ivory rgb(241, 233, 218)
   * #FFD400 yellow rgb(255, 212, 0)
   * #D90368 red rgb(217, 3, 104)
   */
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

function drawCanvas(pixels, width){
  let targetText = document.getElementById('targetText');
  let classNum = 1;
  let innerHTML = '';
  for (let i = 0; i < pixels.data.length; i += 4){
    if(i % (width * 4) === 0){
      if(i > 0){
        innerHTML += `</div>`;
      }
      innerHTML += `<div class="colorchip-wrap">`;
    }
    if(parseInt(i / 2) % 4 > 0 || (parseInt(i / (width * 4)) % 2 > 0)){
      continue;
    }
    switch(pixels.data[i]){
      case 84:
        classNum = 2;
        break;
      case 241:
        classNum = 3;
        break;
      case 255:
        classNum = 4;
        break;
      case 217:
        classNum = 5;
        break;
      default:
        classNum = 1;
    }
    innerHTML += `<div class="colorchip theme-color-` + classNum + `"></div>`;
  }
  innerHTML += `</div>`;
  targetText.innerHTML = innerHTML;
}

export default {
  mounted(){
    getVideo();
  }
}
</script>

<style>

@keyframes colorChange1 {
  0% {
    background: #ffffff;
  }
  20% {
    background: #541388;
  }
  40% {
    background: #F1E9DA;
  }
  60% {
    background: #D90368;
  }
  80% {
    background: #FFD400;
  }
  100% {
    background: #2E294E;
  }
}
@keyframes colorChange2 {
  0% {
    background: #ffffff;
  }
  20% {
    background: #F1E9DA;
  }
  40% {
    background: #D90368;
  }
  60% {
    background: #FFD400;
  }
  80% {
    background: #2E294E;
  }
  100% {
    background: #541388;
  }
}
@keyframes colorChange3 {
  0% {
    background: #ffffff;
  }
  20% {
    background: #D90368;
  }
  40% {
    background: #FFD400;
  }
  60% {
    background: #2E294E;
  }
  80% {
    background: #541388;
  }
  100% {
    background: #F1E9DA;
  }
}
@keyframes colorChange4 {
  0% {
    background: #ffffff;
  }
  20% {
    background: #FFD400;
  }
  40% {
    background: #2E294E;
  }
  60% {
    background: #541388;
  }
  80% {
    background: #F1E9DA;
  }
  100% {
    background: #D90368;
  }
}
@keyframes colorChange5 {
  0% {
    background: #ffffff;
  }
  20% {
    background: #2E294E;
  }
  40% {
    background: #541388;
  }
  60% {
    background: #F1E9DA;
  }
  80% {
    background: #D90368;
  }
  100% {
    background: #FFD400;
  }
}

#filterCanvas {
  display: block;
  width: 60vw;
}
#targetText {
  margin-top: 200px;
}
#targetText .colorchip-wrap {
  display: block;
  line-height: 0;
  margin-bottom: 0;
}
#targetText .colorchip {
  display: inline-block;
  width: 4px;
  height: 4px;
  margin: 0;
  padding: 0;
  line-height: 0;
  background: #ffffff;
}
.theme-color-1 {
  animation: colorChange1 5s 5s ease alternate infinite;
}
.theme-color-2 {
  animation: colorChange2 5s 5s ease alternate infinite;
}
.theme-color-3 {
  animation: colorChange3 5s 5s ease alternate infinite;
}
.theme-color-4 {
  animation: colorChange4 5s 5s ease alternate infinite;
}
.theme-color-5 {
  animation: colorChange5 5s 5s ease alternate infinite;
}
</style>
