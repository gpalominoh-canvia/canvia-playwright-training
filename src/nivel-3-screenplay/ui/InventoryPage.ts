import { Target } from '../core/Target';

/** Selectores de la pagina de inventario, como Targets reutilizables. */
export const InventoryPage = {
  TITLE: Target.the('titulo de la seccion').locatedBy('.title'),
  ITEMS: Target.the('productos del inventario').locatedBy('.inventory_item'),
  SORT_DROPDOWN: Target.the('selector de ordenamiento').locatedBy(
    '[data-test="product-sort-container"]',
  ),
  PRICES: Target.the('precios de productos').locatedBy('[data-test="inventory-item-price"]'),
  ADD_BACKPACK_BUTTON: Target.the('boton agregar mochila').locatedBy(
    '[data-test="add-to-cart-sauce-labs-backpack"]',
  ),
  REMOVE_BACKPACK_BUTTON: Target.the('boton quitar mochila').locatedBy(
    '[data-test="remove-sauce-labs-backpack"]',
  ),
  CART_BADGE: Target.the('badge del carrito').locatedBy('[data-test="shopping-cart-badge"]'),
};
