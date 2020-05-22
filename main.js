import cardDeck from "./cardDeck.js";

document.addEventListener('DOMContentLoaded', ()=> {
  //draw card deck
  //const cardGrid = document.getElementById('card-display');
  const btnGroup = document.getElementById('btn-group');
  const shuffleAllBtn = document.getElementById('shuffleCards');
  const splitBtn = document.getElementById('splitDeck');
  const leftSide = document.getElementById('Left');
  const rightSide = document.getElementById('Right');
  const leftShuffleBtn = document.getElementById('left-Shuffle');
  const rightShuffleBtn = document.getElementById('right-Shuffle');

  shuffleAllBtn.addEventListener('click', event=>{
    event.stopPropagation();
    rightSide.querySelectorAll('.card').forEach(card=>leftSide.appendChild(card));
    shuffleCards(leftSide.childNodes, leftSide);
    splitBtn.setAttribute('style', 'visibility:visible;');
    leftShuffleBtn.setAttribute('style', 'visibility:hidden;');
    rightShuffleBtn.setAttribute('style', 'visibility:hidden;');
    leftSide.classList.remove('card-grid');
  });

  splitBtn.addEventListener('click', event=>{
    event.stopPropagation();
    splitDeck();
  })

  leftShuffleBtn.addEventListener('click', event=>{
    event.stopPropagation();
    shuffleCards(leftSide.childNodes, leftSide);
  });
  rightShuffleBtn.addEventListener('click', event=>{
    event.stopPropagation();
    shuffleCards(rightSide.childNodes, rightSide);
  });

  createCardDeck();

  function createCardDeck() {
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
      leftSide.appendChild(newDiv);
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
    const cardDivs = leftSide.querySelectorAll('.card');
    let newCards = shuffleCards(cardDivs, leftSide);
    const halfDeck = Math.floor(newCards.length/2);
    for (let i=0; i<halfDeck; i++){
      rightSide.appendChild(cardDivs[i]);
    }
    splitBtn.setAttribute('style', 'visibility:hidden;');
    leftShuffleBtn.setAttribute('style', 'visibility:visible;');
    rightShuffleBtn.setAttribute('style', 'visibility:visible;');
    leftSide.classList.add('card-grid');
  }
});