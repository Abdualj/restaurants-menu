let token: string | null = null;

export async function login(username: string, password: string) {
  const res = await fetch('https://media1.edu.metropolia.fi/api/v1/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) throw new Error('Login failed');

  const data = await res.json();
  token = data.token;

  // Only store token if it's not null
  if (token !== null) {
    localStorage.setItem('token', token);
  }

  return token; // <- return is **outside** the if block
}

export async function getRestaurants() {
  if (!token) throw new Error('No token');
  const res = await fetch('https://media1.edu.metropolia.fi/api/v1/restaurant', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

export async function getMenu(restaurantId: string, type: 'day' | 'week') {
  if (!token) throw new Error('No token');
  const res = await fetch(
    `https://media1.edu.metropolia.fi/api/v1/restaurant/${restaurantId}/menu?type=${type}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return await res.json();
}
