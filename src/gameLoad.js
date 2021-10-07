import axios from "axios";

 // Function to load game with Deck of Card API call
const gameLoad = (baseUrl,setDeckId,setCardCount, setStartGame, setLoadCards) => {
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

export default gameLoad