# language: es
@carrito
Característica: Carrito de compras
  Como usuario de SauceDemo
  Quiero agregar productos al carrito
  Para validar mi selección antes de comprar

  Antecedentes:
    Dado que estoy en la página de login
    Cuando inicio sesión con usuario "standard_user" y contraseña "secret_sauce"

  Escenario: Agregar un producto al carrito
    Cuando agrego el producto "Sauce Labs Backpack" al carrito
    Entonces el badge del carrito debería mostrar "1"