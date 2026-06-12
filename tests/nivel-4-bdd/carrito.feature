# language: es
@carrito
Característica: Carrito de compras
  Como usuario autenticado en SauceDemo
  Quiero agregar productos al carrito
  Para luego comprarlos

  Antecedentes:
    Dado que estoy en la página de login
    Cuando inicio sesión con usuario "standard_user" y contraseña "secret_sauce"
    Entonces debería ver la página de inventario

  Escenario: Agregar un producto al carrito
    Cuando agrego "Sauce Labs Backpack" al carrito
    Entonces el contador del carrito debería mostrar "1"

  Escenario: Agregar varios productos al carrito
    Cuando agrego "Sauce Labs Backpack" al carrito
    Y agrego "Sauce Labs Bike Light" al carrito
    Entonces el contador del carrito debería mostrar "2"
