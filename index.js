
const img_srcs = ['img/apple.png','img/banana.png','img/grape.png','img/raspberry.png','img/strawberry.png', 'img/mango.png', 'img/pomegranate.png', 'img/lemon.png'];
let cards = document.getElementsByClassName('card');
let card_arr = img_srcs.concat(img_srcs);
let selected_count = 0;
let selected_cards = [];
let num_moves = 0;

document.body.onload = startGame();

function startGame() {
	card_arr = shuffle(card_arr);
	let click = 0;

	for(let i=0; i<cards.length; i++) {
		let img = document.createElement("img");
		let img_src = card_arr[i];
		img.src = img_src;
		document.getElementById(i+1).appendChild(img);
		cards[i].addEventListener("click", function() {
			if(selected_count < 2 && !selected_cards.includes(cards[i])){
				cards[i].classList.add("selected");
				selected_cards.push(cards[i]);
				selected_count++;
			} 
			if (selected_count == 2) {
				if (isMatch()) {
					setTimeout(setMatch,300);
				} else {
					setTimeout(resetGuesses,1000);
				}
			}
			num_moves ++;
			updateScore();
			setTimeout(checkWin,1500);
			click++;
			if (click == 1) {
				startTimer();
			}
		})
	}
}


function updateScore(){
	document.getElementById('num_moves').innerHTML = '# Moves: ' + (num_moves - num_moves%2)/2;
}

function startTimer() {
	let second = 0;
	let minute = 0;
	let timer = setInterval(function() {
		document.getElementById('time').innerHTML = minute +  " minutes " + second + " seconds ";
		second++;
		if(second == 60) {
			minute++;
			second = 0;
		}
	}, 1000);

}

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

function checkWin(){
	if(document.querySelectorAll('#grid .matched').length == 16) {
		alert("yeee");
	}
}

function isMatch() {
	return(selected_cards[0].getElementsByTagName('img')[0].src == selected_cards[1].getElementsByTagName('img')[0].src);
}

function setMatch() {
	selected_cards.forEach(function(element) {
		element.classList.add("matched");
		element.getElementsByTagName('img')[0].src = 'img/blank.png';
	});
	selected_count = 0;
	selected_cards = [];
}

function resetGuesses() {
	selected_cards.forEach(function(element) {
		element.classList.remove("selected");
	});
	selected_count = 0;
	selected_cards = [];
}