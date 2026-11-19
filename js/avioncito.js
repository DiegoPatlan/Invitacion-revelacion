
// AVIONCITO VIAJERO

const avion = document.getElementById("avioncitoViajero");
const botonAbrir = document.getElementById("btnAbrir");

let vueloActivo = false;
let temporizadorVuelo;

avion.style.display = "none";

function moverAvion() {
    if (!vueloActivo) return;

    const ancho = avion.offsetWidth;
    const alto = avion.offsetHeight;

    const maxX = Math.max(0, window.innerWidth - ancho);
    const maxY = Math.max(0, window.innerHeight - alto);

    const nuevaX = Math.random() * maxX;
    const nuevaY = Math.random() * maxY;

    const actualX = parseFloat(avion.style.left) || 0;
    const actualY = parseFloat(avion.style.top) || 0;

    const diferenciaX = nuevaX - actualX;
    const diferenciaY = nuevaY - actualY;

    // Calcular la dirección real del vuelo
    const angulo = Math.atan2(diferenciaY, diferenciaX) * (180 / Math.PI);

    avion.style.transform = `rotate(${angulo}deg)`;
    avion.style.left = nuevaX + "px";
    avion.style.top = nuevaY + "px";

    // Siguiente destino al terminar el desplazamiento
    temporizadorVuelo = setTimeout(moverAvion, 4000);
}

botonAbrir.addEventListener("click", function () {
    setTimeout(function () {
        if (vueloActivo) return;

        vueloActivo = true;
        avion.style.display = "block";

        avion.style.transition = "none";
        avion.style.left = "50px";
        avion.style.top = "100px";

        // Permitir que el navegador aplique la posición inicial
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                avion.style.transition =
                    "left 4s linear, top 4s linear, transform 4s linear";

                moverAvion();
            });
        });

    }, 850);
});

window.addEventListener("resize", function () {
    if (vueloActivo) {
        clearTimeout(temporizadorVuelo);
        moverAvion();
    }
});


