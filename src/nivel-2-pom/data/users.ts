/**
 * Datos de prueba. Las credenciales pueden venir de variables de entorno
 * (.env) y, si no, usan los valores públicos del sitio de práctica SauceDemo.
 */
export const users = {
  standard: {
    username: process.env.TEST_USERNAME ?? 'standard_user',
    password: process.env.TEST_PASSWORD ?? 'secret_sauce',
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'usuario_invalido',
    password: 'clave_incorrecta',
  },
} as const;
