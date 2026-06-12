/**
 * Configuración de Cucumber por perfiles.
 *
 * - `paths`: dónde están los archivos .feature (escenarios en Gherkin).
 * - `import`: dónde están los step definitions y el soporte (world, hooks).
 * - `format`: reportes de salida (resumen en consola + HTML).
 *
 * Cada nivel usa su propio perfil para que sus step definitions queden
 * aislados (si se cargaran juntos, los steps repetidos darían ambigüedad).
 * Usan tsx vía NODE_OPTIONS para entender TypeScript directamente.
 *
 * - Nivel 4 (BDD puro):        npm run test:nivel-4    (perfil `default`)
 * - Nivel 4.1 (BDD+Screenplay): npm run test:nivel-4.1 (perfil `nivel41`)
 */
const comun = {
  formatOptions: { snippetInterface: 'async-await' },
};

// Perfil por defecto: Nivel 4 — BDD con step definitions sobre la página.
export default {
  ...comun,
  paths: ['tests/nivel-4-bdd/**/*.feature'],
  import: ['src/nivel-4-bdd/**/*.ts'],
  format: ['summary', 'html:playwright-report/cucumber.html'],
};

// Perfil Nivel 4.1: los mismos escenarios, pero los steps delegan en un
// Actor de Screenplay (reutiliza el framework del Nivel 3).
export const nivel41 = {
  ...comun,
  paths: ['tests/nivel-4.1-bdd-screenplay/**/*.feature'],
  import: ['src/nivel-4.1-bdd-screenplay/**/*.ts'],
  format: ['summary', 'html:playwright-report/cucumber-nivel-4.1.html'],
};
