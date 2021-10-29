const Win = (props) => {

    const winReset = () => {
        props.reset()
        props.setPCash((props.bet * 2) + props.pCash)
    }

    return(
        <div>
            <h2>You Win</h2>
            <p>Your Score: {props.pScore} Dealer Score: {props.dScore}</p>
            <button onClick={() => winReset()}>Play Again</button>
        </div>
    )
}

export default Win