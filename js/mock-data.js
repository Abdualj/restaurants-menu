export const restaurants = [
    { _id: '1', name: 'Helsinki Campus Cafe', city: 'Helsinki', company: 'Sodexo', location: { type: 'Point', coordinates: [24.941, 60.173] } },
    { _id: '2', name: 'Espoo Campus Cafe', city: 'Espoo', company: 'Compass Group', location: { type: 'Point', coordinates: [24.654, 60.205] } }
];
export const dailyMenus = {
    '1': [
        { name: 'Pasta Bolognese', price: '5€', diets: 'None' },
        { name: 'Salad', price: '3€', diets: 'Vegan' }
    ],
    '2': [
        { name: 'Burger', price: '6€', diets: 'None' },
        { name: 'Soup', price: '4€', diets: 'Vegetarian' }
    ]
};
export const weeklyMenus = {
    '1': [
        { date: 'Monday', courses: [{ name: 'Pasta', price: '5€', diets: 'None' }] },
        { date: 'Tuesday', courses: [{ name: 'Pizza', price: '6€', diets: 'Vegetarian' }] }
    ],
    '2': [
        { date: 'Monday', courses: [{ name: 'Burger', price: '6€', diets: 'None' }] },
        { date: 'Tuesday', courses: [{ name: 'Sandwich', price: '4€', diets: 'Vegan' }] }
    ]
};
//# sourceMappingURL=mock-data.js.map