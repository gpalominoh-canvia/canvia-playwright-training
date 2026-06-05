import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import { Target } from '../core/Target';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/** Question: el texto visible de un elemento. */
export class TextOf implements Question<string> {
  private constructor(private readonly target: Target) {}

  static of(target: Target): TextOf {
    return new TextOf(target);
  }

  async answeredBy(actor: Actor): Promise<string> {
    const content = await actor.abilityTo(BrowseTheWeb).locate(this.target).textContent();
    return content?.trim() ?? '';
  }
}
