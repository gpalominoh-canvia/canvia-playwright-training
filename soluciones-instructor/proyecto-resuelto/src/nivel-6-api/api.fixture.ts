import { test as base } from '@playwright/test';
import { PostsApi } from '@api/PostsApi';
import { UsersApi } from '@api/UsersApi';

/**
 * Fixture que inyecta los clientes de API ya construidos con el `request`
 * de Playwright (usa la baseURL del project nivel-6-api).
 *
 * NIVEL 6 — Ejercicio 2: se expone además `usersApi`.
 *
 * Uso:
 *   import { test, expect } from '@api/api.fixture';
 *   test('...', async ({ postsApi, usersApi }) => { ... });
 */
type ApiFixtures = {
  postsApi: PostsApi;
  usersApi: UsersApi;
};

export const test = base.extend<ApiFixtures>({
  postsApi: async ({ request }, use) => {
    await use(new PostsApi(request));
  },
  usersApi: async ({ request }, use) => {
    await use(new UsersApi(request));
  },
});

export { expect } from '@playwright/test';
