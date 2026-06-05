/**
 * Un Target es un elemento de la UI identificado por un nombre legible
 * y un selector. Encapsula los selectores fuera de tasks e interactions.
 *
 * Uso:
 *   const USERNAME = Target.the('campo usuario').locatedBy('[data-test="username"]');
 */
export class Target {
  private constructor(
    public readonly name: string,
    public readonly selector: string,
  ) {}

  static the(name: string): { locatedBy: (selector: string) => Target } {
    return {
      locatedBy: (selector: string) => new Target(name, selector),
    };
  }
}
