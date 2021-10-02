const Cards = (props) => {
    return(
        <div className="hand">
            {
            props.player.map( (cards) => {
                return (
                <img key={cards.code} src={cards.image} alt={`${cards.value} of ${cards.suit}`}/>
                )
            })
            }
        </div>
    )
}

export default Cards