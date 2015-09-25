<!--http://jsfiddle.net/6enub6jq/1/-->
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Supermercado</title>
    <link href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet" type="text/css">
    <link href="css/carrito.css" rel="stylesheet" type="text/css">
</head>
<body>
  	<canvas id="renderCanvas"></canvas>
  	<!-- Información producto -->
	<img id="cerrar" src="http://www.balneariodeparacuellos.com/html/images/btn_cerrar.png"/>
	<div id="msg">
		<span id="imagen"></span>
		<div id="codigo"></div>
		<div id="nombre"></div>
		<div id="descripcion"></div>
		<div id="empresa_fab"></div>
		<div id="iva"></div>
		<button id="agregarCarrito" class="btn btn-danger">Agregar al carrito</button>
	</div>
	<!-- Producto -->
	<!-- Carrito de compras -->
    <ul id="carro">
        <li class="dropdown"> 
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <ul class="circulo">
                    <li class="notification-container">
                        <i class="fa fa-shopping-cart fa-lg"></i>
                        <span class="notification-counter">0</span>
                    </li>
                 </ul>
            </a>
            <ul class="dropdown-menu" id="carrito">
                <li class="divider"></li>
                <li><a href="#">Comprar</a></li>
            </ul>
        </li>
    </ul>
	<!--Carrito -->
 </body>
 <script src="js/babylon.js"></script>
 <script src="js/hand.minified-1.2.js"></script>
 <script src="js/cannon.js"></script>
 <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.1/jquery.min.js"></script>
 <script src="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.2.1/js/bootstrap.min.js"></script>
 <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.0/jquery.cookie.js"></script>
 <script src="js/carrito.js"></script>
 <script src="js/supermercado.js"></script>
 <script src="js/estantes.js"></script>
</html>
