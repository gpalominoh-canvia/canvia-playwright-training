# Guía de buenas prácticas en automatización

Reglas prácticas para escribir pruebas **estables, legibles y mantenibles**.
Es la guía que más se aplica durante la revisión de los Pull Requests.

---

## 1. Localizadores (selectores)

**Prioridad recomendada** (de más a menos robusto):

1. Rol accesible: `page.getByRole('button', { name: 'Login' })`
2. Etiqueta/placeholder/texto: `getByLabel`, `getByPlaceholder`, `getByText`
3. Atributo de test dedicado: `[data-test="username"]`
4. CSS/XPath estructural ⚠️ (último recurso, frágil)

```ts
// ✅ Robusto y legible
await page.getByRole('button', { name: 'Agregar al carrito' }).click();

// ❌ Frágil: se rompe si cambia el layout o las clases
await page.locator('div.col-3 > button.btn-primary:nth-child(2)').click();
```

> Regla: el selector debe describir **qué es** el elemento, no **dónde está**.

---

## 2. Esperas: nunca uses tiempos fijos

Playwright tiene **auto-waiting**: las acciones y aserciones web-first esperan
solas a que el elemento esté listo.

```ts
// ✅ Espera inteligente (hasta que sea visible)
await expect(page.getByText('Bienvenido')).toBeVisible();

// ❌ Espera ciega: lento si sobra, flaky si falta
await page.waitForTimeout(3000);
```

Si necesitas esperar una condición concreta, usa `expect(...).toPass()` o
`page.waitForURL(...)`, nunca `waitForTimeout`.

---

## 3. Aserciones

- Usa **aserciones web-first** (`await expect(locator).toHaveText(...)`): se
  reintentan automáticamente.
- Una intención por aserción; mensajes claros.
- Evita aserciones sobre detalles volátiles (IDs autogenerados, timestamps).

```ts
await expect(page).toHaveURL(/inventory/);
await expect(page.locator('.title')).toHaveText('Products');
```

---

## 4. Independencia de los tests

- Cada test debe poder correr **solo y en cualquier orden**.
- No compartas estado entre tests (usa `beforeEach`/fixtures para preparar).
- No dependas de que "otro test ya hizo login".

```ts
test.beforeEach(async ({ loginPage }) => {
  await loginPage.open(); // estado limpio para cada test
});
```

---

## 5. Estructura y nombres

- Nombres **descriptivos del comportamiento**: `login exitoso redirige al inventario`.
- Agrupa con `test.describe` por funcionalidad.
- Un archivo por funcionalidad/página.
- Mantén el test corto: prepara → actúa → verifica.

---

## 6. Page Objects (Nivel 2)

- Selectores **privados** dentro del Page Object; el test no los conoce.
- Métodos que expresan acciones de negocio (`login`, `addToCart`).
- Los métodos **devuelven datos**; las **aserciones van en el test**.
- Reutiliza `BasePage` para lo común.

---

## 7. Datos de prueba

- No "hardcodees" credenciales en los tests: usa `src/.../data` y `.env`.
- Datos de prueba **deterministas** (evita aleatoriedad no controlada).
- Nunca subas datos sensibles reales al repositorio.

---

## 8. BDD / Gherkin (Nivel 4)

- Escenarios **declarativos** (qué), no imperativos (clics y selectores).
- Reutiliza steps; parametriza con `Scenario Outline`.
- Un escenario = un comportamiento de negocio observable.

---

## 9. Git y Pull Requests

- Ramas `feature/<nombre>-<tema>`; commits pequeños y en español.
- Que `typecheck` + `lint` pasen **antes** de subir (el hook de pre-commit
  ayuda; ver [configuracion-entorno](../00-inicio/configuracion-entorno.md)).
- PR pequeño y enfocado; describe el qué y el porqué.

---

## 10. Checklist rápido (antes de pedir revisión)

- [ ] Sin `waitForTimeout` ni esperas ciegas.
- [ ] Selectores por rol/`data-test`, no estructurales.
- [ ] Aserciones web-first y con intención clara.
- [ ] Tests independientes (corren solos y en cualquier orden).
- [ ] Sin credenciales hardcodeadas.
- [ ] `npm run lint` y `npm run typecheck` en verde.

---

<sub>📚 <a href="../README.md">Índice de documentación</a> · <a href="../../README.md">Inicio del repositorio</a></sub>
