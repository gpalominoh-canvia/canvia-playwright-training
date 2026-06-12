import { Target } from '../core/Target';

/**
 * Selectores de la página de inventario, como Targets reutilizables.
 * Se amplía con los Targets que usan las piezas del Nivel 3 e Issue #27.
 */
export const InventoryPage = {
  TITLE: Target.the('título de la sección').locatedBy('.title'),
  ITEMS: Target.the('productos del inventario').locatedBy('.inventory_item'),
  SORT_DROPDOWN: Target.the('combo de orden').locatedBy('[data-test="product-sort-container"]'),
  PRICES: Target.the('precios del inventario').locatedBy('[data-test="inventory-item-price"]'),
  ADD_BACKPACK: Target.the('agregar mochila').locatedBy(
    '[data-test="add-to-cart-sauce-labs-backpack"]',
  ),
  REMOVE_BACKPACK: Target.the('quitar mochila').locatedBy(
    '[data-test="remove-sauce-labs-backpack"]',
  ),
  CART_BADGE: Target.the('badge del carrito').locatedBy('.shopping_cart_badge'),
};
