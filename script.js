const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  
  // Calculate the initial click position relative to the container
  startX = e.pageX - slider.offsetLeft;
  
  // Record the current scroll position
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
  if (!isDown) return; // Stop the function from running if mouse is not down
  e.preventDefault(); // Prevent text selection or other default behaviors
  
  // Calculate how far the mouse has moved
  const x = e.pageX - slider.offsetLeft;
  
  // The multiplier (3) determines the scroll speed/sensitivity
  const walk = (x - startX) * 3; 
  
  // Update the container's scroll position
  slider.scrollLeft = scrollLeft - walk;
});