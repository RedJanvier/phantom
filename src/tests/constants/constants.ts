export const endpoints = {
  users: '/api/users',
  user: (id: number) => `/api/users/${id}`,
  role: (id: number) => `/api/roles/${id}`,
  roles: '/api/roles',
};
