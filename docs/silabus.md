# Sílabus — Capacitación Playwright QA Automation

Programa de **6 sesiones** organizado en **3 niveles** (2 sesiones por nivel).
Cada nivel introduce un nivel de abstracción mayor sobre el mismo caso de
estudio (sitio de práctica **SauceDemo**), para que se vea la evolución de un
test "plano" hasta un patrón de comportamiento (Screenplay).

## Objetivos generales

Al finalizar, el participante será capaz de:

- Escribir y depurar pruebas E2E con Playwright + TypeScript.
- Aplicar el patrón **Page Object Model (POM)**.
- Aplicar el patrón **Screenplay**.
- Trabajar con un flujo profesional de **GitFlow** (ramas, PRs, CI).

## Requisitos previos

- Conocimientos básicos de JavaScript/TypeScript.
- Git instalado y cuenta de GitHub.
- Node.js 20+ y un editor (VS Code recomendado).

## Estructura del repositorio

| Carpeta                       | Nivel | Contenido                                  |
|-------------------------------|-------|--------------------------------------------|
| `tests/nivel-1-basico/`       | 1     | Tests planos (sin patrón)                  |
| `tests/nivel-2-pom/`          | 2     | Tests con Page Object Model                |
| `tests/nivel-3-screenplay/`   | 3     | Tests con Screenplay                       |
| `src/nivel-2-pom/`            | 2     | Page Objects, fixtures, data               |
| `src/nivel-3-screenplay/`     | 3     | Framework Screenplay propio                |
| `docs/`                       | —     | Sílabus, guías por nivel y flujo Git       |

---

## Cronograma

### Nivel 1 — Fundamentos de Playwright

> Guía detallada: [nivel-1-basico.md](nivel-1-basico.md)

**Clase 1 — Primer test y herramientas**
- Qué es Playwright y por qué. Instalación y `playwright.config.ts`.
- Anatomía de un test: `test`, `expect`, `async/await`.
- Navegación, primer `expect`. Ejecutar y leer el reporte HTML.
- Práctica: `tests/nivel-1-basico/01-primer-test.spec.ts`.

**Clase 2 — Localizadores, interacciones y aserciones**
- Tipos de localizadores y buenas prácticas (`data-test`, roles).
- Acciones: `fill`, `click`, `check`, etc. Aserciones web-first.
- Hooks (`beforeEach`), `describe`, y depuración (`--debug`, `--ui`, codegen).
- Práctica: `tests/nivel-1-basico/02-interacciones.spec.ts`.

### Nivel 2 — Page Object Model (POM)

> Guía detallada: [nivel-2-pom.md](nivel-2-pom.md)

**Clase 3 — Introducción al POM**
- Problema de los tests planos: duplicación y fragilidad.
- Page Objects: encapsular selectores y acciones. `BasePage`.
- Refactor del login del Nivel 1 a `LoginPage` / `InventoryPage`.

**Clase 4 — Fixtures, datos y escalabilidad**
- Fixtures personalizados para inyectar Page Objects.
- Externalizar datos de prueba (`src/nivel-2-pom/data`) y `.env`.
- Buenas prácticas de organización y reutilización.
- Práctica: `tests/nivel-2-pom/login.spec.ts`.

### Nivel 3 — Patrón Screenplay

> Guía detallada: [nivel-3-screenplay.md](nivel-3-screenplay.md)

**Clase 5 — Conceptos de Screenplay**
- Limitaciones del POM al crecer. Principio SOLID detrás de Screenplay.
- Actores, Habilidades (Abilities), Tareas (Tasks), Interacciones, Preguntas.
- Recorrido del framework propio en `src/nivel-3-screenplay/`.

**Clase 6 — Construir con Screenplay**
- Escribir Tasks y Questions nuevas. Componer comportamiento legible.
- Comparación POM vs Screenplay: cuándo usar cada uno.
- Práctica: `tests/nivel-3-screenplay/login.spec.ts` + ejercicio guiado.

---

## Metodología

- Cada clase: ~30% teoría, ~70% práctica en vivo.
- Todo el código se entrega vía **Pull Request** a `develop` siguiendo
  [git-workflow.md](git-workflow.md).
- Los ejercicios se trabajan en ramas `feature/<nombre>-<ejercicio>`.

## Evaluación

| Criterio                                   | Peso |
|--------------------------------------------|------|
| Ejercicios entregados por PR (uno por nivel)| 60%  |
| Aplicación correcta del patrón del nivel    | 25%  |
| Buenas prácticas Git (ramas, commits, CI)   | 15%  |

## Recursos

- Sitio de práctica: https://www.saucedemo.com
- Documentación oficial: https://playwright.dev
- Flujo de trabajo Git del curso: [git-workflow.md](git-workflow.md)
