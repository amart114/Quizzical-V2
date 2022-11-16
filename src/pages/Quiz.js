import React, {useContext} from "react"
import {Context} from "../Context"

import Question from "../components/Question"
import Answers from "../components/Answers"

export default function Quiz() {
    const {quizData, decodeHtml, gameOn, submitQuiz, calculateScore, restartGame} = useContext(Context)
    
    const quizElements = quizData.map(questionObj => {
        return (
            <div>
            
                <div className="question-container">
                    <Question 
                        question={decodeHtml(questionObj.question)}
                    />
                </div>
                
                <div className="answers-container">
                    <Answers 
                        possibleAnswers={questionObj.answers}
                        selectedAnswer={questionObj.selectedAnswer}
                        correctAnswer={questionObj.correctAnswer}
                    />
                </div>
                
            </div>
        )
    })
    return (
        <main>
            {quizElements}
            <p>{gameOn ? null : `You scored ${calculateScore()} out of 5!`}</p>
            <button onClick={gameOn ? submitQuiz : restartGame}>{gameOn ? "Submit Quiz" : "Play Again?"}</button>
        </main>
    )
}