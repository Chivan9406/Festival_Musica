document.addEventListener('DOMContentLoaded', () => {
    crearGaleria();
});

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for( let i = 1; i <= 12; i++) {
        const imagen = document.createElement('IMG');

        imagen.src=`build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;
        imagen.classList.add('imagen');

        //Añadir funcion de mostrar imagen
        imagen.onclick = mostrarImagen;
        
        const lista = document.createElement('LI');

        lista.appendChild(imagen);
        
        galeria.appendChild(lista);
    }
}

function mostrarImagen(e) {
    const id = parseInt(e.target.dataset.imagenId);

    //Generar imagen grande
    const imagen = document.createElement('IMG');
    imagen.src=`build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    //Cerrar desde overlay
    overlay.onclick = () => {
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    //Boton cerrar
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    //Cerrar
    cerrarImagen.onclick = () => {
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    overlay.appendChild(cerrarImagen);

    //En el HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}