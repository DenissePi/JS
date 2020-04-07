class EventBrite {
    constructor() {
            this.tokenAuth = 'HQZGZJL3G2WGGNZRSZIH'
            this.ordenar = 'date';
        }
        //Obtiene las categorias
    async obtenerCategorias() {
        //Consulta categorias en REST API
        const respuestaCategorias = await fetch(`https://www.eventbriteapi.com/v3/categories/?token=${this.tokenAuth}`);
        //Esperar la respuesta de las categorías y devolver un JSON
        const categorias = await respuestaCategorias.json();
        //revolver resultado
        return {
            categorias
        }
    }
    async obtenerEventos(texto, categoria) {
        //Consulta eventos en REST API
        const respuestaEventos = await fetch(`https://www.eventbriteapi.com/v3/events/search/?q=${texto}&sort_by=${this.ordenar}&categories=${categoria}&token=${this.tokenAuth}`);
        //Esperar la respuesta de los eventos y devolver un JSON
        const eventos = await respuestaEventos.json();
        //revolver resultado
        return {
            eventos
        }
    }
}