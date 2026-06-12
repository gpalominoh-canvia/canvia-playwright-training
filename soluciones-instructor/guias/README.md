# Soluciones del instructor — Canvia Playwright Training

Guía de referencia con la **solución de cada ejercicio** de los issues del curso.
Pensada para que el instructor explique en clase: por cada ejercicio encontrarás
el **código completo**, una **explicación breve** y el **comando para ejecutarlo**.

> ⚠️ Esta carpeta vive **fuera** del repo `canvia-playwright-training` (no se
> versiona ahí). Los alumnos no deben verla: es material del instructor. Para
> demostrar una solución, copia los archivos indicados dentro del repo, ejecuta
> el comando y luego descarta los cambios (`git checkout .`).

## Mapa issue → nivel → archivo

| Issue | Nivel                          | Archivo                                                        |
| ----- | ------------------------------ | -------------------------------------------------------------- |
| #2    | Nivel 1 — Fundamentos          | [nivel-1-basico.md](nivel-1-basico.md)                         |
| #3    | Nivel 2 — Page Object Model    | [nivel-2-pom.md](nivel-2-pom.md)                               |
| #4    | Nivel 3 — Screenplay           | [nivel-3-screenplay.md](nivel-3-screenplay.md)                 |
| #27   | Reto Nivel 3 — Orden + carrito | [nivel-3-reto-orden-carrito.md](nivel-3-reto-orden-carrito.md) |
| #5    | Nivel 4 — BDD con Cucumber     | [nivel-4-bdd.md](nivel-4-bdd.md)                               |
| #35   | Nivel 4.1 — BDD + Screenplay   | [nivel-4.1-bdd-screenplay.md](nivel-4.1-bdd-screenplay.md)     |
| #6    | Nivel 5 — Integración Continua | [nivel-5-ci.md](nivel-5-ci.md)                                 |
| #7    | Nivel 6 — Pruebas de API       | [nivel-6-api.md](nivel-6-api.md)                               |

## Comandos de ejecución por nivel

```bash
npm run test:nivel-1      # tests planos (Chromium)
npm run test:nivel-2      # POM
npm run test:nivel-3      # Screenplay
npm run test:nivel-4      # BDD (Cucumber, perfil default)
npm run test:nivel-4.1    # BDD + Screenplay (perfil nivel41)
npm run test:nivel-6      # API (sin navegador)

npm run test:headed       # ver el navegador
npm run test:ui           # modo UI interactivo de Playwright
npm run report            # abrir el último reporte HTML
```

Filtrar un test puntual:

```bash
npx playwright test --project=nivel-1-basico -g "menú"
npm run test:nivel-4 -- --tags @carrito
```

## Aliases de imports (tsconfig)

```
@pom/*        → src/nivel-2-pom/*
@screenplay/* → src/nivel-3-screenplay/*
@api/*        → src/nivel-6-api/*
```

## Selectores reales de SauceDemo (chuleta)

| Elemento                 | Selector                                                         |
| ------------------------ | ---------------------------------------------------------------- |
| Usuario / contraseña     | `[data-test="username"]` / `[data-test="password"]`              |
| Botón login              | `[data-test="login-button"]`                                     |
| Mensaje de error         | `[data-test="error"]`                                            |
| Botón menú (hamburguesa) | `#react-burger-menu-btn`                                         |
| Link Logout (menú)       | `#logout_sidebar_link`                                           |
| Título de sección        | `.title`                                                         |
| Tarjetas de producto     | `.inventory_item`                                                |
| Precio de producto       | `[data-test="inventory-item-price"]` (o `.inventory_item_price`) |
| Combo de ordenamiento    | `[data-test="product-sort-container"]` (es un `<select>`)        |
| Agregar mochila          | `[data-test="add-to-cart-sauce-labs-backpack"]`                  |
| Quitar mochila           | `[data-test="remove-sauce-labs-backpack"]`                       |
| Badge del carrito        | `.shopping_cart_badge` (no existe en el DOM si está en 0)        |
| Link del carrito         | `.shopping_cart_link`                                            |
| Ítems en el carrito      | `.cart_item`                                                     |

> El combo de orden acepta `selectOption` por **value** (`az`, `za`, `lohi`,
> `hilo`) o por **label** (`"Price (low to high)"`, etc.).
