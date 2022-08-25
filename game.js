const canvas = document.querySelector('#game');
// Para acceder a los métodos de la etiqueta canvas, se crea una variable con el contexto
const game = canvas.getContext('2d');

// window --> es la ventana al HTML
// Evento load, para que cargue toda la venta, antes de ejecutar la función, load es un evento de window
window.addEventListener('load', startGame);

// Clase 4
window.addEventListener('resize', setCanvasSize); // Evento que es escuchado cada que se genera un ajuste en el tamaño de la pantalla
//

let canvasSize;
let elementsSize;

function startGame() {
	console.log({ elementsSize, canvasSize });
	game.textAlign = 'end';
	game.font = `${elementsSize}px Verdana`;
	for (let i = 1; i <= 10; i++) {
		game.fillText(emojis['X'], elementsSize * i, elementsSize);
	}
}

function setCanvasSize() {
	if (window.innerHeight > window.innerWidth) {
		canvasSize = window.innerWidth * 0.8;
	} else {
		canvasSize = window.innerHeight * 0.8;
	}
	canvas.setAttribute('height', canvasSize); // Para setear un atributo
	canvas.setAttribute('width', canvasSize); // Para setear un atributo

	elementsSize = canvasSize / 10;

	startGame();
}
