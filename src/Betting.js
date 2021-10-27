import { useState } from "react/cjs/react.development"

const Betting = () => {

    const [playerMoney, setPlayerMoney] = useState(100)
    const [bet, setBet] = useState(0)

    const add = () => {
        const addition = playerMoney - 10
        let addBet = bet + 10;
        if(playerMoney > 0) {
            setPlayerMoney(addition)
            setBet(addBet)
        } else {
            alert("out of cash")
        }
    }

    const minus = () => {
        const subtraction = playerMoney + 10
        let minusBet = bet - 10;
        if(bet > 0) {
            setPlayerMoney(subtraction)
            setBet(minusBet)
        } else {
            alert("Add to the bet first")
        }
    }

    return(
        <div className="userBettingInterface">
            <h3>Player's Money : ${playerMoney}</h3>
            <h4>Bet Amount: ${bet}</h4>
            <div className="buttonContainer">
                <button onClick={() => add()} >+</button>
                <button onClick={() => minus()}>-</button>
            </div>
        </div>
    )
}

export default Betting