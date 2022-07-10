// even delegation using bubbling to minimize amoount of eventListerners
document.querySelector("#start").addEventListener("click", startGame);

const artpiece = [
	"zero.jpg",
	"one.jpg",
	"two.jpg",
	"three.jpg",
	"four.jpg",
	"five.jpg",
	"zero.jpg",
	"one.jpg",
	"two.jpg",
	"three.jpg",
	"four.jpg",
	"five.jpg",
];

const gameState = {
	cardsFlipped: 0,
	cardsGuessed: 0,
	turns: 0,
	gameStarted: false,
};

const cards = {
	firstCard: {
		img: undefined,
	},

	secondCard: {
		img: undefined,
	},
};

const startButton = document.querySelector("#start");

function buttonStateSwitch() {
	if (gameState.gameStarted) {
		startButton.classList.add("disabled");
		startButton.classList.remove("gameNotStarted");
		startButton.removeEventListener("click", game);
	} else {
		startButton.classList.remove("disabled");
		startButton.classList.add("gameNotStarted");
	}
}

// shuffling cards

function shuffle() {
	let a = () => Math.floor(Math.random() * 12);
	let divArr = [];
	for (i = 0; i < 12; i++) {
		while (divArr.length < 12) {
			let position = a();

			if (!divArr.includes(position)) {
				divArr.push(position);
			}
		}
	}
	return divArr;
}

function startGame() {
	if (!gameState.gameStarted) {
		gameState.gameStarted = true;
		buttonStateSwitch();

		document.querySelectorAll(".card").forEach((x) => {
			x.classList.add("gameStarted");
		});

		let newBoardGame = shuffle();

		let elemNodes = [...document.querySelectorAll(".card")];

		for (i = 0; i < 12; i++) {
			elemNodes[i].innerHTML = `<img src="card-img/${
				artpiece[newBoardGame[i]]
			}">`;
		}

		document.querySelector("#boardgame").addEventListener("click", game);
	}
}

function flipCard(card) {
	card.classList.remove("card-unflipped");
	card.classList.add("flipped");
}

function hideCards() {
	
	gameState.cardsGuessed += 2;
	return setTimeout(() => {
		document.querySelectorAll(".flipped:not(.matched)").forEach((x) => {
			x.classList.add("matched");
			gameState.cardsFlipped = 0;
		});
	}, 500);
}
function unflipCards() {
	
	return setTimeout(() => {
		document.querySelectorAll(".card.flipped:not(.matched)").forEach((x) => {
			x.classList.add("card-unflipped");
			x.classList.remove("flipped");
			gameState.cardsFlipped = 0;
		});
	}, 1000);
}

function congrats() {
	let endPanel = document.querySelector("#score");

	endPanel.classList.add("endPanel");
	endPanel.innerHTML = `Congratulations! <br> You finished the game in ${gameState.turns} moves! \n Do you want to play again?`;
	
	gameState.gameStarted = false;
	gameState.cardsGuessed = 0;
	buttonStateSwitch();
	startButton.addEventListener("click", reload);
}

function reload() {
	window.location.reload(true);
}

function game(event) {
	let cardID = event.target.id;
	let elem = document.querySelector(`#${cardID}`); //returns <div class="card" id="0"></div>

	//dont let more than 2 cards to be flipped in a turn
	if (gameState.cardsFlipped < 2) {
		// checking if a card clicked and not the gap in grid
		//is clicked card first or second card flipped?
		if (event.target.localName === "div") {
			//if the second card is clicked
			if (gameState.cardsFlipped > 0) {
				//show card
				flipCard(elem);
				//update gameState
				gameState.cardsFlipped++;
				gameState.turns++;
				//update secondCard stats
				cards.secondCard.id = elem;
				cards.secondCard.img = event.target.innerHTML;

				//if cards are the same hide them:
				if (cards.firstCard.img === cards.secondCard.img) {
					hideCards();
					if (gameState.cardsGuessed === 12) {
						congrats();
					}
				} else {
					//if the cards are not the same flip them
					unflipCards();
				}
				//udate info about score
			} else {
				//if first is clicked

				//1. show card
				flipCard(elem);

				//2. update gameState
				gameState.cardsFlipped++;

				// 3. update firstCard object information
				cards.firstCard.selector = elem;
				cards.firstCard.img = event.target.innerHTML;
			}
		}
	}
}
