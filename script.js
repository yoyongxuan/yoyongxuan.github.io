document.addEventListener('DOMContentLoaded', () => {
  fetch('jackets.json')
    .then(response => response.json())
    .then(data => displayJackets(data))
    .catch(error => console.error('Error loading jackets:', error));
});

function displayJackets(jackets) {
  const list = document.getElementById('jacket-list');

  jackets.forEach(jacket => {
    const div = document.createElement('div');
    div.className = 'jacket';
    div.innerHTML = `
      <img src="${jacket.image}" alt="${jacket.name}" />
      <h3>${jacket.name}</h3>
      <p><strong>Size:</strong> ${jacket.size}</p>
      <p><strong>Price/Day:</strong> $${jacket.pricePerDay}</p>
    `;
    list.appendChild(div);
  });
}
