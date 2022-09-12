const canvas = document.querySelector('#game');
// Para acceder a los métodos de la etiqueta canvas, se crea una variable con el contexto
const game = canvas.getContext('2d');

const start = document.querySelector('.start');
const displayStart = document.querySelector('.game-container');
const end = document.querySelector('.end');

const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnRight = document.querySelector('#right');
const btnLeft = document.querySelector('#left');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');

//variables globales
let canvasSize;
let elementsSize;
const playerPosition = {
	x: undefined,
	y: undefined,
};
const giftPosition = {
	x: undefined,
	y: undefined,
};
let bombPosition = [];
let level = 0;
let lives = 3;
let timeStart;
let timePlayer;
let timeInterval;
const impact = {
	x: undefined,
	y: undefined,
};
let toStart;

// window --> es la ventana al HTML
// Evento load, para que cargue toda la venta, antes de ejecutar la función, load es un evento de window
window.addEventListener('load', setCanvasSize);

// Clase 4
window.addEventListener('resize', setCanvasSize); // Evento que es escuchado cada que se genera un ajuste en el tamaño de la pantalla
//

start.addEventListener('click', () => {
	displayStart.classList.remove('display-none');
	end.classList.remove('display-none');
	toStart = 1;
	startGame();
	start.classList.add('display-none');
});

end.addEventListener('click', () => {
	start.classList.remove('display-none');
	displayStart.classList.add('display-none');
	end.classList.add('display-none');
	toStart = 0;
	levelFail();
	console.log(toStart);
});
function setCanvasSize() {
	if (window.innerHeight > window.innerWidth) {
		canvasSize = window.innerWidth * 0.7;
	} else {
		canvasSize = window.innerHeight * 0.7;
	}

	canvasSize = canvasSize.toFixed(2) * 1;
	canvas.setAttribute('height', canvasSize); // Para setear un atributo
	canvas.setAttribute('width', canvasSize); // Para setear un atributo

	elementsSize = canvasSize / 10;
	console.log({ canvasSize, elementsSize });

	playerPosition.x = undefined;
	playerPosition.y = undefined;
	startGame();
}

function startGame() {
	game.textAlign = 'end';
	game.font = `${elementsSize}px Verdana`;

	const map = maps[level];

	// Finalizar juego
	if (!map) {
		return gameWin();
	}

	//Calcular tiempo
	if (!timeStart && toStart === 1) {
		timeStart = Date.now();
		timeInterval = setInterval(() => {
			showTime();
		}, 100);
		showRecord();
	}

	// Para limpiar la consola
	game.clearRect(0, 0, canvasSize, canvasSize);

	//Para conseguir las filas del mapa
	mapRows = map.trim().split('\n'); // trim() limpia espacios al principio y al final, split() convierte un str a un array
	// console.log(mapRows);
	// Para quitar los espacios pendientes y dejar un arreglo de arreglos
	const mapRowCols = mapRows.map((row) => {
		return row.trim().split('');
	});

	showLives();

	// Para limpiar el render de la posición de las bombas
	bombPosition = [];

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
				}
			} else if (col == 'I') {
				giftPosition.x = posX;
				giftPosition.y = posY;
			} else if (col == 'X') {
				bombPosition.push({
					x: posX,
					y: posY,
				});
			}

			game.fillText(emoji, posX, posY);
		});
	});

	movePlayer();
}

// Para escuchar el tecleado
window.addEventListener('keydown', moveKey);

btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnRight.addEventListener('click', moveRight);
btnLeft.addEventListener('click', moveLeft);

function movePlayer() {
	const giftCollisionX =
		playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
	const giftCollisionY =
		playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);
	const giftCollision = giftCollisionX && giftCollisionY;
	if (giftCollision) {
		console.log('Pasaste el nivel');
		levelWin();
	}

	const bombCollision = bombPosition.find((position) => {
		const bombCollisionX = playerPosition.x.toFixed(2) == position.x.toFixed(2);
		const bombCollisionY = playerPosition.y.toFixed(2) == position.y.toFixed(2);
		return bombCollisionX && bombCollisionY;
	});
	if (bombCollision) {
		console.log('BOOM, explotaste');
		impact.x = playerPosition.x.toFixed(2) * 1;
		impact.y = playerPosition.y.toFixed(2) * 1;
		console.log({ impact });
		levelFail();
		game.fillText(emojis.BOMB_COLLISION, impact.x, impact.y);
	}
	game.fillText(emojis.PLAYER, playerPosition.x, playerPosition.y);
}

// Funcion para pasar de nivel
function levelWin() {
	level++;
	startGame();
}

// Función cuando pierdes
function levelFail() {
	lives--;
	if (toStart === 0 || lives <= 0) {
		level = 0;
		lives = 3;
		timeStart = undefined;
	}
	playerPosition.x = undefined;
	playerPosition.y = undefined;
	setTimeout(() => {
		startGame();
	}, 1000);
}

// Función cuando gana el juego
function gameWin() {
	clearInterval(timeInterval);

	const recordTime = localStorage.getItem('record');
	const playerTime = (Date.now() - timeStart) / 1000;
	// pResult.innerHTML = '';
	if (recordTime) {
		if (recordTime >= playerTime) {
			localStorage.setItem('record', playerTime);
			pResult.innerHTML = 'superaste el record';
		} else {
			pResult.innerHTML = 'No superaste el record';
		}
	} else {
		localStorage.setItem('record', playerTime);
		pResult.innerHTML = 'Este es el nuevo record!';
	}

	console.log({ recordTime, playerTime });
}

//Mostrar vidas
function showLives() {
	// // Método implementando Array
	// // Para crear un array con el número de posiciones de un elemento puntual
	// const hearts = Array(lives).fill(emojis['HEART']); //[1,2,3]
	// const heartsView = hearts.join('');
	// spanLives.innerText = heartsView;

	// Método implementando str (mas limpio para este caso)
	const hearts = emojis['HEART'].repeat(lives);
	spanLives.innerText = hearts;
}

// Mostrar el tiempo
function showTime() {
	spanTime.innerText = (Date.now() - timeStart) / 1000;
}

//Mostrar record
function showRecord() {
	spanRecord.innerText = localStorage.getItem('record');
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
	if (playerPosition.y - elementsSize < elementsSize) {
	} else {
		playerPosition.y -= elementsSize;
		startGame();
	}
}
function moveDown() {
	if (playerPosition.y + elementsSize > canvasSize) {
	} else {
		playerPosition.y += elementsSize;
		startGame();
	}
}
function moveRight() {
	if (playerPosition.x + elementsSize > canvasSize) {
	} else {
		playerPosition.x += elementsSize;
		startGame();
	}
}
function moveLeft() {
	if (playerPosition.x - elementsSize < elementsSize) {
	} else {
		playerPosition.x -= elementsSize;
		startGame();
	}
}

//Escuchar las teclas
function moveKey(event) {
	if (event.key == 'ArrowUp') {
		moveUp();
	} else if (event.key == 'ArrowDown') moveDown();
	else if (event.key == 'ArrowRight') moveRight();
	else if (event.key == 'ArrowLeft') moveLeft();
	else return;
}

const numerito = 45.2133245;
console.log(numerito.toFixed(2));
