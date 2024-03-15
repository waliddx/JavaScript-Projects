// DOM elements
const questionHolder = document.querySelector(".question-h");
const answerButtons = document.querySelectorAll(".btn");
const message = document.querySelector(".msg");
const nextButton = document.querySelector(".n-btn");

let questionIndex = 0;
let score = 0;
let quiz = [];

function request() {
	fetch("quiz.json")
		.then((response) => {
			if (!response.ok) {
				throw new Error("error accured while loading the page");
			}
			return response.json();
		})
		.then((data) => {
			quiz = data;
			displayQuestion(questionIndex);
			displayAnswers(questionIndex);
		})
		.catch((error) => {
			showMessage(error.message, "red");
		});
}

// display question
function displayQuestion(Qindex) {
	const currentquestion = quiz[Qindex].question;
	questionHolder.textContent = currentquestion;
}

// display answers
function displayAnswers(Aindex) {
	const currentAnswers = quiz[Aindex].answers;
	answerButtons.forEach((button, i) => {
		button.textContent = currentAnswers[i];
	});
}

// check answers
function checkedAnswers(selected) {
	const correctAnswer = quiz[questionIndex].correctAnswerIndex;
	if (questionIndex < quiz.length - 1 && selected === correctAnswer) {
		score++;
		showMessage("Correct !!", "green");
	} else if (questionIndex < quiz.length - 1 && selected !== correctAnswer) {
		showMessage("Incorrect !!", "red");
	} else if (questionIndex === quiz.length - 1 && selected === correctAnswer) {
		score++;
		showMessage("Correct, congrats you finished your quiz", "#001e4d");
		setTimeout(() => {
			if (score === quiz.length)
				showMessage(
					`Perfect!, You got ${score} out of ${quiz.length}!`,
					"#001e4d",
				);
		}, 2000);
	} else if (questionIndex === quiz.length - 1 && selected !== correctAnswer) {
		showMessage("Incorrect, congrats you finished your quiz", "#001e4d");
		setTimeout(() => {
			if (score >= quiz.length / 2) {
				showMessage(
					`Not bad!, You got ${score} out of ${quiz.length}!`,
					"#001e4d",
				);
			} else if (score <= quiz.length / 2) {
				showMessage(
					`You got ${score} out of ${quiz.length}, Better luck next time!`,
					"#001e4d",
				);
			}
		}, 2000);
	}
}

function showMessage(text, color) {
	message.style.display = "block";
	message.textContent = text;
	message.style.color = color;
	nextButton.style.display = "block";
	nextButton.textContent = "next";
	if (color === "red") {
		nextButton.style.disabled = "block";
	} else if (
		color === "#001e4d" ||
		text === "Incorrect, congrats you finished your quiz"
	) {
		nextButton.style.display = "none";
		setTimeout(() => {
			nextButton.textContent = "Start Over";
			nextButton.style.display = "block";
		}, 2000);
	}
}

answerButtons.forEach((button, check) => {
	button.addEventListener("click", () => {
		checkedAnswers(check);
		answerButtons.forEach((btn, i) => {
			const correct = quiz[questionIndex].correctAnswerIndex;
			if (i !== correct && questionIndex <= quiz.length - 1) {
				btn.style.backgroundColor = "#ff9393";
			} else if (i === correct && questionIndex <= quiz.length - 1) {
				btn.style.backgroundColor = "#9aeabc";
			}
			btn.disabled = true;
		});
	});
});

// switch question
nextButton.addEventListener("click", () => {
	if (
		questionIndex <= quiz.length - 1 &&
		nextButton.textContent !== "Start Over"
	) {
		questionIndex++;
		nextButton.style.display = "none";
		message.style.display = "none";
	} else if (
		questionIndex <= quiz.length - 1 &&
		nextButton.textContent === "Start Over"
	) {
		location.reload();
	}
	answerButtons.forEach((btn) => {
		btn.disabled = false;
		btn.style.backgroundColor = "";
	});
	displayQuestion(questionIndex);
	displayAnswers(questionIndex);
});

request();
