import axios from "axios";


const Hit = (props) => {
    const hit = () => {
        axios({
            method: 'GET',
            url: `${props.url}${props.id}/draw/`,
            dataResponse: 'json',
            params: {
                count: 1
            }
        }).then( (res) => {
            props.setCard(res.data.remaining);
            props.setPHand([...props.hand, res.data.cards[0]])
        })
    }
    return(
        <button onClick={() => hit()}>Hit</button>
    )
}

export default Hit