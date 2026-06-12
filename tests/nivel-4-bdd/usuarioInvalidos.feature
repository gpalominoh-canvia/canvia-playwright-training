  
  # language: es
  
    Característica: Cierre de sesión
    Como usuario de SauceDemo
    Quiero iniciar sesión en la aplicación
    Para acceder al inventario de productos
    Antecedentes:

    Dado que estoy en la página de login
    Esquema del escenario: Validación de usuarios inválidos
    Cuando inicio sesión con usuario "<usuario>" y contraseña "<contrasena>"
    Entonces debería ver el mensaje de error "<mensaje>"


    Ejemplos:

      | usuario         | contrasena      | mensaje                                                                     |
      | usuario_falso   | secret_sauce    | Epic sadface: Username and password do not match any user in this service   |
      | standard_user   | clave_incorrecta| Epic sadface: Username and password do not match any user in this service   |
