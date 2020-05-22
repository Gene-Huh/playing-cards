// constructor for deck of cards
const suits = ["&clubs", "&diams", "&spades", "&hearts"];
let cardDeck = [];

suits.forEach(suit => {
  for (let cardvalue = 1; cardvalue < 14; cardvalue++) {
    let card = {
      suit: suit,
      value: cardvalue,
      faceUp: true
    };
    switch (suit) {
      case "&clubs":
        card["color"] = "black";
        break;
      case "&spades":
        card["color"] = "black";
        break;
      case "&diams":
        card["color"] = "red";
        break;
      case "&hearts":
        card["color"] = "red";
        break;
    };

    switch (cardvalue) {
      case 1:
        card["name"] = "A";
        break;
      case 11:
        card["name"] = "J";
        break;
      case 12:
        card["name"] = "Q";
        break;
      case 13:
        card["name"] = "K";
        break;
      default:
        card["name"] = cardvalue;
        break;
    }
    cardDeck.push(card);
  }
});

export default cardDeck;