import React from 'react';
import './App.css';

import CustomButton from './components/custom-button/custom-button.component'

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      account1Tweets: [],
      account2Tweets: [],
      user1: "kanyewest",
      user2: "elonmusk"
    }
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

  render(){
    const {account1Tweets, account2Tweets} = this.state;
    const filtered1 = account1Tweets.map(element => element.text).filter(el => !el.toLowerCase().includes("http")).filter(el => !el.toLowerCase().includes("@"));
    const filtered2 = account2Tweets.map(element => element.text).filter(el => !el.toLowerCase().includes("http")).filter(el => !el.toLowerCase().includes("@"));
    return (
      <div className="app">
        <CustomButton>{`@${this.state.user1}`}</CustomButton>
        <CustomButton>{`@${this.state.user2}`}</CustomButton>
      </div>
    );
  }
}

export default App;
