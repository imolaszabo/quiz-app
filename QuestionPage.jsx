import {decode} from 'html-entities'
import React from "react"

export default function QuestionPage({ questionData, questionId, onAnswerSelect, selectedAnswer, isFormSubmitted, isCorrect }) {
    
    // Shuffle answers for THIS question
   const [ shuffledAnswers ] = React.useState( () => {
        const randomIndex = Math.floor(Math.random() * 4)
        const firstAnswersArr = questionData.incorrect_answers.slice(0, randomIndex)
        const secondAnswersArr = questionData.incorrect_answers.slice(randomIndex)
        return [...firstAnswersArr, questionData.correct_answer, ...secondAnswersArr]
   })
    
    const buttonElements = shuffledAnswers.map((item, index) => {
        let labelStyling = ""
             if (isFormSubmitted) {
                if (item === questionData.correct_answer) {
                    labelStyling = "correct"
                } else if (item !== questionData.correct_answer && selectedAnswer === item) {
                    labelStyling = "wrong"
                } else {
                    labelStyling = "disabled"
                   }}
           
        return(        
        <label key={index} className={`answer-button ${labelStyling}`}>
            {decode(item, {mode: 'all'})}
            <input 
                required 
                type="radio" 
                name={`question-${questionId}`}  
                value={item}
                onChange={() => onAnswerSelect(questionId, item)}
            />
        </label>)})
    
    return (
        <fieldset>
            <legend className="question">
                {decode(questionData.question, {mode: 'all'})}
            </legend>
            <div className="answers">{buttonElements}</div>
        </fieldset>
    )
}