/**
 * Configuración de Cucumber para el Nivel 4 (BDD).
 *
 * - `paths`: dónde están los archivos .feature (escenarios en Gherkin).
 * - `import`: dónde están los step definitions y el soporte (world, hooks).
 * - `format`: reportes de salida (resumen en consola + HTML).
 *
 * Se ejecuta con: npm run test:nivel-4
 * (usa tsx vía NODE_OPTIONS para entender TypeScript directamente).
 */
export default {
  paths: ['tests/nivel-4-bdd/**/*.feature'],
  import: ['src/nivel-4-bdd/**/*.ts'],
  format: ['summary', 'html:playwright-report/cucumber.html'],
  formatOptions: { snippetInterface: 'async-await' },
};
