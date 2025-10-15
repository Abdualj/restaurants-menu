var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { restaurants, dailyMenus, weeklyMenus } from './mock-data.js';
let token = null;
export function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        token = 'mock-token';
        localStorage.setItem('token', token);
        return token;
    });
}
export function getRestaurants() {
    return __awaiter(this, void 0, void 0, function* () {
        return restaurants;
    });
}
export function getMenu(restaurantId, type) {
    return __awaiter(this, void 0, void 0, function* () {
        if (type === 'day')
            return dailyMenus[restaurantId];
        return weeklyMenus[restaurantId];
    });
}
//# sourceMappingURL=api.js.map