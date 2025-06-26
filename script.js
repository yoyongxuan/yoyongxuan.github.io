let gearData = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch('gear.json')
    .then(res => res.json())
    .then(data => {
      gearData = data;
      renderItems(gearData);
      setupEventListeners();
    })
    .catch(err => console.error('Failed to load gear data:', err));
});

function setupEventListeners() {
  document.getElementById('typeFilter').addEventListener('change', applyFilters);
  document.getElementById('sizeFilter').addEventListener('change', applyFilters);
  document.getElementById('availabilityFilter').addEventListener('change', applyFilters);
  document.getElementById('searchInput').addEventListener('input', applyFilters);

  const modal = document.getElementById('itemModal');
  const closeBtn = document.querySelector('.close');
  closeBtn.onclick = () => (modal.style.display = 'none');
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
  };
}

function renderItems(items) {
  const container = document.getElementById('equipment-list');
  container.innerHTML = '';

  if (items.length === 0) {
    container.innerHTML = '<p>No items match the filters.</p>';
    return;
  }

  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p><strong>Type:</strong> ${item.type}</p>
      <p><strong>Size:</strong> ${item.size}</p>
      <p class="${item.available ? 'available' : 'unavailable'}">
        ${item.available ? 'Available' : 'Unavailable'}
      </p>
    `;
    div.addEventListener('click', () => showItemDetails(item));
    container.appendChild(div);
  });
}

function applyFilters() {
  const type = document.getElementById('typeFilter').value;
  const size = document.getElementById('sizeFilter').value;
  const search = document.getElementById('searchInput').value.toLowerCase();
  const availability = document.getElementById('availabilityFilter').value;

  let filtered = gearData;

  if (type !== 'all') {
    filtered = filtered.filter(item => item.type === type);
  }

  if (size !== 'all') {
    filtered = filtered.filter(item => item.size === size);
  }

  if (availability === 'available') {
    filtered = filtered.filter(item => item.available === true);
  } else if (availability === 'unavailable') {
    filtered = filtered.filter(item => item.available === false);
  }

  if (search) {
    filtered = filtered.filter(item => item.name.toLowerCase().includes(search));
  }

  renderItems(filtered);
}

function showItemDetails(item) {
  document.getElementById('modalImage').src = item.image;
  document.getElementById('modalTitle').textContent = item.name;
  document.getElementById('modalType').textContent = `Type: ${item.type}`;
  document.getElementById('modalSize').textContent = `Size: ${item.size}`;
  document.getElementById('modalPrice').textContent = item.available
    ? 'Available for rent'
    : 'Currently unavailable';

  document.getElementById('itemModal').style.display = 'block';
}
