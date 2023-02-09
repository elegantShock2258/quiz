let currentQNo = 0
let answers = []
let questions = questionData.questions
let totalQuestionsNo = questionData.questions.length
let height = window.innerHeight
let lastScroll = 0

let body = document.getElementById("Questions")
let nextButton = document.getElementById('next')
let previousButton = document.getElementById('previous')

document.getElementById('title').textContent = questionData.title

//                                   *Navigation*
function gotoNextQuestion(event) {
    currentQNo++
    console.log(currentQNo)
    if (currentQNo < totalQuestionsNo) {
        document.getElementById("questionContainer" + currentQNo).scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    } else {
        currentQNo = totalQuestionsNo - 1
        console.log('end')
    }
}
function gotoPrevQuestion(event) {
    (currentQNo != 0) ? currentQNo-- : currentQNo = 0
    console.log(currentQNo)
    if (currentQNo > -1) {
        document.getElementById("questionContainer" + currentQNo).scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    } else {
        currentQNo = 0
    }
}

document.addEventListener("keypress", function onEvent(event) {
    if (event.key === "k")
        gotoPrevQuestion()
    else if (event.key === "j")
        gotoNextQuestion()

});
document.addEventListener("keydown", function onEvent(event) {
    if (event.key === "ArrowLeft")
        gotoPrevQuestion()
    else if (event.key === "ArrowRight")
        gotoNextQuestion()

});
nextButton.onclick = gotoNextQuestion
previousButton.onclick = gotoPrevQuestion
//                                  *setting questions*
addQuestions()
document.getElementById("questionContainer0").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })

function addQuestions() {
    questions.forEach(function (e) {
        setQuestion(e)
        currentQNo++
    })
    currentQNo = 0
}
function setQuestion(currentQuestionData) {
    let parentDiv = document.createElement('div')
    parentDiv.id = "questionContainer" + currentQNo
    parentDiv.classList.add("questionContainer")
    let questionText = document.createElement('div')
    questionText.classList.add('question')
    questionText.textContent = currentQuestionData.content
    parentDiv.appendChild(questionText)

    if (currentQuestionData.type == 'MCQ') {
        let optionsContainer = document.createElement('div')
        optionsContainer.classList.add('optionsContainer')
        currentQuestionData.options.forEach(function (option) {

            let optionContainer = document.createElement('div')
            optionContainer.id = "optionContainer" + currentQNo
            optionContainer.classList.add("optionContainer")

            let optionElement = document.createElement('input')
            optionElement.setAttribute('type', 'radio')
            optionElement.setAttribute('name', 'question' + currentQNo)
            optionElement.setAttribute('value', option)

            let labelElement = document.createElement('label')
            labelElement.textContent = "\t" + option

            optionContainer.appendChild(optionElement)
            optionContainer.appendChild(labelElement)

            optionsContainer.appendChild(optionContainer)
        })
        parentDiv.appendChild(optionsContainer)
    } else if (currentQuestionData.type == 'FIB') {
        questionText.id = "FIBText"
        let prevTextElement = document.createElement('span')
        prevTextElement.textContent = currentQuestionData.contentBeforeBlank;
        questionText.appendChild(prevTextElement)

        let blankElement = document.createElement('input')
        blankElement.setAttribute('type', 'text')
        blankElement.setAttribute('size', currentQuestionData.size)
        blankElement.setAttribute('maxlength', currentQuestionData.size)
        blankElement.classList.add("FIB")
        questionText.appendChild(blankElement)

        let nextTextElement = document.createElement('span')
        nextTextElement.textContent = currentQuestionData.contentAfterBlank;
        questionText.appendChild(nextTextElement)
    } else if (currentQuestionData.type == 'TF') {
        ["True", "False"].forEach(function (option) {

            let optionContainer = document.createElement('div')
            optionContainer.id = "optionContainer" + currentQNo
            optionContainer.classList.add("optionContainer")

            let optionElement = document.createElement('input')
            optionElement.setAttribute('type', 'radio')
            optionElement.setAttribute('name', 'question' + currentQNo)
            optionElement.setAttribute('value', option)

            let labelElement = document.createElement('label')
            labelElement.textContent = "\t" + option

            optionContainer.appendChild(optionElement)
            optionContainer.appendChild(labelElement)

            parentDiv.appendChild(optionContainer)
        })
    } else if (currentQuestionData.type == 'INT') {
        questionText.id = "number"
        let blankElement = document.createElement('input')
        blankElement.setAttribute('type', 'number')
        blankElement.setAttribute('size', currentQuestionData.size)
        blankElement.setAttribute('maxlength', currentQuestionData.size)
        blankElement.classList.add("FIB")
        questionText.appendChild(blankElement)
    } else if (currentQuestionData.type == 'NUM') {
        questionText.id = "number"
        let blankElement = document.createElement('input')
        blankElement.setAttribute('type', 'text')
        blankElement.setAttribute('size', currentQuestionData.size)
        blankElement.setAttribute('maxlength', currentQuestionData.size)
        blankElement.classList.add("FIB")
        blankElement.setAttribute('pattern', '^[1-9]\\d{0,2}(\\.\\d{3})*(,\\d+)?$')
        questionText.appendChild(blankElement)

    }
    body.appendChild(parentDiv)
}

function saveAns() {
    let questionParents = document.querySelectorAll('div[class=questionContainer]');
    let i = 0;
    for (const questionDiv of questionParents) {
        let questionType = questionData.questions[i].type
        // console.log(i,questions[i],questionType)
        if (questionType == "MCQ" || questionType == "TF") {
            let radioButtons = questionDiv.querySelectorAll('input[type=radio]')
            let gotAns = false
            for (const radioButton of radioButtons)
                if (radioButton.checked) {
                    gotAns = true
                    answers.push(radioButton.value)
                }
            if (!gotAns) answers.push("Skipped")
        } else if (questionType == "FIB") {
            let blank = questionDiv.querySelectorAll('input[type=text]')
            if (blank[0].value.length == 0)
                answers.push("skipped")
            else
                answers.push(blank[0].value)
        } else if (questionType == "INT") {
            let num = questionDiv.querySelectorAll('input[type=number]')
            if (num[0].value.length == 0)
                answers.push("skipped")
            else
                answers.push(num[0].value)
        } else if (questionType == "NUM") {
            let num = questionDiv.querySelectorAll('input[type=text]')
            if (num[0].value.length == 0)
                answers.push("skipped")
            else
                answers.push(num[0].value)
        } else {
            answers.push("skipped")
        }
        i++;
    }
    console.log(answers,JSON.stringify(questionData))
    localStorage.setItem("answers", answers)
    localStorage.setItem("questions",JSON.stringify(questionData))
    location.href = 'response.html'
}