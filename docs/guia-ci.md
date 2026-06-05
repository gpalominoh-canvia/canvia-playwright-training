# Guía completa de CI/CD para QA Automation

Guía conceptual de Integración Continua, base teórica del
[Nivel 5](nivel-5-ci.md). Foco en **GitHub Actions**, que es lo que usa este
repositorio.

---

## 1. ¿Qué es CI/CD?

- **CI (Continuous Integration / Integración Continua):** cada cambio que se
  sube al repositorio se integra y **se verifica automáticamente** (compilar,
  lint, tests). El objetivo es detectar errores cuanto antes.
- **CD (Continuous Delivery / Deployment):** llevar esos cambios verificados a
  un entorno (staging/producción) de forma automática o semiautomática.

En QA Automation nos centramos en la parte de **CI**: ejecutar las pruebas
automáticamente en cada push y Pull Request.

### ¿Por qué importa?

- **Feedback rápido:** sabes en minutos si tu cambio rompió algo.
- **Calidad consistente:** las pruebas corren igual para todos, no "en mi máquina".
- **Protección de ramas:** un PR no se mergea si la CI falla.
- **Documentación viva del estado:** el badge de build muestra si `main` está sano.

---

## 2. Conceptos de GitHub Actions

GitHub Actions ejecuta **workflows** definidos en archivos YAML dentro de
`.github/workflows/`.

| Concepto    | Qué es                                                          |
|-------------|----------------------------------------------------------------|
| **Workflow**| Un proceso automatizado (un archivo `.yml`).                   |
| **Event**   | Lo que dispara el workflow (`push`, `pull_request`, …).         |
| **Job**     | Conjunto de pasos que corren en una máquina (runner).           |
| **Step**    | Una acción o comando dentro de un job.                          |
| **Action**  | Pieza reutilizable (ej. `actions/checkout`).                    |
| **Runner**  | La máquina que ejecuta el job (`ubuntu-latest`).                |
| **Artifact**| Archivo que se guarda tras la ejecución (ej. reportes).         |

### Anatomía de un workflow

```yaml
name: E2E                      # nombre visible en la pestaña Actions
on:                            # eventos que lo disparan
  push:
    branches: [main, develop]
  pull_request:
  workflow_dispatch:           # ejecución manual
jobs:
  test:                        # un job
    runs-on: ubuntu-latest     # runner
    steps:
      - uses: actions/checkout@v4      # action: clonar el repo
      - uses: actions/setup-node@v4    # action: instalar Node
        with: { node-version: 20 }
      - run: npm ci                    # comando
      - run: npx playwright test
```

---

## 3. Eventos (triggers) más usados

| Evento              | Cuándo se dispara                                   |
|---------------------|-----------------------------------------------------|
| `push`              | Al subir commits a las ramas indicadas              |
| `pull_request`      | Al abrir/actualizar un PR                           |
| `workflow_dispatch` | Manualmente, desde la UI (botón "Run workflow")     |
| `schedule`          | Periódicamente, con sintaxis cron                   |

### Cron (schedule)

```yaml
schedule:
  - cron: '0 6 * * 1-5'   # min hora día-mes mes día-semana
```

`0 6 * * 1-5` = 06:00 UTC, de lunes a viernes. Útil para "nightly runs".

---

## 4. Jobs en paralelo y dependencias

Por defecto, los **jobs corren en paralelo**. Para encadenarlos se usa `needs`:

```yaml
jobs:
  calidad: { ... }
  pruebas: { ... }
  publicar:
    needs: [calidad, pruebas]   # espera a que ambos terminen
```

### Matrix: ejecutar lo mismo con varias variantes

```yaml
strategy:
  fail-fast: false
  matrix:
    nivel: [nivel-1-basico, nivel-2-pom, nivel-3-screenplay]
steps:
  - run: npx playwright test --project=${{ matrix.nivel }}
```

Esto crea **un job por cada valor** de la matriz, en paralelo. `fail-fast:
false` evita que el fallo de uno cancele a los demás.

---

## 5. Caché y velocidad

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: npm        # cachea ~/.npm entre ejecuciones
```

- Usa `npm ci` (no `npm install`) en CI: es más rápido y reproducible
  (respeta exactamente `package-lock.json`).
- Instala **solo el navegador necesario** (`playwright install chromium`).

---

## 6. Artefactos y reportes

```yaml
- name: Publicar reporte
  if: always()                 # súbelo aunque el test falle
  uses: actions/upload-artifact@v4
  with:
    name: playwright-report
    path: playwright-report/
    retention-days: 7
```

`if: always()` es clave: si los tests fallan, **igual** quieres el reporte para
investigar.

---

## 7. CI como "puerta de calidad" (quality gate)

La **protección de ramas** puede exigir que un check de CI pase antes de
mergear. Cuando hay una matriz, conviene un **job agregador**:

```yaml
ci-ok:
  if: always()
  needs: [calidad, playwright, cucumber]
  runs-on: ubuntu-latest
  steps:
    - run: |
        if [ "${{ needs.calidad.result }}" != "success" ] ...; then exit 1; fi
```

Así, la protección requiere un único check (`CI OK`) en lugar de listar cada
job de la matriz (que cambian de nombre al variar la matriz).

> En este repo, `main` y `develop` exigen el check **CI OK** + 1 aprobación.

---

## 8. Variables y secretos

- **Variables de entorno:** `env:` a nivel de workflow, job o step.
- **Secretos:** datos sensibles (tokens, contraseñas) en
  *Settings → Secrets and variables → Actions*. Se usan como
  `${{ secrets.MI_SECRETO }}` y **nunca** se escriben en el YAML.

```yaml
env:
  BASE_URL: https://www.saucedemo.com
steps:
  - run: npx playwright test
    env:
      TOKEN: ${{ secrets.API_TOKEN }}
```

---

## 9. Badge de estado

Muestra en el README si la build está pasando:

```markdown
![E2E](https://github.com/<owner>/<repo>/actions/workflows/e2e.yml/badge.svg)
```

---

## 10. Buenas prácticas

- **Rápido:** cachea dependencias, paraleliza con matriz, instala lo mínimo.
- **Determinista:** `npm ci`, versiones fijadas, sin dependencias del entorno local.
- **Visible:** sube reportes como artefactos con `if: always()`.
- **Seguro:** secretos en GitHub, nunca en el código.
- **Como puerta:** que el merge dependa de la CV en verde (branch protection).
- **`concurrency`:** cancela ejecuciones viejas del mismo branch para ahorrar tiempo.

---

## 11. Errores comunes

- Usar `npm install` en vez de `npm ci` (builds no reproducibles).
- No subir reportes cuando el test falla (olvidar `if: always()`).
- Requerir en branch protection los jobs de una matriz por nombre (se rompen
  al cambiar la matriz) → usar un job agregador.
- Hardcodear secretos en el YAML.
- Olvidar `--with-deps` al instalar navegadores en Linux (faltan librerías).

---

## 12. Glosario

| Término    | Definición                                                     |
|------------|----------------------------------------------------------------|
| CI         | Integración Continua: verificar cada cambio automáticamente.   |
| CD         | Entrega/Despliegue Continuo.                                   |
| Workflow   | Proceso automatizado definido en YAML.                         |
| Job / Step | Unidad de ejecución / comando dentro de un job.                |
| Runner     | Máquina que ejecuta el job.                                    |
| Artifact   | Archivo guardado tras la ejecución.                            |
| Matrix     | Ejecutar un job con múltiples variantes en paralelo.           |
| Quality gate | Check que debe pasar para permitir el merge.                 |
