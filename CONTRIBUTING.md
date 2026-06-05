# Guía de contribución

Gracias por participar en la capacitación **Canvia Playwright Training**.
Para mantener el repositorio ordenado, sigue estas reglas. El detalle completo
del modelo de ramas está en [docs/03-proceso/git-workflow.md](docs/03-proceso/git-workflow.md).

## Antes de empezar

1. Asegúrate de tener tu rama `develop` actualizada:
   ```bash
   git checkout develop && git pull origin develop
   ```
2. Crea tu rama de trabajo siguiendo la convención de nombres.

## Convención de ramas

`<tipo>/<descripcion-corta-kebab-case>` — tipos: `feature`, `bugfix`,
`release`, `hotfix`. Ejemplo: `feature/login-page-object`.

## Convención de commits

Conventional Commits **en español**, en imperativo:

```
<tipo>(<alcance>): <descripción>
```

Tipos: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`, `style`, `perf`.

Activa la plantilla de commits del repo (una sola vez):

```bash
git config commit.template .gitmessage.txt
```

## Pull Requests

- Las `feature/*` y `bugfix/*` apuntan a **`develop`**.
- Las `release/*` y `hotfix/*` apuntan a **`main`**.
- Completa la plantilla del PR.
- El PR debe pasar CI y tener al menos 1 aprobación.
- Borra tu rama después del merge.

## Qué NO subir al repositorio

- Credenciales, tokens o archivos `.env` (usa `.env.example`).
- Carpetas generadas: `node_modules/`, `test-results/`, `playwright-report/`.
- Configuración de herramientas locales del editor o asistentes.
