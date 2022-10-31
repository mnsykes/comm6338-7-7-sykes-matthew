// Your code here
const quiz = document.querySelector("#quiz");
const timer = document.createElement("p");

let correct = 0;
let previousScore;
let questionIndex;
let timerId;
let time;

const questionsArr = [
	{
		question: `What is Rhode Island's nickname?`,
		answer: "Ocean State",
		options: ["Ocean State", "Bay State", "Garden State", "Centenniel State"]
	},
	{
		question: `Idaho's state nickname is:`,
		answer: "Gem State",
		options: ["Free State", "Natural State", "Gem State", "Sunflower State"]
	},
	{
		question: `What is Michigan's state nickname?`,
		answer: "Wolverine State",
		options: ["North Star State", "Wolverine State", "Palmetto State", "Equality State"]
	},
	{
		question: `What is the state nickname of Maine?`,
		answer: "Pine Tree State",
		options: ["Tar Heel State", "Pine Tree State", "Keystone State", "Pelican State"]
	},
	{
		question: `Virginia's state nickname is:`,
		answer: "The Old Dominion",
		options: ["Evergreen State", "Flickertail State", "The Old Dominion", "Land of Enchantment"]
	}
];

const buildQuiz = () => {
	quiz.innerHTML = "";
	let strAnswer = questionsArr[questionIndex].answer;

	const strQuestion = document.createElement("p");
	strQuestion.textContent = questionsArr[questionIndex].question;

	const answerBtns = document.createElement("div");
	questionsArr[questionIndex].options.map((option) => {
		let ansBtn = document.createElement("button");
		ansBtn.className = "ansBtn";
		ansBtn.textContent = option;
		answerBtns.appendChild(ansBtn);

		ansBtn.onclick = (e) => {
			let choice = e.target.textContent;

			if (choice === strAnswer) {
				correct++;
			}
			nextQuestion();
		};
	});

	quiz.appendChild(strQuestion);
	quiz.appendChild(answerBtns);
	quiz.appendChild(timer);

	time = 30;
	timer.textContent = time;
	startTimer(time);
};

const startTimer = (seconds) => {
	quiz.appendChild(timer);
	timerId = setInterval(() => {
		seconds--;
		timer.textContent = seconds;
		if (seconds === -1) {
			nextQuestion();
		}
	}, 1000);
};

const nextQuestion = () => {
	quiz.innerHTML = "";
	questionIndex++;

	if (questionIndex < questionsArr.length) {
		clearInterval(timerId);
		buildQuiz();
	} else {
		clearInterval(timerId);
		endQuiz();
	}
};

const startQuiz = () => {
	questionIndex = 0;
	correct = 0;
	quiz.innerHTML = "";
	previousScore = localStorage.getItem("previous-score");

	let scoreEl = document.createElement("p");
	scoreEl.textContent = `Previous score: ${localStorage.getItem("previous-score")}%`;
	quiz.appendChild(scoreEl);

	const startBtn = document.createElement("button");
	startBtn.setAttribute(`id`, `start-quiz`);
	startBtn.textContent = "Start Quiz!";
	quiz.appendChild(startBtn);

	startBtn.onclick = buildQuiz;
};

const endQuiz = () => {
	let score = Math.round((correct / questionsArr.length) * 100);
	localStorage.setItem("previous-score", score);

	startQuiz();
};

startQuiz();
