function loadXMLDoc(c) {
    var codigo = c.split("/")[1];
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var info = JSON.parse(xmlhttp.responseText)[0];
            document.getElementById("msg").style.visibility = 'visible';
            document.getElementById("cerrar").style.visibility = 'visible';
            document.getElementById("agregarCarrito").style.visibility = 'visible';
            document.getElementById("imagen").innerHTML = '<img src="http://uvshop.co/imagenes/' + info.id_prod + 'x200.jpg">';
            document.getElementById("codigo").innerHTML = info.id_prod;
            document.getElementById("nombre").innerHTML = info.nombre;
            document.getElementById("descripcion").innerHTML = info.descripcion;
            document.getElementById("empresa_fab").innerHTML = info.empresa_fab;
            document.getElementById("iva").innerHTML = info.iva;
        }
    }
    xmlhttp.open("GET", "info.php?codigo=" + codigo, true);
    xmlhttp.send();
}
document.getElementById("cerrar").onclick = function() {
    document.getElementById("msg").style.visibility = 'hidden';
    document.getElementById("cerrar").style.visibility = 'hidden';
    document.getElementById("agregarCarrito").style.visibility = 'hidden';
}

function mostrarFormasDePago(){
    document.getElementById("msg").style.visibility = 'visible';
    document.getElementById("cerrar").style.visibility = 'visible';
    document.getElementById("imagen").innerHTML = '<img src="http://bachata24k.com/wp-content/uploads/2014/03/es-broma.png">';
    document.getElementById("codigo").innerHTML = "Llevatelo todo";
    document.getElementById("nombre").innerHTML = 'GRATIS';
    document.getElementById("descripcion").innerHTML = '';
    document.getElementById("empresa_fab").innerHTML = '';
    document.getElementById("iva").innerHTML = '';
    document.getElementById("iva").innerHTML = '';
    document.getElementById("agregarCarrito").style.visibility = 'hidden';
}

function activarPago(si, pago){
    var indicadorPago =(pago)?scene.getLastMeshByID("Pago"):scene.getLastMeshByID("Salida");
    if(!indicadorPago)
        console.log("Error al cargar indicador");
    else
    {
        indicadorPago.checkCollisions=si;
        indicadorPago.isVisible=si;
        if(pago && !si){
            mostrarFormasDePago();
        }
    }
}

if (BABYLON.Engine.isSupported()) {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    BABYLON.SceneLoader.Load("babylon/", "super.babylon", engine, function(newScene) {
        newScene.executeWhenReady(function() {
        	var myCam;
            if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
                myCam = new BABYLON.TouchCamera("TouchCamera", new BABYLON.Vector3(0, 4, -10), newScene);
            }else{
            	myCam = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 4, -10), newScene);
                myCam.onCollide = function(mesh){
                    if(mesh.id.localeCompare("Salida")==0){
                        activarPago(false, false);
                    }else if (mesh.id.localeCompare("Pago")==0){
                        activarPago(false, true);
                    }
                }
            }
            myCam.speed = 0.5;
            myCam.ellipsoid = new BABYLON.Vector3(1, 1.5, 1);
            myCam.keysUp.push(90); // Z
            myCam.keysUp.push(87); // W
            myCam.keysDown.push(83); // S
            myCam.keysLeft.push(65); // A
            myCam.keysLeft.push(81); // Q
            myCam.keysRight.push(69); // E
            myCam.keysRight.push(68); // D
            myCam.checkCollisions = true;
            myCam.applyGravity = true;
            myCam.attachControl(canvas);
            newScene.activeCamera = myCam;
            newScene.getLastMeshByID("Pago").checkCollisions=false;
            newScene.getLastMeshByID("Pago").isVisible=false;
            newScene.getLastMeshByID("Salida").checkCollisions=false;
            newScene.getLastMeshByID("Salida").isVisible=false;
            var skybox = BABYLON.Mesh.CreateBox("skyBox", 60.0, newScene);
            var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", newScene);
            skyboxMaterial.backFaceCulling = false;
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/skybox/cubemap", newScene); //skybox
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
            skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            skybox.material = skyboxMaterial;

            var ground = BABYLON.Mesh.CreatePlane("ground", 60.0, newScene);
            var materialPlan = new BABYLON.StandardMaterial("texturePlane", newScene);
            materialPlan.diffuseTexture = new BABYLON.Texture("assets/baldosa.jpg", newScene);
            materialPlan.diffuseTexture.uScale = 5.0;
            materialPlan.diffuseTexture.vScale = 5.0;
            materialPlan.backFaceCulling = false;
            ground.material = materialPlan;
            ground.position = new BABYLON.Vector3(0, 0, 0);
            ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
            ground.checkCollisions = true;
            newScene.collisionsEnabled = true;
            newScene.gravity = new BABYLON.Vector3(0, -9.81, 0);
            scene = newScene;
            poblar();
            rederCarrito();
            engine.runRenderLoop(function() {
                scene.render();
            });
            window.addEventListener("resize", function() {
                engine.resize();
            });
        });
    }, function(progress) {

    });
}
