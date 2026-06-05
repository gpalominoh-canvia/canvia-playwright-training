import type { Actor } from './Actor';

/**
 * Una pregunta que el actor le hace al sistema y que devuelve un valor
 * de tipo T (texto, cantidad, URL, etc.) para usar en aserciones.
 */
export interface Question<T> {
  answeredBy(actor: Actor): Promise<T>;
}
