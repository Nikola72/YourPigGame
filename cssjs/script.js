'use strict';

// Selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const after = document.querySelector('.after');
const btnCloseModal = document.querySelector('.close-modal');
const title = document.querySelector('.title');
const textAfter = document.getElementById('after--text');
const overlay = document.querySelector('.overlay');
const name0 = document.querySelector('.name0');
const name1 = document.querySelector('.name1');

const quote1 = ['easy', 'as expected', 'Domination!!!', 'sit down', 'next...'];
const quote2 = [
  'luck',
  'cheeting',
  "ain't gonna happen again",
  'lame',
  'next one is a loss',
];

let scores, currentScore, activePlayer, playing, username0, username1;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  username0 = prompt('Enter 1st player name');
  username1 = prompt('Enter 2nd player name');
  name0.textContent = username0;
  name1.textContent = username1;

  diceEL.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};
init();

const openModal = function () {
  setTimeout(function () {
    after.classList.remove('hidden');
    overlay.classList.remove('hidden');
  }, 1200);
};
const closeModal = function () {
  after.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !after.classList.contains('hidden')) {
    closeModal();
  }
});

const winnerFirst = function () {
  var randomText1 = quote1[Math.floor(Math.random() * quote1.length)];
  textAfter.innerHTML = randomText1;
};
const winnerSecond = function () {
  var randomText2 = quote2[Math.floor(Math.random() * quote1.length)];
  textAfter.innerHTML = randomText2;
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};
// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dices/dice-${dice}.png`;

    // 3. Check for rolled 1: if true,
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current result to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2.Check if player's score is >=100
    if (scores[activePlayer] >= 10) {
      // Finish game
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      if (activePlayer === 0) {
        winnerFirst();
      } else {
        winnerSecond();
      }
      openModal();
    } else {
      switchPlayer();
    }
  }
  // Switch to the next player
});

btnNew.addEventListener('click', init);
