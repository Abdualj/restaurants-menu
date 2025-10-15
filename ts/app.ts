declare const mapboxgl: any;

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

// Mapbox setup
mapboxgl.accessToken = 'pk.eyJ1IjoiaWxra2FtdGsiLCJhIjoiY20xZzNvMmJ5MXI4YzJrcXpjMWkzYnZlYSJ9.niDiGDLgFfvA2DMqxbB1QQ';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [24.941, 60.173],
  zoom: 12
});

// Load restaurants immediately
(async () => {
  restaurants = await getRestaurants();
  renderRestaurants(restaurants, restaurantFilter, restaurantList);

  // Add map markers
  restaurants.forEach(r => {
    new mapboxgl.Marker()
      .setLngLat(r.location.coordinates)
      .setPopup(new mapboxgl.Popup().setText(r.name))
      .addTo(map);
  });
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
