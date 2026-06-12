import { Target } from '../core/Target';

/** Selectores de la página de login, como Targets reutilizables. */
export const LoginPage = {
  USERNAME: Target.the('campo usuario').locatedBy('[data-test="username"]'),
  PASSWORD: Target.the('campo contraseña').locatedBy('[data-test="password"]'),
  LOGIN_BUTTON: Target.the('botón login').locatedBy('[data-test="login-button"]'),
  ERROR_MESSAGE: Target.the('mensaje de error').locatedBy('[data-test="error"]'),
  // Targets del menú lateral, usados por la Task Logout (Nivel 3 — reto).
  MENU_BUTTON: Target.the('botón menú').locatedBy('#react-burger-menu-btn'),
  LOGOUT_LINK: Target.the('link logout').locatedBy('#logout_sidebar_link'),
};
