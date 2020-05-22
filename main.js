import cardDeck from "./cardDeck.js";

document.addEventListener('DOMContentLoaded', ()=> {
  //draw card deck
  const cardGrid = document.getElementById('card-display');
  const btnGroup = document.getElementById('btn-group');
  const shuffleBtn = document.getElementById('shuffleCards');
  const splitBtn = document.getElementById('splitDeck');

  shuffleBtn.addEventListener('click', event=>{
    event.stopPropagation();
    const allDivs = cardGrid.querySelectorAll('.card');
    shuffleCards(allDivs, cardGrid);
  });

  splitBtn.addEventListener('click', event=>{
    event.stopPropagation();
    splitDeck();
  })

  drawCardDeck();

  function drawCardDeck() {
    cardDeck.forEach(card => {
      const newDiv = document.createElement('div');
      newDiv.classList.add('card', card.color);
      if (card.faceUp) {newDiv.classList.add('faceUp')};
      newDiv.id = `${card.suit}${card.name}`;
      const name = document.createElement('span');
      name.innerHTML = `${card.suit};${card.name}`;
      newDiv.appendChild(name);
      newDiv.addEventListener('click', event => {
        event.stopPropagation();
        if (newDiv.classList.contains('faceUp')){
          newDiv.classList.remove('faceUp')
        } else {
          newDiv.classList.add('faceUp');
        }
      })
      cardGrid.appendChild(newDiv);
    })
  }

  function shuffleCards(cards, container) {
    let cardArr = [];
    cards.forEach(card => cardArr.push(card));
    cardArr.sort(()=> Math.random() -0.5);
    cardArr.forEach(card => container.appendChild(card));
    return cardArr;
  };

  function splitDeck() {
    const cardDivs = cardGrid.querySelectorAll('.card');
    let newCards = shuffleCards(cardDivs);
    const halfDeck = Math.floor(newCards.length/2);
    let leftDeck = newCards.slice(0,halfDeck);
    let rightDeck = newCards.slice(halfDeck);
 
    cardGrid.appendChild(createHalf(leftDeck, "Left"));
    cardGrid.appendChild(createHalf(rightDeck, "Right"));

    //const leftSide = document.getElementById('Left').children;
  }

  function createHalf(cards, side) {
    const halfDeck = document.createElement('div');
    halfDeck.id = side;
    halfDeck.classList.add('card-grid');

    const halfShuffleBtn =document.createElement('button');
    halfShuffleBtn.innerText = `Shuffle ${side}`;
    halfShuffleBtn.id = `Shuffle-${side}`;
    btnGroup.appendChild(halfShuffleBtn);
    cards.forEach(card => halfDeck.appendChild(card));
    halfShuffleBtn.addEventListener('click', event=>{
      event.stopPropagation();
      const theseCards = halfDeck.querySelectorAll('.card');
      const thisHalf = document.getElementById(halfDeck.id);
      console.log(theseCards);
      shuffleCards(theseCards, thisHalf);
    })

    return halfDeck;
  }
});