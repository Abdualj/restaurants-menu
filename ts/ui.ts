import { getMenu } from './api.js';

export function renderRestaurants(restaurants: any[], filterSelect: HTMLSelectElement, listElement: HTMLUListElement) {
  listElement.innerHTML = '';
  const cities = new Set<string>();
  restaurants.forEach((r) => cities.add(r.city));
  
  // Populate filter
  filterSelect.innerHTML = '<option value="">All Cities</option>';
  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    filterSelect.appendChild(option);
  });

  restaurants.forEach(r => {
    const li = document.createElement('li');
    li.textContent = r.name + ' (' + r.city + ')';
    li.dataset.id = r.id;
    listElement.appendChild(li);
  });
}

export function renderMenu(menu: any[], menuList: HTMLUListElement) {
  menuList.innerHTML = '';
  menu.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price} €`;
    menuList.appendChild(li);
  });
}
