
let currentQNo = 0
let answers = []
let questions = questionData.questions
let totalQuestionsNo = questionData.qNo

let body = document.getElementById("Questions")
let nextButton = document.getElementById('next')
let previousButton = document.getElementById('previous')
//                                   *Navigation*
// set first question
nextButton.onclick = function (event) {
    currentQNo++
    console.log(currentQNo)
    if (currentQNo < totalQuestionsNo) {
        // save answers and set option
        saveAns(currentQNo)
        document.getElementById("questionContainer"+currentQNo).scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
        // scroll by 100% height down
    } else {
        currentQNo = totalQuestionsNo -1
        // enable save button
        //show end of quiz, some css anim to the question and the submit button
        console.log('end')
    }
}
previousButton.onclick = function (event) {
    (currentQNo!=0)?currentQNo--:currentQNo = 0
    console.log(currentQNo)
    if (currentQNo > -1) {
        saveAns(currentQNo)
        document.getElementById("questionContainer"+currentQNo).scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    } else {
        currentQNo = 0
        //show end of quiz, some css anim to the question and the submit button
        console.log('start')
    }
}
addQuestions()
document.getElementById("questionContainer0").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})

//                                  *setting questions*
// setQuestion(questions[0])
function addQuestions() {
    questions.forEach(function (e) {
        setQuestion(e)
        currentQNo++
    })
    currentQNo = 0
}
function setQuestion(currentQuestionData) {
    let parentDiv = document.createElement('div')
    parentDiv.id = "questionContainer"+currentQNo
    parentDiv.classList.add("questionContainer")
    let questionText = document.createElement('div')
    questionText.id = 'question'
    questionText.textContent = currentQuestionData.content
    parentDiv.appendChild(questionText)

    if (currentQuestionData.qtype == 'MCQ') {
        currentQuestionData.options.forEach(function (option) {
            let optionContainer = document.createElement('div')
            optionContainer.id = "optionContainer"+currentQNo
            optionContainer.classList.add("optionContainer")
            let optionElement = document.createElement('input')
            optionElement.setAttribute('type', 'radio')
            optionElement.setAttribute('name', 'question'+currentQNo)
            optionElement.setAttribute('value',option)

            let labelElement = document.createElement('label')
            labelElement.textContent = "\t" + option


            optionContainer.appendChild(optionElement)
            optionContainer.appendChild(labelElement)

            parentDiv.appendChild(optionContainer)
            body.appendChild(parentDiv)
        })
    }
}
function saveAns(i){
    let question = document.getElementById("optionContainer"+i)
    let radioButtons = question.querySelectorAll('input[type="radio"]'); 
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            answers[i].push(radioButton.value)
            break;
        }
    }
}