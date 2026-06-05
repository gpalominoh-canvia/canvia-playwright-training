import type { Actor } from './Actor';

/**
 * Algo que un actor puede "realizar": tanto Interactions (atómicas)
 * como Tasks (composición de varias acciones) implementan esta interfaz.
 */
export interface Performable {
  performAs(actor: Actor): Promise<void>;
}
