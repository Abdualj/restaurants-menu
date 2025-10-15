import { Restaurant, Course, DayMenu } from './mock-data.js';

export function renderRestaurants(restaurants: Restaurant[], filterEl: HTMLSelectElement, listEl: HTMLUListElement) {
  const cities = Array.from(new Set(restaurants.map(r => r.city)));
  filterEl.innerHTML = '<option value="all">All cities</option>';
  cities.forEach(city => filterEl.innerHTML += `<option value="${city}">${city}</option>`);

  function display(filtered: Restaurant[]) {
    listEl.innerHTML = '';
    filtered.forEach(r => {
      const li = document.createElement('li');
      li.textContent = `${r.name} (${r.city})`;
      li.dataset.id = r._id;
      listEl.appendChild(li);
    });
  }

  display(restaurants);

  filterEl.addEventListener('change', () => {
    const val = filterEl.value;
    display(val === 'all' ? restaurants : restaurants.filter(r => r.city === val));
  });
}

export function renderMenu(menu: Course[] | DayMenu[], menuEl: HTMLUListElement) {
  menuEl.innerHTML = '';
  menu.forEach(item => {
    const li = document.createElement('li');
    if ('courses' in item) {
      li.textContent = `${item.date}: ${item.courses.map(c => c.name + ' - ' + c.price).join(', ')}`;
    } else {
      li.textContent = `${item.name} - ${item.price} (${item.diets})`;
    }
    menuEl.appendChild(li);
  });
}
