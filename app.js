const quizData = [
    { question: "Which of the following is a client site language?", a: "Java", b: "C", c: "Python", d: "JavaScript", correct: "d" },
    { question: "What does HTML stand for?", a: "Hypertext Markup Language", b: "Cascading Style Sheet", c: "Jason Object Notation", d: "Helicopters Terminals Motorboats Lamborginis", correct: "a" },
    { question: "What year was JavaScript launched?", a: "1996", b: "1995", c: "1994", d: "none of the above", correct: "b" },
    { question: "What does CSS stands for?", a: "Hypertext Markup Language", b: "Cascading Style Sheet", c: "Jason Object Notation", d: "Helicopters Terminals Motorboats Lamborginis", correct: "b" }
];

let index = 0;
let correct = 0;
const total = quizData.length;
const questionBox = document.getElementById("questionBox");
const allInputs = document.querySelectorAll("input[type='radio']");
const progress = document.getElementById("progress");

const loadQuestion = () => {
    if (total === index) {
        return quizEnd();
    }
    reset();
    const data = quizData[index];
    questionBox.innerHTML = `${index + 1}) ${data.question}`;
    allInputs[0].nextElementSibling.innerText = data.a;
    allInputs[1].nextElementSibling.innerText = data.b;
    allInputs[2].nextElementSibling.innerText = data.c;
    allInputs[3].nextElementSibling.innerText = data.d;
    progress.style.width = `${(index / total) * 100}%`;
};

document.querySelector("#submit").addEventListener("click", () => {
    const data = quizData[index];
    const ans = getAnswer();
    if (ans === data.correct) {
        correct++;
    }
    index++;
    document.querySelector(".container").classList.add("fade-out");
    setTimeout(() => {
        loadQuestion();
        document.querySelector(".container").classList.remove("fade-out");
    }, 500);
});

const getAnswer = () => {
    let ans;
    allInputs.forEach(inputEl => {
        if (inputEl.checked) {
            ans = inputEl.value;
        }
    });
    return ans;
};

const reset = () => {
    allInputs.forEach(inputEl => {
        inputEl.checked = false;
    });
};

const quizEnd = () => {
    let message = "";
    let className = "";
    const scorePercentage = (correct / total) * 100;
    if (scorePercentage >= 75) {
        message = "Great job! You have a strong understanding!";
        className = "good";
    } else {
        message = "Don't worry! Keep practicing and you'll improve!";
        className = "bad";
    }
    document.querySelector(".container").innerHTML = `
        <div class="result">
            <h3>You've scored ${correct} out of ${total}</h3>
            <canvas id="resultChart"></canvas>
            <p class="message ${className}">${message}</p>
        </div>
    `;
    displayChart(scorePercentage);
};

const displayChart = (scorePercentage) => {
    const ctx = document.getElementById('resultChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Correct', 'Incorrect'],
            datasets: [{
                data: [scorePercentage, 100 - scorePercentage],
                backgroundColor: ['#28a745', '#dc3545']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                        }
                    }
                }
            }
        }
    });
};

loadQuestion();