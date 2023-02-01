import React, {useEffect, useState} from "react"

import Question from "../components/Question"
import Answers from "../components/Answers"
import {shuffleArray, decodeHtml} from "../utils/index"

export default function Quiz() {
    const [quizData, setQuizData] = useState([])
    const [filterOptions, setFilterOptions] = useState({category: "", difficulty: "", quantity: 0})
    const [submitFilters, setSubmitFilters] = useState(false)
    const [gameOn, setGameOn] = useState(false)

    useEffect(() => {
        const {category, difficulty, quantity} = filterOptions

        fetch(`https://opentdb.com/api.php?amount=${quantity}&category=${category}&difficulty=${difficulty}&type=multiple`)
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
            })
            .catch(err => console.error(err))
    }, [submitFilters]) 

    function submitQuiz() {
        setGameOn(false)
    }

    function restartGame() {
        setSubmitFilters(false)
        setFilterOptions({category: "", difficulty: "", quantity: 0})
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
        setGameOn(true)
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
    
    function renderQuiz(data) {
        return data.map(questionObj => {
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
                                quiz={questionObj}
                                decodeHtml={decodeHtml}
                                gameOn={gameOn}
                                toggleSelectedAnswer={toggleSelectedAnswer}
                            />
                        </div>
                    </div>
                </div>
            )
        })
    } 
    
    return (
        <main>
            {submitFilters ? null : 
            <form>
                <select
                    id="quantity"
                    value={filterOptions.quantity}
                    onChange={handleChange}
                    className="filter-quantity"
                    name="quantity"
                    aria-label="Filter quiz by number of questions"
                >
                    <option value={0}>--Select Number of Questions--</option>
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                </select>

                <select
                    id="category"
                    value={filterOptions.category}
                    onChange={handleChange}
                    className="filter-category"
                    name="category"
                    aria-label="Filter quiz by category"
                >
                    <option value={""}>--Select a Category--</option>
                    <option value={9}>General Knowledge</option>
                    <option value={10}>Books</option>
                    <option value={11}>Film</option>
                    <option value={12}>Music</option>
                    <option value={13}>Musicals & Theater</option>
                    <option value={14}>Television</option>
                    <option value={15}>Video Games</option>
                    <option value={16}>Board Games</option>
                    <option value={17}>Science & Nature</option>
                    <option value={18}>Computers</option>
                    <option value={19}>Math</option>
                    <option value={20}>Mythology</option>
                    <option value={21}>Sports</option>
                    <option value={22}>Geography</option>
                    <option value={23}>History</option>
                    <option value={24}>Politics</option>
                    <option value={25}>Art</option>
                    <option value={26}>Celebrities</option>
                    <option value={27}>Animals</option>
                    <option value={28}>Vehicles</option>
                    <option value={29}>Comics</option>
                    <option value={30}>Gadgets</option>
                    <option value={31}>Japanese Anime</option>
                    <option value={32}>Cartoons</option>
                </select>
                
                <select
                    id="difficulty"
                    value={filterOptions.difficulty}
                    onChange={handleChange}
                    className="filter-difficulty"
                    name="difficulty"
                    aria-label="Filter quiz by difficulty"
                >
                    <option value="">--Select Difficulty--</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button onClick={handleSubmit}>Submit</button>
            </form>}
            
                {quizData.length > 0 ? renderQuiz(quizData) : 
                <p className="select-options-text">Please select quiz options above</p>}

                <p>{submitFilters ? gameOn ? null : 
                `You scored ${calculateScore()} out of ${filterOptions.quantity}!` : 
                null}</p>

                {submitFilters ? <button onClick={gameOn ? submitQuiz : restartGame}>{gameOn ? "Submit Quiz" : "Play Again?"}</button> : null}
        </main>
    )
}