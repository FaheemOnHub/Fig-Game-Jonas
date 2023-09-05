'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
score0El.textContent = 0;
score1El.textContent = 0;
let currentScore = 0;
let activePlayer = 0;
diceEl.classList.add('hidden');
let playing = true;
//Code for New Game
const start = btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  playing = true;
});
// To Stop the game when the score of any player >100
const winner = function () {
  const score0 = Number(document.getElementById('score--0').textContent);
  const score1 = Number(document.getElementById('score--1').textContent);

  if (score0 >= 100 || score1 >= 100) {
    playing = false;
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  }
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      winner();
    } else {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      if (activePlayer == 0) {
        activePlayer = 1;
      } else {
        activePlayer = 0;
      }
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    document.getElementById(`score--${activePlayer}`).textContent =
      Number(document.getElementById(`score--${activePlayer}`).textContent) +
      Number(currentScore);
    winner();
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;

    if (activePlayer == 0) {
      activePlayer = 1;
    } else {
      activePlayer = 0;
    }
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
  }
});
