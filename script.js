// app.js
document.addEventListener('DOMContentLoaded', () => {
    const waterLevel = document.getElementById('water-level');
    const videoElement = document.getElementById('water-video');
    const statusText = document.getElementById('status').querySelector('span');
    const messageText = document.getElementById('message');
    const simulateButton = document.getElementById('simulate-full');
    const resetButton = document.getElementById('reset');
    const pauseButton = document.getElementById('pause-video');
    const playButton = document.getElementById('play-video');
  
    let currentHeight = 0;
    let tankInterval;
    let isFilling = false;
  
    // Simulate water filling up with a smooth transition
    function startFilling() {
      isFilling = true;
      tankInterval = setInterval(() => {
        if (currentHeight < 100 && isFilling) {
          currentHeight += 5; // Increment in steps for better visual effect
          waterLevel.style.height = `${currentHeight}%`;
          messageText.textContent = `Water is filling... ${currentHeight}%`;
          statusText.textContent = 'Tank Status: Filling...';
        } else {
          clearInterval(tankInterval);
          if (currentHeight >= 100) {
            statusText.textContent = 'Tank Status: Tank Full!';
            messageText.textContent = 'The tank is full, please stop the water supply!';
            alert('Tank is full! Please turn off the water supply.');
            // Simulate sending a notification
            console.log('Notification sent: Tank Full!');
          }
        }
      }, 1000); // Adjust speed of filling by changing the interval time
    }
  
    // Simulate "Tank Full" event
    simulateButton.addEventListener('click', () => {
      if (currentHeight < 100) {
        startFilling();
      } else {
        alert('Tank is already full!');
      }
    });
  
    // Reset Tank and restart filling
    resetButton.addEventListener('click', () => {
      currentHeight = 0;
      waterLevel.style.height = `${currentHeight}%`;
      messageText.textContent = 'Water is filling...';
      statusText.textContent = 'Tank Status: Resetting...';
      clearInterval(tankInterval); // Stop any ongoing filling
      setTimeout(() => {
        statusText.textContent = 'Tank Status: Ready to Fill';
        messageText.textContent = 'Press "Simulate Tank Full" to start filling';
      }, 1000);
    });
  
    // Pause the water filling video
    pauseButton.addEventListener('click', () => {
      videoElement.pause();
      statusText.textContent = 'Tank Status: Paused';
      messageText.textContent = 'Water supply is paused';
    });
  
    // Play the water filling video
    playButton.addEventListener('click', () => {
      videoElement.play();
      statusText.textContent = 'Tank Status: Filling...';
      messageText.textContent = 'Water is filling...';
    });
  });
  