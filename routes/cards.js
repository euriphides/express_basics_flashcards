const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData'); // { thing } syntax is ES6 for "cards = data.cards, and data = data.data
const { cards } = data;


 router.get('/', (req, res) => {
   const numberOfCards = cards.length;
   const flashcardId = Math.floor(Math.random() * numberOfCards);
   res.redirect(`/cards/${flashcardId}?side=question`);
 });

router.get('/:id',(req, res) => { // ":" says "this is a variable parameter, and "id" is the variable.
   const { side } = req.query;
   const { id } = req.params;
   const text = cards[id][side];
   const { hint } = cards[id];

   const templateData = {id, text, side};
   const name = req.cookies.username;

  if (side === 'question') {
    templateData.hint = hint;
    templateData.sideToShow = 'answer';
    templateData.sideToShowDisplay = 'Answer';
  } else if (side === 'answer') {
    templateData.sideToShow = 'question';
    templateData.sideToShowDisplay = 'Question';
  } else {
    res.redirect(`/cards/${id}?side=question`);
  }

  res.render('card', templateData);
});



module.exports = router;