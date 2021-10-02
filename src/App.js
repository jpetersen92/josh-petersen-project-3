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


function App() {
  const baseUrl = 'https://deckofcardsapi.com/api/deck/'
  const [deckId, setDeckId] = useState('')
  const [cardCount, setCardCount] = useState(0)
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])
  const [playerScore, setPlayerScore] = useState(0)
  const [dealerScore, setDealerScore] = useState(0)

  // Game Load - load new shuffled deck from api
  useEffect( () => {
    axios({
      method: 'GET',
      url: `${baseUrl}new/shuffle`,
      dataResponse: 'json'
    }).then( (res) => {
      setDeckId(res.data.deck_id);
      setCardCount(res.data.remaining)
    })   
  }, [])

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

      // setPlayerScore(Number(res.data.cards[0].value) + Number(res.data.cards[1].value))
    })
  }
  
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

  const getScore = (player, dealer) => {
    scorePlayer(player);
    scoreDealer(dealer);
  }

  const scorePlayer = (cards) => {
    let cardOne = cards[0].value
    let cardTwo = cards[1].value
    
    if(cardOne === "QUEEN" || cardOne === "KING" || cardOne === "JACK"){
      cardOne = '10'
    } if(cardTwo === "QUEEN" || cardTwo === "KING" || cardTwo === "JACK"){
      cardTwo = '10'
    } if(cardOne === "ACE") {
      cardOne = '1'
    } if(cardTwo === "ACE") {
      cardTwo = '1'
    }
    let total = Number(cardOne) + Number(cardTwo)
    setPlayerScore(total)
  }

  const scoreDealer = (cards) => {
    let cardOne = cards[0].value
    let cardTwo = cards[1].value
    
    if(cardOne === "QUEEN" || cardOne === "KING" || cardOne === "JACK"){
      cardOne = '10'
    } if(cardTwo === "QUEEN" || cardTwo === "KING" || cardTwo === "JACK"){
      cardTwo = '10'
    } if(cardOne === "ACE") {
      cardOne = '1'
    } if(cardTwo === "ACE") {
      cardTwo = '1'
    }
    let total = Number(cardOne) + Number(cardTwo)
    setDealerScore(total)
  }

  return (
    <div>
      <h1>Card Game App</h1>
      <button onClick={() => startDraw()}>Start Game</button>
      <button onClick={() => getScore(playerHand, dealerHand)}>Score</button>

      <div className="dealer">
        <div className="score">
          <p>{dealerScore}</p>
        </div>
      {
          dealerHand.map( (cards) => {
            return (
              <img key={cards.code} src={cards.image} alt={`${cards.value} of ${cards.suit}`}/>
            )
          })
        }
      </div>
      <div className="deck">
      <h2>{cardCount}</h2>
      <button onClick={() => hit()}>Hit</button>
      </div>

      <Cards player={playerHand} score={playerScore}/>

      {/* <div className="player">
        {
          playerHand.map( (cards) => {
            return (
              <img key={cards.code} src={cards.image} alt={`${cards.value} of ${cards.suit}`}/>
            )
          })
        }

        <div className="score">
          <p>{playerScore}</p>
        </div>
      </div> */}

    </div>
  );
}

export default App;
