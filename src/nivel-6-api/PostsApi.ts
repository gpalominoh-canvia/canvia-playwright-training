import { APIRequestContext, APIResponse } from '@playwright/test';

/** Forma de un post en la API de práctica (JSONPlaceholder). */
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/**
 * Cliente de API para el recurso /posts. Es el equivalente a un Page Object,
 * pero para peticiones HTTP: encapsula las rutas y deja los tests legibles.
 */
export class PostsApi {
  constructor(private readonly request: APIRequestContext) {}

  /** Obtiene un post por id. */
  getById(id: number): Promise<APIResponse> {
    return this.request.get(`/posts/${id}`);
  }

  /** Lista todos los posts. */
  list(): Promise<APIResponse> {
    return this.request.get('/posts');
  }

  /** Crea un post. */
  create(data: Omit<Post, 'id'>): Promise<APIResponse> {
    return this.request.post('/posts', { data });
  }

  /** Elimina un post por id. */
  delete(id: number): Promise<APIResponse> {
    return this.request.delete(`/posts/${id}`);
  }
}
