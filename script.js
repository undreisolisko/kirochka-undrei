const items = ['button1.png', 'button2.png', 'ring.png'];
const fallingContainer = document.getElementById('falling-items');
const inventoryItems = document.getElementById('inventory-items');
const pickaxe = document.getElementById('pickaxe');
const inventoryMap = {};

function spawnItem() {
  const img = document.createElement('img');
  const type = items[Math.floor(Math.random() * items.length)];
  img.src = `assets/${type}`;
  img.classList.add('falling-item');

  // Центрируем в 3 столбца
  const column = Math.floor(Math.random() * 3);
  const screenWidth = window.innerWidth;
  const spacing = screenWidth / 4;
  img.style.left = `${(column + 1) * spacing - 25}px`;
  img.style.top = '0px';

  fallingContainer.appendChild(img);

  let speed = 2 + Math.random() * 3;

  const fallInterval = setInterval(() => {
    const top = parseFloat(img.style.top);
    if (top >= window.innerHeight - 50) {
      img.remove();
      clearInterval(fallInterval);
    } else {
      img.style.top = `${top + speed}px`;
    }
  }, 30);

  img.addEventListener('click', () => {
    clearInterval(fallInterval);
    showPickaxe(img);
    addToInventory(type);
    img.remove();
  });
}

function showPickaxe(target) {
  pickaxe.style.left = `${target.offsetLeft}px`;
  pickaxe.style.top = `${target.offsetTop}px`;
  pickaxe.style.display = 'block';
  setTimeout(() => (pickaxe.style.display = 'none'), 300);
}

function addToInventory(type) {
  if (!inventoryMap[type]) {
    inventoryMap[type] = { count: 1 };
    const wrapper = document.createElement('div');
    wrapper.className = 'inventory-item';
    wrapper.dataset.type = type;

    const icon = document.createElement('img');
    icon.src = `assets/${type}`;

    const countText = document.createElement('span');
    countText.textContent = '1';

    wrapper.appendChild(icon);
    wrapper.appendChild(countText);
    inventoryItems.appendChild(wrapper);
  } else {
    inventoryMap[type].count += 1;
    const wrapper = inventoryItems.querySelector(`[data-type="${type}"]`);
    const countText = wrapper.querySelector('span');
    countText.textContent = inventoryMap[type].count.toString();
  }
}

setInterval(spawnItem, 1500);