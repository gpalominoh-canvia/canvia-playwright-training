# Nivel 3 — Patrón Screenplay

> Modelar las pruebas como el **comportamiento de un actor**: legibles como
> una narración del usuario y altamente componibles.

## Objetivos

- Entender las limitaciones del POM cuando el sistema crece.
- Conocer los componentes de Screenplay: Actor, Ability, Task, Interaction,
  Question, Target.
- Escribir tests que se lean como lenguaje de negocio.

## ¿Por qué Screenplay?

El POM tiende a generar clases "gordas" (un Page Object con decenas de
métodos). Screenplay aplica el principio de responsabilidad única: cada
acción es una pieza pequeña y reutilizable. El test describe **qué hace el
usuario**, no **cómo** se hace.

```ts
const actor = Actor.named('Giancarlo').whoCan(BrowseTheWeb.using(page));
await actor.attemptsTo(LoginAs.credentials('standard_user', 'secret_sauce'));
expect(await actor.asksFor(TextOf.of(InventoryPage.TITLE))).toBe('Products');
```

## Componentes (framework propio)

```
src/nivel-3-screenplay/
├── core/
│   ├── Actor.ts          # el usuario: tiene habilidades, intenta tareas, pregunta
│   ├── Ability.ts        # base de las habilidades
│   ├── Performable.ts    # interfaz de algo "realizable" (Task/Interaction)
│   ├── Question.ts       # interfaz de una pregunta que devuelve un valor
│   └── Target.ts         # elemento de UI (nombre + selector)
├── abilities/
│   └── BrowseTheWeb.ts   # envuelve la Page de Playwright
├── interactions/         # acciones atómicas
│   ├── Navigate.ts
│   ├── Enter.ts
│   └── Click.ts
├── tasks/
│   └── LoginAs.ts        # tarea de negocio (compone interactions)
├── questions/
│   ├── TextOf.ts
│   └── CountOf.ts
└── ui/                   # Targets (selectores) por página
    ├── LoginPage.ts
    └── InventoryPage.ts
```

### Glosario

| Concepto      | Rol                                                          |
|---------------|--------------------------------------------------------------|
| **Actor**     | Representa al usuario. Tiene habilidades, intenta tareas.     |
| **Ability**   | Lo que el actor puede hacer (ej. `BrowseTheWeb`).            |
| **Interaction**| Acción atómica (`Click`, `Enter`, `Navigate`).              |
| **Task**      | Composición de interactions con sentido de negocio (`LoginAs`).|
| **Question**  | Consulta el estado del sistema y devuelve un valor.          |
| **Target**    | Elemento de UI identificado por nombre + selector.           |

### Flujo

```
Actor.named(...).whoCan(Ability)
   .attemptsTo(Task -> [Interaction, Interaction, ...])
   .asksFor(Question) -> valor para aserción
```

## Ejecutar

```bash
npm run test:nivel-3
```

📄 Archivo de práctica: `tests/nivel-3-screenplay/login.spec.ts`

## Ejercicio del nivel

En una rama `feature/<tu-nombre>-nivel3`:

1. Crea una Question `CurrentUrl` que devuelva la URL actual.
2. Crea una Task `AddProductToCart` que agregue un producto.
3. Crea un test que use la nueva Task y valide con tus Questions.
4. Abre un PR a `develop`.

## POM vs Screenplay

| Aspecto          | POM                          | Screenplay                       |
|------------------|------------------------------|----------------------------------|
| Unidad principal | Página (clase)               | Acción/tarea del actor           |
| Legibilidad      | Buena                        | Muy alta (lenguaje de negocio)   |
| Reutilización    | Media (métodos por página)   | Alta (interactions/tasks atómicas)|
| Curva de aprendizaje | Baja                     | Media                            |
| Ideal para       | Proyectos medianos           | Suites grandes y equipos         |
