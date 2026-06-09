# Cómo responder un ejercicio (issue)

Cada nivel de la capacitación se publica como un **issue** en GitHub (etiqueta
`ejercicio`). El issue es el **enunciado compartido**: lo trabajan varios
participantes a la vez, así que **nunca se cierra con el PR de un alumno**. Tú
entregas tu propio Pull Request **ligado** al issue, y el instructor lo cierra
cuando el nivel termina.

> ¿Aún no tienes tu entorno? → [configuracion-entorno.md](configuracion-entorno.md).
> ¿Dudas con ramas/commits? → [git-workflow.md](../03-proceso/git-workflow.md).

---

## Regla de entrega: **1 PR por ejercicio**

El issue de cada nivel lista varios ejercicios (1, 2, 3… y un Reto). Cada
ejercicio se entrega en **su propia rama y su propio PR**. No mezcles varios
ejercicios en un mismo PR: una entrega = un ejercicio.

---

## Paso a paso

### 1. Toma el ejercicio en el issue

- Abre el issue de tu nivel y **asígnate** (botón _Assignees_ → tú mismo).
- Deja un **comentario** diciendo qué ejercicio tomas, p. ej.:
  > Tomo el ejercicio **3 (Logout)**.

Así nadie pisa tu trabajo y se ve quién resuelve qué.

### 2. Crea tu rama

Parte siempre de `develop` actualizado y nombra la rama con tu nombre, el nivel
y el **número de ejercicio**:

```bash
git checkout develop
git pull origin develop

git checkout -b feature/<nombre>-nivel<N>-ejercicio<NN>
# ej: feature/maria-nivel1-ejercicio03
```

> Usa el número con dos dígitos: `ejercicio01`, `ejercicio03`, `ejercicio05`.
> El Reto va como un ejercicio más (el último número del listado).

### 3. Trabaja y commitea ligando el issue

Commits pequeños, en español, **referenciando el issue** con `refs #<n>`:

```bash
git add .
git commit -m "test(nivel1): validar logout (refs #2)"
```

El `refs #2` enlaza tu commit con el issue del Nivel 1 sin cerrarlo.

### 4. Sube tu rama y abre el PR

```bash
git push -u origin feature/maria-nivel1-ejercicio03
# desde GitHub, o:  gh pr create --base develop
```

En la **descripción del PR** escribe `Refs #2` (el número de tu issue).

> ⚠️ **No uses `Closes #2` / `Fixes #2`.** Esas palabras cierran el issue para
> **todos** al mergear tu PR. El issue es compartido: solo `Refs`.

### 5. Pide revisión y resuelve dudas en el issue

- Las **dudas del ejercicio** van en los comentarios del **issue** (las ve todo
  el grupo), no por chat suelto.
- Los **comentarios de código** van en el **PR**.
- En la sesión de revisión conjunta veremos qué estuvo bien, qué falló y qué
  faltó; los acuerdos los aplicas en la misma rama y se actualiza el PR.

---

## Checklist antes de pedir revisión

- [ ] Me asigné el issue y comenté qué ejercicio tomo.
- [ ] La rama sigue `feature/<nombre>-nivel<N>-ejercicio<NN>`.
- [ ] Los commits referencian el issue con `refs #<n>`.
- [ ] El PR apunta a `develop` y dice `Refs #<n>` (no `Closes`).
- [ ] `npm run typecheck` y `npm run lint` pasan.
- [ ] Mis pruebas pasan localmente.

---

## Resumen

| Acción          | Dónde / Cómo                                              |
| --------------- | --------------------------------------------------------- |
| Tomar ejercicio | Asignarse el issue + comentar cuál                        |
| Rama            | `feature/<nombre>-nivel<N>-ejercicio<NN>` desde `develop` |
| Ligar al issue  | `refs #<n>` en commits y `Refs #<n>` en el PR             |
| Cerrar el issue | Lo hace el **instructor** al terminar el nivel            |

---

<sub>📚 <a href="../README.md">Índice de documentación</a> · <a href="ejercicios.md">Banco de ejercicios</a></sub>
</content>
</invoke>
