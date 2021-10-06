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
import Hit from './Hit';
import StartGame from './StartGame';


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
  const [clickedStay, setClickedStay] = useState(false)

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
  
  // Get and display scores on screen
  useEffect( () => {
    displayScore(playerHand, setPlayerScore)
    displayScore(dealerHand, setDealerScore)
  }, [playerHand, dealerHand])

  useEffect(()=>{
    if(clickedStay === true){
      if(dealerScore >= 17){
        finalScore(playerScore, dealerScore);
      } else {
        dealerDeal();
      }
    }
  }, )

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
    })

  }


  const stay = () => {
    // if dealer score is >= 17 then dealer stands and score is added up.
    // if dealer score is < 17 then dealer draws one card and continues to draw until score is >= to 17

    setClickedStay(true)

    if(dealerScore >= 17){
      finalScore(playerScore, dealerScore);
    } else {
      dealerDeal();
    }
  }

  const resetGame = () => {
    setPlayerScore(0)
    setDealerScore(0)
    setCardCount(0)
    setPlayerHand([])
    setDealerHand([])
    setClickedStay(false)
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
      alert(`You Lose, your score of ${score} is over 21`)
    }
  }
  actionResult(playerScore)

  const finalScore = (pScore, dScore) => {
    if(pScore === 21) {
      resetGame();
      alert(`You Won! - You: ${pScore} Dealer: ${dScore}`)
    } if(dealerScore > 21){
      resetGame();
      alert(`You Won! - You: ${pScore} Dealer: ${dScore}`)
    } if(pScore > dScore){
      resetGame();
      alert(`You Won! - You: ${pScore} Dealer: ${dScore}`)
    } if(pScore < dScore){
      resetGame();
      alert(`You Loose - You: ${pScore} Dealer: ${dScore}`)
    } if (pScore === dScore){
      resetGame();
      alert(`It's a Draw - You: ${pScore} Dealer: ${dScore}`)
    }
  }

  return (
    <div className={"table"}>
      <h1>♠️ ♥️ React Jack ♣️ ♦️</h1>

      {
        startGame === true 
        ? <StartGame 
          url={baseUrl}
          id={deckId}
          setCard={setCardCount}
          setPHand={setPlayerHand}
          setDHand={setDealerHand}
          setStart={setStartGame}
          setLoad={setLoadCards}
        />
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
              <h2>  {cardCount}</h2>
              </div>
              <div className="playable">
                  {/* Dealer hand */}
                  <Cards player={dealerHand} />
                   {/* Player Hand */}
                  <Cards player={playerHand} />
              </div>
            </div>
              
              <div className="interface">
                <Hit 
                  url={baseUrl}
                  id={deckId}
                  setCard={setCardCount}
                  setPHand={setPlayerHand}
                  hand={playerHand}
                />
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
        <p>Created at <a href="https://junocollege.com/">Juno College | © Josh Petersen</a></p>
      </footer>

    </div>
  );
}

export default App;
