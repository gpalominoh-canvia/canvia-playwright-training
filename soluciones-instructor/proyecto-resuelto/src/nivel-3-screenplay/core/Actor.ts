import { Ability } from './Ability';
import type { Performable } from './Performable';
import type { Question } from './Question';

/** Tipo del constructor de una habilidad (la clase en sí). */
export type AbilityClass<T extends Ability> = (new (...args: never[]) => T) & {
  name: string;
};

/**
 * El Actor es el centro del patrón Screenplay: representa a un usuario con
 * ciertas habilidades, que intenta realizar tareas y hace preguntas al sistema.
 */
export class Actor {
  private readonly abilities = new Map<AbilityClass<Ability>, Ability>();

  private constructor(public readonly name: string) {}

  /** Crea un actor con nombre. Ej: Actor.named('Giancarlo'). */
  static named(name: string): Actor {
    return new Actor(name);
  }

  /** Otorga una o más habilidades al actor. */
  whoCan(...abilities: Ability[]): this {
    for (const ability of abilities) {
      this.abilities.set(ability.constructor as unknown as AbilityClass<Ability>, ability);
    }
    return this;
  }

  /** Recupera una habilidad concreta o falla si el actor no la tiene. */
  abilityTo<T extends Ability>(ability: AbilityClass<T>): T {
    const found = this.abilities.get(ability);
    if (!found) {
      throw new Error(`${this.name} no tiene la habilidad "${ability.name}".`);
    }
    return found as T;
  }

  /** Ejecuta en orden las tareas/interacciones indicadas. */
  async attemptsTo(...activities: Performable[]): Promise<void> {
    for (const activity of activities) {
      await activity.performAs(this);
    }
  }

  /** Hace una pregunta al sistema y devuelve su respuesta. */
  async asksFor<T>(question: Question<T>): Promise<T> {
    return question.answeredBy(this);
  }
}
