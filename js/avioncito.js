
// AVIONCITO VIAJERO Y NUBES ALEATORIAS

const avion = document.getElementById("avioncitoViajero");
const botonAbrir = document.getElementById("btnAbrir");

let vueloActivo = false;
let temporizadorVuelo;
let nubesActivas = false;
let temporizadorNubes;

avion.style.display = "none";

// =====================================
// AVIONCITO VIAJERO
// =====================================

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

    const angulo = Math.atan2(diferenciaY, diferenciaX) * (180 / Math.PI);

    avion.style.transform = `rotate(${angulo}deg)`;
    avion.style.left = nuevaX + "px";
    avion.style.top = nuevaY + "px";

    temporizadorVuelo = setTimeout(moverAvion, 4000);
}

// =====================================
// NUBES ALEATORIAS
// =====================================


function crearNube() {
    if (!nubesActivas) return;

    const nube = document.createElement("img");

    const imagenesNubes = [
        "img/decoraciones/nubes.png",
        "img/decoraciones/nubepequeña.png"
    ];

    nube.src = imagenesNubes[
        Math.floor(Math.random() * imagenesNubes.length)
    ];

    nube.alt = "";
    nube.draggable = false;

    const ancho = window.innerWidth <= 600
        ? 65 + Math.random() * 55
        : 110 + Math.random() * 80;

    // Elegir aleatoriamente uno de los cuatro lados
    const lado = Math.floor(Math.random() * 4);

    let inicioX, inicioY, finalX, finalY;

    if (lado === 0) {
        // Izquierda hacia una zona aleatoria
        inicioX = -ancho - 30;
        inicioY = Math.random() * window.innerHeight;
        finalX = window.innerWidth + ancho;
        finalY = Math.random() * window.innerHeight;
    } else if (lado === 1) {
        // Derecha hacia una zona aleatoria
        inicioX = window.innerWidth + 30;
        inicioY = Math.random() * window.innerHeight;
        finalX = -ancho - 30;
        finalY = Math.random() * window.innerHeight;
    } else if (lado === 2) {
        // Desde arriba
        inicioX = Math.random() * window.innerWidth;
        inicioY = -ancho - 30;
        finalX = Math.random() * window.innerWidth;
        finalY = window.innerHeight + ancho;
    } else {
        // Desde abajo
        inicioX = Math.random() * window.innerWidth;
        inicioY = window.innerHeight + 30;
        finalX = Math.random() * window.innerWidth;
        finalY = -ancho - 30;
    }

    const duracion = 18000 + Math.random() * 22000;
    const movimientoX = (Math.random() - 0.5) * 180;
    const movimientoY = (Math.random() - 0.5) * 180;

    nube.style.position = "fixed";
    nube.style.width = ancho + "px";
    nube.style.height = "auto";
    nube.style.left = inicioX + "px";
    nube.style.top = inicioY + "px";
    nube.style.opacity = "0";
    nube.style.pointerEvents = "none";
    nube.style.zIndex = "1";
    nube.style.filter = "drop-shadow(0 3px 5px rgba(100, 75, 50, 0.08))";

    document.body.appendChild(nube);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            nube.style.transition =
                `left ${duracion}ms ease-in-out, top ${duracion}ms ease-in-out, opacity 2s ease`;

            nube.animate([
                {
                    transform: "translate(0, 0) rotate(-8deg) scale(0.9)"
                },
                {
                    transform: `translate(${movimientoX}px, ${movimientoY}px) rotate(8deg) scale(1.05)`
                },
                {
                    transform: "translate(0, 0) rotate(-5deg) scale(1)"
                }
            ], {
                duration: 5000 + Math.random() * 5000,
                iterations: Infinity,
                direction: "alternate",
                easing: "ease-in-out"
            });

            nube.style.opacity = "0.65";
            nube.style.left = finalX + "px";
            nube.style.top = finalY + "px";
        });
    });

    setTimeout(() => {
        nube.style.opacity = "0";
        setTimeout(() => nube.remove(), 2000);
    }, duracion);
}


function iniciarNubes() {
    if (nubesActivas) return;

    nubesActivas = true;

    crearNube();

    temporizadorNubes = setTimeout(function generarSiguiente() {
        if (!nubesActivas) return;

        crearNube();

        temporizadorNubes = setTimeout(
            generarSiguiente,
            4000 + Math.random() * 5000
        );
    }, 3000);
}

// =====================================
// ABRIR INVITACIÓN
// =====================================

botonAbrir.addEventListener("click", function () {
    setTimeout(function () {
        if (vueloActivo) return;

        vueloActivo = true;
        avion.style.display = "block";

        avion.style.transition = "none";
        avion.style.left = "50px";
        avion.style.top = "100px";

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                avion.style.transition =
                    "left 4s linear, top 4s linear, transform 4s linear";

                moverAvion();
            });
        });

        iniciarNubes();

    }, 850);
});

// =====================================
// AJUSTAR AL CAMBIAR EL TAMAÑO
// =====================================

window.addEventListener("resize", function () {
    if (vueloActivo) {
        clearTimeout(temporizadorVuelo);
        moverAvion();
    }
});
