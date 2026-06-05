import { test as base } from '@playwright/test';
import { PostsApi } from '@api/PostsApi';

/**
 * Fixture que inyecta el cliente de API ya construido con el `request`
 * de Playwright (usa la baseURL del project nivel-6-api).
 *
 * Uso:
 *   import { test, expect } from '@api/api.fixture';
 *   test('...', async ({ postsApi }) => { ... });
 */
type ApiFixtures = {
  postsApi: PostsApi;
};

export const test = base.extend<ApiFixtures>({
  postsApi: async ({ request }, use) => {
    await use(new PostsApi(request));
  },
});

export { expect } from '@playwright/test';
