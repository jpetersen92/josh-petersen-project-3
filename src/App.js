// Create a new deck on page load
// Shuffle deck when start button is hit and deal out 2 cards face up to player and 2 cards (1 face up and other face down) to dealer/computer
// Have two buttons:
  // 1. Stay - Players turn ends and we calculate result of game
  // 2. Hit - Player draws another card, if under 21 player can choose to hit again or stay. If over 21 player looses
  // This continues until player clicks stay or looses
// If player ends turn (Stay) computer reveals facedown card
// If computer is under score 17 they will draw again
// If computer goes over 21 they loose
// If computer and player are under 21 closes one wins
// If computer or player get 21 exactly they automaticly win

import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Cards from './Cards';
// import Score from './Score';


function App() {

  // USESTATES
  const baseUrl = 'https://deckofcardsapi.com/api/deck/'
  const [deckId, setDeckId] = useState('')
  const [cardCount, setCardCount] = useState(0)
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])
  const [playerScore, setPlayerScore] = useState(0)
  const [dealerScore, setDealerScore] = useState(0)
  const [startGame, setStartGame] = useState(true)
  const [loadCards, setLoadCards] = useState(false)

  // Game Load - load new shuffled deck from api
  useEffect( () => {
    gameLoad();
  }, [])

  const gameLoad = () => {
    axios({
      method: 'GET',
      url: `${baseUrl}new/shuffle`,
      dataResponse: 'json'
    }).then( (res) => {
      setDeckId(res.data.deck_id);
      setCardCount(res.data.remaining)
      setStartGame(true)
      setLoadCards(false)
    })   
  }

  // Start game on button click
  // deals two cards to player and two cards to dealer
  const startDraw = () => {
    axios({
      method: 'GET',
      url: `${baseUrl}${deckId}/draw/`,
      dataResponse: 'json',
      params: {
        count: 4
      }
    }).then( (res) => {
      setCardCount(res.data.remaining);
      setPlayerHand([res.data.cards[0], res.data.cards[2]])
      setDealerHand([res.data.cards[1], res.data.cards[3]])
      setStartGame(false)
      setLoadCards(true)
    })
  }

  // Get and display scores on screen
  useEffect( () => {
    // getScore(playerHand, playerScore, dealerHand, dealerScore)
    
    displayScore(playerHand, setPlayerScore)
    displayScore(dealerHand, setDealerScore)
  }, [playerHand, dealerHand])
  
  // Hit button adds one card to the screen and updates the score
  const hit = () => {
    axios({
      method: 'GET',
      url: `${baseUrl}${deckId}/draw/`,
      dataResponse: 'json',
      params: {
        count: 1
      }
    }).then( (res) => {
      setCardCount(res.data.remaining);
      setPlayerHand([...playerHand, res.data.cards[0]])
    })
  }

  const dealerDeal = () => {
    axios({
      method: 'GET',
      url: `${baseUrl}${deckId}/draw/`,
      dataResponse: 'json',
      params: {
        count: 1
      }
    }).then( (res) => {
      setCardCount(res.data.remaining);
      setDealerHand([...dealerHand, res.data.cards[0]])
      // setTimeout(function(){ console.log(dealerScore); }, 3000);
    })
  }


  const stay = () => {
    // if dealer score is >= 17 then dealer stands and score is added up.
    // if dealer score is < 17 then dealer draws one card and continues to draw until score is >= to 17

    if(dealerScore >= 17){
      finalScore();
    } else {
      dealerDeal();
    }
  }

  // const getScore = (player, pScore,  dealer, dScore) => {
  //   displayScore(player, pScore);
  //   displayScore(dealer, dScore)
  // }


  const resetGame = () => {
    setPlayerScore(0)
    setDealerScore(0)
    setCardCount(0)
    setPlayerHand([])
    setDealerHand([])
    gameLoad();
  }
  // function for adding all the card values together and adding sending them to be displayed
  // Changed the sting values of the face cards to numbers
  const displayScore = (cards, set) => {
    let array = []
    let sum = 0;
    cards.map( (value) => {
      return(
        array.push(value.value)
      )
    })
    array.forEach( (i) => {
      if(i === "QUEEN" || i === "KING" || i === "JACK"){
        const remove = array.indexOf(i)
        array[remove] = "10"
      } else if(i === "ACE"){
        const remove = array.indexOf(i)
        array[remove] = "11"
      } 
    })

    const numberArray = array.map((i) => Number(i));

    for (let i = 0; i < numberArray.length; i++) {
      sum += numberArray[i];
    }
    set(sum)
  }

  const actionResult = (score) => {
    if(score > 21) {
      resetGame();
      alert(`You Lose, your score of ${playerScore} is over 21`)
    }
  }
  actionResult(playerScore)

  const finalScore = () => {
    if(playerScore === 21) {
      resetGame();
      alert(`You Won! - You: ${playerScore} Dealer: ${dealerScore}`)
    } if(dealerScore > 21){
      resetGame();
      alert(`You Won! - You: ${playerScore} Dealer: ${dealerScore}`)
    } if(playerScore > dealerScore){
      resetGame();
      alert(`You Won! - You: ${playerScore} Dealer: ${dealerScore}`)
    } if(playerScore < dealerScore){
      resetGame();
      alert(`You Loose - You: ${playerScore} Dealer: ${dealerScore}`)
    } if (playerScore === dealerScore){
      resetGame();
      alert(`It's a Draw - You: ${playerScore} Dealer: ${dealerScore}`)
    }
  }

  return (
    <div className={"table"}>
      <h1>♠️ ♥️ React Jack ♣️ ♦️</h1>

      {
        startGame === true 
        ? <button onClick={() => startDraw()}>Start Game</button>
        : <></>
      }


      {
        loadCards === true
        ? <>
            {/* Dealer Score */}
            <div className="score">
              <p>Dealer: {dealerScore}</p>
            </div>

            <div className="game">
            <div className="deck">
            <h2>{cardCount}</h2>
            </div>
            <div className="playable">
              {/* Dealer hand */}
              <Cards player={dealerHand} />

              {/* Player Hand */}
              <Cards player={playerHand} />
            </div>
            </div>
            
            <div className="interface">
            <button onClick={() => hit()}>Hit</button>
            <button onClick={() => stay()}>Stay</button>
            </div>

            {/* Player Score */}
            <div className="score">
              <p>Player: {playerScore}</p>
            </div>
          </>
        
        : <></>
      }

      <footer>
        <p>Created at <a href="https://junocollege.com/">Juno College</a></p>
      </footer>

    </div>
  );
}

export default App;
