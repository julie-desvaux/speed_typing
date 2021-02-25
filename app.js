const APICALL = "http://api.quotable.io/random";
const displayTime = document.querySelector(".time");
const displayScore = document.querySelector(".score");

const sentenceToWrite = document.querySelector(".sentence-to-write");
const sentenceTest = document.querySelector(".sentence-test");
let spanCorrect = document.querySelectorAll(".correct").length;

let time = 60;
let scoreTemp = 0;
let score = scoreTemp + spanCorrect;

displayTime.innerText = `Temps : ${time}`;
displayScore.innerText = `Score : ${score}`;

const timeFn = () => {
	time--;
	displayTime.innerText = `Temps : ${time}`;
	if (time === 0) {
		clearInterval(timer);
		sentenceTest.disabled = true;
	}
};

let timer = setInterval(timeFn, 1000);

const displayNewSentence = async () => {
	const callApi = await fetch(APICALL);
	const results = await callApi.json();
	const sentence = results.content;

	sentenceToWrite.innerHTML = "";

	sentence.split("").forEach((character) => {
		const characterSpan = document.createElement("span");
		characterSpan.innerText = character;
		sentenceToWrite.appendChild(characterSpan);
	});
	sentenceTest.value = null;
};
displayNewSentence();

sentenceTest.addEventListener("input", () => {
	const arraySentence = sentenceToWrite.querySelectorAll("span");
	const arrayTest = sentenceTest.value.split("");
	let correct = true;

	arraySentence.forEach((characterSpan, index) => {
		const character = arrayTest[index];
		if (character == null) {
			characterSpan.classList.remove("correct");
			characterSpan.classList.remove("incorrect");
			correct = false;
		} else if (character === characterSpan.innerText) {
			characterSpan.classList.add("correct");
			characterSpan.classList.remove("incorrect");
		} else {
			characterSpan.classList.add("incorrect");
			characterSpan.classList.remove("correct");
			correct = false;
		}

		spanCorrect = document.querySelectorAll(".correct").length;
		spanCorrect += scoreTemp;
		displayScore.innerText = `Score : ${spanCorrect}`;
		console.log("score", score);
	});

	if (correct === true) {
		scoreTemp = document.querySelectorAll(".correct").length;
		displayScore.innerText = `Score : ${scoreTemp}`;
		displayNewSentence();
	}
});
