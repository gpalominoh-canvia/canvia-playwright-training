# language: es
Característica: Cierre de sesión
  Como usuario autenticado en SauceDemo
  Quiero cerrar mi sesión
  Para salir de forma segura de la aplicación

  Antecedentes:
    Dado que estoy en la página de login
    Cuando inicio sesión con usuario "standard_user" y contraseña "secret_sauce"
    Entonces debería ver la página de inventario

  Escenario: El usuario cierra sesión desde el menú
    Cuando cierro sesión
    Entonces debería ver la página de login
