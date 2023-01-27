import React from "react"

export default function Answers({quiz, decodeHtml, setQuizData, gameOn}) {
    // const {decodeHtml, toggleSelectedAnswer, gameOn} = useContext(Context)
    const {answers,correctAnswer, selectedAnswer } = quiz

    function toggleSelectedAnswer(text){
        setQuizData(prevData => prevData.map(obj => {
            if (obj.selectedAnswer === text) {
                return {
                    ...obj,
                    selectedAnswer: ""
                }
            }
            if(obj.answers.includes(text)) {
                return {
                    ...obj,
                    selectedAnswer: text
                }
            } else {
                return {
                    ...obj
                }
            }
        }))
    }
    
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
            >
                {decodeHtml(answer)}
            </div>
        )
    })
    
}

// {selectedAnswer === answer ? {backgroundColor: "#D6DBF5"} : null}