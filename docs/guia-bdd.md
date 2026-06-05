# Guía completa de BDD (Behavior-Driven Development)

Guía conceptual del desarrollo guiado por comportamiento, base teórica del
[Nivel 4](nivel-4-bdd.md).

---

## 1. ¿Qué es BDD?

**BDD (Behavior-Driven Development)** es una práctica que describe el
comportamiento esperado del software en **lenguaje natural**, entendible tanto
por personas técnicas como de negocio. Es una evolución de TDD (Test-Driven
Development): en vez de pensar en "tests", pensamos en "comportamientos".

La idea central: **una sola especificación** sirve como documentación,
criterio de aceptación y prueba automatizada a la vez.

### BDD vs TDD vs ATDD

| Enfoque | Pregunta que responde            | Lenguaje                 |
|---------|----------------------------------|--------------------------|
| TDD     | ¿El código funciona?             | Tests unitarios (código) |
| ATDD    | ¿Construimos lo correcto?        | Criterios de aceptación  |
| BDD     | ¿El sistema se comporta como se espera? | Lenguaje natural (Gherkin) |

---

## 2. ¿Por qué usar BDD?

- **Lenguaje compartido:** negocio, QA y desarrollo hablan el mismo idioma.
- **Documentación viva:** los `.feature` describen el sistema y siempre están
  actualizados (si fallan, la documentación quedó desfasada).
- **Foco en el valor:** se prueba comportamiento de negocio, no detalles
  técnicos.
- **Criterios de aceptación ejecutables:** la historia de usuario se valida
  automáticamente.

### Cuándo NO conviene

- Proyectos muy pequeños o sin interlocutores de negocio.
- Pruebas puramente técnicas (rendimiento, unitarias de algoritmos).
- Si nadie lee los `.feature`: el costo de mantener Gherkin no se justifica.

---

## 3. Los "Tres Amigos" (Three Amigos)

Antes de escribir escenarios, se reúnen tres perspectivas:

- **Negocio / Product Owner:** qué problema se resuelve.
- **Desarrollo:** cómo se construye.
- **QA:** cómo puede fallar.

El resultado de esa conversación son los escenarios en Gherkin. BDD es,
ante todo, **una conversación**; la herramienta (Cucumber) viene después.

---

## 4. Gherkin: el lenguaje de BDD

Gherkin es un lenguaje estructurado y legible. Sus palabras clave:

| Palabra clave (es) | (en)        | Para qué sirve                                  |
|--------------------|-------------|-------------------------------------------------|
| `Característica`    | `Feature`   | Agrupa escenarios de una funcionalidad          |
| `Escenario`         | `Scenario`  | Un caso de comportamiento concreto              |
| `Dado`              | `Given`     | Contexto/precondición                           |
| `Cuando`            | `When`      | Acción que dispara el comportamiento            |
| `Entonces`          | `Then`      | Resultado esperado                              |
| `Y` / `Pero`        | `And`/`But` | Encadenar pasos del mismo tipo                  |
| `Antecedentes`      | `Background`| Pasos comunes a todos los escenarios            |
| `Esquema del escenario` | `Scenario Outline` | Escenario parametrizado con datos     |
| `Ejemplos`          | `Examples`  | Tabla de datos para el Scenario Outline         |

### Patrón Given-When-Then

```gherkin
# language: es
Característica: Inicio de sesión

  Escenario: Login exitoso
    Dado que estoy en la página de login
    Cuando inicio sesión con credenciales válidas
    Entonces debería ver la página de inventario
```

- **Dado (Given):** el estado inicial. NO es una acción del usuario.
- **Cuando (When):** la acción principal (idealmente una sola por escenario).
- **Entonces (Then):** la aserción / resultado observable.

### Idioma

La primera línea `# language: es` activa las palabras clave en español. Sin
ella, Gherkin usa inglés por defecto.

---

## 5. Cómo escribir buenos escenarios

✅ **Declarativo (qué), no imperativo (cómo):**

```gherkin
# BIEN
Cuando inicio sesión con usuario "standard_user" y contraseña "secret_sauce"

# MAL (filtra detalles de implementación al .feature)
Cuando escribo "standard_user" en el campo "#user-name"
Y hago clic en el botón "#login-button"
```

✅ **Un comportamiento por escenario.**
✅ **Lenguaje de negocio**, sin selectores ni términos técnicos.
✅ **Reutiliza pasos**: si dos escenarios solo cambian en datos, usa
`Esquema del escenario`.
✅ **Independientes**: cada escenario debe poder correr solo.

### Datos parametrizados (Scenario Outline)

