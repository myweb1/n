moviomiviento = {adelante: false, atras: false, izquierda: false, derecha: false};
const scene = new THREE.Scene();
scene.background = new THREE.Color("black");
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 3); // Set camera position to a more realistic height
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
function animate() {
    mover(); // Call the mover function to handle movement
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
var controls = new THREE.PointerLockControls(camera, renderer.domElement);
document.getElementById("showurid").addEventListener("click", function () {
    controls.lock();
});
controls.addEventListener("lock", function () {
    document.getElementById("content").style.display = "none";
    //linea completamente inesesaria pero completamente nesesaria
});
controls.addEventListener("unlock", function () {
    document.getElementById("content").style.display = "block";
    //linea completamente inesesaria pero completamente nesesaria
});
scene.add(controls.getObject());
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / (window.innerHeight - 100);
    //camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight - 100);
});

window.addEventListener("keydown", function (event) {
    switch (event.code) {
        case "KeyW":
            moviomiviento.adelante = true;
            break;
        case "KeyS":
            moviomiviento.atras = true;
            break;
        case "KeyA":
             moviomiviento.izquierda = true;
            break;
        case "KeyD":
            moviomiviento.derecha = true;
            break;
        case "Space":
            controls.getObject().position.y += 0.1; // get up
            break;
        case "ShiftLeft":
            controls.getObject().position.y -= 0.1; // get down
            break;
    }
});
window.addEventListener("keyup", function (event) {
    switch (event.code) {
        case "KeyW":
            moviomiviento.adelante = false;
            break;
        case "KeyS":
            moviomiviento.atras = false;
            break;
        case "KeyA":
             moviomiviento.izquierda = false;
            break;
        case "KeyD":
            moviomiviento.derecha = false;
            break;
    }
});
function mover() {
    const speed = 1; // Adjust the speed as needed
    if (moviomiviento.adelante) {
        controls.moveForward(speed);
    }
    if (moviomiviento.atras) {
        controls.moveForward(-speed);
    }
    if (moviomiviento.izquierda) {
        controls.moveRight(-speed);
    }
    if (moviomiviento.derecha) {
        controls.moveRight(speed);
    }
    
}
var mapa = 
[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,0,0,1,1,1,0,0,0,1,1],
[1,0,1,1,1,1,0,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
[1,0,1,0,0,0,0,1,0,1,0,1,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
[1,0,0,0,1,1,1,1,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,1,1,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,0,1,1,1,1],
[1,0,1,0,1,0,1,1,1,1,0,1,1,1,1,0,1,0,0,0,0,0,0,0,0,1],
[1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,1,1,1],
[0,0,0,0,1,0,1,0,0,1,1,1,0,1,1,0,1,0,0,0,1,0,0,1,0,0],
[1,0,1,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1],
[1,0,1,0,0,0,0,0,1,1,1,0,1,1,1,0,0,0,1,0,0,0,0,0,0,1],
[1,0,1,1,1,1,0,1,1,0,0,0,0,0,1,1,1,1,1,0,1,1,1,1,1,1],
[1,0,1,0,0,0,0,0,0,0,1,1,1,0,1,0,0,0,0,0,0,1,0,0,0,1],
[1,0,1,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,1,0,1,0,1],
[1,0,0,0,0,0,0,0,0,0,1,1,1,0,1,0,0,0,0,1,0,1,0,1,0,1],
[1,0,1,1,1,1,0,1,0,1,0,0,1,0,1,1,1,1,0,1,0,0,0,1,0,1],
[1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
for (let i = 0; i < mapa.length; i++) {
    for (let j = 0; j < mapa[i].length; j++) {
        if (mapa[i][j] === 1) {
            const wallGeometry = new THREE.BoxGeometry(1, 10, 1);
            const wallMaterial = new THREE.MeshBasicMaterial({ color: "grey" });
            const wall = new THREE.Mesh(wallGeometry, wallMaterial);
            wall.position.set(j - mapa[i].length / 2 + 0.5, 0.5, i - mapa.length / 2 + 0.5);
            scene.add(wall);
        }
    }
}
var piso = new THREE.Mesh(
    new THREE.PlaneGeometry(mapa[0].length, mapa.length),
    new THREE.MeshBasicMaterial({ color: "green", side: THREE.DoubleSide })
);
piso.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal// ok
scene.add(piso);