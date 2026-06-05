import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import { Target } from '../core/Target';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/** Question: la cantidad de elementos que coinciden con un Target. */
export class CountOf implements Question<number> {
  private constructor(private readonly target: Target) {}

  static of(target: Target): CountOf {
    return new CountOf(target);
  }

  async answeredBy(actor: Actor): Promise<number> {
    return actor.abilityTo(BrowseTheWeb).locate(this.target).count();
  }
}
