export const randomCards = (cards) => {
    let randomArray = [];
    
    for (let i = 0; i < 10; i++) {
      let randomNumber = Math.floor(Math.random() * cards.length);
      randomArray.push(randomNumber);
    }

    return randomArray.map(el => cards[el])
}