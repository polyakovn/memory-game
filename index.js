
const img_srcs = ['img/apple.png','img/banana.png','img/grape.png','img/raspberry.png','img/strawberry.png', 'img/mango.png', 'img/pomegranate.png', 'img/lemon.png'];
let card_arr = img_srcs.concat(img_srcs);


function shuffle(arr) {
	let n = arr.length;
	while (n) {
		let i = Math.floor(Math.random() * n--);
		let temp = arr[n];
		arr[n] = arr[i];
		arr[i] = temp;
	}
	return arr;
}


let cards = document.getElementsByClassName('card');
card_arr = shuffle(card_arr);
let count = 0;
let selected_cards = [];
let num_matched = 0;

for(let i=0; i<cards.length; i++){
	let element = document.createElement("img");
	let fruit_src = card_arr[i];
	element.src = fruit_src;
	document.getElementById(i+1).appendChild(element);
	cards[i].addEventListener("click", function() {

		if(count < 2 && !selected_cards.includes(cards[i])){
			cards[i].classList.add("selected");
			selected_cards.push(cards[i]);
			count++;
		}

		if(count == 2){
			if (isMatch()) {
				setTimeout(makeMatch, 500);
			} else {
				setTimeout(resetGuesses, 1000);
			}
			count = 0;
		}

		console.log(num_matched);

		setTimeout(checkWin, 1200);

	});
}

function checkWin(){
	if(num_matched == 16) {
		console.log('u won');
	}
}

function isMatch() {
	if(selected_cards[0].getElementsByTagName('img')[0].src == selected_cards[1].getElementsByTagName('img')[0].src
		) {
		return true;
	} else {
		return false;
	}
}

function makeMatch() {
	selected_cards.forEach(function(element) {
		element.classList.add("matched");
		element.getElementsByTagName('img')[0].src = 'img/blank.png';
	});
	selected_cards = [];
	num_matched = num_matched + 2;
}

function resetGuesses() {
	selected_cards.forEach(function(element) {
		element.classList.remove("selected");
	});
	selected_cards = [];
}