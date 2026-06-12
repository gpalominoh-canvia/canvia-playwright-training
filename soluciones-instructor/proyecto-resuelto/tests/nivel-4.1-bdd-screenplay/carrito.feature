# language: es
@carrito
Característica: Carrito (BDD + Screenplay)
  Como usuario autenticado
  Quiero agregar productos al carrito
  Para comprarlos después

  # Ejercicio 2 (Issue #35): feature resuelta con la Task AddProductToCart y la
  # Question CartBadgeCount del Nivel 3. Los steps no llevan selectores.
  # Ejecutar solo carrito: npm run test:nivel-4.1 -- --tags @carrito

  Antecedentes:
    Dado que estoy en la página de login
    Cuando inicio sesión con usuario "standard_user" y contraseña "secret_sauce"

  Escenario: Agregar la mochila al carrito
    Cuando agrego la mochila al carrito
    Entonces el contador del carrito debería ser "1"
