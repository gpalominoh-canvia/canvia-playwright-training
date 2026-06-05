# Nivel 4 — BDD con Cucumber

> Escribir las pruebas como **especificaciones de comportamiento** en lenguaje
> natural (Gherkin), entendibles por todo el equipo, y conectarlas a Playwright.

📖 Antes de este nivel, lee la guía conceptual: [guia-bdd.md](../02-guias/guia-bdd.md).

## Objetivos

- Entender qué es BDD y cuándo aporta valor.
- Escribir escenarios en **Gherkin** (Dado / Cuando / Entonces).
- Conectar Gherkin con código vía **step definitions**.
- Compartir estado con el **World** y manejar el ciclo de vida con **hooks**.

## Por qué Cucumber usa un runner distinto

Los niveles 1–3 corren con el runner de **Playwright** (`.spec.ts`). El Nivel 4
usa **cucumber-js**, que lee archivos `.feature` y ejecuta los step definitions.
Por eso tiene su propio comando y configuración (`cucumber.js`), en lugar de un
"project" dentro de `playwright.config.ts`.

## Estructura

```
tests/nivel-4-bdd/
└── login.feature            # escenarios en Gherkin (español)
src/nivel-4-bdd/
├── steps/
│   └── login.steps.ts       # step definitions (Given/When/Then)
└── support/
    ├── world.ts             # contexto compartido (page de Playwright)
    └── hooks.ts             # Before/After: abrir y cerrar navegador
cucumber.js                  # configuración de Cucumber
```

## Cómo encajan las piezas

1. **`.feature`** describe el comportamiento en Gherkin:
   ```gherkin
   # language: es
   Escenario: Login exitoso con usuario estándar
     Dado que estoy en la página de login
     Cuando inicio sesión con usuario "standard_user" y contraseña "secret_sauce"
     Entonces debería ver la página de inventario
   ```

2. **Step definition** conecta cada línea con código:
   ```ts
   When(
     'inicio sesión con usuario {string} y contraseña {string}',
     async function (this: CustomWorld, usuario: string, contrasena: string) {
       await this.page.locator('[data-test="username"]').fill(usuario);
       // ...
     },
   );
   ```
   `{string}` captura el texto entre comillas y lo pasa como argumento.

3. **World** (`this`) comparte la `page` entre los steps del mismo escenario.

4. **Hooks** abren el navegador (`BeforeAll`), crean una página nueva por
   escenario (`Before`) y limpian al final (`After` / `AfterAll`).

## Ejecutar

```bash
npm run test:nivel-4
```

El reporte HTML queda en `playwright-report/cucumber.html`.

## Conceptos clave de Gherkin usados

- **Característica (Feature):** la funcionalidad bajo prueba.
- **Antecedentes (Background):** pasos comunes a todos los escenarios.
- **Escenario (Scenario):** un caso concreto.
- **Esquema del escenario (Scenario Outline) + Ejemplos:** mismo escenario
  ejecutado con varios datos (tabla de ejemplos).

## Ejercicio del nivel

En una rama `feature/<tu-nombre>-nivel4`:

1. Agrega un escenario que valide agregar un producto al carrito.
2. Crea los step definitions necesarios reutilizando el World.
3. Usa una etiqueta `@carrito` y ejecútalo con
   `npm run test:nivel-4 -- --tags @carrito`.
4. Abre un PR a `develop`.

## Buenas prácticas

- Gherkin describe **qué**, no **cómo** (sin selectores en los `.feature`).
- Reutiliza steps; evita escenarios duplicados (usa Scenario Outline).
- Un escenario = un comportamiento observable de negocio.

---

<sub>📚 <a href="../README.md">Índice de documentación</a> · <a href="../../README.md">Inicio del repositorio</a></sub>
