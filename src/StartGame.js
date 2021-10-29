import axios from "axios";

// Start game on button click
// deals two cards to player and two cards to dealer
const StartGame = (props) => {
    const startDraw = () => {
        if(props.bet === 0){
            alert('Please Place Bet')
        }else {
            axios({
                method: 'GET',
                url: `${props.url}${props.id}/draw/`,
                dataResponse: 'json',
                params: {
                    count: 4
                }
            }).then( (res) => {
                props.setCard(res.data.remaining);
                props.setPHand([res.data.cards[0], res.data.cards[2]])
                props.setDHand([res.data.cards[1], res.data.cards[3]])
                props.setStart(false)
                props.setLoad(true)
            })
        }
    }
    return (
        <button onClick={() => startDraw()}>Start Game</button>
    )
}

export default StartGame