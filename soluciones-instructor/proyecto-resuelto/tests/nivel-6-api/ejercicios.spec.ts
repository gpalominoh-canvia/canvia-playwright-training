import { test, expect } from '@api/api.fixture';
import type { Post } from '@api/PostsApi';

/**
 * NIVEL 6 — Ejercicios 1, 3 y 4 (Issue #7).
 */
test.describe('Posts — ejercicios', () => {
  // Ej. 1 — PUT /posts/1 con el método update.
  test('PUT /posts/1 actualiza el post', async ({ postsApi }) => {
    const datos = { userId: 1, title: 'Título actualizado', body: 'Cuerpo nuevo' };
    const response = await postsApi.update(1, datos);

    expect(response.status()).toBe(200);
    const actualizado = (await response.json()) as Post;
    expect(actualizado.id).toBe(1);
    expect(actualizado.title).toBe(datos.title);
    expect(actualizado.body).toBe(datos.body);
  });

  // Ej. 3 — caso de error: recurso inexistente devuelve 404.
  test('GET /posts/9999 responde 404', async ({ postsApi }) => {
    const response = await postsApi.getById(9999);
    expect(response.status()).toBe(404);
  });

  // Ej. 4 — contrato de la lista: campos y tipos de cada post.
  test('GET /posts cumple el contrato esperado', async ({ postsApi }) => {
    const response = await postsApi.list();
    expect(response.ok()).toBeTruthy();

    const posts = (await response.json()) as Post[];
    expect(posts).toHaveLength(100);

    for (const post of posts) {
      expect(typeof post.id).toBe('number');
      expect(typeof post.userId).toBe('number');
      expect(typeof post.title).toBe('string');
      expect(typeof post.body).toBe('string');
      expect(post.title.length).toBeGreaterThan(0);
    }
  });
});
