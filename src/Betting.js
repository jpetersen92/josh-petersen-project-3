const Betting = (props) => {

    const add = () => {
        const addition = props.cash - 10
        let addBet = props.bet + 10;
        if(props.cash > 0) {
            props.setCash(addition)
            props.setBet(addBet)
        }
    }

    const minus = () => {
        const subtraction = props.cash + 10
        let minusBet = props.bet - 10;
        if(props.bet > 0) {
            props.setCash(subtraction)
            props.setBet(minusBet)
        }
    }

    return(
        <div className="userBettingInterface">
            <h3>Player's Money : ${props.cash}</h3>
            <h4>Bet Amount: ${props.bet}</h4>
            { props.start === true                ?
            <div className="buttonContainer">
                <button onClick={() => add()} >+</button>
                <button onClick={() => minus()}>-</button>
            </div>
                : null
            }
        </div>
    )
}

export default Betting