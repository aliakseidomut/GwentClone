export const randomCards = (cards) => {
    let randomArray = [];
    
    while (randomArray.length < 10) {
      let randomNumber = Math.floor(Math.random() * cards.length);
      if (!randomArray.includes(randomNumber)) {
        randomArray.push(randomNumber);
      }
    }

    return randomArray.map(el => cards[el])
}