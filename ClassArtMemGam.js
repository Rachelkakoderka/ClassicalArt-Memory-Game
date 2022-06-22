document.querySelector('#boardgame').addEventListener('click',(e)=> {
	let cardID = e.target.id;
	let elem = document.querySelector(`#${cardID}`);
	return elem.classList.add("rewers");
	
})
