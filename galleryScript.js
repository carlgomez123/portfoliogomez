let currentImageIndex = 0;
let galleryImages = [];

// Use all images and videos from the educational_tour_pics folder, sorted numerically
const tourMediaList = [
  './educational_tour_pics/1.jpg',
  './educational_tour_pics/2.MOV',
  './educational_tour_pics/3.jpg',
  './educational_tour_pics/4.jpg',
  './educational_tour_pics/5.jpg',
  './educational_tour_pics/6.jpg',
  './educational_tour_pics/7.jpg',
  './educational_tour_pics/8.jpg',
  './educational_tour_pics/9.jpg',
  './educational_tour_pics/10.jpg',
  './educational_tour_pics/11.jpg',
  './educational_tour_pics/12.jpg',
  './educational_tour_pics/13.jpg',
  './educational_tour_pics/14.jpg',
  './educational_tour_pics/15.jpg',
  './educational_tour_pics/16.jpg',
  './educational_tour_pics/17.jpg',
  './educational_tour_pics/18.jpg',
  './educational_tour_pics/19.jpg',
  './educational_tour_pics/20.jpg',
  './educational_tour_pics/21.jpg',
  './educational_tour_pics/22.jpg',
  './educational_tour_pics/23.jpg',
  './educational_tour_pics/24.jpg',
  './educational_tour_pics/25.jpg',
  './educational_tour_pics/26.jpg',
  './educational_tour_pics/27.jpg',
  './educational_tour_pics/28.jpg',
  './educational_tour_pics/29.jpg',
  './educational_tour_pics/30.jpg',
  './educational_tour_pics/32.jpg',
  './educational_tour_pics/33.jpg',
  './educational_tour_pics/34.MOV',
  './educational_tour_pics/35.MOV',
  './educational_tour_pics/36.jpg',
  './educational_tour_pics/37.jpg',
  './educational_tour_pics/38.jpg',
  './educational_tour_pics/39.jpg',
  './educational_tour_pics/40.jpg',
  './educational_tour_pics/41.jpg',
  './educational_tour_pics/42.MOV',
];

function isVideo(file) {
  return /\.(mov|mp4|webm)$/i.test(file);
}
function isImage(file) {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(file);
}

function initializeGallery() {
  const gallery = document.getElementById('photoGallery');
  const dotsContainer = document.getElementById('galleryDots');

  if (!gallery) return;

  // Clear previous content
  gallery.innerHTML = '';
  dotsContainer.innerHTML = '';

  // Create media elements
  tourMediaList.forEach((mediaPath, index) => {
    let mediaElem;
    if (isVideo(mediaPath)) {
      mediaElem = document.createElement('video');
      mediaElem.src = mediaPath;
      mediaElem.className = 'galleryImage';
      mediaElem.muted = true;
      mediaElem.loop = true;
      mediaElem.playsInline = true;
      mediaElem.autoplay = true;
      mediaElem.setAttribute('preload', 'metadata');
      mediaElem.setAttribute('muted', ''); // ensure muted
      // Remove controls for silent video
      mediaElem.controls = false;
      if (index === 0) mediaElem.classList.add('active');
    } else if (isImage(mediaPath)) {
      mediaElem = document.createElement('img');
      mediaElem.src = mediaPath;
      mediaElem.alt = `Tour Photo ${index + 1}`;
      mediaElem.className = 'galleryImage';
      if (index === 0) mediaElem.classList.add('active');
    }
    if (mediaElem) {
      mediaElem.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = index;
        showImage(currentImageIndex); // update slide indicator in main gallery
        openLightbox(index);
      });
      gallery.appendChild(mediaElem);
    }
  });

  // Minimal slide indicator (progress bar style)
  const slideBar = document.createElement('div');
  slideBar.className = 'slide-bar';
  for (let i = 0; i < tourMediaList.length; i++) {
    const slide = document.createElement('div');
    slide.className = 'slide-indicator';
    if (i === 0) slide.classList.add('active');
    slideBar.appendChild(slide);
  }
  dotsContainer.appendChild(slideBar);

  galleryImages = document.querySelectorAll('.galleryImage');
  // Setup button listeners
  const nextBtn = document.querySelector('.nextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
      showImage(currentImageIndex);
    });
  }

  const prevBtn = document.querySelector('.prevBtn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      showImage(currentImageIndex);
    });
  }
}

// Lightbox/modal for full view
let lightbox = null;
function openLightbox(index) {
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'gallery-lightbox';
    lightbox.innerHTML = `
      <div class="gallery-lightbox-content">
        <button class="gallery-lightbox-close">&times;</button>
        <button class="gallery-lightbox-prev">&#10094;</button>
        <div class="gallery-lightbox-media"></div>
        <button class="gallery-lightbox-next">&#10095;</button>
      </div>
    `;
    document.body.appendChild(lightbox);
    lightbox.querySelector('.gallery-lightbox-close').onclick = closeLightbox;
    lightbox.querySelector('.gallery-lightbox-prev').onclick = () => changeLightbox(-1);
    lightbox.querySelector('.gallery-lightbox-next').onclick = () => changeLightbox(1);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    window.addEventListener('keydown', lightboxKeyHandler);
  }
  const idx = Number(index);          // <- use the clicked index
  lightbox.style.display = 'flex';
  lightbox.dataset.index = idx;       // <- set the dataset to the clicked index
  currentImageIndex = idx;
  renderLightboxMedia(idx);           // <- render exactly the clicked one
}

