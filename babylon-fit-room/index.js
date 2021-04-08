var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true);

var modals = document.getElementsByClassName("modal");

for (let i = 0; i < modals.length; i++) {
    let modal = modals[i]
    modal.getElementsByClassName("close")[0].addEventListener('click', () => {
        modal.style.display = "none";
    })
}



var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'sphere' shape.
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    var sphere3 = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 3;
    sphere2.position.y = 1;
    sphere3.position.y = -1;

    openGrid(sphere, 'myModal', 3, scene)
    openGrid(sphere2, 'myModal2', 1, scene)
    openGrid(sphere3, 'myModal3', -1, scene)

    // Our built-in 'ground' shape.
    // var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);


    // document.getElementById('slide').addEventListener('click', () => {
    //     sphere = null
    //     var box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene)
    //     box.position.y = 3
    // })

    // document.getElementById('slide2').addEventListener('click', () => {
    //     sphere2 = null
    //     var box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene)
    //     box.position.y = 1
    // })

    // document.getElementById('slide3').addEventListener('click', () => {
    //     sphere3 = null
    //     var box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene)
    //     box.position.y = -1
    // })

    // addGUI()

    return scene;
};


var addGUI = () => {
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
        "UI"
    );

    var button1 = BABYLON.GUI.Button.CreateSimpleButton("but", "Check Out");
    button1.width = 0.2;
    button1.height = "40px";
    button1.cornerRadius = 0;
    button1.color = "Black";
    button1.thickness = 4;
    button1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    button1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    button1.scaleY = 1;
    button1.background = "White";
    button1.onPointerUpObservable.add(function () {
        modal.style.display = "block";
    });
    advancedTexture.addControl(button1);
}

var openGrid = (thing, id, sphereY, scene) => {
    thing.actionManager = new BABYLON.ActionManager(scene);

    thing.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction({
            trigger: BABYLON.ActionManager.OnPickTrigger,
        }, function () {
            const modal = document.getElementById(id)
            modal.style.display = "block"
            modal.querySelector('#cube').addEventListener('click', () => {
                thing.dispose()
                var box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene)
                box.position.y = sphereY
                openGrid(box, id, sphereY, scene)
            })
            modal.querySelector('#torus').addEventListener('click', () => {
                thing.dispose()
                var torus = BABYLON.MeshBuilder.CreateTorus("torus", { diameter: 2 }, scene);
                torus.position.y = sphereY
                openGrid(torus, id, sphereY, scene)
            })
        })
    );
}



var scene = createScene();

// run the render loop
engine.runRenderLoop(function () {
    scene.render();
});

// the canvas/window resize event handler
window.addEventListener('resize', function () {
    engine.resize();
});