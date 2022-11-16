import React from "react"
import {Link} from "react-router-dom"

export default function Start() {
    return (
        <div className="start-main">
            <h1>Quizzical</h1>
            <p>A 5 question trivia game</p>
            <Link to="/quiz">Start Quiz</Link>
        </div>
    )
}