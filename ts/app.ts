import { getRestaurants, getMenu } from './api.js';
import { renderRestaurants, renderMenu } from './ui.js';

const restaurantsSection = document.getElementById('restaurants-section') as HTMLElement;
const restaurantList = document.getElementById('restaurant-list') as HTMLUListElement;
const restaurantFilter = document.getElementById('restaurant-filter') as HTMLSelectElement;
const menuList = document.getElementById('menu-list') as HTMLUListElement;
const dayBtn = document.getElementById('day-menu-btn') as HTMLButtonElement;
const weekBtn = document.getElementById('week-menu-btn') as HTMLButtonElement;

let restaurants: any[] = [];
let selectedRestaurantId: string | null = null;

// Load restaurants immediately
(async () => {
  restaurants = await getRestaurants();
  renderRestaurants(restaurants, restaurantFilter, restaurantList);
})();

// Restaurant selection
restaurantList.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.tagName === 'LI') {
    selectedRestaurantId = target.dataset.id || null;
    Array.from(restaurantList.children).forEach(li => li.classList.remove('selected'));
    target.classList.add('selected');
  }
});

// Day/Week menu buttons
dayBtn.addEventListener('click', async () => {
  if (!selectedRestaurantId) return;
  const menu = await getMenu(selectedRestaurantId, 'day');
  renderMenu(menu, menuList);
});

weekBtn.addEventListener('click', async () => {
  if (!selectedRestaurantId) return;
  const menu = await getMenu(selectedRestaurantId, 'week');
  renderMenu(menu, menuList);
});

// Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('Service Worker registered'))
    .catch(err => console.log('Service Worker failed:', err));
}
