document.addEventListener("DOMContentLoaded", () => {
   //select global variables to work with
   const btnRoll = document.querySelector(".btn-roll");
   const btnHold = document.querySelector(".btn-hold");
   const btnNewGame = document.querySelector(".btn-new");

   let scores, roundScore, activePlayer, gamePlaying, previousDiceRoll;

   initial();

   //function initial reset all scores, hide dice
   function initial() {
      //reset all player's scores
      scores = [0, 0]; // array of scores for player 1 and 2
      roundScore = 0;
      activePlayer = 0;
      gamePlaying = true;

      //hide dice
      hideDice();

      //reset player's global score
      document.querySelector(".score-0").textContent = "0";
      document.querySelector(".score-1").textContent = "0";

      //reset player's current(round) score
      document.querySelector(".current-score-0").textContent = "0";
      document.querySelector(".current-score-1").textContent = "0";

      //remove active class from player's panel
      document.querySelector(".player-0-panel").classList.remove("active");
      document.querySelector(".player-1-panel").classList.remove("active");

      //return original player's name
      document.querySelector(".name-0").textContent = "Player 1";
      document.querySelector(".name-1").textContent = "Player 2";

      //remove  winning class from player's panel
      document.querySelector(".player-0-panel").classList.remove("winner");
      document.querySelector(".player-1-panel").classList.remove("winner");

      //clear input field from any value
      document.querySelector(".dice__winning-score-input").value = "";

      //add active class to a first player (always active at the beginning of the game)
      document.querySelector(".player-0-panel").classList.add("active");
   }

   //function nextPlayer() calls when a certain player roll 1 on a dice
   function nextPlayer() {
      //change an active player
      activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

      //reset round score
      roundScore = 0;

      //reset a round score of a certain player
      document.querySelector(".current-score-0").textContent = "0";
      document.querySelector(".current-score-1").textContent = "0";

      //change (toggle) active class in player panel 1 or 2 when change a player
      document.querySelector(".player-0-panel").classList.toggle("active");
      document.querySelector(".player-1-panel").classList.toggle("active");

      //hide dice
      hideDice()
   }

   function hideDice() {
      const dices = document.querySelectorAll(".dice-img");
      dices.forEach(dice => {
         dice.style.display = "none";
      })

   }

   btnRoll.addEventListener("click", () => {
      if (gamePlaying) {
         //create random number to display on  2 dices
         let dice1 = Math.floor(Math.random() * 6) + 1;
         let dice2 = Math.floor(Math.random() * 6) + 1;

         //display a random number on the screen
         let diceImgDisplayed = document.querySelectorAll(".dice-img");
         diceImgDisplayed.forEach(img => {
            img.style.display = "block";
         })
         document.querySelector(".dice-img--1").src = "img/dice-" + dice1 + ".png";
         document.querySelector(".dice-img--2").src = "img/dice-" + dice2 + ".png";
         
         
         if (dice1 !== 1 && dice2 !== 1) { // if dice not a 1 then add  round scores
            roundScore += dice1 + dice2;
            document.querySelector(".current-score-" + activePlayer).textContent = roundScore;
         } else { // else next player turn
            nextPlayer()
         }
      }

   });

   btnHold.addEventListener("click", () => {
      if (gamePlaying) {

         //get value of input field
         const InputWinningScore = document.querySelector(".dice__winning-score-input").value;
         let winningScore;

         //add round score to a global score
         scores[activePlayer] += roundScore;

         //update global scores in a global interface
         document.querySelector(".score-" + activePlayer).textContent = scores[activePlayer];

         //check if there is a value in input field
         if (InputWinningScore) {
            winningScore = InputWinningScore;
         } else {
            winningScore = 100;
         }

         //check if player won a game
         if (scores[activePlayer] >= winningScore) {
            //change a player name to a Winner!
            document.querySelector(".name-" + activePlayer).textContent = "~ Winner! ~";
            //hide dice
            hideDice()

            //adding winning class to a winner and remove active
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");

            //reset a current score
            document.querySelector(".current-score-" + activePlayer).textContent = "0";

            //stop the game
            gamePlaying = false;

         } else {
            nextPlayer();
         }

      }

   });

   btnNewGame.addEventListener("click", initial); // call initial function on click to btn-new in order to reset all scores

});
