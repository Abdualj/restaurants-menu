import { login, getRestaurants, getMenu } from './api.js';
import { renderRestaurants, renderMenu } from './ui.js';

const loginForm = document.getElementById('login-form') as HTMLFormElement;
const loginError = document.getElementById('login-error') as HTMLElement;
const restaurantsSection = document.getElementById('restaurants-section') as HTMLElement;
const restaurantList = document.getElementById('restaurant-list') as HTMLUListElement;
const restaurantFilter = document.getElementById('restaurant-filter') as HTMLSelectElement;
const menuList = document.getElementById('menu-list') as HTMLUListElement;
const dayBtn = document.getElementById('day-menu-btn') as HTMLButtonElement;
const weekBtn = document.getElementById('week-menu-btn') as HTMLButtonElement;

let restaurants: any[] = [];
let selectedRestaurantId: string | null = null;

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = (document.getElementById('username') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;
  try {
    await login(username, password);
    loginForm.style.display = 'none';
    restaurantsSection.style.display = 'block';
    restaurants = await getRestaurants();
    renderRestaurants(restaurants, restaurantFilter, restaurantList);
  } catch (err) {
    loginError.textContent = 'Login failed. Check your credentials.';
  }
});

restaurantList.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.tagName === 'LI') {
    selectedRestaurantId = target.dataset.id || null;
  }
});

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

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('Service Worker registered'))
    .catch(err => console.log('Service Worker registration failed:', err));
}
