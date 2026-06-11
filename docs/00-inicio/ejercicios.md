# Banco de ejercicios

Ejercicios prácticos por nivel. Cada uno se entrega como **Pull Request** a la
rama `develop` y luego se revisa **en conjunto** (sesión de revisión asistida
por IA con el instructor) para ver qué estuvo bien, qué falló y qué faltó.

> Antes de empezar, ten tu entorno listo: [configuracion-entorno.md](configuracion-entorno.md).

---

## 📤 Cómo entregar un ejercicio (léelo una vez)

Cada nivel se publica como un **issue** en GitHub (etiqueta `ejercicio`). Cómo
tomarlo y entregar tu PR ligado está en
[cómo responder un ejercicio (issue)](como-responder-issues.md). Regla base:
**un ejercicio = una rama = un PR**.

Sigue siempre este flujo (detalle completo en [git-workflow.md](../03-proceso/git-workflow.md)):

```bash
# 1. Parte de develop actualizado
git checkout develop
git pull origin develop

# 2. Crea tu rama con tu nombre y el nivel
git checkout -b feature/<tu-nombre>-nivel<N>-ejercicio<NN>
# ej: feature/maria-nivel1-ejercicio03

# 3. Trabaja y commitea en pequeños pasos (commits en español)
git add .
git commit -m "test(nivel1): validar visibilidad del menú"

# 4. Sube tu rama
git push -u origin feature/<tu-nombre>-nivel1-menu

# 5. Abre el Pull Request hacia develop
#    (desde GitHub, o con: gh pr create --base develop)
```

### Checklist antes de pedir revisión

- [ ] La rama sigue la convención `feature/<nombre>-nivel<N>-ejercicio<NN>`.
- [ ] Commits con Conventional Commits en español.
- [ ] `npm run typecheck` y `npm run lint` pasan.
- [ ] Tus pruebas pasan localmente.
- [ ] El PR completa la plantilla y apunta a `develop`.

### La sesión de revisión

En la revisión conjunta veremos sobre tu PR:

1. **Qué estuvo bien** (buenas prácticas aplicadas).
2. **Qué falló** (errores, tests frágiles, selectores mejorables).
3. **Qué faltó** (casos no cubiertos, validaciones pendientes).
4. Acuerdos de mejora → los aplicas en la misma rama y se actualiza el PR.

---

## 🟢 Nivel 1 — Básico

> Carpeta de trabajo: `tests/nivel-1-basico/`

1. **Menú visible:** tras un login exitoso, valida que el botón de menú
   (hamburguesa, `#react-burger-menu-btn`) esté visible.
2. **Usuario bloqueado:** valida el mensaje de error al iniciar sesión con
   `locked_out_user`.
3. **Logout:** inicia sesión, abre el menú, haz clic en "Logout" y valida que
   regresas a la página de login.
4. **Orden de productos:** cambia el selector de orden a "Price (low to high)"
   y valida que el primer precio es el menor.
5. **(Reto)** Agrega un producto al carrito y valida que el badge del carrito
   muestra "1".

---

## 🟡 Nivel 2 — POM

> Carpeta de trabajo: `src/nivel-2-pom/` y `tests/nivel-2-pom/`

1. **CartPage:** crea un Page Object `CartPage` para la página del carrito.
2. **Agregar al carrito:** crea un método en `InventoryPage` para agregar un
   producto por nombre y un test que valide el contador del carrito.
3. **Fixture nuevo:** expón `CartPage` mediante el fixture de páginas.
4. **Datos externos:** mueve los nombres de productos a `src/nivel-2-pom/data`.
5. **(Reto)** Refactoriza el ejercicio 5 del Nivel 1 para que use Page Objects.

---

## 🔵 Nivel 3 — Screenplay

> Carpeta de trabajo: `src/nivel-3-screenplay/` y `tests/nivel-3-screenplay/`

1. **Question `CurrentUrl`:** crea una Question que devuelva la URL actual.
2. **Interaction `Select`:** crea una Interaction para elegir una opción de un
   `<select>` (el de ordenamiento).
3. **Task `AddProductToCart`:** crea una Task que agregue un producto.
4. **Test de comportamiento:** combina las piezas anteriores en un test legible.
5. **(Reto)** Crea una Task `Logout` y una Question `IsOnLoginPage`.

---

## 🟣 Nivel 4 — BDD

> Carpeta de trabajo: `src/nivel-4-bdd/` y `tests/nivel-4-bdd/`

1. **Escenario de logout:** agrega un escenario Gherkin de cierre de sesión y
   sus step definitions.
2. **Carrito (feature nueva):** crea `carrito.feature` con un escenario para
   agregar un producto, con etiqueta `@carrito`.
3. **Scenario Outline:** parametriza la validación de varios usuarios inválidos.
4. **Tags:** ejecuta solo los escenarios `@carrito`
   (`npm run test:nivel-4 -- --tags @carrito`).
5. **(Reto)** Reutiliza steps existentes sin duplicar redacción.

---

## 🟠 Nivel 5 — CI

> Archivo de trabajo: `.github/workflows/e2e.yml`

1. **Job de formato:** agrega un job que valide el formato con
   `npm run format -- --check`.
2. **Firefox en la matriz:** agrega un project de Firefox en
   `playwright.config.ts` y un valor a la matriz del workflow.
3. **Badge:** agrega el badge de estado del workflow a tu fork/README.
4. **Ejecución manual:** dispara el workflow con "Run workflow" y revisa los
   artefactos (reportes) generados.
5. **(Reto)** Haz que el job `cucumber` también suba capturas en caso de fallo.

---

## 🔴 Nivel 6 — Pruebas de API

> Carpeta de trabajo: `src/nivel-6-api/` y `tests/nivel-6-api/`

1. **PUT /posts/1:** agrega una prueba que valide la actualización y un método
   `update` en `PostsApi`.
2. **Nuevo recurso:** crea un cliente `UsersApi` y valida el contrato de
   `GET /users/1`.
3. **Casos de error:** valida que `GET /posts/9999` responde `404`.
4. **Contrato:** verifica los campos y tipos de la respuesta de `GET /posts`.
5. **(Reto)** Combina API + UI: prepara datos por API y verifícalos en pantalla.

---

## Criterios de evaluación (recordatorio)

| Criterio                                           | Peso |
| -------------------------------------------------- | ---- |
| Ejercicios entregados por PR (un PR por ejercicio) | 60%  |
| Aplicación correcta del patrón del nivel           | 25%  |
| Buenas prácticas Git (ramas, commits, CI)          | 15%  |

---

<sub>📚 <a href="../README.md">Índice de documentación</a> · <a href="../../README.md">Inicio del repositorio</a></sub>
