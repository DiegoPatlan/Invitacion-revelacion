// MÚSICA DE FONDO

const musica = document.getElementById("musicaFondo");
const btnMusica = document.getElementById("btnMusica");
const btnAbrirInvitacion = document.getElementById("btnAbrir");

musica.volume = 0.5;

// Iniciar música al abrir la invitación
btnAbrirInvitacion.addEventListener("click", function () {

    musica.currentTime = 0;

    musica.play()
        .then(() => {
            btnMusica.classList.add("musica-activa");
            btnMusica.textContent = "♫";
            btnMusica.setAttribute("aria-label", "Pausar música");
            console.log("Música iniciada correctamente");
        })
        .catch((error) => {
            console.error("Error al reproducir música:", error);
        });

});

// Pausar o reproducir
btnMusica.addEventListener("click", function () {

    if (musica.paused) {
        musica.play()
            .then(() => {
                btnMusica.classList.add("musica-activa");
                btnMusica.setAttribute("aria-label", "Pausar música");
            })
            .catch(error => console.error(error));
    } else {
        musica.pause();
        btnMusica.classList.remove("musica-activa");
        btnMusica.setAttribute("aria-label", "Reproducir música");
    }

});