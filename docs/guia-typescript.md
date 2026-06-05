# Guía de TypeScript para QA Automation

Guía de los conceptos de TypeScript que aparecen en este framework. El objetivo
no es ser exhaustiva, sino que entiendas **el código que vas a leer y escribir**
en los 4 niveles. Cada sección enlaza el concepto con dónde se usa en el repo.

---

## 1. ¿Qué es TypeScript?

TypeScript es **JavaScript con tipos**. Agrega verificación de tipos en tiempo
de desarrollo: detecta errores antes de ejecutar y mejora el autocompletado.
El navegador/Node no ejecuta TS directamente; se **transpila** a JS (aquí lo
hace Playwright internamente, y `tsx` para Cucumber).

```ts
// JavaScript
function saludar(nombre) { return 'Hola ' + nombre; }

// TypeScript
function saludar(nombre: string): string { return 'Hola ' + nombre; }
```

---

## 2. Tipos básicos

```ts
let nombre: string = 'Giancarlo';
let edad: number = 30;
let activo: boolean = true;
let lista: string[] = ['a', 'b'];        // arreglo de strings
let par: [string, number] = ['x', 1];    // tupla
let cualquiera: any;                      // evítalo: desactiva el tipado
let desconocido: unknown;                 // como any pero seguro
function log(msg: string): void {}        // void = no retorna nada
```

- **`any`**: apaga el chequeo de tipos. En este repo está restringido (regla
  ESLint) — úsalo solo como último recurso.
- **`unknown`**: más seguro que `any`; obliga a verificar el tipo antes de usar.

### Inferencia de tipos

TypeScript deduce el tipo si no lo declaras:

```ts
let ciudad = 'Lima'; // TypeScript infiere `string`
```

Por eso muchas veces no escribimos el tipo: ya se infiere.

---

## 3. Tipado de funciones

```ts
// Parámetros y retorno tipados
function sumar(a: number, b: number): number {
  return a + b;
}

// Parámetro opcional (?) y valor por defecto
function abrir(path: string = '/'): void {}

// Funciones async devuelven Promise<T>
async function getTitulo(): Promise<string> {
  return 'Swag Labs';
}
```

📍 En el repo: `BasePage.getTitle(): Promise<string>`
([src/nivel-2-pom/pages/BasePage.ts](../src/nivel-2-pom/pages/BasePage.ts)).

---

## 4. async / await y Promesas

Casi todo en Playwright es **asíncrono** (la página tarda en responder). Una
`Promise<T>` representa un valor futuro de tipo `T`.

```ts
// `await` espera a que la promesa se resuelva
await this.page.goto('/');
const titulo: string = await this.page.title();
```

⚠️ **Olvidar `await` es el error #1**: el test sigue sin esperar y falla de
forma intermitente.

📍 En el repo: todos los métodos de páginas y steps usan `async/await`.

---

## 5. Interfaces y type

Describen la **forma** de un objeto.

```ts
interface Usuario {
  username: string;
  password: string;
}

type Resultado = 'ok' | 'error'; // unión de literales
```

- `interface`: ideal para objetos y contratos de clases (se puede `implements`).
- `type`: más flexible (uniones, intersecciones, alias).

📍 En el repo: `Performable` y `Question<T>` son interfaces que definen el
contrato del patrón Screenplay
([src/nivel-3-screenplay/core/](../src/nivel-3-screenplay/core/)).

```ts
export interface Performable {
  performAs(actor: Actor): Promise<void>;
}
```

---

## 6. Clases

La base de POM y Screenplay.

```ts
class LoginPage {
  // Propiedad privada: solo accesible dentro de la clase
  private readonly username: Locator;

  // Constructor: recibe dependencias
  constructor(private readonly page: Page) {
    this.username = page.locator('[data-test="username"]');
  }

  // Método público
  async login(user: string, pass: string): Promise<void> {
    await this.username.fill(user);
  }
}
```

### Modificadores de acceso

| Modificador | Acceso                                        |
|-------------|-----------------------------------------------|
| `public`    | Desde cualquier lugar (por defecto)           |
| `private`   | Solo dentro de la misma clase                 |
| `protected` | Dentro de la clase y sus subclases            |
| `readonly`  | Solo lectura (no se reasigna tras el constructor) |

