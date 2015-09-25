    var direccion = "http://www.uvshop.co/uvshop/";
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }

    function rederCarrito() {
        var galleta ="";
        if($.cookie("carritoCod"))
            galleta = $.trim(JSON.parse($.trim($.cookie("carritoCod"))));
        var codigos = [];
        console.log(galleta);
        if(galleta.length > 0){
            codigos = $.trim(galleta).split(" ");    
        }
        var $numeroDeElementos = codigos.length;
        $("#carrito").html('');
        if (parseInt($numeroDeElementos) < 3) {
            $('#carrito').css("height", 70 * (parseInt($numeroDeElementos) + 1));
        } else {
            $('#carrito').css("height", 210);
        }

        if (codigos.length > 0) {
            for (var i = $numeroDeElementos - 1; i >= 0; --i) {
                $("#carrito").append('<li class="producto">' + (i + 1) + ': Producto ' + codigos[i] + '</li>');
                $("#carrito li:last-child").css("background", "url('" + direccion + "imagenes/" + codigos[i] + "x50.jpg" + "') no-repeat left center");
                $("#carrito").append('<li class="divider"></li>');
            }
            actualizarContador($numeroDeElementos);
        } else {
            actualizarContador(0);
            $('#carrito').css("height", 70);
        }
        $("#carrito").append('<li class="divider"></li>');
        $("#carrito").append('<li class="verMas"><a href="' + direccion + 'pago/">Pagar</a></li>');
        console.log('Comprobando');
        if(typeof activarPago == 'function' && $numeroDeElementos > 0)
        {
            console.log('existeFuncion');
            activarPago(true, true);
        }
        else
        {
            console.log("no activado");
        }
    }

    function actualizarContador($con) {
        $(".notification-counter").text($con);
        $(".notification-counter").animate({
                "top": "-=10px"
            },
            "fast");
        $(".notification-counter").animate({
                "top": "+=10px"
            },
            "fast");
    }

    function eliminarElemento(str, pos) {
        var res = str.split(" ");
        var resultado = "";
        for (var i = 0; i < res.length; i++) {
            if (i != pos) {
                resultado += res[i] + " ";
            }
        }
        return resultado;
    }

    // FunciÃ³n que,agrega una X si el mouse esta sobre algÃºn objeto del carrito
    $(document).on({
        mouseenter: function() {
            $(this).append('<b class="remover">X</b>');
            var $item = $(this);
            $(".remover").on("click", function() {
                var $cookieCod = $.trim(JSON.parse($.cookie("carritoCod")));
                var posicion = $item.text().indexOf(':');
                $.cookie("carritoCod", JSON.stringify(eliminarElemento($cookieCod, parseInt($item.text().substring(0, posicion)) - 1).trim()), {
                    expires: 7,
                    path: '/'
                });
                rederCarrito();
            });
        },
        mouseleave: function() {
            $(this).find("b").remove();
        }
    }, ".producto");

    $(".cantidad").keyup(function() {
        var $cantidad = parseInt($(this).val(), 10);
        var $precio = parseFloat($(this).closest("table").find(".valor").text(), 10);
        $(this).closest(".item").find(".text-right").text($cantidad * $precio);
    });

    $(".borrar").click(function() {
        $(this).closest('.item').remove();
    });

    $('.dropdown-menu').click(function(e) {
        e.stopPropagation();
    });
    //-------------------------
    // Cuando hacen click en el botÃ³n "Comprar"
    $("#agregarCarrito").click(function() {
        var $data = $("#codigo").text();

        if ($.cookie("carritoCod")) {
            var $cookieCod = $.trim(JSON.parse($.cookie("carritoCod")));
            $.cookie("carritoCod", JSON.stringify($cookieCod + ' ' + $data), {
                expires: 7,
                path: '/'
            });
        } else {
            $.cookie("carritoCod", JSON.stringify($data), {
                expires: 7,
                path: '/'
            });
        }
        rederCarrito();
    });
    
//});
