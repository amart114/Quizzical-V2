import React, {useEffect, useState} from "react"

import Question from "../components/Question"
import Answers from "../components/Answers"

export default function Quiz() {
    const [quizData, setQuizData] = useState([])
    const [filterOptions, setFilterOptions] = useState({category: "", difficulty: "", })
    const [submitFilters, setSubmitFilters] = useState(false)
    const [gameOn, setGameOn] = useState(true)
    const [playAgain, setPlayAgain] = useState(false)

    console.log(quizData, submitFilters)

    useEffect(() => {
        
        const {category, difficulty} = filterOptions

        fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`)
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
    }, [playAgain, submitFilters]) 

    function startGame(data) {
        setGameOn(true)
        setPlayAgain(false)
    } 

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
        setSubmitFilters (false)
    }

    function restartGame() {
        setGameOn(true)
        setPlayAgain(true)
        // setSubmitFilters(false)
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

    function handleChange(event) {
        setFilterOptions(prevFilterOptions => {
            return {
                ...prevFilterOptions,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleSubmit() {
        setSubmitFilters(true)
    }
    
    const quizElements = quizData.map(questionObj => {
        
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
            <form>
                <select
                    id="category"
                    value={filterOptions.category}
                    onChange={handleChange}
                    className="filter-category"
                    name="category"
                    aria-label="Filter quiz by category"
                >
                    <option value={9}>General Knowledge</option>
                    <option value={10}>Entertainment: Books</option>
                    <option value={11}>Entertainment: Film</option>
                </select>
                <select
                    id="difficulty"
                    value={filterOptions.difficulty}
                    onChange={handleChange}
                    className="filter-difficulty"
                    name="difficulty"
                    aria-label="Filter quiz by difficulty"
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button onClick={handleSubmit}>Submit</button>
            </form>
            {submitFilters ? quizElements : null}
            <p>{gameOn ? null : `You scored ${calculateScore()} out of 5!`}</p>
            <button onClick={gameOn ? submitQuiz : restartGame}>{gameOn ? "Submit Quiz" : "Play Again?"}</button>
        </main>
    )
}