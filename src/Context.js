import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    const [quizData, setQuizData] = useState([])
    const [gameOn, setGameOn] = useState(true)
    const [playAgain, setPlayAgain] = useState(false)
    
    
    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                startGame(data.results)
            })
    }, [playAgain])
    
    function startGame(data) {
        setGameOn(true)
        setPlayAgain(false)
        setQuizData(
            data.map(quiz => ({
                question: quiz.question,
                answers: shuffleArray([...quiz.incorrect_answers, quiz.correct_answer]),
                correctAnswer: quiz.correct_answer,
                selectedAnswer: "",
                isCorrect : false
            }))
        )
    }  
    
    function shuffleArray(arr) {
        return arr.sort(() => (Math.random() > .5) ? 1 : -1)
    }
    
    function decodeHtml(html) {
            const txt = document.createElement('textarea')
            txt.innerHTML = html
            return txt.value
    } 
    
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
    
    
    
    return (
        <Context.Provider value={{
            quizData,
            shuffleArray,
            decodeHtml,
            toggleSelectedAnswer,
            submitQuiz,
            gameOn,
            restartGame,
            calculateScore
            }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}