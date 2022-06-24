// even delegation using bubbling to minimize amoount of eventListerners
document.querySelector("#boardgame").addEventListener("click", turn);

const artpiece = [
	"zero.jpg",
	"one.jpg",
	"two.jpg",
	"three.jpg",
	"four.jpg",
	"five.jpg",
];

// assigning random artpiece

function assignArt() {}

const gameState = {
	cardsFlipped: 0,
	cardsGuessed: 0,
	turns: 0,
	matches: 0,
};

const cards = {
	firstCard: {
		selector: undefined,
		img: undefined,
	},

	secondCard: {
		selector: undefined,
		img: undefined,
	},
};


function flipCard(card) {
card.classList.remove("card-unflipped");
card.classList.add("flipped");
}

function hideCards(card){
	document.querySelector("#score").innerHTML = `Your moves: ${gameState.turns}`;
 gameState.cardsGuessed+=2;
return setTimeout(() => {
	document.querySelectorAll(".flipped:not(.matched)").forEach((x) => {
		x.classList.add("matched");
		gameState.cardsFlipped = 0;
	});
}, 500);
}
function unflipCards(){
	document.querySelector("#score").innerHTML = `Your moves: ${gameState.turns}`;
return setTimeout(() => {
	document.querySelectorAll(".card.flipped:not(.matched)").forEach((x) => {
		x.classList.add("card-unflipped");
		x.classList.remove("flipped");
		gameState.cardsFlipped = 0;
	});
}, 1000);
};

function congrats() {
	document.querySelector("#score").innerHTML = `Congratulations! <br> You finished the game in ${gameState.turns} moves!`;
}

function turn(event) {
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
					if (gameState.cardsGuessed===12){
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
//dodaj throttling