> Truco: declarar `private readonly page: Page` **en el constructor** crea y
> asigna la propiedad automáticamente (parameter properties).

### Herencia

```ts
abstract class BasePage {
  constructor(protected readonly page: Page) {}
  async goto(path = '/') { await this.page.goto(path); }
}

class LoginPage extends BasePage { /* hereda goto() */ }
```

- `abstract`: no se puede instanciar directamente; sirve de base.
- `extends`: hereda; `super(...)` llama al constructor del padre.

📍 En el repo: `LoginPage extends BasePage`.

### implements

Una clase puede comprometerse a cumplir una interfaz:

```ts
class Click implements Performable {
  async performAs(actor: Actor): Promise<void> { /* ... */ }
}
```

---

## 7. Genéricos (Generics)

Permiten escribir código reutilizable que funciona con **cualquier tipo**,
manteniendo el tipado. La `T` es un "parámetro de tipo".

```ts
interface Question<T> {
  answeredBy(actor: Actor): Promise<T>;
}

class TextOf implements Question<string> { /* devuelve string */ }
class CountOf implements Question<number> { /* devuelve number */ }
```

Así, `actor.asksFor(TextOf.of(...))` se sabe que devuelve `string`, y
`CountOf` devuelve `number`, sin duplicar la interfaz.

📍 En el repo: `Question<T>` y `Actor.asksFor<T>()`.

---

## 8. Uniones, opcionales y narrowing

```ts
let valor: string | null = obtenerTexto();

// "narrowing": comprobamos antes de usar
if (valor !== null) {
  console.log(valor.toUpperCase());
}

// Encadenamiento opcional y coalescencia nula
const texto = (await el.textContent())?.trim() ?? '';
```

- `?.` (optional chaining): si es `null`/`undefined`, no falla, devuelve `undefined`.
- `??` (nullish coalescing): valor por defecto si es `null`/`undefined`.

📍 En el repo: `TextOf` y `LoginPage.getErrorMessage()` usan `?.` y `??`.

---

## 9. Módulos: import / export

```ts
// Exportar
export class LoginPage {}
export const users = { /* ... */ };

// Importar
import { LoginPage } from '@pom/pages/LoginPage';
import { test, expect } from '@playwright/test';
```

### import type

Cuando solo se necesita el **tipo** (no el valor en runtime), se usa
`import type`. Ayuda al compilador y evita dependencias circulares.

```ts
import type { Actor } from '../core/Actor';
```

📍 En el repo: las interacciones de Screenplay importan `Actor` como tipo.

### Alias de rutas

Configurados en `tsconfig.json` para no escribir rutas relativas largas:

```jsonc
"paths": {
  "@pom/*": ["src/nivel-2-pom/*"],
  "@screenplay/*": ["src/nivel-3-screenplay/*"]
}
```

Así, `@pom/pages/LoginPage` en vez de `../../../src/nivel-2-pom/pages/LoginPage`.

---

## 10. Lo que verás en cada nivel

| Concepto TS                        | Aparece en           |
|------------------------------------|----------------------|
| `async/await`, tipos básicos       | Nivel 1              |
| Clases, herencia, modificadores    | Nivel 2 (POM)        |
| Interfaces, genéricos, `import type`| Nivel 3 (Screenplay)|
| Tipado de `this`, funciones, uniones| Nivel 4 (BDD)       |

---

## 11. Consejos prácticos

- Deja que TypeScript **infiera** cuando el tipo es obvio; tipa explícitamente
  parámetros, retornos públicos y contratos.
- Evita `any`; prefiere `unknown` + verificación.
- Si el editor subraya en rojo, **léelo**: suele evitarte un bug en runtime.
- Ejecuta `npm run typecheck` antes de subir: valida tipos sin correr tests.
- Usa `npm run format` (Prettier) para mantener un estilo consistente.

---

## 12. Recursos

- Documentación oficial: https://www.typescriptlang.org/docs/
- TypeScript para JS devs: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
- Tipos de Playwright: https://playwright.dev/docs/test-typescript

---

<sub>📚 <a href="README.md">Índice de documentación</a> · <a href="../README.md">Inicio del repositorio</a></sub>
