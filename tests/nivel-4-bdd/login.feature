# language: es
Característica: Inicio de sesión
  Como usuario de SauceDemo
  Quiero iniciar sesión en la aplicación
  Para acceder al inventario de productos

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

    Escenario: Logout exitoso
    Cuando inicio sesión con usuario "standard_user" y contraseña "secret_sauce"
    Y cierro sesión desde el menú lateral
    Entonces debería volver a la página de login

  Esquema del escenario: Validación de credenciales inválidas
    Cuando inicio sesión con usuario "<usuario>" y contraseña "<contrasena>"
    Entonces debería ver el mensaje de error "Username and password do not match"

  

    Ejemplos:
      | usuario        | contrasena      |
      | usuario_x      | clave_y         |
      | otro_usuario   | otra_clave      |
      | usuario_invalido | clave_incorrecta  |
