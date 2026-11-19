const btnAbrir = document.getElementById("btnAbrir");
const portada = document.getElementById("portada");
const contenido = document.getElementById("contenido");
const huellitas = document.getElementById("huellitasTransicion");

btnAbrir.addEventListener("click", function () {

    // Evitar doble clic
    btnAbrir.disabled = true;

    // Mostrar huellitas
    huellitas.classList.add("activa");

    // Esperar a que termine la animación
    setTimeout(function () {

        portada.style.transition = "opacity 0.8s ease";
        portada.style.opacity = "0";

        setTimeout(function () {

            portada.style.display = "none";

            contenido.classList.remove("oculto");
            contenido.classList.add("mostrar");

            huellitas.classList.remove("activa");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 800);

    }, 2300);

});