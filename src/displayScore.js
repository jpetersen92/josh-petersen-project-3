 // function for adding all the card values together and adding sending them to be displayed
  // Changed the sting values of the face cards to numbers
const displayScore = (cards, set) => {
    let array = []
    let sum = 0;
    cards.map( (value) => {
        return(
            array.push(value.value)
        )
        })
        array.forEach( (i) => {
        if(i === "QUEEN" || i === "KING" || i === "JACK"){
            const remove = array.indexOf(i)
            array[remove] = "10"
        } else if(i === "ACE"){
            const remove = array.indexOf(i)
            array[remove] = "11"
        } 
        })

        const numberArray = array.map((i) => Number(i));

        for (let i = 0; i < numberArray.length; i++) {
        sum += numberArray[i];
        }
        set(sum)
}

export default displayScore