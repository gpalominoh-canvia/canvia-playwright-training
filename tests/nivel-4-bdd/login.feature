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

@invalid_credentials
  Esquema del escenario: Validación de credenciales inválidas
    Cuando inicio sesión con usuario "<usuario>" y contraseña "<contrasena>"
    Entonces debería ver el mensaje de error "Username and password do not match"

    Ejemplos:
      | usuario        | contrasena      |
      | usuario_x      | clave_y         |
      | otro_usuario   | otra_clave      |

  @logout
  Esquema del escenario: Logout después de iniciar sesión
    Dado inicio sesión con usuario "standard_user" y contraseña "secret_sauce"
    Cuando cierro sesión
    Entonces debería volver a la página de login

    
