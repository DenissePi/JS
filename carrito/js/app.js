// Variables
const carrito = document.querySelector("#carrito");
const cursos = document.querySelector("#lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");
const vaciaCarritoBtn = document.querySelector("#vaciar-carrito")
    //Listeners
cargarEventListeners();

function cargarEventListeners() {
    //Dispara cuando se presiona agregar carrito
    cursos.addEventListener('click', comprarCurso);
    //Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso)
        //Al vaciar el carrito
    vaciaCarritoBtn.addEventListener('click', vaciaCarrito);
    //Al cargar el documento, mostrar local Storage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

//Funciones
//Funcion que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault();
    //Delegation para agregar al carrito
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        //Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso)
    }
}
//Lee los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso)
}
//Muestra el curso seleccionado en el carrito
function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${curso.imagen}" width="100px"></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
    `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}
//Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();
    let curso, cursoId;
    //Delegation para agregar al carrito
    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id')
        eliminarCursoLocalStorage(cursoId)
    }
}
// Elimna los cursos del carrito en el DOM
function vaciaCarrito() {
    //Forma lenta
    //listaCursos.innerHTML = ``;
    //Forma rapida y recomendada
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild)
            //Vaciar local storage
        vaciarLocalStorage();
    }
}
//Almacena cursos en el carrito a local storage
function guardarCursoLocalStorage(curso) {
    let cursos = obtenerCursosLocalStorage();
    //El curso seleccionado se agrega al arreglo
    cursos.push(curso);
    localStorage.setItem('cursos', JSON.stringify(cursos));
}
//Comprueba si hay elementos en Local Storage
function obtenerCursosLocalStorage() {
    let cursosLS;
    //Comprobamos si hay algo en Local Storage
    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}
//Imprime los cursos de Local Storag een el carrito
function leerLocalStorage() {
    let cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach(curso => {
        //Construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${curso.imagen}" width="100px"></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
        `;
        listaCursos.appendChild(row);
    });
}
//Elimina curso de local storage
function eliminarCursoLocalStorage(cursoId) {
    let cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach((curso, index) => {
        if (curso.id === cursoId) {
            cursosLS.splice(index, 1)
        }
    });
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}
//elimina todos los cursos de local storage
function vaciarLocalStorage() {
    localStorage.clear();
}