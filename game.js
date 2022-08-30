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

//variables globales
let canvasSize;
let elementsSize;
const playerPosition = {
	x: undefined,
	y: undefined,
};

function startGame() {
	console.log({ elementsSize, canvasSize });
	game.textAlign = 'end';
	game.font = `${elementsSize}px Verdana`;

	const map = maps[0];
	console.log(map);
	//Para conseguir las filas del mapa
	mapRows = map.trim().split('\n'); // trim() limpia espacios al principio y al final, split() convierte un str a un array
	// console.log(mapRows);
	// Para quitar los espacios pendientes y dejar un arreglo de arreglos
	const mapRowCols = mapRows.map((row) => {
		return row.trim().split('');
	});
	console.log(mapRowCols);

	// Para limpiar la consola
	game.clearRect(0, 0, canvasSize, canvasSize);

	// Implementación de 2ble método forEach()
	mapRowCols.forEach((row, rowInd) => {
		// Row es un array
		row.forEach((col, colInd) => {
			// col es un caracter
			const emoji = emojis[col];
			const posX = elementsSize * (colInd + 1);
			const posY = elementsSize * (rowInd + 1);

			if (col == 'O') {
				if (!playerPosition.x && !playerPosition.y) {
					playerPosition.x = posX;
					playerPosition.y = posY;
					console.log('Aqui va el player', playerPosition);
				}
			}

			game.fillText(emoji, posX, posY);
		});
	});

	movePlayer();
}

function setCanvasSize() {
	if (window.innerHeight >= window.innerWidth) {
		canvasSize = Math.floor(window.innerWidth * 0.8);
	} else {
		canvasSize = Math.floor(window.innerHeight * 0.8);
	}
	canvas.setAttribute('height', canvasSize); // Para setear un atributo
	canvas.setAttribute('width', canvasSize); // Para setear un atributo

	elementsSize = canvasSize / 10;
	console.log(canvasSize);

	startGame();
}

// Para escuchar el tecleado
window.addEventListener('keydown', moveKey);

btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnRight.addEventListener('click', moveRight);
btnLeft.addEventListener('click', moveLeft);

function movePlayer() {
	return game.fillText(emojis.PLAYER, playerPosition.x, playerPosition.y);
}

// function moveUp() {
// 	if (
// 		Math.floor(playerPosition.y) - Math.floor(elementsSize) <
// 		Math.floor(elementsSize)
// 	) {
// 		console.log('out');
// 	} else {
// 		playerPosition.y -= elementsSize;
// 		startGame();
// 	}
// }
// function moveDown() {
// 	if (playerPosition.y < canvasSize) {
// 		playerPosition.y += elementsSize;
// 		startGame();
// 	}
// }
// function moveRight() {
// 	if (playerPosition.x < canvasSize) {
// 		playerPosition.x += elementsSize;
// 		startGame();
// 	}
// }
// function moveLeft() {
// 	if (playerPosition.x > elementsSize * 2) {
// 		playerPosition.x -= elementsSize;
// 		startGame();
// 	}
// }

//
function moveUp() {
	if (
		Math.floor(playerPosition.y) - Math.floor(elementsSize) <
		Math.floor(elementsSize)
	) {
		console.log('out');
	} else {
		playerPosition.y -= elementsSize;
		startGame();
	}
}
function moveDown() {
	if (
		Math.floor(playerPosition.y) + Math.floor(elementsSize) >
		Math.floor(canvasSize)
	) {
		console.log('out');
	} else {
		playerPosition.y += elementsSize;
		startGame();
	}
}
function moveRight() {
	if (
		Math.floor(playerPosition.x) + Math.floor(elementsSize) >
		Math.floor(canvasSize)
	) {
		console.log('out');
	} else {
		playerPosition.x += elementsSize;
		startGame();
	}
}
function moveLeft() {
	if (
		Math.floor(playerPosition.x) - Math.floor(elementsSize) <
		Math.floor(elementsSize)
	) {
		console.log('out');
	} else {
		playerPosition.x -= elementsSize;
		startGame();
	}
}

function moveKey(event) {
	if (event.key == 'ArrowUp') {
		moveUp();
	} else if (event.key == 'ArrowDown') moveDown();
	else if (event.key == 'ArrowRight') moveRight();
	else if (event.key == 'ArrowLeft') moveLeft();
	else return;
}
