let AnswersParent = document.getElementById("Answers")
let currentQNo = 0
let score = 0
let answerData = localStorage.getItem("answers").split(",")
let questionData = JSON.parse(localStorage.getItem("questions"))
let totalQuestionsNo = questionData.questions.length
//                                   *Navigation*
function gotoNextQuestion(event) {
    currentQNo++
    console.log(currentQNo)
    if (currentQNo < totalQuestionsNo) {
        document.getElementById("questionContainer" + currentQNo).scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    } else {
        currentQNo = totalQuestionsNo - 1
        // enable save button

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
        //show end of quiz, some css anim to the question and the submit button
        console.log('start')
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

function genMCQ(data, userAns, i) {
    let questionDiv = document.createElement("div")
    questionDiv.classList.add("question")
    questionDiv.id = "questionContainer" + i
    let h4 = document.createElement("h4")
    h4.textContent = data.content
    questionDiv.appendChild(h4)
    data.options.forEach(function (option) {
        let optionContainer = document.createElement('div')
        optionContainer.classList.add("option")
        let emoji = ""
        // add the emoji and styling
        if (option == data.ans)
            if (userAns == "Skipped") {
                console.log(`mcq ${i} skipped`)
                emoji = "➖"
                optionContainer.classList.add("skipped")
            }
            else if (userAns == data.ans) {
                console.log(`mcq ${i} correct`)
                score += questionData.questions[i].posMarks
                emoji = "☑️"
                optionContainer.classList.add("correct")
            }
        if (userAns != data.ans && userAns == option) {
            console.log(`mcq ${i} incorrect`)
            score -= questionData.questions[i].negMarks
            emoji = "❎"
            optionContainer.classList.add("wrong")
        } else if (option == data.ans && userAns != data.ans) {
            emoji = "☑️"
            optionContainer.classList.add("correct")
        }
        optionContainer.textContent = `${emoji} ${option}`
        questionDiv.appendChild(optionContainer)
    })
    AnswersParent.appendChild(questionDiv)
}

function genFIB(data, userAns, i) {
    console.log(data, ",", userAns)
    let questionDiv = document.createElement("div")
    questionDiv.classList.add("question")
    questionDiv.id = "questionContainer" + i
    AnswersParent.appendChild(questionDiv)

    let content = document.createElement("h4")

    let contentBeforeBlank = document.createElement("span")
    contentBeforeBlank.textContent = data.contentBeforeBlank
    content.appendChild(contentBeforeBlank)

    let answer = document.createElement("span")
    answer.classList.add("blank")
    let emoji = ""

    if (userAns == "skipped") {
        emoji = "➖"
        answer.textContent = emoji + " " + data.ans
        answer.classList.add("skipped")
    }
    else if (userAns == data.ans) {
        score += questionData.questions[i].posMarks
        emoji = "☑️"
        answer.textContent = emoji + userAns
        answer.classList.add("correct")
    }
    else if (userAns != data.ans) {
        score -= questionData.questions[i].negMarks
        emoji = "❎"
        answer.textContent = emoji + userAns
        answer.classList.add("wrong")
    }
    content.appendChild(answer)

    let contentAfterBlank = document.createElement("span")
    contentAfterBlank.textContent = data.contentAfterBlank
    content.appendChild(contentAfterBlank)

    questionDiv.appendChild(content)
}

function genINT(data, userAns, i) {
    console.log(data, userAns, i)
    let questionDiv = document.createElement("div")
    questionDiv.classList.add("question")
    questionDiv.id = "questionContainer" + i
    AnswersParent.appendChild(questionDiv)

    let questionText = document.createElement("h4")
    questionText.textContent = data.content
    questionDiv.appendChild(questionText)

    let answer = document.createElement("div")
    answer.classList.add("num")
    questionDiv.appendChild(answer)
    console.log(data, ",", userAns)
    if (userAns == "skipped") {
        emoji = "➖"
        answer.textContent = emoji + " " + data.ans
        answer.classList.add("skipped")
    }
    else if (userAns == data.ans) {
        emoji = "☑️"
        score += questionData.questions[i].posMarks
        answer.textContent = emoji + userAns
        answer.classList.add("correct")
    }
    else if (userAns != data.ans) {
        emoji = "❎"
        score -= questionData.questions[i].negMarks
        answer.textContent = emoji + userAns
        answer.classList.add("wrong")
    }
}


let i = 0
answerData.forEach(function (ans) {
    let questionType = questionData.questions[i].type;
    if (questionType == "MCQ" || questionType == "TF") {
        genMCQ(questionData.questions[i], ans, i)
    } else if (questionType == "FIB") {
        genFIB(questionData.questions[i], ans, i)
    } else if (questionType == "NUM" || questionType == "INT") {
        console.log("INT:", ans)
        genINT(questionData.questions[i], ans, i)
    }
    i++
})
document.getElementById("score").textContent = score