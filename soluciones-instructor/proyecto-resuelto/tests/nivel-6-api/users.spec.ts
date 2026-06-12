import { test, expect } from '@api/api.fixture';
import type { User } from '@api/UsersApi';

/**
 * NIVEL 6 — Ejercicio 2 (Issue #7): cliente UsersApi y contrato de GET /users/1.
 */
test.describe('Users', () => {
  test('GET /users/1 devuelve un usuario con la forma esperada', async ({ usersApi }) => {
    const response = await usersApi.getById(1);

    expect(response.status()).toBe(200);
    const user = (await response.json()) as User;
    expect(user.id).toBe(1);
    expect(user.name).toBeTruthy();
    expect(user.username).toBeTruthy();
    // Validación simple del formato de email.
    expect(user.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });
});
