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

/* ANIMACIONES AL DESPLAZARSE - NUESTRA FAMILIA */

document.addEventListener("DOMContentLoaded", function () {

    const elementosFamilia = document.querySelectorAll(
        "#familia .anim-familia-1, " +
        "#familia .anim-familia-2, " +
        "#familia .anim-familia-3, " +
        "#familia .anim-familia-4, " +
        "#familia .anim-familia-5, " +
        "#familia .anim-familia-6, " +
        "#familia .anim-familia-7, " +
        "#familia .anim-familia-8"
    );

    const observadorFamilia = new IntersectionObserver((entradas) => {

        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("visible");

                observadorFamilia.unobserve(entrada.target);

            }

        });

    }, {
        threshold: 0.2
    });

    elementosFamilia.forEach((elemento) => {
        observadorFamilia.observe(elemento);
    });

});

/* ANIMACIONES AL DESPLAZARSE - CUENTA REGRESIVA */

document.addEventListener("DOMContentLoaded", function () {

    const elementosContador = document.querySelectorAll(
        "#cuenta-regresiva [class*='anim-contador-']"
    );

    const observadorContador = new IntersectionObserver((entradas) => {

        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("visible");

                observadorContador.unobserve(entrada.target);

            }

        });

    }, {
        threshold: 0.2
    });

    elementosContador.forEach((elemento) => {
        observadorContador.observe(elemento);
    });

});

/* ANIMACIONES AL DESPLAZARSE - EVENTO */

document.addEventListener("DOMContentLoaded", function () {

    const elementosEvento = document.querySelectorAll(
        "#evento [class*='anim-evento-']"
    );

    const observadorEvento = new IntersectionObserver((entradas) => {

        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observadorEvento.unobserve(entrada.target);
            }

        });

    }, {
        threshold: 0.2
    });

    elementosEvento.forEach((elemento) => {
        observadorEvento.observe(elemento);
    });

});

/* ANIMACIONES AL DESPLAZARSE - VESTIMENTA */
document.addEventListener("DOMContentLoaded", function () {

    const elementosVestimenta = document.querySelectorAll(
        "#vestimenta [class*='anim-vestimenta-']"
    );

    const observadorVestimenta = new IntersectionObserver((entradas) => {

        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observadorVestimenta.unobserve(entrada.target);
            }

        });

    }, { threshold: 0.2 });

    elementosVestimenta.forEach((elemento) => {
        observadorVestimenta.observe(elemento);
    });

});

/* ANIMACIONES AL DESPLAZARSE - UBICACIÓN */
document.addEventListener("DOMContentLoaded", function () {

    const elementosUbicacion = document.querySelectorAll(
        "#ubicacion [class*='anim-ubicacion-']"
    );

    const observadorUbicacion = new IntersectionObserver((entradas) => {

        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observadorUbicacion.unobserve(entrada.target);
            }

        });

    }, { threshold: 0.2 });

    elementosUbicacion.forEach((elemento) => {
        observadorUbicacion.observe(elemento);
    });

});