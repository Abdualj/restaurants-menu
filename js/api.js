var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let token = null;
export function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch('https://media1.edu.metropolia.fi/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (!res.ok)
            throw new Error('Login failed');
        const data = yield res.json();
        token = data.token;
        // Only store token if it's not null
        if (token !== null) {
            localStorage.setItem('token', token);
        }
        return token; // <- return is **outside** the if block
    });
}
export function getRestaurants() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!token)
            throw new Error('No token');
        const res = yield fetch('https://media1.edu.metropolia.fi/api/v1/restaurant', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return yield res.json();
    });
}
export function getMenu(restaurantId, type) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!token)
            throw new Error('No token');
        const res = yield fetch(`https://media1.edu.metropolia.fi/api/v1/restaurant/${restaurantId}/menu?type=${type}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return yield res.json();
    });
}
//# sourceMappingURL=api.js.map