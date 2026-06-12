import { Target } from '../core/Target';

/** Selectores de la página de inventario, como Targets reutilizables. */
export const InventoryPage = {
  TITLE: Target.the('título de la sección').locatedBy('[data-test="title"]'),
  ITEMS: Target.the('productos del inventario').locatedBy('[data-test="inventory-item"]'),
  CART_BADGE: Target.the('Badge del carrito').locatedBy('[data-test="shopping-cart-badge"]'),
  ADD_BACKPACK: Target.the('boton agregar carrito').locatedBy(
    '[data-test="add-to-cart-sauce-labs-backpack"]',
  ),
  REMOVE_BACKPACK: Target.the('boton quitar del carrito').locatedBy(
    '[data-test="remove-sauce-labs-backpack"]',
  ),
  SORT_DROPDOWN: Target.the('dropdown de ordenación').locatedBy(
    '[data-test="product-sort-container"]',
  ),
  PRICES: Target.the('precios de los productos').locatedBy('[data-test="inventory-item-price"]'),
  //Locators de logout
  MENU_BUTTON: Target.the('botón menú').locatedBy('#react-burger-menu-btn'),
  LOGOUT_BUTTON: Target.the('botón logout').locatedBy('#logout_sidebar_link'),
};
