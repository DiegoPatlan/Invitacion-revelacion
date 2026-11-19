
// CONFIRMACIÓN DE ASISTENCIA

const formConfirmacion = document.getElementById("formConfirmacion");
const campoAcompanantes = document.getElementById("campoAcompanantes");
const selectorAcompanantes = document.getElementById("acompanantes");
const mensajeConfirmacion = document.getElementById("mensajeConfirmacion");
const btnEnviarConfirmacion = document.getElementById("btnEnviarConfirmacion");

// Mostrar u ocultar acompañantes según la respuesta
function actualizarAcompanantes() {
    const respuesta = document.querySelector(
        'input[name="asistencia"]:checked'
    );

    const asistira = respuesta && respuesta.value === "si";

    campoAcompanantes.style.display = asistira ? "block" : "none";

    if (!asistira) {
        selectorAcompanantes.value = "0";
    }
}

// Escuchar cambios en la respuesta
document.querySelectorAll('input[name="asistencia"]').forEach((opcion) => {
    opcion.addEventListener("change", actualizarAcompanantes);
});

// Estado inicial
actualizarAcompanantes();

// CELEBRACIÓN DE CONFIRMACIÓN EXITOSA
function lanzarCelebracion() {
    const figuras = ["💗", "💕", "🎈", "✨", "⭐", "🤎"];

    for (let i = 0; i < 30; i++) {
        const particula = document.createElement("span");

        particula.className = "particula-celebracion";
        particula.textContent =
            figuras[Math.floor(Math.random() * figuras.length)];

        particula.style.setProperty(
            "--posicion-x",
            Math.random() * 100 + "vw"
        );

        particula.style.setProperty(
            "--tamano",
            (18 + Math.random() * 18) + "px"
        );

        particula.style.setProperty(
            "--duracion",
            (3 + Math.random() * 2) + "s"
        );

        particula.style.animationDelay =
            (Math.random() * 0.8) + "s";

        document.body.appendChild(particula);

        setTimeout(() => {
            particula.remove();
        }, 6000);
    }
}

// Guardar confirmación en Supabase
formConfirmacion.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombreInvitado").value.trim();
    const respuesta = document.querySelector(
        'input[name="asistencia"]:checked'
    );

    const mensaje = document.getElementById("mensajeInvitado").value.trim();

    if (!respuesta) {
        mensajeConfirmacion.textContent = "Selecciona si podrás asistir.";
        return;
    }

    const asistira = respuesta.value === "si";

    const numeroAcompanantes = asistira
        ? Number(selectorAcompanantes.value)
        : 0;

    if (!window.supabaseClient) {
        mensajeConfirmacion.textContent =
            "No se pudo conectar con el servicio. Intenta nuevamente.";
        return;
    }

    btnEnviarConfirmacion.disabled = true;
    btnEnviarConfirmacion.textContent = "Enviando...";
    mensajeConfirmacion.textContent = "";

    try {
        const { error } = await window.supabaseClient
            .from("confirmaciones")
            .insert({
                nombre: nombre,
                asistencia: asistira,
                numero_acompanantes: numeroAcompanantes,
                mensaje: mensaje || null
            });

        if (error) {
            throw error;
        }

        mensajeConfirmacion.textContent =
            "¡Muchas gracias! Tu respuesta se registró correctamente. 🤎";

        lanzarCelebracion();

        formConfirmacion.reset();
        actualizarAcompanantes();

    } catch (error) {
        console.error("Error al guardar la confirmación:", error);

        mensajeConfirmacion.textContent =
            "No pudimos guardar tu respuesta. Revisa tu conexión e inténtalo de nuevo.";

    } finally {
        btnEnviarConfirmacion.disabled = false;
        btnEnviarConfirmacion.textContent = "Enviar confirmación";
    }
});
