var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { login, getRestaurants, getMenu } from './api.js';
import { renderRestaurants, renderMenu } from './ui.js';
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const restaurantsSection = document.getElementById('restaurants-section');
const restaurantList = document.getElementById('restaurant-list');
const restaurantFilter = document.getElementById('restaurant-filter');
const menuList = document.getElementById('menu-list');
const dayBtn = document.getElementById('day-menu-btn');
const weekBtn = document.getElementById('week-menu-btn');
let restaurants = [];
let selectedRestaurantId = null;
mapboxgl.accessToken = 'pk.eyJ1IjoiaWxra2FtdGsiLCJhIjoiY20xZzNvMmJ5MXI4YzJrcXpjMWkzYnZlYSJ9.niDiGDLgFfvA2DMqxbB1QQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [24.941, 60.173],
    zoom: 12
});
loginForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        yield login(username, password);
        loginForm.style.display = 'none';
        restaurantsSection.style.display = 'block';
        restaurants = yield getRestaurants();
        renderRestaurants(restaurants, restaurantFilter, restaurantList);
        restaurants.forEach(r => {
            new mapboxgl.Marker()
                .setLngLat(r.location.coordinates)
                .setPopup(new mapboxgl.Popup().setText(r.name))
                .addTo(map);
        });
    }
    catch (err) {
        loginError.textContent = 'Login failed.';
    }
}));
restaurantList.addEventListener('click', (e) => {
    const target = e.target;
    if (target.tagName === 'LI') {
        selectedRestaurantId = target.dataset.id || null;
        Array.from(restaurantList.children).forEach(li => li.classList.remove('selected'));
        target.classList.add('selected');
    }
});
dayBtn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    if (!selectedRestaurantId)
        return;
    const menu = yield getMenu(selectedRestaurantId, 'day');
    renderMenu(menu, menuList);
}));
weekBtn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    if (!selectedRestaurantId)
        return;
    const menu = yield getMenu(selectedRestaurantId, 'week');
    renderMenu(menu, menuList);
}));
// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => console.log('Service Worker registration failed:', err));
}
//# sourceMappingURL=app.js.map