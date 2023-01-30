import React from "react"

export default function Answers({quiz, decodeHtml, toggleSelectedAnswer, gameOn}) {

    const {answers,correctAnswer, selectedAnswer } = quiz
    
    return answers.map(answer => {
        
        function styleGenerator() {
            if (!gameOn) {
                return selectedAnswer === correctAnswer ? 
                selectedAnswer === answer ? {backgroundColor: "green"} : null :
                selectedAnswer === answer ? {backgroundColor: "red"} : null
            } else if (selectedAnswer === answer) {
                return {backgroundColor: "#D6DBF5"}
            } else {
                return null
            }
        }
        
        return (
            <div 
            className="single-answer"
            style = {styleGenerator()}
            onClick={() => toggleSelectedAnswer(answer)}
            disabled={!gameOn}
            >
                {decodeHtml(answer)}
            </div>
        )
    })
    
}

// {selectedAnswer === answer ? {backgroundColor: "#D6DBF5"} : null}