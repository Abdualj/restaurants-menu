export function renderRestaurants(restaurants, filterSelect, listElement) {
    listElement.innerHTML = '';
    const cities = new Set();
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
export function renderMenu(menu, menuList) {
    menuList.innerHTML = '';
    menu.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} €`;
        menuList.appendChild(li);
    });
}
//# sourceMappingURL=ui.js.map