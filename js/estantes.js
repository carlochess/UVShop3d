
function poblar() {
    var cuadro, contador = 0;
    // Importar el molde para los demas cuadros
    BABYLON.SceneLoader.ImportMesh("Cube.061", "babylon/", "super.babylon", scene, function(meshes) {
        cuadro = meshes[0];
        meshes[0].pickable = true;
        var p = [-10.5, -4, 5.3, 11];
        p.forEach(function(posicion) {
            poblarEstante({
                xmin: posicion + 1,
                xmax: posicion + 3.1,
                xdelta: 1.6, // entre estanterias 
                ymin: -2,
                ymax: 11,
                ydelta: 2.2, // entre cuadros
                zmin: 1.2,
                zmax: 3.1,
                zdelta: 1.8 // arriba abajo
            });
        });
    });


    function crearCuadro(posicion, numTextura, urlImg) {
        var m = cuadro.clone(numTextura.toString());
        m.name = "Cubo" + numTextura;
        m.position = posicion;
        
        var materialSphere3 = new BABYLON.StandardMaterial("texture" + numTextura, scene);
        materialSphere3.diffuseTexture = new BABYLON.Texture(urlImg, scene);
        materialSphere3.emissiveColor = new BABYLON.Color3(1, 1, 1);
        materialSphere3.diffuseTexture.wrapV = 0;
        materialSphere3.diffuseTexture.wrapU = 0;
        materialSphere3.diffuseTexture.vScale = -1;
        materialSphere3.diffuseTexture.uScale = -1;
        m.material = materialSphere3;
        
        //-----------------------------
        // Acciones
        //-----------------------------             

        m.actionManager = new BABYLON.ActionManager(scene);

        var onpickAction = new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            function(evt) {
                if (evt.meshUnderPointer) {
                    var meshClicked = evt.meshUnderPointer.material.diffuseTexture.name.split(".")[0];
                    loadXMLDoc(meshClicked);
                } else {
                    var meshClicked = evt.meshUnderPointer;
                    meshClicked.isVisible = false;
                }
            },
            false);

        m.actionManager.registerAction(onpickAction);

    }

    function poblarEstante(estante) {
        var i = 1;
        for (var x = estante.xmin; x < estante.xmax; x += estante.xdelta) {
            for (var y = estante.ymin; y < estante.ymax; y += estante.ydelta) {
                for (var z = estante.zmin; z < estante.zmax; z += estante.zdelta, i++) {
                    var imagen = completar(i);
                    crearCuadro(new BABYLON.Vector3(x, z, y), i, "assets/" + imagen + ".jpg");
                }
            }
        }
    }

    function completar(numero) {
        return (numero < 10) ? "00" + numero : "0" + numero;
    }
}