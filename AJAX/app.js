document.querySelector("#cargar").addEventListener('click', cargarDatos)

function cargarDatos() {
    //Craer el objeto XML
    const xhr = new XMLHttpRequest();
    //Abrir conexion
    xhr.open('GET', 'datos.txt', true);
    //Una vez qu ecarga la pag.
    //AJAX anterior
    xhr.onreadystatechange = function() {
            /* ready states
            0: No inizialido
            1: Conexion establecida
            2: Reciido
            3: Procesando
            4: Respuesta llista
            */
            if (this.readyState === 4 && this.status === 200) {
                document.querySelector("#listado").innerHTML = `<h1>${this.responseText}</h1>`
            }
        }
        //AJAX actual
        /*
        xhr.onload = function() {
            200: Correcto
              403: Prohibido
              400: No encontrado
            if (this.status === 200) {
                document.querySelector("#listado").innerHTML = `<h1>${this.responseText}</h1>`
            }
        };
        */
        //Enviar el request
    xhr.send();

}