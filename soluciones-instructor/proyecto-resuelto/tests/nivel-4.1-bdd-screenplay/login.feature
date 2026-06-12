# language: es
Característica: Inicio de sesión (BDD + Screenplay)
  Como usuario de SauceDemo
  Quiero iniciar sesión en la aplicación
  Para acceder al inventario de productos

  # Mismos escenarios que el Nivel 4, pero los steps delegan en un Actor de
  # Screenplay en lugar de manipular la página directamente.

  Antecedentes:
    Dado que estoy en la página de login

  Escenario: Login exitoso con usuario estándar
    Cuando inicio sesión con usuario "standard_user" y contraseña "secret_sauce"
    Entonces debería ver la página de inventario

  Escenario: Login con credenciales inválidas
    Cuando inicio sesión con usuario "usuario_invalido" y contraseña "clave_incorrecta"
    Entonces debería ver el mensaje de error "Username and password do not match"

  Escenario: Login con usuario bloqueado
    Cuando inicio sesión con usuario "locked_out_user" y contraseña "secret_sauce"
    Entonces debería ver el mensaje de error "Sorry, this user has been locked out"

  # Ejercicio 4: la aserción se hace con una Question (CurrentUrl), no leyendo
  # this.page directamente.
  Escenario: La URL del inventario tras iniciar sesión
    Cuando inicio sesión con usuario "standard_user" y contraseña "secret_sauce"
    Entonces la URL debería contener "/inventory.html"

  # Ejercicio 3: logout reutilizando la Task Logout del Nivel 3.
  Escenario: Cierre de sesión
    Cuando inicio sesión con usuario "standard_user" y contraseña "secret_sauce"
    Y cierro sesión
    Entonces debería estar en la página de login
