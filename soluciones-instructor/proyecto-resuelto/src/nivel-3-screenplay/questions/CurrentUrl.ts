import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * NIVEL 3 — Ejercicio 1 (Issue #4).
 * Question: la URL actual del navegador.
 */
export class CurrentUrl implements Question<string> {
  static value(): CurrentUrl {
    return new CurrentUrl();
  }

  async answeredBy(actor: Actor): Promise<string> {
    return actor.abilityTo(BrowseTheWeb).page.url();
  }
}
