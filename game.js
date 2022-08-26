const canvas = document.querySelector('#game');
// Para acceder a los métodos de la etiqueta canvas, se crea una variable con el contexto
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnRight = document.querySelector('#right');
const btnLeft = document.querySelector('#left');

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

	const map = maps[2];
	console.log(map);
	//Para conseguir las filas del mapa
	mapRows = map.trim().split('\n'); // trim() limpia espacios al principio y al final, split() convierte un str a un array
	// console.log(mapRows);
	// Para quitar los espacios pendientes y dejar un arreglo de arreglos
	const mapRowCols = mapRows.map((row) => {
		return row.trim().split('');
	});
	console.log(mapRowCols);

	// Implementación de 2ble método forEach()
	mapRowCols.forEach((row, rowInd) => {
		// Row es un array
		row.forEach((col, colInd) => {
			// col es un caracter
			const emoji = emojis[col];
			const posX = elementsSize * (colInd + 1);
			const posY = elementsSize * (rowInd + 1);
			return game.fillText(emoji, posX, posY);
		});
	});

	// for (let row = 1; row <= 10; row++) {
	// 	// game.fillText(emojis['X'], elementsSize * row, elementsSize * row);
	// 	for (let col = 1; col <= 10; col++) {
	// 		game.fillText(
	// 			emojis[mapRowCols[row - 1][col - 1]],
	// 			elementsSize * col,
	// 			elementsSize * row
	// 		);
	// 	}
	// }
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

// Para escuchar el tecleado
window.addEventListener('keydown', moveKey);

btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnRight.addEventListener('click', moveRight);
btnLeft.addEventListener('click', moveLeft);

function moveUp() {
	console.log('up');
}
function moveDown() {
	console.log('down');
}
function moveRight() {
	console.log('right');
}
function moveLeft() {
	console.log('left');
}
function moveKey(event) {
	if (event.key == 'ArrowUp') {
		moveUp();
	} else if (event.key == 'ArrowDown') moveDown();
	else if (event.key == 'ArrowRight') moveRight();
	else if (event.key == 'ArrowLeft') moveLeft();
	else return;
}
