import { test, expect } from '@api/api.fixture';
import type { Post } from '@api/PostsApi';

/**
 * NIVEL 6 — Ejercicio 5 / reto (Issue #7): combinar API + UI.
 *
 * Patrón: se "prepara"/lee el dato por API (rápido y estable) y luego se
 * verifica en pantalla con el navegador. Aquí: leemos el post 1 por API y
 * comprobamos que su título aparece al abrir esa misma URL en el navegador.
 *
 * Nota: con JSONPlaceholder el POST es simulado (no persiste), por eso usamos
 * un recurso existente. En una app real, este test crearía el dato con un POST
 * y lo verificaría en la UI correspondiente.
 */
test('el dato leído por API se ve en pantalla', async ({ postsApi, page }) => {
  // 1. Preparación/lectura por API.
  const apiResponse = await postsApi.getById(1);
  expect(apiResponse.ok()).toBeTruthy();
  const post = (await apiResponse.json()) as Post;

  // 2. Verificación en el navegador (la API devuelve JSON renderizado en body).
  await page.goto('https://jsonplaceholder.typicode.com/posts/1');
  await expect(page.locator('body')).toContainText(post.title);
});
