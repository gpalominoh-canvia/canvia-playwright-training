import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * NIVEL 6 — Ejercicio 2 (Issue #7).
 * Forma (parcial) de un usuario en JSONPlaceholder.
 */
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

/** Cliente de API para el recurso /users. */
export class UsersApi {
  constructor(private readonly request: APIRequestContext) {}

  /** Obtiene un usuario por id. */
  getById(id: number): Promise<APIResponse> {
    return this.request.get(`/users/${id}`);
  }

  /** Lista todos los usuarios. */
  list(): Promise<APIResponse> {
    return this.request.get('/users');
  }
}
