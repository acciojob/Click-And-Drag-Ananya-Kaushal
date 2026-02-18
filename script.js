const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

// 1. Capture the start point
slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  
  // e.pageX is the mouse position, slider.offsetLeft is the container's edge
  startX = e.pageX - slider.offsetLeft;
  
  // Save the current scroll position so we can add to it
  scrollLeft = slider.scrollLeft;
});

// 2. Stop dragging when mouse leaves or let go
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

// 3. Perform the scroll calculation
slider.addEventListener('mousemove', (e) => {
  if (!isDown) return; // Only run if the mouse is clicked
  e.preventDefault();  // Stop text selection
  
  const x = e.pageX - slider.offsetLeft;
  
  // Calculate the distance moved from the start point
  // Multiplying by 2 or 3 makes the scroll feel more responsive (the "walk")
  const walk = (x - startX) * 2; 
  
  // Update the scrollLeft property (this is what the test is looking for)
  slider.scrollLeft = scrollLeft - walk;
});