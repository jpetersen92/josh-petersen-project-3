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


function App() {
  const baseUrl = 'https://deckofcardsapi.com/api/deck/'
  const [deckId, setDeckId] = useState('')
  const [cardCount, setCardCount] = useState(0)
  const [cardsInPlay, setCardsInPlay] = useState([])
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setdealerHand] = useState([])

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

  const draw = () => {
    axios({
      method: 'GET',
      url: `${baseUrl}${deckId}/draw/`,
      dataResponse: 'json',
      params: {
        count: 4
      }
    }).then( (res) => {
      console.log(res.data.cards);
      setCardCount(res.data.remaining);
      setCardsInPlay(res.data.cards)
    })
  }

  const cardsToPlayer = () => {
    axios({
      method: 'GET',
      url: `${baseUrl}${deckId}/pile/playerHand/add/`,
      dataResponse: 'json',
      params: {
        cards: cardsInPlay[0].code,
        cards: cardsInPlay[2].code
      }
    }).then( (res) => {
      console.log(res);
    })
  }

  const cardsToDealer = () => {
    axios({
      method: 'GET',
      url: `${baseUrl}${deckId}/pile/dealerHand/add/`,
      dataResponse: 'json',
      params: {
        cards: cardsInPlay[1].code
      }
    }).then( (res) => {
      console.log(res.data);
    })
  }


//   const drawCards = (deckId) => {
//     fetch(`${startUrl}${deckId}/draw/?count=4`)
//     .then((res) => {
//       return res.json()})
//     .then((jsonRes) => {
//     })

//     addToPlayerHand(jsonRes.deck_id, jsonRes.code);
//     addToDealerHand(jsonRes.deck_id, jsonRes.code);
// }

// const addToPlayerHand = (deckId, cardCode) => {
//   fetch(`${startUrl}${deckId}/pile/playerHand/add/?cards=${cardCode}`)
//   .then((res) => {
//     return res.json()})
//   .then((jsonRes) => {
//     console.log(jsonRes);
//   })
// }

// const addToDealerHand = (deckId, cardCode) => {
//   fetch(`${startUrl}${deckId}/pile/dealerHand/add/?cards=${cardCode}`)
//   .then((res) => {
//     return res.json()})
//   .then((jsonRes) => {
//     console.log(jsonRes);
//   })
// }


  return (
    <div>
      <h1>Card Game App</h1>
      <button onClick={() => draw()}>Draw</button>
      <button onClick={() => cardsToPlayer()}>player</button>
      <button onClick={() => cardsToDealer()}>dealer</button>
    </div>
  );
}

export default App;
