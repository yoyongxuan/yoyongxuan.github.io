let gearData = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch('gear.json')
    .then(res => res.json())
    .then(data => {
      gearData = data;
      renderItems(gearData);
      document.getElementById('typeFilter').addEventListener('change', applyFilters);
      document.getElementById('sizeFilter').addEventListener('change', applyFilters);
    })
    .catch(err => console.error('Failed to load gear data:', err));
});

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
      <p><strong>Price/Day:</strong> $${item.pricePerDay}</p>
    `;
    container.appendChild(div);
  });
}

function applyFilters() {
  const type = document.getElementById('typeFilter').value;
  const size = document.getElementById('sizeFilter').value;

  let filtered = gearData;

  if (type !== 'all') {
    filtered = filtered.filter(item => item.type === type);
  }

  if (size !== 'all') {
    filtered = filtered.filter(item => item.size === size);
  }

  renderItems(filtered);
}
