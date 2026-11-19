
const fechaEvento = new Date(
    "2026-12-05T17:00:00-06:00"
).getTime();

function actualizarCuentaRegresiva() {

    const ahora = Date.now();
    const diferencia = fechaEvento - ahora;

    if (diferencia <= 0) {

        document.getElementById("temporizador").innerHTML =
            "¡Hoy es el gran día!";

        return;
    }

    const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
        (diferencia / (1000 * 60 * 60)) % 24
    );

    const minutos = Math.floor(
        (diferencia / (1000 * 60)) % 60
    );

    const segundos = Math.floor(
        (diferencia / 1000) % 60
    );

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;

}

actualizarCuentaRegresiva();

setInterval(actualizarCuentaRegresiva, 1000);
