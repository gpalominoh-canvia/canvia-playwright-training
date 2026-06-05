# canvia-playwright-training

Framework base de automatización E2E con **Playwright + TypeScript** y buenas
prácticas QA para capacitación interna.

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Instalación

```bash
npm install
npx playwright install
```

Copia las variables de entorno y ajústalas si hace falta:

```bash
cp .env.example .env
```

## Ejecución de pruebas

```bash
npm test              # niveles 1-3 (runner de Playwright)
npm run test:nivel-1  # Nivel 1 — básico
npm run test:nivel-2  # Nivel 2 — POM
npm run test:nivel-3  # Nivel 3 — Screenplay
npm run test:nivel-4  # Nivel 4 — BDD con Cucumber (runner cucumber-js)
npm run test:headed   # con navegador visible
npm run test:ui       # modo UI interactivo
npm run test:debug    # modo debug
npm run report        # abre el último reporte HTML
npm run codegen       # grabador de acciones
```

## Calidad de código

```bash
npm run lint       # ESLint
npm run format     # Prettier
npm run typecheck  # chequeo de tipos sin emitir
```

## Capacitación por niveles

El repositorio está organizado en **4 niveles** progresivos (currículo de 8
clases). Empieza por el sílabus:

- 📚 [docs/silabus.md](docs/silabus.md) — plan de clases, objetivos y evaluación.
- 🟢 [Nivel 1 — Básico](docs/nivel-1-basico.md): Playwright puro, sin patrones.
- 🟡 [Nivel 2 — POM](docs/nivel-2-pom.md): Page Object Model + fixtures.
- 🔵 [Nivel 3 — Screenplay](docs/nivel-3-screenplay.md): patrón de comportamiento.
- 🟣 [Nivel 4 — BDD](docs/nivel-4-bdd.md): Cucumber + Gherkin.

Guías de apoyo: [TypeScript](docs/guia-typescript.md) · [BDD](docs/guia-bdd.md).

## Estructura del proyecto

```
.
├── tests/
│   ├── nivel-1-basico/        # tests planos (sin patrón)
│   ├── nivel-2-pom/           # tests con Page Object Model
│   ├── nivel-3-screenplay/    # tests con Screenplay
│   └── nivel-4-bdd/           # escenarios Gherkin (.feature)
├── src/
│   ├── nivel-2-pom/           # pages, fixtures, data
│   ├── nivel-3-screenplay/    # framework Screenplay (core, abilities, tasks…)
│   └── nivel-4-bdd/           # step definitions, World y hooks de Cucumber
├── docs/                      # sílabus, guías por nivel, BDD, TypeScript, Git
├── .github/                   # plantillas de PR/issues y CI
├── playwright.config.ts       # un "project" por nivel (1-3)
├── cucumber.js                # configuración de Cucumber (nivel 4)
└── tsconfig.json
```

## Flujo de trabajo Git

Trabajamos con **GitFlow**. Antes de contribuir lee:

- [docs/git-workflow.md](docs/git-workflow.md) — modelo de ramas y proceso.
- [CONTRIBUTING.md](CONTRIBUTING.md) — convenciones de ramas, commits y PRs.
