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
            <h3 className="cash">Player's Money : ${props.cash}</h3>
            <h4 className="pot">Bet Amount: ${props.bet}</h4>
            { props.start === true                
            ?
            <>
            <p className="placeBet">Please Place Your Bet</p>
            <div className="buttonContainer">
                <button onClick={() => add()} >+ $10</button>
                <button onClick={() => minus()}>- $10</button>
            </div>
            </>
                : null
            }
        </div>
    )
}

export default Betting