function closeLightbox() {
  if (lightbox) lightbox.style.display = 'none';
}
function changeLightbox(delta) {
  let idx = parseInt(lightbox.dataset.index, 10);
  idx = (idx + delta + tourMediaList.length) % tourMediaList.length;
  lightbox.dataset.index = idx;
  renderLightboxMedia(idx);
}
function renderLightboxMedia(index) {
  const mediaPath = tourMediaList[index];
  const mediaContainer = lightbox.querySelector('.gallery-lightbox-media');
  mediaContainer.innerHTML = '';
  let mediaElem;
  if (isVideo(mediaPath)) {
    mediaElem = document.createElement('video');
    mediaElem.src = mediaPath;
    mediaElem.muted = true;
    mediaElem.loop = true;
    mediaElem.playsInline = true;
    mediaElem.autoplay = true;
    mediaElem.setAttribute('preload', 'metadata');
    mediaElem.setAttribute('muted', ''); // ensure muted
    mediaElem.controls = false; // no sound button
    mediaElem.style.maxWidth = '98vw';
    mediaElem.style.maxHeight = '92vh';
    mediaElem.style.background = '#111';
    mediaElem.style.objectFit = 'contain';
    mediaElem.style.display = 'block';
    mediaElem.style.margin = '0 auto';
  } else if (isImage(mediaPath)) {
    mediaElem = document.createElement('img');
    mediaElem.src = mediaPath;
    mediaElem.alt = `Tour Photo ${index + 1}`;
    mediaElem.style.maxWidth = '98vw';
    mediaElem.style.maxHeight = '92vh';
    mediaElem.style.objectFit = 'contain';
    mediaElem.style.background = '#111';
    mediaElem.style.borderRadius = '12px';
    mediaElem.style.display = 'block';
    mediaElem.style.margin = '0 auto';
  }
  if (mediaElem) mediaContainer.appendChild(mediaElem);
}
// Keyboard navigation for modal
function lightboxKeyHandler(e) {
  if (!lightbox || lightbox.style.display !== 'flex') return;
  if (e.key === 'ArrowLeft') {
    changeLightbox(-1);
  } else if (e.key === 'ArrowRight') {
    changeLightbox(1);
  } else if (e.key === 'Escape') {
    closeLightbox();
  }
}

function showImage(index) {
  galleryImages.forEach((img, i) => {
    img.classList.remove('active');
  });
  const slides = document.querySelectorAll('.slide-indicator');
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  // Only update galleryImages and slide-indicator, not .dot
  if (galleryImages[index]) galleryImages[index].classList.add('active');
  if (slides[index]) slides[index].classList.add('active');
}

// Inject custom CSS for modal and slide bar
(function addGalleryCustomStyles() {
  if (document.getElementById('gallery-custom-style')) return;
  const style = document.createElement('style');
  style.id = 'gallery-custom-style';
  style.innerHTML = `
    .slide-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2px;
      margin: 8px 0 0 0; /* Reduced margin for less space below */
      height: 16px;
      min-height: 0;
    }
    .slide-indicator {
      width: 16px;
      height: 4px;
      background: #bbb;
      border-radius: 2px;
      opacity: 0.5;
      transition: background 0.2s, opacity 0.2s;
      margin: 0;
    }
    .slide-indicator.active {
      background: #3b82f6;
      opacity: 1;
      box-shadow: 0 0 4px #3b82f6aa;
    }
    .gallery-lightbox {
      position: fixed;
      z-index: 9999;
      left: 0; top: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.92);
      display: none;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s;
    }
    .gallery-lightbox-content {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 320px;
      min-height: 200px;
    }
    .gallery-lightbox-media {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    .gallery-lightbox-close {
      position: absolute;
      top: 10px; right: 18px;
      font-size: 2.2rem;
      color: #fff;
      background: none;
      border: none;
      cursor: pointer;
      z-index: 2;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    .gallery-lightbox-close:hover { opacity: 1; }
    .gallery-lightbox-prev, .gallery-lightbox-next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 2.5rem;
      color: #fff;
      background: none;
      border: none;
      cursor: pointer;
      z-index: 2;
      opacity: 0.7;
      transition: opacity 0.2s;
      padding: 0 12px;
      user-select: none;
    }
    .gallery-lightbox-prev { left: 0; }
    .gallery-lightbox-next { right: 0; }
    .gallery-lightbox-prev:hover, .gallery-lightbox-next:hover { opacity: 1; }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
})();

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeGallery);
} else {
  initializeGallery();
}
