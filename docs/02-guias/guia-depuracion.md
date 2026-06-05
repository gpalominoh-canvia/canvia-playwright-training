# Guía de depuración

Cómo investigar y resolver tests que fallan en Playwright. Es donde más se
traban los participantes, así que tenla a mano.

---

## 1. Modo UI (la mejor forma de explorar)

Abre una interfaz interactiva: ves cada paso, el DOM y puedes re-ejecutar.

```bash
npm run test:ui
```

Ideal para entender **qué** hace el test y **dónde** se rompe.

---

## 2. Modo debug (paso a paso)

Abre el **Playwright Inspector** y pausa en cada acción:

```bash
npm run test:debug
# o un test puntual:
npx playwright test tests/nivel-1-basico/02-interacciones.spec.ts --debug
```

Botones: _Step over_ (siguiente acción), _Resume_, y un selector explorer.

---

## 3. Modo headed (ver el navegador real)

```bash
npm run test:headed
```

Útil para ver visualmente lo que ocurre, aunque sin pausas.

---

## 4. Trace Viewer (autopsia de un fallo)

El proyecto guarda **trace** en el primer reintento (`trace: 'on-first-retry'`).
Tras un fallo:

```bash
npx playwright show-trace test-results/.../trace.zip
```

El trace incluye **línea de tiempo, snapshots del DOM, red y consola** de cada
paso. Es la herramienta #1 para fallos que no reproduces localmente (p. ej. en CI).

> En CI, el trace y el reporte se suben como **artefactos** de la ejecución
> (ver [Nivel 5 — CI](../01-niveles/nivel-5-ci.md)).

---

## 5. Reporte HTML

```bash
npm run report
```

Muestra cada test, sus pasos, capturas (`screenshot: 'only-on-failure'`) y
video (`video: 'retain-on-failure'`) cuando falla.

---

## 6. Codegen (generar y explorar selectores)

```bash
npm run codegen
```

Graba tus acciones y genera código + te sugiere **buenos selectores**. Útil
para descubrir el selector correcto de un elemento.

---

## 7. Depurar desde VS Code

Con la extensión **Playwright Test for VSCode** (ya recomendada):

- Corre/depura un test desde el ícono ▷ junto a `test(...)`.
- Pon **breakpoints** en el editor y usa _Debug Test_.
- "Pick locator" para obtener selectores señalando en el navegador.

---

## 8. Aislar y enfocar

```ts
test.only('solo este', async ({ page }) => {
  /* ... */
});
```

```bash
# Por nombre (grep)
npx playwright test -g "credenciales inválidas"
# Por nivel
npm run test:nivel-1
```

> ⚠️ Quita los `test.only` antes de subir: la CI los bloquea (`forbidOnly`).

---

## 9. Variable PWDEBUG

```bash
# PowerShell
$env:PWDEBUG=1; npx playwright test
```

Fuerza el modo debug y abre el inspector.

---

## 10. Cucumber (Nivel 4)

```bash
# Solo escenarios con una etiqueta
npm run test:nivel-4 -- --tags @carrito
# Más detalle de un fallo
npm run test:nivel-4 -- --format @cucumber/pretty-formatter
```

El reporte HTML del nivel 4 queda en `playwright-report/cucumber.html`.

---

## 11. Errores y causas frecuentes

| Síntoma                                 | Causa probable / solución                                     |
| --------------------------------------- | ------------------------------------------------------------- |
| Test "flaky" (a veces pasa, a veces no) | Falta `await`, o esperas con `waitForTimeout`.                |
| `Timeout 30000ms exceeded`              | Selector que nunca aparece; revisa el selector en UI mode.    |
| `strict mode violation`                 | El selector coincide con varios elementos; sé más específico. |
| Pasa local, falla en CI                 | Datos/estado no aislados; revisa el **trace** del artefacto.  |
| `locator.click: element is not visible` | El elemento no está listo/visible; usa aserción previa.       |

---

## 12. Flujo recomendado para depurar

1. Reproduce con `npm run test:ui` y observa el paso que falla.
2. Si no se ve claro, `--debug` para ir paso a paso.
3. Revisa el **trace** (sobre todo si falló en CI).
4. Ajusta selector/espera/aserción.
5. Re-ejecuta solo ese test (`-g "nombre"`).

---

<sub>📚 <a href="../README.md">Índice de documentación</a> · <a href="../../README.md">Inicio del repositorio</a></sub>
