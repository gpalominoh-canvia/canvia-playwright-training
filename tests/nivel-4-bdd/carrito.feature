# language: es
Característica: Carrito

  Antecedentes:
    Dado que estoy en la página de login
    Y inicio sesión con usuario "standard_user" y contraseña "secret_sauce"

  @carrito
  Esquema del escenario: Agregar un producto al carrito
    Dado que estoy en la página de inventario
    Cuando agrego el producto "Sauce Labs Backpack" al carrito
    Entonces el carrito debería mostrar 1 artículo