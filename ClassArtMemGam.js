// even delegation using bubbling to minimize amoount of eventListerners
document.querySelector("#boardgame").addEventListener("click", game);

const gameState = {
	secondCardFlipped: false,
	turns: 0,
	matches: 0,
};

function game(e) {
	let cardID = e.target.id;
	let elem = document.querySelector(`#${cardID}`);
	gameState.turns++;

	console.log(gameState.secondCardFlipped);
	//is clicked card first or second card flipped?
	if (gameState.secondCardFlipped) {
		//pierwsza odwrócona
		elem.classList.add("flipped");
		gameState.secondCardFlipped = false;
		setTimeout(() => {
			let toBeREwersed = document.querySelectorAll(".flipped");
		}, 1000);
	} else {
		elem.classList.add("flipped");
		gameState.secondCardFlipped = true;
		//druga odwrócona
	}
	console.log(gameState.secondCardFlipped);
	console.log(gameState.turns);
}
