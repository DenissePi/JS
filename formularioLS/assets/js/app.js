const listaTweets = document.querySelector("#lista-tweets");

//Event Listeners
eventListeners();

function eventListeners() {
    //Cuando se envia el formulario
    document.querySelector("#formulario").addEventListener('submit', agregarTweet);
    //Borrar tweets
    listaTweets.addEventListener('click', borrarTweet)
        //Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo)
}

//Funciones
//Mostrar datos de local Storage en la lista
function localStorageListo() {
    let tweets
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(tweet => {
        //Boton eliminar
        const botonBorrar = document.createElement('a')
        botonBorrar.classList = 'borrar-tweet'
        botonBorrar.innerText = 'X'
            //Crear elemento y añadir a la lista
        const li = document.createElement('li')
        li.innerText = tweet
            // Añade boton de borar a twet
        li.appendChild(botonBorrar)
            // Añade tweet a la lista
        listaTweets.appendChild(li)
    });

}

function agregarTweet(e) {
    e.preventDefault();
    let tweet = document.querySelector("#tweet").value;
    //Boton eliminar
    const botonBorrar = document.createElement('a')
    botonBorrar.classList = 'borrar-tweet'
    botonBorrar.innerText = 'X'
        //Crear elemento y añadir a la lista
    const li = document.createElement('li')
    li.innerText = tweet
        // Añade boton de borar a twet
    li.appendChild(botonBorrar)
        // Añade tweet a la lista
    listaTweets.appendChild(li)

    //Añadir a local Storage
    agregarTweetLocalStorage(tweet);
}

function borrarTweet(e) {
    e.preventDefault();
    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove()
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

//Añadir a local Storage
function agregarTweetLocalStorage(tweet) {
    let tweets = obtenerTweetsLocalStorage();
    //Añdir el nuevo tweet
    tweets.push(tweet)
        // Convertir de string a arreglo
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Cmprueba si hay elementos en local Storage
function obtenerTweetsLocalStorage() {
    let tweets;
    if (localStorage.getItem('tweets') === null) {
        tweets = []
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'))
    }
    return tweets
}

//Eliminar tweet de Local Storag
function borrarTweetLocalStorage(tweet) {
    let tweets = obtenerTweetsLocalStorage(),
        tweetBorar
        //Elimina la X del tweet
    tweetBorar = tweet.substring(0, tweet.length - 1)
    tweets.forEach((element, index) => {
        if (tweetBorar === element) {
            tweets.splice(index, 1)
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets))
}