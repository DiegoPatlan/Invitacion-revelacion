
// MÚSICA DE FONDO

const musica = document.getElementById("musicaFondo");
const btnMusica = document.getElementById("btnMusica");
const btnAbrirInvitacion = document.getElementById("btnAbrir");

musica.volume = 0.5;

// Actualizar apariencia del botón
function actualizarBotonMusica() {
    if (musica.paused) {
        btnMusica.classList.remove("musica-activa");
        btnMusica.setAttribute("aria-label", "Reproducir música");
    } else {
        btnMusica.classList.add("musica-activa");
        btnMusica.setAttribute("aria-label", "Pausar música");
    }
}

// Iniciar música al abrir la invitación
btnAbrirInvitacion.addEventListener("click", async function () {
    try {
        musica.currentTime = 0;
        await musica.play();
        actualizarBotonMusica();
        console.log("Música iniciada correctamente");
    } catch (error) {
        console.error("No se pudo iniciar la música:", error);
    }
});

// Pausar o reproducir
btnMusica.addEventListener("click", async function () {
    try {
        if (musica.paused) {
            await musica.play();
        } else {
            musica.pause();
        }

        actualizarBotonMusica();
    } catch (error) {
        console.error("Error al controlar la música:", error);
    }
});
