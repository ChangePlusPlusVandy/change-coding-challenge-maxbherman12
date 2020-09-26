import React from 'react'
import './scoreboard.styles.css'

const ScoreBoard = ({correct, remaining}) => (
    <div className="score-board">
        <h2>Score</h2>
        <h4>{`Correct: ${correct}/${25-remaining}`}</h4>
    </div>
)

export default ScoreBoard;