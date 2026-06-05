<div align="center">

  <img src="docs/assets/logo-canvia.png" alt="Canvia" width="320" />

  <h1>Canvia Playwright Training</h1>

  <p><strong>Framework de automatización E2E con Playwright + TypeScript</strong><br/>
  Capacitación interna de QA Automation, organizada en 6 niveles progresivos.</p>

[![E2E](https://github.com/gpalominoh-canvia/canvia-playwright-training/actions/workflows/e2e.yml/badge.svg)](https://github.com/gpalominoh-canvia/canvia-playwright-training/actions/workflows/e2e.yml)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Cucumber](https://img.shields.io/badge/Cucumber-23D96C?logo=cucumber&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)

</div>

---

## 📑 Tabla de contenidos

- [Sobre el proyecto](#-sobre-el-proyecto)
- [Inicio rápido](#-inicio-rápido)
- [Comandos](#-comandos)
- [Capacitación por niveles](#-capacitación-por-niveles)
- [Documentación](#-documentación)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Flujo de trabajo](#-flujo-de-trabajo)

---

## 🎯 Sobre el proyecto

Framework base para aprender automatización de pruebas E2E aplicando un mismo
caso de estudio (el sitio de práctica **SauceDemo**) con un nivel de
abstracción creciente: desde tests "planos" hasta BDD, CI y pruebas de API.

|               |                                                     |
| ------------- | --------------------------------------------------- |
| **Stack**     | Playwright · TypeScript · Cucumber · GitHub Actions |
| **Patrones**  | Page Object Model · Screenplay · BDD · API testing  |
| **Currículo** | 6 niveles · 12 clases                               |
| **Flujo Git** | GitFlow con ramas protegidas y PRs                  |

---

## ⚡ Inicio rápido

> Guía detallada desde cero (Node, Git, VS Code y extensiones):
> **[docs/00-inicio/configuracion-entorno.md](docs/00-inicio/configuracion-entorno.md)**.

```bash
# 1. Clonar
git clone https://github.com/gpalominoh-canvia/canvia-playwright-training.git
cd canvia-playwright-training

# 2. Instalar dependencias y navegadores
npm install
npx playwright install

# 3. Variables de entorno
cp .env.example .env        # en PowerShell: Copy-Item .env.example .env

# 4. Verificar que todo corre
npm test
```

**Requisitos:** Node.js 20+ y npm 10+.

---

## 🧰 Comandos

| Comando                | Descripción                          |
| ---------------------- | ------------------------------------ |
| `npm test`             | Ejecuta niveles Playwright (1–3 y 6) |
| `npm run test:nivel-1` | Nivel 1 — básico                     |
| `npm run test:nivel-2` | Nivel 2 — POM                        |
| `npm run test:nivel-3` | Nivel 3 — Screenplay                 |
| `npm run test:nivel-4` | Nivel 4 — BDD con Cucumber           |
| `npm run test:nivel-6` | Nivel 6 — pruebas de API             |
| `npm run test:headed`  | Con el navegador visible             |
| `npm run test:ui`      | Modo UI interactivo                  |
| `npm run test:debug`   | Depuración paso a paso               |
| `npm run report`       | Abre el último reporte HTML          |
| `npm run codegen`      | Grabador de acciones                 |
| `npm run typecheck`    | Verifica tipos de TypeScript         |
| `npm run lint`         | Analiza el código con ESLint         |
| `npm run format`       | Formatea el código con Prettier      |

---

## 🎓 Capacitación por niveles

Cada nivel introduce una abstracción mayor sobre el mismo caso de estudio.

| Nivel | Tema                   | Qué aprendes                             | Guía                                         |
| :---: | ---------------------- | ---------------------------------------- | -------------------------------------------- |
| 1 🟢  | Fundamentos Playwright | Localizadores, acciones y aserciones     | [ver](docs/01-niveles/nivel-1-basico.md)     |
| 2 🟡  | Page Object Model      | Encapsular páginas, fixtures, datos      | [ver](docs/01-niveles/nivel-2-pom.md)        |
| 3 🔵  | Screenplay             | Actores, tasks, questions                | [ver](docs/01-niveles/nivel-3-screenplay.md) |
| 4 🟣  | BDD con Cucumber       | Gherkin, steps, World y hooks            | [ver](docs/01-niveles/nivel-4-bdd.md)        |
| 5 🟠  | Integración Continua   | GitHub Actions: ejecutar todo en la nube | [ver](docs/01-niveles/nivel-5-ci.md)         |
| 6 🔴  | Pruebas de API         | `request` HTTP, API client, contratos    | [ver](docs/01-niveles/nivel-6-api.md)        |

👉 Empieza por el **[sílabus completo](docs/00-inicio/silabus.md)** y practica con el
**[banco de ejercicios](docs/00-inicio/ejercicios.md)**.

---

## 📚 Documentación

Todo el material vive en **[`docs/`](docs/README.md)**:

- **Inicio:** [Configuración del entorno](docs/00-inicio/configuracion-entorno.md) · [Sílabus](docs/00-inicio/silabus.md) · [Ejercicios](docs/00-inicio/ejercicios.md)
- **Guías transversales:** [TypeScript](docs/02-guias/guia-typescript.md) · [BDD](docs/02-guias/guia-bdd.md) · [CI/CD](docs/02-guias/guia-ci.md) · [API testing](docs/02-guias/guia-api-testing.md) · [Buenas prácticas](docs/02-guias/guia-buenas-practicas.md) · [Depuración](docs/02-guias/guia-depuracion.md)
- **Proceso:** [Flujo de trabajo Git](docs/03-proceso/git-workflow.md) · [Contribución](CONTRIBUTING.md)

---

## 🗂️ Estructura del proyecto

```
.
├── tests/                     # especificaciones de prueba
│   ├── nivel-1-basico/        # tests planos (sin patrón)
│   ├── nivel-2-pom/           # tests con Page Object Model
│   ├── nivel-3-screenplay/    # tests con Screenplay
│   ├── nivel-4-bdd/           # escenarios Gherkin (.feature)
│   └── nivel-6-api/           # pruebas de API
├── src/                       # código del framework
│   ├── nivel-2-pom/           # pages, fixtures, data
│   ├── nivel-3-screenplay/    # framework Screenplay (core, abilities, tasks…)
│   ├── nivel-4-bdd/           # step definitions, World y hooks de Cucumber
│   └── nivel-6-api/           # API client y fixture
├── docs/                      # documentación (índice en docs/README.md)
├── .github/workflows/e2e.yml  # Nivel 5: pipeline de CI (todos los niveles)
├── .vscode/                   # extensiones y ajustes recomendados
├── playwright.config.ts       # un "project" por nivel (1–3 y 6)
├── cucumber.js                # configuración de Cucumber (nivel 4)
└── tsconfig.json
```

---

## 🔀 Flujo de trabajo

Trabajamos con **GitFlow**: `main` (estable) y `develop` (integración), ambas
protegidas; el trabajo entra por ramas `feature/*` y **Pull Requests** que
deben pasar la CI y una revisión.

- 📖 [Modelo de ramas y proceso](docs/03-proceso/git-workflow.md)
- ✅ [Convenciones de contribución](CONTRIBUTING.md)

---

<div align="center">
  <sub>Canvia · <em>nacimos para reinventar</em> · Capacitación interna de QA Automation</sub>
</div>
