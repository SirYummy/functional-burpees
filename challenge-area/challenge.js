//Good luck! Maybe start by making that fetch request ;)
const fetchQuestions = async () => {
    const questions = await(await fetch('https://opentdb.com/api.php?amount=10&category=18')).json()
    return questions
}

let triviaQuestions = []
let fixedQuestions = []
let easyQuestions = []
let sortedQuestions = []
let difficultyAggregate = {easy:0,medium:0,hard:0}

fetchQuestions().
    then(questionsResponse => triviaQuestions = questionsResponse.results).
    then(foo => {
        fixHtmlEntities(triviaQuestions)    
        filterNonEasyQuestions(triviaQuestions)
        sortQuestionsByDifficulty(triviaQuestions)
        questionDifficultyCount(triviaQuestions)
        isEveryQuestionCategoryComputerScience(triviaQuestions)
        grabOnlyMediumQuestions(triviaQuestions)
    }).
    catch(e => console.log(e))

const fixHtmlEntities = (triviaQuestions) => {
    fixedQuestions = triviaQuestions.map((question) => {
        question.question = question.question.replace(/&#(\d+);/g, (match, dec) => {
            return String.fromCharCode(dec);
        })
        return question
    })
    console.log('Fixed questions: ', fixedQuestions)
}

const filterNonEasyQuestions = (questions) => {
    easyQuestions = questions.filter(question => question.difficulty === 'easy')
    console.log("Easy questions: ", easyQuestions)
}

const sortQuestionsByDifficulty = (questions) => {
    sortedQuestions = questions.sort((questionA, questionB) => questionA.difficulty > questionB.difficulty)
    console.log("Questions sorted by difficulty: ", sortedQuestions)
}

const questionDifficultyCount = (questions) => {
    let answer = questions.reduce((aggregator = {easy:0,medium:0,hard:0}, currentQuestion) => {
        switch (currentQuestion.difficulty) {
            case 'easy':
                ++aggregator.easy
                break
            case 'medium':
                ++aggregator.medium
                break
            case 'hard':
                ++aggregator.hard
                break
            default:
                break
        }
        return aggregator
    },{easy:0,medium:0,hard:0})
    console.log("Difficulty aggregate: ", answer)
}

const isEveryQuestionCategoryComputerScience = (questions) => {
    let answer = questions.every(question => question.category === "Science: Computers")
    console.log("Is every question category Computer Science?", answer ? 'yes' : 'no')
}

const grabOnlyMediumQuestions = (questions) => {
    let answer = sortByType(
        questions.filter(
            (question) => {
                return question.difficulty === "medium"
            }
        )
    )
    console.log("Only medium questions sorted by type: ", answer)
}

const sortByType = (questions) => {
    let sortedQuestions = questions.sort((questionA, questionB) => questionA.type > questionB.type)
    console.log("Questions sorted by type: ", sortedQuestions)
}