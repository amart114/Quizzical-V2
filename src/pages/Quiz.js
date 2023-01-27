import React, {useEffect, useState} from "react"

import Question from "../components/Question"
import Answers from "../components/Answers"

export default function Quiz() {
    const [quizData, setQuizData] = useState([])
    const [gameOn, setGameOn] = useState(true)
    const [playAgain, setPlayAgain] = useState(false)

    useEffect(() => {

        function startGame(data) {
            setGameOn(true)
            setPlayAgain(false)
        }  

        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
            .then(res => {
                if(!res.ok) {
                    throw Error("Something went wrong")
                }
                return res.json()
            })
            .then(data => {
                setQuizData(
                    data.results.map(quiz => ({
                        question: quiz.question,
                        answers: shuffleArray([...quiz.incorrect_answers, quiz.correct_answer]),
                        correctAnswer: quiz.correct_answer,
                        selectedAnswer: ""
                    }))
                )
                startGame(quizData)
            })
            .catch(err => console.error(err))
    }, [playAgain])

    // const {quizData, decodeHtml, gameOn, submitQuiz, calculateScore, restartGame} = useContext(Context)
    console.log(quizData)

    

    function shuffleArray(arr) {
        return arr.sort(() => (Math.random() > .5) ? 1 : -1)
    }

    function decodeHtml(html) {
        const txt = document.createElement('textarea')
        txt.innerHTML = html
        return txt.value
    } 

    function submitQuiz() {
        setGameOn(false)
    }

    function restartGame() {
        setGameOn(true)
        setPlayAgain(true)
    }

    function calculateScore() {
        let counter = 0
        quizData.forEach(quizObj => {
            if (quizObj.correctAnswer === quizObj.selectedAnswer) {
                counter++
            }
        })
        return counter
    }
    
    const quizElements = quizData.map(questionObj => {
        console.log(questionObj)
        return (
            <div>
                <div className="question-answer-container">
                    
                    <div className="question-container">
                        <Question 
                            question={decodeHtml(questionObj.question)}
                        />
                    </div>
                    
                    <div className="answers-container">
                        <Answers 
                            key={questionObj.question}
                            quiz={questionObj}
                            decodeHtml={decodeHtml}
                            gameOn={gameOn}
                            setQuizData={setQuizData}
                        />
                    </div>

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