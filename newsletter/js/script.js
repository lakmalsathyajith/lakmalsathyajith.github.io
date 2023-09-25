
document.addEventListener('DOMContentLoaded', function (data) {

  const subscribeButton = document.getElementById('subscribe');
  const successButton = document.getElementById('success');
  
  const mainContent = document.getElementById('container1');
  const successModal = document.getElementById('container2');

  subscribeButton.onclick = () => {
    mainContent.style.display = 'none';
    successModal.style.display = 'flex';
  };

  successButton.onclick = () => {
    mainContent.style.display = 'flex';
    successModal.style.display = 'none';
  };
  
}, false);