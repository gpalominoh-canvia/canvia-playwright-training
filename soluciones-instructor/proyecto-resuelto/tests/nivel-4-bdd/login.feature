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

  # Ejercicio 1: escenario de logout que reutiliza el step de login (ejercicio 5).
  Escenario: Cierre de sesión
    Cuando inicio sesión con usuario "standard_user" y contraseña "secret_sauce"
    Y cierro sesión
    Entonces debería volver a la página de login

  # Ejercicio 3: Scenario Outline. El mensaje también se parametriza para cubrir
  # los casos de campo requerido (que devuelven un mensaje distinto).
  Esquema del escenario: Mensajes según credencial inválida o faltante
    Cuando inicio sesión con usuario "<usuario>" y contraseña "<contrasena>"
    Entonces debería ver el mensaje de error "<error>"

    Ejemplos:
      | usuario       | contrasena   | error                              |
      | usuario_x     | clave_y      | Username and password do not match |
      | otro_usuario  | otra_clave   | Username and password do not match |
      |               | secret_sauce | Username is required               |
      | standard_user |              | Password is required               |
