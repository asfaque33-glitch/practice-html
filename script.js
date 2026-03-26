// Total slots
const totalSlots = 20;

// Parking grid
const parkingGrid = document.getElementById('parkingGrid');

// Dashboard elements
const availableDisplay = document.getElementById('availableSlots');
const occupiedDisplay = document.getElementById('occupiedSlots');
const availableList = document.getElementById('availableList');
const occupiedList = document.getElementById('occupiedList');

// Generate slots dynamically
for (let i = 1; i <= totalSlots; i++) {
  const slot = document.createElement('div');
  slot.className = 'slot green';
  slot.id = 'Slot' + i;
  slot.innerHTML = `Slot ${i}<div class="car-symbol">🚗</div>`;

  // Toggle slot status on click
  slot.addEventListener('click', () => toggleSlot(slot.id));

  parkingGrid.appendChild(slot);
}

// Function to toggle slot
function toggleSlot(slotId){
  const slot = document.getElementById(slotId);
  slot.className = slot.className.includes('green') ? 'slot red' : 'slot green';
  slot.innerHTML = slot.className.includes('green') ? `Slot ${slotId.replace('Slot','')}<div class="car-symbol">🚗</div>` : `Slot ${slotId.replace('Slot','')}<div class="car-symbol">🚗</div>`;
  updateDashboard();
}

// Update dashboard counts and lists
function updateDashboard(){
  const slots = document.querySelectorAll('.slot');
  let available = [];
  let occupied = [];

  slots.forEach(s => s.classList.contains('green') ? available.push(s.id.replace('Slot','')) : occupied.push(s.id.replace('Slot','')));

  availableDisplay.innerText = available.length;
  occupiedDisplay.innerText = occupied.length;

  availableList.innerText = available.length ? available.join(', ') : 'None';
  occupiedList.innerText = occupied.length ? occupied.join(', ') : 'None';

  highlightNearestAvailable();
}

// Highlight first available slot
function highlightNearestAvailable(){
  const slots = document.querySelectorAll('.slot');
  slots.forEach(s => s.style.boxShadow = ''); // reset

  const nearest = Array.from(slots).find(s => s.classList.contains('green'));
  if(nearest){
    nearest.style.boxShadow = '0 0 10px 3px yellow';
  }
}

// Simulate random cars entering/exiting every 3 seconds
setInterval(() => {
  const randomSlot = Math.floor(Math.random() * totalSlots) + 1;
  toggleSlot('Slot' + randomSlot);
}, 3000);

// Initialize dashboard
updateDashboard();