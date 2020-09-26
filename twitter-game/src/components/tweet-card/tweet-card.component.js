import React from 'react'
import './tweet-card.styles.css'
import img from './unknown.png'

const TweetCard = ({tweet, qNum}) => (
    <div className="tweet-card">
        <div className="top-third">
            <img src={img} alt=""/>
            <div className="question-num">
                <h3>{`Q${qNum}`}</h3>
            </div>
        </div>
        <div className="tweet-container">
            <p>{`"${tweet}"`}</p>
        </div>
    </div>
)

export default TweetCard;