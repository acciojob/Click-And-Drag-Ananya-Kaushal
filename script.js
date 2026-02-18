// Your code here.
const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let isDragging = false;
let activeItem = null;
let offset = { x: 0, y: 0 };

// 1. Attach listeners to every item
items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    activeItem = item;
    container.classList.add('active');

    // Get current position of the item and container
    const rect = activeItem.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Calculate mouse offset inside the element so it doesn't "jump" to the cursor
    offset.x = e.clientX - rect.left;
    offset.y = e.clientY - rect.top;

    // Convert to absolute positioning to allow free movement
    // We subtract containerRect to keep coordinates relative to the parent
    if (activeItem.style.position !== 'absolute') {
      const initialTop = rect.top - containerRect.top;
      const initialLeft = rect.left - containerRect.left;
      
      activeItem.style.position = 'absolute';
      activeItem.style.margin = '0';
      activeItem.style.zIndex = '1000';
      activeItem.style.top = initialTop + 'px';
      activeItem.style.left = initialLeft + 'px';
    }
  });
});

// 2. Handle movement on the whole document (smoother tracking)
document.addEventListener('mousemove', (e) => {
  if (!isDragging || !activeItem) return;

  const containerRect = container.getBoundingClientRect();

  // Calculate new position
  let x = e.clientX - containerRect.left - offset.x;
  let y = e.clientY - containerRect.top - offset.y;

  // 3. Boundary Constraints (Stay inside .items)
  const maxX = containerRect.width - activeItem.offsetWidth;
  const maxY = containerRect.height - activeItem.offsetHeight;

  // Clamp values between 0 and Max
  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  activeItem.style.left = x + 'px';
  activeItem.style.top = y + 'px';
});

// 4. Drop the item
document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    container.classList.remove('active');
    activeItem = null;
  }
});