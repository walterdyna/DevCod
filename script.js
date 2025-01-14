const courses = [
    {
        id: 1,
        title: "Introdução ao HTML",
        quiz: [
            { question: "O que significa HTML?", options: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language"], answer: 1 },
            { question: "Qual a tag usada para criar uma lista não ordenada?", options: ["ul", "ol", "li"], answer: 0 },
            { question: "Qual a tag que é usada para incluir uma imagem?", options: ["image", "img", "picture"], answer: 1 },
            { question: "Qual é o atributo usado para alterar o fundo de uma página?", options: ["bgcolor", "background", "color"], answer: 1 },
            { question: "Qual a tag usada para criar um link?", options: ["a", "link", "href"], answer: 0 },
            { question: "O que significa a sigla -> div?", options: ["Division", "Document Variable", "Dynamic Variable"], answer: 0 },
            { question: "Qual a tag que define uma seção de navegação?", options: ["header", "nav", "footer"], answer: 1 },
            { question: "Como se define um título de nível 1 em HTML?", options: ["h1", "heading", "title"], answer: 0 },
            { question: "Como se define um parágrafo em HTML?", options: ["p", "para", "paragraph"], answer: 0 },
            { question: "O que significa a sigla -> meta?", options: ["Meta informação", "Metadados", "Metadocumento"], answer: 1 }
        ]
    },
    {
        id: 2,
        title: "Fundamentos do CSS",
        quiz: [
            { question: "O que significa CSS?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"], answer: 1 },
            { question: "Como se define a cor de fundo de uma página?", options: ["background-color", "bgcolor", "color"], answer: 0 },
            { question: "Qual a tag usada para definir a largura de uma caixa?", options: ["width", "size", "container"], answer: 0 },
            { question: "Como se define a margem de um elemento?", options: ["margin", "padding", "space"], answer: 0 },
            { question: "Qual a propriedade usada para definir o tipo de fonte?", options: ["font-type", "font-family", "font-size"], answer: 1 },
            { question: "Como se aplica uma borda arredondada?", options: ["border-radius", "round-border", "corner-radius"], answer: 0 },
            { question: "Qual é a propriedade para centralizar texto?", options: ["text-align", "align-text", "center-text"], answer: 0 },
            { question: "Como se define a cor do texto?", options: ["color", "text-color", "font-color"], answer: 0 },
            { question: "Qual a unidade de medida usada para fontes?", options: ["px", "pt", "em"], answer: 2 },
            { question: "Como se altera a visibilidade de um elemento?", options: ["display", "visibility", "show"], answer: 1 }
        ]
    },
    {
        id: 3,
        title: "Fundamentos de JavaScript",
        quiz: [
            { question: "Qual é o valor de 'typeof null' em JavaScript?", options: ["'object'", "'null'", "'undefined'"], answer: 0 },
            { question: "Qual a diferença entre '==' e '===' em JavaScript?", options: ["'==' compara valores e tipos, enquanto '===' compara apenas os valores", "'==' compara apenas os valores, enquanto '===' compara valores e tipos", "'==' e '===' têm o mesmo comportamento"], answer: 1 },
            { question: "Qual é o resultado de 5 + '5' em JavaScript?", options: ["55", "10", "Erro"], answer: 0 },
            { question: "Como se define uma função em JavaScript?", options: ["function minhaFuncao()", "def minhaFuncao()", "func minhaFuncao()"], answer: 0 },
            { question: "O que é um closure em JavaScript?", options: ["Uma função dentro de outra função que tem acesso a variáveis da função externa", "Uma variável global acessível em qualquer lugar do código", "Uma estrutura de dados para armazenar objetos"], answer: 0 },
            { question: "Qual comando é usado para exibir informações no console?", options: ["console.log()", "print()", "echo()"], answer: 0 },
            { question: "O que é o 'hoisting' em JavaScript?", options: ["A elevação de variáveis e funções para o topo do seu escopo", "A manipulação de eventos no DOM", "A conversão de tipos de dados"], answer: 0 },
            { question: "O que é o 'this' em JavaScript?", options: ["Uma referência ao objeto atual", "A palavra-chave para declarar variáveis", "Uma função que cria objetos"], answer: 0 },
            { question: "Qual é o propósito do método 'Array.prototype.map()'?", options: ["Criar um novo array com base em uma transformação dos elementos do array original", "Alterar o array original", "Reverter a ordem dos elementos em um array"], answer: 0 },
            { question: "Qual é a diferença entre 'var', 'let' e 'const' em JavaScript?", options: ["'var' tem escopo de função, 'let' e 'const' têm escopo de bloco", "'var' tem escopo de bloco, 'let' e 'const' têm escopo global", "'let' e 'const' são usados apenas para constantes"], answer: 0 }
        ]
    }
];

const courseList = document.getElementById("courseList");
const quizContainer = document.getElementById("quizContainer");
const quizTitle = document.getElementById("quizTitle");
const quizQuestion = document.getElementById("quizQuestion");
const quizResult = document.getElementById("quizResult");
const nextButton = document.getElementById("nextButton");

const certificateModal = document.getElementById("certificateModal");
const certificateDetails = document.getElementById("certificateDetails");
const closeCertificate = document.getElementById("closeCertificate");

let currentCourse = null;
let currentQuestionIndex = 0;
let score = 0;

courseList.addEventListener("click", (e) => {
    if (e.target.classList.contains("course-item")) {
        const courseId = parseInt(e.target.dataset.course);
        startQuiz(courseId);
    }
});

nextButton.addEventListener("click", nextQuestion);
closeCertificate.addEventListener("click", () => {
    certificateModal.style.display = "none";
});

function startQuiz(courseId) {
    currentCourse = courses.find(course => course.id === courseId);
    currentQuestionIndex = 0;
    score = 0;
    quizResult.style.display = "none";
    nextButton.style.display = "block";
    showQuestion();
    quizContainer.classList.add("active");
}

function showQuestion() {
    const question = currentCourse.quiz[currentQuestionIndex];
    quizTitle.textContent = currentCourse.title;
    quizQuestion.innerHTML = `
        <p>${question.question}</p>
        <ul>
            ${question.options.map((opt, index) => `<li><button onclick="checkAnswer(${index})">${opt}</button></li>`).join("")}
        </ul>
    `;
}

function checkAnswer(selectedIndex) {
    const correctIndex = currentCourse.quiz[currentQuestionIndex].answer;
    if (selectedIndex === correctIndex) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentCourse.quiz.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizQuestion.innerHTML = "";
    quizResult.style.display = "block";

    if (score >= currentCourse.quiz.length * 0.7) {
        const studentName = prompt("Por favor, insira seu nome:");
        quizResult.innerHTML = `
            <p>Parabéns, ${studentName}! Você passou com ${score} de ${currentCourse.quiz.length} pontos!</p>
            <button onclick="generateCertificate('${studentName}')">Gerar Certificado</button>
        `;
    } else {
        quizResult.textContent = `Você marcou ${score} de ${currentCourse.quiz.length} pontos. Tente novamente!`;
    }

    nextButton.style.display = "none";
}

function generateCertificate(studentName) {
    certificateModal.style.display = "flex";
    certificateDetails.innerHTML = `
        <p>Parabéns, ${studentName}!</p>
        <p>Você concluiu com sucesso o curso: <strong>${currentCourse.title}</strong></p>
        <p>Pontuação: ${score} de ${currentCourse.quiz.length}</p>
        <p>Instituição: DevCod</p>
        <p>Data: ${new Date().toLocaleDateString()}</p>
    `;
}
