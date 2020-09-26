import React from 'react'
import './loading-animation.styles.css'

const LoadingAnimation = () => (
    <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <span>Loading Content</span>
    </div>
)

export default LoadingAnimation;