const Loss = (props) => {

    const lossReset = () => {
        props.reset()
    }

    return(
        <div>
            <h2>You Lose</h2>
            <p>Your Score: {props.pScore} Dealer Score: {props.dScore}</p>
            <button onClick={() => lossReset()}>Play Again</button>
        </div>
    )
}

export default Loss