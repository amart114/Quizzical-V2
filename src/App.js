import React from "react"
import {Routes, Route} from "react-router-dom"

import Start from "./pages/Start"
import Quiz from "./pages/Quiz"


function App() {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Start />} />
                
                <Route path="/quiz"element={<Quiz />} />
            </Routes>
        </div>
    )
}

export default App
