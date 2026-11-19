
const btnAbrir = document.getElementById("btnAbrir");
const portada = document.getElementById("portada");
const contenido = document.getElementById("contenido");

btnAbrir.addEventListener("click", function () {

    portada.style.transition = "opacity 0.8s ease";
    portada.style.opacity = "0";

    setTimeout(function () {

        portada.style.display = "none";

        contenido.classList.remove("oculto");
        contenido.classList.add("mostrar");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 800);

});
