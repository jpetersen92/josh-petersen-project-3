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
    })
  }

  // Get and display scores on screen
  useEffect( () => {
    getScore(playerHand, setPlayerScore, dealerHand, setDealerScore)
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

  const getScore = (player, setPlayer, dealer, setDealer) => {
    displayScore(player, setPlayer);
    displayScore(dealer, setDealer)
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
      }if(i === "ACE"){
        const remove = array.indexOf(i)
        array[remove] = "1"
      }
    })

    const numberArray = array.map((i) => Number(i));

    for (let i = 0; i < numberArray.length; i++) {
      sum += numberArray[i];
    }

    set(sum)
  }

  return (
    <div className={"table"}>
      <h1>♠️ ♥️ React Jack ♣️ ♦️</h1>
      <button onClick={() => startDraw()}>Start Game</button>

      {/* Dealer Score */}
      <div className="score">
        <p>Dealer: {dealerScore}</p>
      </div>

      {/* Dealer hand */}
      <Cards player={dealerHand} />

      <div className="deck">
      <h2>{cardCount}</h2>
      </div>

      {/* Player Hand */}
      <Cards player={playerHand} />
      
      <div className="interface">
      <button onClick={() => hit()}>Hit</button>
      </div>

      {/* Player Score */}
      <div className="score">
        <p>Player: {playerScore}</p>
      </div>

    </div>
  );
}

export default App;
