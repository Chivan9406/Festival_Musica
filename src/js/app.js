document.addEventListener('DOMContentLoaded', () => {
    scrollNav();

    navegacionFija();
});

function navegacionFija() {
    const barra = document.querySelector('.header');

    //Registrar el Intersection Observer
    const observer = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting) {
            barra.classList.remove('fijo');
        } else {
            barra.classList.add('fijo');
        }
    });

    //Elemento a observar
    observer.observe(document.querySelector('.video'));
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            e.preventDefault();

            const seccion = document.querySelector(e.target.attributes.href.value);

            //Efecto con recorrido suave (smooth)
            seccion.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}