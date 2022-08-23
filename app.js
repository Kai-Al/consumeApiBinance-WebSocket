//Se crea el webSocket con el servidor de binance.
let webSocket = new WebSocket('wss://stream.binance.com:9443/ws/etheur@trade');

//Esta variable
let stockSymbol = document.getElementById('stockSymbol');

//Esta variable va a guardar el último precio de la accion.
let lastPrice = null;

//Este es el parrafo que se actualiza con el precio de la accion.
let stockPrice = document.getElementById('stockPrice');


//Al momento de crear la conexion se muestra un mensaje en consola.
webSocket.onopen = function(event) {
  console.log('WebSocket open');
}
 
//Al momento de recibir un mensaje del webSocket
//se actualiza el precio de la accion en el parrafo.
webSocket.onmessage = function(event) {
    let stockObject = JSON.parse(event.data);
    //Acá se ingresa el precio de la accion en el parrafo
    // y se ponen 2 decimales.
    stockPrice.innerHTML = parseFloat(stockObject.p).toFixed(2);
    stockSymbol.innerText = stockObject.s;
    stockPrice.style.color = !lastPrice ? 'black' : lastPrice > stockObject.p ? 'red' : 'green';
    lastPrice = stockObject.p;
}

//Explicar las cabeceras de los webSockets.