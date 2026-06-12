# language: es
@carrito
Característica: Carrito de compras
  Como usuario autenticado
  Quiero agregar productos al carrito
  Para comprarlos después

  # Ejercicio 2 (Issue #5): feature nueva con etiqueta @carrito.
  # Ejecutar solo estos escenarios: npm run test:nivel-4 -- --tags @carrito

  Antecedentes:
    Dado que estoy en la página de login
    Cuando inicio sesión con usuario "standard_user" y contraseña "secret_sauce"

  Escenario: Agregar un producto al carrito
    Cuando agrego el producto "Sauce Labs Backpack" al carrito
    Entonces el contador del carrito debería mostrar "1"
