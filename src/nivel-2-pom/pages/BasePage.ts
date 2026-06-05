import { Page } from '@playwright/test';

/**
 * Clase base para todos los Page Objects.
 * Centraliza la referencia a la `Page` y acciones comunes de navegación.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /** Navega a una ruta relativa a la baseURL configurada. */
  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  /** Devuelve el título de la página actual. */
  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
