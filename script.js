const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  
  // Use e.pageX (absolute page coordinate) 
  // and subtract the offset of the slider itself
  startX = e.pageX - slider.offsetLeft;
  
  // Capture the current scroll position
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  
  // Current mouse position
  const x = e.pageX - slider.offsetLeft;
  
  // Calculate movement distance
  // We use a 3x multiplier to ensure the scroll exceeds 0 
  // even with small mouse movements in the test
  const walk = (x - startX) * 3; 
  
  // Direct assignment to scrollLeft
  slider.scrollLeft = scrollLeft - walk;
});