# Guía: cómo obtener (y elegir) locators

Un **locator** le dice a Playwright **qué elemento** de la página tocar. Elegir
buenos locators es lo que separa un test estable de uno frágil. Esta guía enseña
**cómo encontrarlos**, **qué herramienta usar** y **cómo elegir el mejor**.

> Relacionado: [buenas prácticas](guia-buenas-practicas.md) (sección de selectores)
> y [depuración](guia-depuracion.md).

---

## 1. La regla de oro

> El locator debe describir **qué es** el elemento (su rol o su significado), no
> **dónde está** en el HTML.

Un buen locator sobrevive a cambios de diseño; uno frágil se rompe cuando mueven
un `div`.

---

## 2. Prioridad de locators (de mejor a peor)

Playwright recomienda este orden. Usa siempre el más alto que aplique:

| #   | Locator                       | Ejemplo                                   | Cuándo                              |
| --- | ----------------------------- | ----------------------------------------- | ----------------------------------- |
| 1   | `getByRole`                   | `getByRole('button', { name: 'Login' })`  | Casi siempre: refleja accesibilidad |
| 2   | `getByLabel`                  | `getByLabel('Contraseña')`                | Campos de formulario con `<label>`  |
| 3   | `getByPlaceholder`            | `getByPlaceholder('Username')`            | Inputs con placeholder              |
| 4   | `getByText`                   | `getByText('Bienvenido')`                 | Texto visible no interactivo        |
| 5   | `getByTestId` / `[data-test]` | `getByTestId('login-button')`             | Cuando el equipo pone IDs de prueba |
| 6   | CSS / XPath estructural ⚠️    | `locator('.col-3 > button:nth-child(2)')` | Último recurso                      |

```ts
// ✅ Robusto y legible
await page.getByRole('button', { name: 'Agregar al carrito' }).click();

// ⚠️ Aceptable si el sitio usa data-test (como SauceDemo)
await page.locator('[data-test="login-button"]').click();

// ❌ Frágil: depende de la estructura/clases
await page.locator('div.col-3 > button.btn-primary:nth-child(2)').click();
```

> En este curso usamos **SauceDemo**, que expone atributos `data-test`
> (`[data-test="username"]`), por eso los verás mucho. En sitios sin `data-test`,
> prioriza `getByRole`.

---

## 3. Cómo OBTENER un locator (3 herramientas)

### A) Pick Locator en VS Code (la más fácil)

Con la extensión **Playwright Test for VSCode**:

1. Corre un test en modo debug o abre el panel de Playwright.
2. Pulsa **"Pick locator"**.
3. Señala el elemento en el navegador → la extensión te **sugiere el mejor
   locator** y lo copia.

### B) Codegen (graba y genera código)

```bash
npm run codegen
# o apuntando a una URL:
npx playwright codegen https://www.saucedemo.com
```

Haz clics reales: Playwright **genera el código** con buenos locators. Ideal para
descubrir el selector correcto y aprender por imitación.

### C) DevTools del navegador (entender el HTML)

1. Clic derecho sobre el elemento → **Inspeccionar**.
2. Mira si tiene: un **rol** (button, link…), un **texto**, un `aria-label`, un
   `<label>` asociado, o un `data-test`/`id`.
3. Elige el locator de mayor prioridad disponible (sección 2).

> Truco: en la consola de DevTools, `document.querySelectorAll('[data-test]')`
> lista los atributos de prueba disponibles.

---

## 4. Verificar un locator antes de usarlo

En **UI mode** (`npm run test:ui`) o con el Inspector (`--debug`) puedes probar
el locator en vivo. En código, para depurar:

```ts
const boton = page.getByRole('button', { name: 'Login' });
console.log(await boton.count()); // ¿cuántos coinciden? (debería ser 1)
await boton.highlight(); // resáltalo en el navegador (modo headed/debug)
```

Si `count()` es 0 → el locator no encuentra nada. Si es >1 → es ambiguo (ver §6).

---

## 5. Afinar locators: filtrar y encadenar

Cuando hay varios elementos parecidos:

```ts
// Dentro de un contenedor concreto
const fila = page.getByRole('row', { name: 'Sauce Labs Backpack' });
await fila.getByRole('button', { name: 'Add to cart' }).click();

// Filtrar por texto que contiene
page.getByRole('listitem').filter({ hasText: 'Backpack' });

// Elegir por posición (úsalo poco: es frágil)
page.locator('.inventory_item').first();
page.locator('.inventory_item').nth(2);
```

> Encadenar (`contenedor.getByRole(...)`) es mucho más robusto que un selector
> CSS largo.

---

## 6. "strict mode": cuando el locator es ambiguo

Playwright trabaja en **modo estricto**: si un locator coincide con **más de un**
elemento, falla con `strict mode violation`. Es a propósito, para que no toques
el elemento equivocado.

Solución: **sé más específico** (añade `name`, filtra por contenedor o texto),
en vez de usar `.first()` a ciegas.

```ts
// ❌ Falla si hay varios botones "Add to cart"
await page.getByRole('button', { name: 'Add to cart' }).click();

// ✅ Acota al producto correcto
await page
  .getByRole('listitem')
  .filter({ hasText: 'Sauce Labs Backpack' })
  .getByRole('button', { name: 'Add to cart' })
  .click();
```

---

## 7. Errores frecuentes

| Síntoma                         | Causa / solución                                       |
| ------------------------------- | ------------------------------------------------------ |
| `Timeout` esperando el elemento | Locator que no existe; verifícalo con Pick Locator/UI. |
| `strict mode violation`         | Coincide con varios; acota con `name`/`filter`.        |
| El test se rompe al cambiar CSS | Usabas un selector estructural; cambia a `getByRole`.  |
| Texto no coincide               | Copia el texto exacto; ojo con tildes y mayúsculas.    |

---

## 8. Checklist al elegir un locator

- [ ] ¿Puedo usar `getByRole` con un `name`? (primera opción)
- [ ] Si es un campo, ¿tiene `<label>`/placeholder? (`getByLabel`/`getByPlaceholder`)
- [ ] ¿El sitio expone `data-test`/`testId`? (mejor que CSS)
- [ ] ¿Evité selectores basados en estructura/clases volátiles?
- [ ] ¿`count()` da exactamente 1?

---

## 9. Mini-cheatsheet

```ts
page.getByRole('button', { name: 'Login' }); // por rol + nombre accesible
page.getByLabel('Contraseña'); // por etiqueta de formulario
page.getByPlaceholder('Username'); // por placeholder
page.getByText('Productos'); // por texto visible
page.getByTestId('login-button'); // por data-testid
page.locator('[data-test="username"]'); // por atributo (SauceDemo)
locator.filter({ hasText: 'Backpack' }); // filtrar
contenedor.getByRole('button', { name: '...' }); // encadenar (robusto)
```

---

<sub>📚 <a href="../README.md">Índice de documentación</a> · <a href="../../README.md">Inicio del repositorio</a></sub>
