# Flujo de trabajo Git — GitFlow (Canvia Playwright Training)

Esta guía define el modelo de ramas, nombres y proceso de integración que
usaremos durante toda la capacitación. El objetivo es que cada participante
practique un flujo profesional, idéntico al de un proyecto real de QA
Automation.

---

## 1. Modelo de ramas

Usamos **GitFlow adaptado**. Hay dos ramas permanentes y cuatro tipos de ramas
temporales.

### Ramas permanentes

| Rama      | Propósito                                                                 | ¿Se commitea directo? |
|-----------|---------------------------------------------------------------------------|-----------------------|
| `main`    | Código **estable y liberado**. Cada commit es una versión etiquetada.     | ❌ Nunca              |
| `develop` | Rama de **integración**. Aquí confluye todo el trabajo terminado.         | ❌ Solo vía PR        |

### Ramas temporales

| Tipo         | Nace de    | Se mergea a          | Sirve para                                   |
|--------------|------------|----------------------|----------------------------------------------|
| `feature/*`  | `develop`  | `develop`            | Nueva funcionalidad, ejercicio o caso de test|
| `bugfix/*`   | `develop`  | `develop`            | Corregir un defecto detectado en `develop`   |
| `release/*`  | `develop`  | `main` **y** `develop` | Preparar una entrega/versión                |
| `hotfix/*`   | `main`     | `main` **y** `develop` | Arreglo urgente sobre algo ya liberado      |

```
  hotfix/*  ───────────────●────────────────►  (merge a main y develop)
                          /
main  ●─────────────────●──────────────────●────────────►  (tags: v1.0.0, v1.1.0)
       \               / \                 /
release/*               \  ●──────────────●   (estabilización)
                         \ /              /
develop ●──●────●────●───●───●────●──────●─────────────────►
            \   \        /        /
feature/*    ●──●       /        /
                       /        /
bugfix/*     ●────────●        /
                              /
feature/*    ●───────────────●
```

---

## 2. Convención de nombres de ramas

Formato: `<tipo>/<descripcion-corta-en-kebab-case>`

Cuando exista un ticket/issue, anteponer su id:
`<tipo>/<ID>-<descripcion-corta>`

Ejemplos válidos:

```
feature/login-page-object
feature/REW-4147-flujo-checkout
bugfix/selector-boton-pagar
release/1.2.0
hotfix/timeout-api-rewards
```

Reglas:
- Todo en **minúsculas** y `kebab-case`.
- Sin tildes ni espacios.
- Descripción breve pero entendible (máx. ~5 palabras).

---

## 3. Convención de commits

Usamos **Conventional Commits en español**.

Formato: `<tipo>(<alcance opcional>): <descripción en imperativo>`

Tipos permitidos:

| Tipo       | Cuándo usarlo                                                 |
|------------|---------------------------------------------------------------|
| `feat`     | Nueva funcionalidad o caso de prueba                          |
| `fix`      | Corrección de un defecto                                      |
| `refactor` | Cambio interno sin alterar comportamiento                     |
| `test`     | Añadir o ajustar pruebas                                      |
| `docs`     | Documentación                                                 |
| `chore`    | Tareas de mantenimiento (deps, configs)                       |
| `ci`       | Cambios en integración continua                               |
| `style`    | Formato, sin cambios de lógica                                |
| `perf`     | Mejora de rendimiento                                         |

Ejemplos:

```
feat(login): agregar page object de la página de login
fix(checkout): corregir selector del botón pagar
test(rewards): cubrir flujo de canje de puntos
docs(git): documentar el modelo de ramas GitFlow
```

Reglas:
- Mensaje en **español**, en **imperativo** ("agregar", no "agregado").
- Primera línea ≤ 72 caracteres.
- **No** incluir `Co-Authored-By`.

---

## 4. Ciclo de trabajo (paso a paso)

### A. Trabajar una feature

```bash
# 1. Partir siempre de develop actualizado
git checkout develop
git pull origin develop

# 2. Crear la rama de trabajo
git checkout -b feature/login-page-object

# 3. Trabajar y commitear en pequeños incrementos
git add .
git commit -m "feat(login): agregar page object de la página de login"

# 4. Subir la rama
git push -u origin feature/login-page-object

# 5. Abrir un Pull Request hacia develop (NO hacia main)
```

### B. Preparar una release

```bash
git checkout develop && git pull origin develop
git checkout -b release/1.2.0
# Ajustes finales: versión, changelog, fixes menores
git push -u origin release/1.2.0
# PR de release/1.2.0 -> main  (y luego back-merge a develop)
# Al mergear a main: crear tag
git tag -a v1.2.0 -m "Release 1.2.0"
git push origin v1.2.0
```

### C. Hotfix urgente

```bash
git checkout main && git pull origin main
git checkout -b hotfix/timeout-api-rewards
# corregir
git commit -m "fix(rewards): aumentar timeout de la API de canje"
# PR a main + back-merge a develop + tag de parche (v1.2.1)
```

---

## 5. Reglas de Pull Request

- Un PR siempre apunta a `develop` (excepto `release/*` y `hotfix/*` → `main`).
- Título del PR = mismo estilo que un commit convencional.
- Debe pasar **CI en verde** antes de mergear.
- Requiere al menos **1 aprobación** de revisión.
- Estrategia de merge recomendada: **Squash & merge** para features
  (historia limpia en `develop`); **Merge commit** para `release/*` y
  `hotfix/*` (preserva el punto de integración).
- Borrar la rama temporal después de mergear.

---

## 6. Resumen rápido

- ¿Nueva tarea? → `feature/*` desde `develop`.
- ¿Bug en desarrollo? → `bugfix/*` desde `develop`.
- ¿Vamos a entregar? → `release/*` desde `develop` hacia `main`.
- ¿Algo roto en producción/`main`? → `hotfix/*` desde `main`.
- **Nunca** se commitea directo a `main` ni a `develop`.

---

<sub>📚 <a href="../README.md">Índice de documentación</a> · <a href="../../README.md">Inicio del repositorio</a></sub>
