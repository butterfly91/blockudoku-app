<template>
   <div class="board">
      <game-panel
         :score="game.score"
         :gameOver="game.gameOver"
         @new-game="newGame"
      ></game-panel>
      <game-board
         :board="game.board"
         :drag="drag"
         @drag-enter="dragEnter"
         @piece-drop="pieceDrop"
      ></game-board>
      <game-pieces
         :pieces="game.pieces"
         @drag-start="dragStart"
         @drag-end="dragEnd"
         @rotate="rotate"
      ></game-pieces>
   </div>
</template>

<script>
import GameBoard from "./components/GameBoard.vue";
import GamePanel from "./components/GamePanel.vue";
import GamePieces from "./components/GamePieces.vue";
import { Game } from "./game.js";

export default {
   data() {
      return {
         game: new Game(),
         draggedPieceIndex: null,
         shiftX: null,
         shiftY: null,
         drag: this.emptyBoard(),
      };
   },
   computed: {
      piece() {
         if (this.draggedPieceIndex)
            return this.game.pieces[this.draggedPieceIndex];
         else return null;
      },
   },
   components: {
      GameBoard,
      GamePanel,
      GamePieces,
   },
   methods: {
      emptyBoard() {
         return Array(9)
            .fill(0)
            .map(() => Array(9).fill(0));
      },
      dragStart(index, shiftX, shiftY) {
         this.draggedPieceIndex = index;
         this.shiftX = shiftX;
         this.shiftY = shiftY;
      },
      dragEnd() {
         this.drag = this.emptyBoard();
      },
      dragEnter(__i, __j) {
         this.drag = this.emptyBoard();
         let piece = this.game.pieces[this.draggedPieceIndex].array;
         let _i = __i - this.shiftY;
         let _j = __j - this.shiftX;
         if (this.game.checkIfFits(piece, _i, _j)) {
            for (let i = 0; i < piece.length; i++) {
               for (let j = 0; j < piece[i].length; j++) {
                  this.drag[i + _i][j + _j] |= piece[i][j];
               }
            }
         }
      },
      pieceDrop(__i, __j) {
         let pieceIndex = this.draggedPieceIndex;
         let _i = __i - this.shiftY;
         let _j = __j - this.shiftX;
         this.game.makeMove(pieceIndex, _i, _j);
      },
      rotate(index) {
         this.game.rotatePiece(index);
      },
      newGame() {
         this.game = new Game();
         this.draggedPieceIndex = null;
         this.shiftX = null;
         this.shiftY = null;
         this.drag = this.emptyBoard();
      },
   },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap");
* {
   box-sizing: border-box;
}

body {
   font-family: "Open Sans";
   margin: 0;
}

.board {
   margin-top: 2rem;
   display: flex;
   justify-content: space-evenly;
}
</style>
