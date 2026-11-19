
// ==========================================
// PANEL DE ADMINISTRACIÓN
// ==========================================

const formLogin = document.getElementById("formLogin");
const panelLogin = document.getElementById("panelLogin");
const panelDashboard = document.getElementById("panelDashboard");

const correo = document.getElementById("correo");
const contrasena = document.getElementById("contrasena");

const btnLogin = document.getElementById("btnLogin");
const mensajeLogin = document.getElementById("mensajeLogin");

const mensajeDashboard = document.getElementById("mensajeDashboard");


// ==========================================
// VERIFICAR CONEXIÓN CON SUPABASE
// ==========================================

if (!window.supabaseClient) {

    mensajeLogin.textContent =
        "No se pudo conectar con Supabase. Recarga la página.";

    btnLogin.disabled = true;

}


// ==========================================
// FORMATO DE FECHAS
// ==========================================

function formatearFecha(fecha) {

    if (!fecha) return "Sin fecha";

    return new Date(fecha).toLocaleString("es-MX", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

}


// ==========================================
// VERIFICAR ADMINISTRADOR
// ==========================================

async function verificarAdministrador() {

    const { data: usuario, error: errorUsuario } =
        await window.supabaseClient.auth.getUser();

    if (errorUsuario || !usuario.user) {
        panelDashboard.hidden = true;
        panelLogin.hidden = false;
        return false;
    }

    const { data, error } = await window.supabaseClient
        .from("administradores")
        .select("user_id")
        .eq("user_id", usuario.user.id)
        .maybeSingle();

    if (error) {

        console.error("Error al verificar administrador:", error);

        mensajeLogin.textContent =
            "No fue posible verificar los permisos de esta cuenta.";

        await window.supabaseClient.auth.signOut();

        return false;
    }

    if (!data) {

        mensajeLogin.textContent =
            "Esta cuenta no tiene permisos de administrador.";

        await window.supabaseClient.auth.signOut();

        return false;
    }

    panelLogin.hidden = true;
    panelDashboard.hidden = false;

    await cargarConfirmaciones();

    return true;

}


// ==========================================
// INICIAR SESIÓN
// ==========================================

formLogin.addEventListener("submit", async function (event) {

    event.preventDefault();

    if (!window.supabaseClient) return;

    const email = correo.value.trim();
    const password = contrasena.value;

    btnLogin.disabled = true;
    btnLogin.textContent = "Verificando...";
    mensajeLogin.textContent = "";

    try {

        const { error } = await window.supabaseClient.auth
            .signInWithPassword({
                email: email,
                password: password
            });

        if (error) throw error;

        const autorizado = await verificarAdministrador();

        if (!autorizado) {
            return;
        }

    } catch (error) {

        console.error("Error al iniciar sesión:", error);

        mensajeLogin.textContent =
            "No se pudo iniciar sesión. Verifica tu correo y contraseña.";

    } finally {

        btnLogin.disabled = false;
        btnLogin.textContent = "Iniciar sesión";

    }

});


// ==========================================
// CARGAR CONFIRMACIONES
// ==========================================

async function cargarConfirmaciones() {

    const tablaInvitados = document.getElementById("tablaInvitados");
    const btnActualizar = document.getElementById("btnActualizar");

    if (!tablaInvitados) return;

    if (btnActualizar) {
        btnActualizar.disabled = true;
        btnActualizar.textContent = "Actualizando...";
    }

    mensajeDashboard.textContent = "";

    tablaInvitados.replaceChildren();

    const filaCarga = document.createElement("tr");
    const celdaCarga = document.createElement("td");

    celdaCarga.colSpan = 5;
    celdaCarga.textContent = "Cargando confirmaciones...";

    filaCarga.appendChild(celdaCarga);
    tablaInvitados.appendChild(filaCarga);

    try {

        const { data: confirmaciones, error } =
            await window.supabaseClient
                .from("confirmaciones")
                .select("id, nombre, asistencia, numero_acompanantes, mensaje, created_at")
                .order("created_at", { ascending: false });

        if (error) throw error;

        actualizarEstadisticas(confirmaciones);

        mostrarConfirmaciones(confirmaciones);

        mensajeDashboard.textContent =
            `Se encontraron ${confirmaciones.length} confirmación(es).`;

    } catch (error) {

        console.error("Error al cargar confirmaciones:", error);

        tablaInvitados.replaceChildren();

        const filaError = document.createElement("tr");
        const celdaError = document.createElement("td");

        celdaError.colSpan = 5;
        celdaError.textContent =
            "No se pudieron cargar las confirmaciones.";

        filaError.appendChild(celdaError);
        tablaInvitados.appendChild(filaError);

        mensajeDashboard.textContent =
            "Revisa la conexión y los permisos de Supabase.";

    } finally {

        if (btnActualizar) {
            btnActualizar.disabled = false;
            btnActualizar.textContent = "Actualizar";
        }

    }

}


// ==========================================
// ACTUALIZAR ESTADÍSTICAS
// ==========================================

function actualizarEstadisticas(confirmaciones) {

    const total = confirmaciones.length;

    const confirmados = confirmaciones.filter(
        invitado => invitado.asistencia === true
    );

    const noAsisten = confirmaciones.filter(
        invitado => invitado.asistencia === false
    );

    const acompanantes = confirmados.reduce(
        (total, invitado) =>
            total + Number(invitado.numero_acompanantes || 0),
        0
    );

    // Cada invitado confirmado cuenta como una persona.
    // También se suman sus acompañantes.
    const totalAsistentes = confirmados.length + acompanantes;

    document.getElementById("totalRespuestas").textContent = total;

    document.getElementById("totalConfirmados").textContent =
        confirmados.length;

    document.getElementById("totalNoAsisten").textContent =
        noAsisten.length;

    document.getElementById("totalAsistentes").textContent =
        totalAsistentes;

}


// ==========================================
// MOSTRAR CONFIRMACIONES EN LA TABLA
// ==========================================

function mostrarConfirmaciones(confirmaciones) {

    const tablaInvitados = document.getElementById("tablaInvitados");

    tablaInvitados.replaceChildren();

    if (confirmaciones.length === 0) {

        const fila = document.createElement("tr");
        const celda = document.createElement("td");

        celda.colSpan = 5;
        celda.textContent =
            "Todavía no hay confirmaciones registradas.";

        fila.appendChild(celda);
        tablaInvitados.appendChild(fila);

        return;
    }

    confirmaciones.forEach(invitado => {

        const fila = document.createElement("tr");

        // Nombre
        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = invitado.nombre;

        // Asistencia
        const celdaAsistencia = document.createElement("td");
        celdaAsistencia.textContent = invitado.asistencia
            ? "Sí asistirá"
            : "No asistirá";

        // Acompañantes
        const celdaAcompanantes = document.createElement("td");
        celdaAcompanantes.textContent =
            invitado.numero_acompanantes;


        // Mensaje
        const celdaMensaje = document.createElement("td");

        if (invitado.mensaje) {

            const botonMensaje = document.createElement("button");

            botonMensaje.type = "button";
            botonMensaje.textContent = "Leer mensaje";
            botonMensaje.className = "boton-ver-mensaje";

            botonMensaje.addEventListener("click", function () {

                const modal = document.getElementById("modalMensaje");
                const textoMensaje = document.getElementById("textoMensaje");

                textoMensaje.textContent = invitado.mensaje;

                modal.hidden = false;

            });

            celdaMensaje.appendChild(botonMensaje);

        } else {

            celdaMensaje.textContent = "Sin mensaje";

        }

        // Fecha
        const celdaFecha = document.createElement("td");
        celdaFecha.textContent =
            formatearFecha(invitado.created_at);

        fila.append(
            celdaNombre,
            celdaAsistencia,
            celdaAcompanantes,
            celdaMensaje,
            celdaFecha
        );

        tablaInvitados.appendChild(fila);

    });

}


// ==========================================
// BOTÓN ACTUALIZAR
// ==========================================

const btnActualizar = document.getElementById("btnActualizar");

if (btnActualizar) {

    btnActualizar.addEventListener("click", function () {
        cargarConfirmaciones();
    });

}


// ==========================================
// CERRAR SESIÓN
// ==========================================

const btnCerrarSesion = document.getElementById("btnCerrarSesion");

btnCerrarSesion.addEventListener("click", async function () {

    btnCerrarSesion.disabled = true;

    try {

        const { error } =
            await window.supabaseClient.auth.signOut();

        if (error) throw error;

        panelDashboard.hidden = true;
        panelLogin.hidden = false;

        formLogin.reset();

        mensajeLogin.textContent =
            "Sesión cerrada correctamente.";

    } catch (error) {

        console.error("Error al cerrar sesión:", error);

        mensajeDashboard.textContent =
            "No se pudo cerrar la sesión.";

    } finally {

        btnCerrarSesion.disabled = false;

    }

});


// ==========================================
// VERIFICAR SESIÓN AL ABRIR EL PANEL
// ==========================================

async function verificarSesion() {

    if (!window.supabaseClient) return;

    try {

        const { data, error } =
            await window.supabaseClient.auth.getSession();

        if (error) throw error;

        if (data.session) {
            await verificarAdministrador();
        }

    } catch (error) {

        console.error("Error al verificar sesión:", error);

    }

}


// ==========================================
// CERRAR VENTANA DE MENSAJES
// ==========================================

const modalMensaje = document.getElementById("modalMensaje");

function cerrarModalMensaje() {
    modalMensaje.hidden = true;
}

document.getElementById("cerrarModalMensaje")
    .addEventListener("click", cerrarModalMensaje);

document.getElementById("btnCerrarMensaje")
    .addEventListener("click", cerrarModalMensaje);

// Cerrar al pulsar fuera de la ventana
modalMensaje.addEventListener("click", function (event) {

    if (event.target === modalMensaje) {
        cerrarModalMensaje();
    }

});

// Cerrar con la tecla Escape
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape" && !modalMensaje.hidden) {
        cerrarModalMensaje();
    }

});


verificarSesion();
