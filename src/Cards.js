const Cards = (props) => {
    return(
        <div className="player">
            {
            props.player.map( (cards) => {
                return (
                <img key={cards.code} src={cards.image} alt={`${cards.value} of ${cards.suit}`}/>
                )
            })
            }

            <div className="score">
            <p>{props.score}</p>
            </div>
        </div>
    )
}

export default Cards