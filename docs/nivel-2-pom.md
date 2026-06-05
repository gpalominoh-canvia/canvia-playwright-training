# Nivel 2 — Page Object Model (POM)

> Encapsular cada página en una clase: menos duplicación, tests más legibles
> y mantenibles.

## Objetivos

- Entender por qué los tests planos no escalan.
- Crear Page Objects con selectores y acciones encapsulados.
- Usar fixtures para inyectar Page Objects.
- Externalizar datos de prueba.

## El problema que resuelve

En el Nivel 1 repetíamos los mismos selectores (`[data-test="username"]`…) en
cada test. Si la UI cambia, hay que tocar muchos archivos. El POM concentra
ese conocimiento en un solo lugar.

## Estructura

```
src/nivel-2-pom/
├── pages/
│   ├── BasePage.ts        # navegación común
│   ├── LoginPage.ts       # selectores + acciones del login
│   └── InventoryPage.ts   # selectores + acciones del inventario
├── fixtures/
│   └── pages.fixture.ts   # inyecta los Page Objects en cada test
└── data/
    └── users.ts           # datos de prueba (usuarios)
```

## Conceptos

### Page Object

```ts
export class LoginPage extends BasePage {
  private readonly username = this.page.locator('[data-test="username"]');
  // ...
  async login(user: string, pass: string) { /* ... */ }
}
```

- Los selectores son privados: el test nunca los conoce.
- Los métodos expresan acciones de negocio (`login`, `getErrorMessage`).

### Fixtures

En vez de `new LoginPage(page)` en cada test, un fixture lo inyecta:

```ts
import { test, expect } from '@pom/fixtures/pages.fixture';

test('...', async ({ loginPage }) => {
  await loginPage.open();
});
```

### Datos externos

`src/nivel-2-pom/data/users.ts` lee de `.env` con valores por defecto, para
no tener credenciales "hardcodeadas" en los tests.

## Ejecutar

```bash
npm run test:nivel-2
```

📄 Archivo de práctica: `tests/nivel-2-pom/login.spec.ts`

## Ejercicio del nivel

En una rama `feature/<tu-nombre>-nivel2`:

1. Crea un `CartPage` (Page Object del carrito).
2. Crea un test que agregue un producto al carrito y valide el contador.
3. Usa el fixture para inyectar el nuevo Page Object.
4. Abre un PR a `develop`.

## Buenas prácticas

- Un Page Object por página/componente significativo.
- Métodos que devuelven datos (no aserciones): las aserciones van en el test.
- Reutilizar `BasePage` para lógica común.
