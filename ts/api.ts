import { restaurants, dailyMenus, weeklyMenus, Restaurant, Course, DayMenu } from './mock-data.js';

let token: string | null = null;

export async function login(username: string, password: string) {
  token = 'mock-token';
  localStorage.setItem('token', token);
  return token;
}

export async function getRestaurants(): Promise<Restaurant[]> {
  return restaurants;
}

export async function getMenu(restaurantId: string, type: 'day' | 'week'): Promise<Course[] | DayMenu[]> {
  if (type === 'day') return dailyMenus[restaurantId];
  return weeklyMenus[restaurantId];
}
