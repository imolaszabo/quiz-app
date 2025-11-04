import React from "react"
import StartPage from "./StartPage"
import QuestionPage from "./QuestionPage"

export default function App() {
// state variables
const [isStartPageShown, setIsStartPageShown] = React.useState(true)
const [ data, setData ] = React.useState([])
const [ selectedAnswers, setSelectedAnswers] = React.useState([])
const [score, setScore] = React.useState(0)
const [isFormSubmitted, setIsFormSubmitted] = React.useState(false)

// functions
function startQuiz() {
        fetch("https://opentdb.com/api.php?amount=5")
        .then(res => res.json())
        .then(data => setData(data.results))
        setIsStartPageShown(false)
    }
    
function handleAnswerSelect(questionId, item) {
    setSelectedAnswers(prev => ({...prev, [questionId]: item}))
}

function handleSubmit(e) {
    e.preventDefault()
    setIsFormSubmitted(true)
    data.forEach(
        (question, index) => {
            if (selectedAnswers[index] === question.correct_answer) {
                setScore(prevScore => prevScore+1) 
            }})}
            
function restartGame() {
    setIsStartPageShown(true)
    setData([])
    setSelectedAnswers([])
    setScore(0)
    setIsFormSubmitted(false)
}

// return
    return (
    <main>
        {isStartPageShown && <StartPage startQuiz={startQuiz}/>}
        {!isStartPageShown && (
              <form onSubmit={handleSubmit}>
                    {data.map((question, index) => (
                        <QuestionPage 
                            key={index}
                            questionData={question} 
                            questionId={index}
                            onAnswerSelect={handleAnswerSelect}
                            selectedAnswer={selectedAnswers[index]}
                            isCorrect={selectedAnswers[index] === question.correct_answer}
                            isFormSubmitted={isFormSubmitted}
                        />
                ))}
                <div id="final">
                    
                    {isFormSubmitted ?
                        <>
                            <button onClick={restartGame}>Play again</button>
                            <span>{`You scored ${score}/${data.length} correct answers`}</span>
                        </>
                        : <button type="submit">Check answers</button>
                    }
                </div>
            </form>)}
    </main>)}