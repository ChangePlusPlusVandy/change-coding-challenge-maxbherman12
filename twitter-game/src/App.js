import React from 'react';
import './App.css';

import CustomButton from './components/custom-button/custom-button.component'
import LoadingAnimation from './components/loading-animation/loading-animation.component';
import TweetCard from './components/tweet-card/tweet-card.component'
import ScoreBoard from './components/scoreboard/scoreboard.component'

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      account1Tweets: [],
      account2Tweets: [],
      user1: "kanyewest",
      user2: "elonmusk",
      currIndex: 0,
      numCorrect: 0,
      numRemaining: 25,
      gameover: true
    }
    this.checkCorrect = this.checkCorrect.bind(this)
  }

  componentDidMount(){
    var myHeaders = new Headers();
    myHeaders.append("authorization", "Bearer AAAAAAAAAAAAAAAAAAAAAB35HgEAAAAAWyLSpTNpHSbODz8pRNZ5cZhtmsE%3DqaeIM5VbHx8MTDmcnRaQXQjZFfxA68llaa0xnHU9DMPrFdli9Z");
    myHeaders.append("Cookie", "personalization_id=\"v1_9B/M2gVw/CVvOvcOjGtxtw==\"; guest_id=v1%3A160023447840116953");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
     fetch(`/1.1/statuses/user_timeline.json?screen_name=${this.state.user1}&include_rts=false&count=3200`, requestOptions)
      .then(response => response.json())
      .then(result => this.setState({account1Tweets: result}))
      .catch(error => console.log('error', error));

      fetch(`/1.1/statuses/user_timeline.json?screen_name=${this.state.user2}&include_rts=false&count=3200`, requestOptions)
      .then(response => response.json())
      .then(result => this.setState({account2Tweets: result}))
      .catch(error => console.log('error', error));
  }

  checkCorrect = async (id, selectionID) => {
    if(this.state.numRemaining > 1){ //checks that this tweet is not last tweet
      if(id === selectionID){
        this.setState({numCorrect: this.state.numCorrect+1})
      }
      this.setState({currIndex: this.state.currIndex + 1,
        numRemaining: this.state.numRemaining - 1  
      })
    }
    else{
      if(id === selectionID){
        await this.setState({
          numCorrect: this.state.numCorrect+1,
          numRemaining: this.state.numRemaining - 1
        })
        alert(`Congrats. Your score was ${this.state.numCorrect + 1}/25. Click the restart button to play again!`)
      }
      else{
        alert(`Congrats. Your score was ${this.state.numCorrect}/25. Click the restart button to play again!`)
      }
    }
  }

  restartGame = () => {
    this.setState({
      currIndex: 0,
      numCorrect: 0,
      numRemaining: 25
    })
  }

  render(){
    const {account1Tweets, account2Tweets, currIndex} = this.state;
    var allTweets = [...account1Tweets, ...account2Tweets]
    allTweets = allTweets.map(element => {
      return {
        user: element.user.screen_name,
        text: element.text
      }
    }).filter(el => !el.text.toLowerCase().includes("http"))
      .filter(el => !el.text.includes("@"))
      .filter(el => !el.text.includes("&"))
      .sort(() => Math.random() - 0.5);
    return (
      <div className="app">
        <h1>Who Tweeted It?</h1>
          <div className="game">
            <CustomButton onClick={() => this.checkCorrect(this.state.user1, allTweets[currIndex].user)}>{`@${this.state.user1}`}</CustomButton>
            {
              allTweets.length > 0 ? 
              <TweetCard qNum={currIndex + 1} tweet={allTweets[currIndex].text}/> 
              :
              <LoadingAnimation />
            }
              <CustomButton onClick={() => this.checkCorrect(this.state.user2, allTweets[currIndex].user)}>{`@${this.state.user2}`}</CustomButton>
          </div>
            <ScoreBoard correct={this.state.numCorrect} remaining={this.state.numRemaining}/>
            <CustomButton onClick={this.restartGame}>Restart</CustomButton>
      </div>
    );
  }
}

export default App;
