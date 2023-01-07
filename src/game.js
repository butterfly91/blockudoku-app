export class Game {
   constructor() {
      this._board = this.createEmptyBoard();
      this._score = 0;
      this._pieces = this.generateNewPieces();
      this._gameStart = Date.now();
      this._gameOver = false;
   }
   get board() {
      return this._board;
   }
   get score() {
      return this._score;
   }
   get pieces() {
      return this._pieces;
   }
   get gameOver() {
      return this._gameOver;
   }

   rotateArray(array) {
      let n = array.length;
      let m = array[0].length;
      let new_array = Array(m)
         .fill(0)
         .map(() => Array(n).fill(0));
      for (let i = 0; i < m; i++) {
         for (let j = 0; j < n; j++) {
            new_array[i][j] = array[j][m - i - 1];
         }
      }
      return new_array;
   }
   rotatePiece(index) {
      this._pieces[index].array = this.rotateArray(this._pieces[index].array);
   }
   createEmptyBoard() {
      return Array(9)
         .fill(0)
         .map(() => Array(9).fill(0));
   }
   randomPiece() {
      let num = Math.floor(Math.random() * allPieces.length);
      return allPieces[num];
   }
   generateNewPieces(number = 3) {
      let newPieces = Array(number);
      for (let i = 0; i < number; i++) {
         newPieces[i] = {
            array: this.randomPiece(),
            used: false,
         };
      }
      return newPieces;
   }
   checkIfFits(piece, _i, _j) {
      if (_i < 0 || _j < 0 || _i > 8 || _j > 8) return false;
      for (let i = _i; i < _i + piece.length; i++) {
         if (i > 8) return false;
         for (let j = _j; j < _j + piece[0].length; j++) {
            if (j > 8) return false;
            if (piece[i - _i][j - _j] && this._board[i][j]) return false;
         }
      }
      return true;
   }
   checkIfGameOver() {
      for (let i = 0; i < 9; i++) {
         for (let j = 0; j < 9; j++) {
            for (let piece of this._pieces) {
               if (!piece.used && this.checkIfFits(piece.array, i, j))
                  return false;
            }
         }
      }
      return true;
   }
   deleteCompleted() {
      let updatedBoard = this._board.map((x) => x.slice());
      for (let i = 0; i < 9; i++) {
         let fullRow = this._board[i].every((x) => x === 1);
         if (fullRow) updatedBoard[i].fill(0);
      }
      for (let j = 0; j < 9; j++) {
         let fullColumn = this._board.map((x) => x[j]).every((x) => x === 1);
         if (fullColumn) {
            for (let i = 0; i < 9; i++) updatedBoard[i][j] = 0;
         }
      }
      let startingPoints = [
         [0, 0],
         [0, 3],
         [0, 6],
         [3, 0],
         [3, 3],
         [3, 6],
         [6, 0],
         [6, 3],
         [6, 6],
      ];
      for (let point of startingPoints) {
         let _i = point[0];
         let _j = point[1];
         let squareFull = true;
         for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
               if (!this._board[_i + i][_j + j]) squareFull = false;
            }
         }
         console.log(squareFull);
         if (squareFull) {
            for (let i = 0; i < 3; i++) {
               for (let j = 0; j < 3; j++) {
                  updatedBoard[_i + i][_j + j] = 0;
               }
            }
         }
      }
      this._board = updatedBoard;
   }
   makeMove(pieceIndex, i, j) {
      let piece = this._pieces[pieceIndex].array;
      if (!this.checkIfFits(piece, i, j)) return;
      let addScore = 0;
      for (let x = 0; x < piece.length; x++) {
         for (let y = 0; y < piece[x].length; y++) {
            addScore += piece[x][y];
            this._board[i + x][j + y] |= piece[x][y];
         }
      }
      this._score += addScore;
      this._pieces[pieceIndex].used = true;
      this.deleteCompleted();
      if (this.checkIfPiecesUsed()) {
         this._pieces = this.generateNewPieces();
      }
      this._gameOver = this.checkIfGameOver();
   }
   checkIfPiecesUsed() {
      for (let i = 0; i < this._pieces.length; i++) {
         if (!this._pieces[i].used) return false;
      }
      return true;
   }
}

export const allPieces = [
   [[1]],
   [[1, 1]],
   [[1, 1, 1]],
   [[1, 1, 1, 1]],
   [[1], [1]],
   [[1], [1], [1]],
   [[1], [1], [1], [1]],
   [
      [1, 0],
      [1, 1],
   ],
   [
      [0, 1],
      [1, 1],
   ],
   [
      [1, 1],
      [0, 1],
   ],
   [
      [1, 1],
      [1, 0],
   ],
   [
      [1, 1],
      [1, 1],
   ],
   [
      [1, 1, 0],
      [0, 1, 1],
   ],
   [
      [0, 1, 1],
      [1, 1, 0],
   ],
   [
      [1, 0],
      [1, 1],
      [0, 1],
   ],
   [
      [0, 1],
      [1, 1],
      [1, 0],
   ],
   [
      [0, 1, 0],
      [1, 1, 1],
   ],
   [
      [1, 1, 1],
      [0, 1, 0],
   ],
   [
      [0, 1],
      [1, 1],
      [0, 1],
   ],
   [
      [1, 0],
      [1, 1],
      [1, 0],
   ],
];
