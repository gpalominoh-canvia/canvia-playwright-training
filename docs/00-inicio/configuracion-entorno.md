# Configuración del entorno (paso a paso)

Guía para dejar tu máquina lista **desde cero**. Síguela en orden antes de la
Clase 1. Si algo falla, anótalo y lo revisamos en clase.

> Tiempo estimado: 20–30 minutos.

---

## 0. Resumen de lo que vas a instalar

| Herramienta | Para qué                         | Versión mínima |
|-------------|----------------------------------|----------------|
| Node.js     | Ejecutar el proyecto y los tests | 20 LTS         |
| Git         | Control de versiones             | 2.40+          |
| VS Code     | Editor de código                 | última         |
| GitHub CLI  | (opcional) autenticación cómoda  | última         |

---

## 1. Instalar Node.js

Node.js incluye **npm** (el gestor de paquetes que usaremos).

### Windows

1. Descarga el instalador **LTS** desde https://nodejs.org (botón "LTS").
2. Ejecuta el `.msi` y acepta las opciones por defecto.
3. Alternativa con winget:
   ```powershell
   winget install OpenJS.NodeJS.LTS
   ```

### macOS

```bash
# Con Homebrew
brew install node@20
```

### Verificar

Abre una terminal **nueva** y ejecuta:

```bash
node -v   # debe mostrar v20.x o superior
npm -v    # debe mostrar 10.x o superior
```

---

## 2. Instalar Git

1. Descarga desde https://git-scm.com/downloads e instala con opciones por
   defecto. En Windows también: `winget install Git.Git`.
2. Configura tu identidad (usa el correo de tu cuenta de GitHub):
   ```bash
   git config --global user.name "Tu Nombre"
   git config --global user.email "tucorreo@ejemplo.com"
   ```
3. Verifica: `git --version`.

---

## 3. (Opcional) GitHub CLI

Facilita autenticarte y abrir Pull Requests desde la terminal.

```powershell
winget install GitHub.cli   # Windows
```
```bash
brew install gh             # macOS
```

Autenticarte:

```bash
gh auth login
# GitHub.com → HTTPS → Authenticate Git with your credentials → Login with a web browser
```

---

## 4. Instalar Visual Studio Code

1. Descarga desde https://code.visualstudio.com e instala.
2. Al abrir el proyecto, VS Code te ofrecerá instalar las **extensiones
   recomendadas** (definidas en [`.vscode/extensions.json`](../../.vscode/extensions.json)).
   Acéptalas.

### Extensiones recomendadas

| Extensión                         | Para qué                                  |
|-----------------------------------|-------------------------------------------|
| **Playwright Test for VSCode**    | Correr/depurar tests desde el editor      |
| **ESLint**                        | Marcar errores de código en vivo          |
| **Prettier**                      | Formatear automáticamente al guardar      |
| **Cucumber (Gherkin)**            | Resaltar `.feature` y autocompletar steps |
| **GitLens**                       | Ver historial y autoría en el editor      |
| **Code Spell Checker (+ Español)**| Detectar errores ortográficos             |

> El proyecto ya trae [`.vscode/settings.json`](../../.vscode/settings.json) con
> formato al guardar, fin de línea LF y la conexión de Cucumber con los steps.

---

## 5. Clonar el repositorio

```bash
# Con GitHub CLI
gh repo clone gpalominoh-canvia/canvia-playwright-training

# o con Git
git clone https://github.com/gpalominoh-canvia/canvia-playwright-training.git

cd canvia-playwright-training
```

---

## 6. Instalar dependencias del proyecto

```bash
npm install              # instala las librerías (node_modules)
npx playwright install   # descarga los navegadores de Playwright
```

---

## 7. Variables de entorno

```bash
# Windows (PowerShell)
Copy-Item .env.example .env
# macOS / Linux
cp .env.example .env
```

El archivo `.env` está **ignorado por git**: nunca subas credenciales reales.

---

## 8. Verificar que todo funciona

```bash
npm run typecheck   # no debe mostrar errores
npm run lint        # no debe mostrar errores
npm test            # corre niveles 1-3 (deberían pasar)
npm run test:nivel-4  # corre el nivel 4 (BDD)
```

Si ves las pruebas en verde, ¡estás listo! 🎉

---

## 9. Comandos del proyecto (referencia rápida)

| Comando                   | Qué hace                                        |
|---------------------------|-------------------------------------------------|
| `npm test`                | Corre niveles 1–3 (runner de Playwright)        |
| `npm run test:nivel-1`    | Solo Nivel 1 (básico)                           |
| `npm run test:nivel-2`    | Solo Nivel 2 (POM)                              |
| `npm run test:nivel-3`    | Solo Nivel 3 (Screenplay)                       |
| `npm run test:nivel-4`    | Nivel 4 (BDD con Cucumber)                      |
| `npm run test:headed`     | Tests con el navegador visible                  |
| `npm run test:ui`         | Modo UI interactivo de Playwright               |
| `npm run test:debug`      | Depuración paso a paso                          |
| `npm run report`          | Abre el último reporte HTML                     |
| `npm run codegen`         | Grabador de acciones (genera código)            |
| `npm run typecheck`       | Verifica tipos de TypeScript                    |
| `npm run lint`            | Analiza el código con ESLint                    |
| `npm run format`          | Formatea el código con Prettier                 |

---

## 10. Problemas frecuentes

| Síntoma                                   | Solución                                              |
|-------------------------------------------|-------------------------------------------------------|
| `node`/`npm` no se reconoce               | Cierra y reabre la terminal (recarga el PATH).        |
| `npx playwright test` falla por navegador | Ejecuta `npx playwright install`.                     |
| Errores de tipos en rojo                  | Ejecuta `npm run typecheck` y léelos.                 |
| Permisos al clonar (repo privado)         | Autentícate con `gh auth login`.                      |

¿Sigue fallando? Trae el mensaje de error a clase y lo resolvemos juntos.

---

<sub>📚 <a href="../README.md">Índice de documentación</a> · <a href="../../README.md">Inicio del repositorio</a></sub>
