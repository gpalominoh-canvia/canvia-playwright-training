import { Target } from '../core/Target';

/** Selectores de la página de inventario, como Targets reutilizables. */
export const InventoryPage = {
  TITLE: Target.the('título de la sección').locatedBy('.title'),
  ITEMS: Target.the('productos del inventario').locatedBy('.inventory_item'),
  CART_BADGE: Target.the('badge del carrito').locatedBy('[data-test="shopping-cart-badge"]'),
  ADD_PRODUCT_BUTTON: Target.the('botón de agregar al carrito').locatedBy(
    'button:has-text("Add to cart")',
  ),
  ADD_BACKPACK: Target.the('botón de agregar mochila al carrito').locatedBy(
    '[data-test="add-to-cart-sauce-labs-backpack"]',
  ),
  REMOVE_BACKPACK: Target.the('botón de remover mochila del carrito').locatedBy(
    '[data-test="remove-sauce-labs-backpack"]',
  ),
  MENU_BUTTON: Target.the('botón de menú').locatedBy('#react-burger-menu-btn'),
  LOGOUT_BUTTON: Target.the('botón de logout').locatedBy('#logout_sidebar_link'),
  PRICES_ITEMS: Target.the('precios de los productos').locatedBy(
    '[data-test="inventory-item-price"]',
  ),
  SORT_DROPDOWN: Target.the('dropdown de ordenamiento').locatedBy(
    '[data-test="product-sort-container"]',
  ),
};
