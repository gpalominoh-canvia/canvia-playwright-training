# language: es
Característica: Cierre de sesión
  Como usuario de SauceDemo
  Quiero cerrar sesión en la aplicación
  Para salir de la pagina inventario

  Antecedentes:
    Dado que estoy en la página de inventario

    Escenario: Cierre de sesión exitoso desde la pagina inventario
    Cuando Cuando el usuario hace clic en el botón de "Logout"
    Entonces el usuario es redirigido automáticamente a la página de login