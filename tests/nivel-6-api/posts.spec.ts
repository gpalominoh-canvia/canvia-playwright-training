import { test, expect } from '@api/api.fixture';
import type { Post } from '@api/PostsApi';

/**
 * NIVEL 6 — Pruebas de API.
 *
 * No hay navegador: usamos el cliente HTTP `request` de Playwright a través
 * del fixture. Validamos códigos de estado, cuerpos y contratos básicos.
 */
test.describe('API de posts', () => {
  test('GET /posts/1 devuelve un post con la forma esperada', async ({ postsApi }) => {
    const response = await postsApi.getById(1);

    expect(response.status()).toBe(200);
    const post = (await response.json()) as Post;
    expect(post.id).toBe(1);
    expect(post.userId).toBeGreaterThan(0);
    expect(post.title).toBeTruthy();
    expect(typeof post.body).toBe('string');
  });

  test('GET /posts devuelve la lista completa', async ({ postsApi }) => {
    const response = await postsApi.list();

    expect(response.ok()).toBeTruthy();
    const posts = (await response.json()) as Post[];
    expect(Array.isArray(posts)).toBe(true);
    expect(posts).toHaveLength(100);
  });

  test('POST /posts crea un recurso', async ({ postsApi }) => {
    const nuevo = { userId: 1, title: 'Capacitación QA', body: 'Nivel 6 — API' };
    const response = await postsApi.create(nuevo);

    expect(response.status()).toBe(201);
    const creado = (await response.json()) as Post;
    expect(creado.title).toBe(nuevo.title);
    expect(creado.id).toBeTruthy();
  });

  test('DELETE /posts/1 responde correctamente', async ({ postsApi }) => {
    const response = await postsApi.delete(1);
    expect(response.ok()).toBeTruthy();
  });
});
