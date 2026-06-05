# Nivel 6 — Pruebas de API

> Validar el backend directamente (sin navegador) usando el cliente HTTP
> `request` de Playwright. Más rápido y estable que probar todo por la UI.

📖 Teoría completa: [guia-api-testing.md](../02-guias/guia-api-testing.md).

## Objetivos

- Entender qué es una prueba de API y cuándo conviene frente a la UI.
- Usar el fixture `request` de Playwright (GET/POST/PUT/DELETE).
- Validar **código de estado**, **cuerpo** y **contrato** de la respuesta.
- Aplicar un "API client" (POM para APIs) y un fixture.

## ¿Por qué probar la API?

- **Rápido:** no abre navegador (milisegundos vs segundos).
- **Estable:** no depende de la UI ni de selectores.
- **Cobertura temprana:** valida la lógica de negocio antes que la UI.
- **Pirámide de pruebas:** muchas pruebas de API, menos de UI E2E.

## Estructura

```
src/nivel-6-api/
├── PostsApi.ts       # cliente HTTP del recurso /posts (encapsula rutas)
└── api.fixture.ts    # inyecta el cliente con el `request` de Playwright
tests/nivel-6-api/
└── posts.spec.ts     # pruebas de API
```

Usa una **API pública de práctica** (JSONPlaceholder). La baseURL se define en
el project `nivel-6-api` de `playwright.config.ts` (variable `API_BASE_URL`).

## Conceptos

### El fixture `request`

```ts
test('GET /posts/1', async ({ request }) => {
  const res = await request.get('/posts/1');
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.id).toBe(1);
});
```

### API client (POM para APIs)

```ts
export class PostsApi {
  constructor(private readonly request: APIRequestContext) {}
  getById(id: number) {
    return this.request.get(`/posts/${id}`);
  }
}
```

Y un fixture lo inyecta, igual que en el Nivel 2:

```ts
test('...', async ({ postsApi }) => {
  const res = await postsApi.getById(1);
});
```

### Qué validar

- **Estado:** `res.status()` / `res.ok()`.
- **Cuerpo:** `await res.json()` y aserciones sobre los campos.
- **Contrato:** tipos y campos esperados (forma de la respuesta).

## Ejecutar

```bash
npm run test:nivel-6
```

> Requiere conexión a internet (llama a la API pública). Si la API está caída,
> los tests pueden fallar por causas externas.

📄 Archivo de práctica: `tests/nivel-6-api/posts.spec.ts`

## Ejercicio del nivel

En una rama `feature/<tu-nombre>-nivel6`:

1. Agrega una prueba `PUT /posts/1` que valide la actualización.
2. Agrega un método `update` al `PostsApi` y úsalo.
3. Valida el contrato de `GET /users/1` (nuevo recurso, nuevo cliente).
4. Abre un PR a `develop`.

## Buenas prácticas

- No dependas del orden ni de datos creados por otra prueba.
- Valida estado **y** cuerpo (no solo `200`).
- Encapsula rutas en el API client; el test no arma URLs a mano.
- Combina API + UI: prepara datos por API y verifica en la UI (más adelante).

---

<sub>📚 <a href="../README.md">Índice de documentación</a> · <a href="../../README.md">Inicio del repositorio</a></sub>
