# language: es
@carrito
Característica: Carrito de compras
  Como usuario de SauceDemo
  Quiero agregar productos al carrito
  Para validar que se muestre correctamente en badge

  Antecedentes:
    Dado que estoy en la pagina de inventario
    
    Escenario: Agregar productos al carrito
    Cuando Cuando agrego el producto "Sauce Labs Bolt T-Shirt"
    Entonces deberia ver el icono del carrito con el número "1"
    