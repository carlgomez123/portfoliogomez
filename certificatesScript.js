let currentCertIndex = 0;
let certificateCards = [];
let certAutoScrollInterval;

// Configuration - Add your certificate image paths here
const certificateList = [
  './userAsset/cert1.jpg',
  './userAsset/cert3.jpg',
  './userAsset/cert4.jpg',
 
];

function initializeCertificates() {
  const gallery = document.getElementById('certificatesGallery');

  if (!gallery) return; // Exit if elements don't exist

  // Create image elements
  certificateList.forEach((imagePath, index) => {
    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = `Certificate ${index + 1}`;
    img.className = 'certificateCard';
    if (index === 0) img.classList.add('active');
    gallery.appendChild(img);
  });

  certificateCards = document.querySelectorAll('.certificateCard');
  
  // Setup button listeners
  const nextBtn = document.querySelector('.certNextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentCertIndex = (currentCertIndex + 1) % certificateCards.length;
      showCertificate(currentCertIndex);
      resetCertAutoScroll();
    });
  }

  const prevBtn = document.querySelector('.certPrevBtn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentCertIndex = (currentCertIndex - 1 + certificateCards.length) % certificateCards.length;
      showCertificate(currentCertIndex);
      resetCertAutoScroll();
    });
  }

  // Start auto-scroll
  startCertAutoScroll();
}

function showCertificate(index) {
  certificateCards.forEach((card) => {
    card.classList.remove('active');
  });

  certificateCards[index].classList.add('active');
}

function startCertAutoScroll() {
  certAutoScrollInterval = setInterval(() => {
    currentCertIndex = (currentCertIndex + 1) % certificateCards.length;
    showCertificate(currentCertIndex);
  }, 5000); // Change certificate every 5 seconds
}

function resetCertAutoScroll() {
  clearInterval(certAutoScrollInterval);
  startCertAutoScroll();
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCertificates);
} else {
  initializeCertificates();
}
