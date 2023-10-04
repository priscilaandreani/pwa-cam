const startCamera = document.getElementById('startCamera');
const cameraFeed = document.getElementById('cameraFeed');
const photoCanvas = document.getElementById('photoCanvas');
const photoPreview = document.getElementById('photoPreview');
const takePhoto = document.getElementById('takePhoto');

if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
  startCamera.addEventListener('click', async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      cameraFeed.srcObject = stream;
      cameraFeed.play();
      startCamera.style.display = 'none';
      takePhoto.style.display = 'block';
    } catch (error) {
      console.log(error);
    }
  });

  takePhoto.addEventListener('click', () => {
    photoCanvas.width = cameraFeed.videoWidth;
    photoCanvas.height = cameraFeed.videoHeight;
    photoCanvas.getContext('2d').drawImage(cameraFeed, 0, 0);
    photoPreview.src = photoCanvas.toDataURL('image/png');
    photoPreview.style.display = 'block';
  });
} else {
  console.error('Seu navegador não suporta API de mídia');
}
