import { Target } from '../core/Target';

/** Selectores de la página de inventario, como Targets reutilizables. */
export const InventoryPage = {
  TITLE: Target.the('título de la sección').locatedBy('.title'),
  ITEMS: Target.the('productos del inventario').locatedBy('.inventory_item'),
};