```gherkin
  Esquema del escenario: Credenciales inválidas
    Cuando inicio sesión con usuario "<usuario>" y contraseña "<clave>"
    Entonces debería ver el mensaje de error "Username and password do not match"

    Ejemplos:
      | usuario   | clave   |
      | usuario_x | clave_y |
      | otro      | otra    |
```

### Tablas de datos (Data Tables)

```gherkin
    Cuando agrego los siguientes productos al carrito:
      | producto                |
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
```

---

## 6. De Gherkin a código: Step Definitions

Cada paso Gherkin se conecta a una función. Cucumber empareja el **texto** del
paso con un **patrón**:

```ts
import { Given, When, Then } from '@cucumber/cucumber';

Given('que estoy en la página de login', async function () {
  await this.page.goto('/');
});

When(
  'inicio sesión con usuario {string} y contraseña {string}',
  async function (usuario: string, clave: string) {
    // ...
  },
);
```

### Cucumber Expressions

- `{string}` → captura texto entre comillas.
- `{int}` → captura un entero.
- `{float}` → captura un número decimal.
- `{word}` → captura una palabra (sin espacios).

También se pueden usar expresiones regulares: `/^tengo (\d+) productos$/`.

---

## 7. El World y los Hooks

### World

El **World** es el `this` compartido entre los steps de un mismo escenario.
Cucumber crea un World nuevo por escenario, garantizando aislamiento. Aquí
guardamos la `page` de Playwright:

```ts
export class CustomWorld extends World {
  context!: BrowserContext;
  page!: Page;
}
setWorldConstructor(CustomWorld);
```

### Hooks (ciclo de vida)

| Hook        | Cuándo se ejecuta                         |
|-------------|-------------------------------------------|
| `BeforeAll` | Una vez, antes de todos los escenarios    |
| `Before`    | Antes de cada escenario                    |
| `After`     | Después de cada escenario                  |
| `AfterAll`  | Una vez, al terminar todo                  |

Se usan para abrir/cerrar el navegador y preparar/limpiar el estado.

### Hooks por etiqueta

```ts
Before({ tags: '@carrito' }, async function () { /* solo escenarios @carrito */ });
```

---

## 8. Etiquetas (Tags)

Las etiquetas (`@smoke`, `@carrito`) clasifican escenarios y permiten
ejecutarlos selectivamente:

```gherkin
  @smoke
  Escenario: Login exitoso
    ...
```

```bash
npm run test:nivel-4 -- --tags @smoke
npm run test:nivel-4 -- --tags "@smoke and not @lento"
```

---

## 9. Configuración (cucumber.js)

```js
export default {
  paths: ['tests/nivel-4-bdd/**/*.feature'], // dónde están los escenarios
  import: ['src/nivel-4-bdd/**/*.ts'],       // steps + soporte
  format: ['summary', 'html:playwright-report/cucumber.html'], // reportes
  formatOptions: { snippetInterface: 'async-await' },
};
```

> En este proyecto, TypeScript se ejecuta directamente con **tsx** (vía
> `NODE_OPTIONS=--import=tsx`), por eso no hace falta compilar antes.

---

## 10. Flujo de trabajo BDD recomendado

1. **Conversación** (Tres Amigos) sobre la historia de usuario.
2. **Escribir el `.feature`** en Gherkin (aún sin código).
3. Ejecutar: Cucumber marca los pasos como *undefined* y sugiere los snippets.
4. **Implementar los step definitions**.
5. Refactorizar y reutilizar pasos.
6. Entregar vía PR siguiendo [git-workflow.md](git-workflow.md).

---

## 11. Errores comunes

- **Escenarios imperativos** llenos de clics y selectores → frágiles e
  ilegibles.
- **Steps no reutilizables** por redacción inconsistente.
- **Lógica en los `.feature`**: la lógica va en los step definitions.
- **Escenarios dependientes** entre sí (uno necesita que otro corra antes).
- Tratar BDD solo como "una herramienta de testing" y saltarse la conversación.

---

## 12. Glosario rápido

| Término          | Definición breve                                            |
|------------------|-------------------------------------------------------------|
| Feature          | Funcionalidad bajo prueba (archivo `.feature`).             |
| Scenario         | Un caso de comportamiento.                                  |
| Step             | Una línea Gherkin (Dado/Cuando/Entonces).                   |
| Step Definition  | Función que implementa un step.                             |
| World            | Contexto compartido (`this`) por escenario.                 |
| Hook             | Código de ciclo de vida (Before/After).                     |
| Tag              | Etiqueta para clasificar/filtrar escenarios.                |
| Living Documentation | Documentación ejecutable y siempre actualizada.         |

---

<sub>📚 <a href="README.md">Índice de documentación</a> · <a href="../README.md">Inicio del repositorio</a></sub>
