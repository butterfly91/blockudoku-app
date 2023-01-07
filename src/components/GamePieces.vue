<template>
   <div>
      <div class="qq" v-for="(piece, index) in pieces" :key="index">
         <table
            :draggable="!piece.used"
            @dragstart="dragStart(index)"
            @dragend="dragEnd"
         >
            <tr v-for="(n, i) in piece.array.length" :key="i">
               <the-cell
                  v-for="(m, j) in piece.array[i].length"
                  :key="j"
                  :class="cellClasses(piece, i, j)"
                  @mouseenter="calcShift(i, j)"
               ></the-cell>
            </tr>
         </table>
         <button @click="rotate(index)" :disabled="piece.used">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width="16"
               height="16"
               fill="currentColor"
               class="bi bi-arrow-clockwise"
               viewBox="0 0 16 16"
            >
               <path
                  fill-rule="evenodd"
                  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
               />
               <path
                  d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
               />
            </svg>
         </button>
      </div>
   </div>
</template>

<script>
export default {
   props: {
      pieces: Array,
   },
   data() {
      return {
         shiftX: null,
         shiftY: null,
         small: true,
         big: false,
      };
   },
   methods: {
      cellClasses(piece, i, j) {
         return {
            small: this.small,
            big: this.big,
            filled: piece.array[i][j],
            "no-border": !piece.array[i][j],
            used: piece.used,
         };
      },
      dragStart(index) {
         this.big = true;
         this.small = false;
         this.$emit("dragStart", index, this.shiftX, this.shiftY);
      },
      dragEnd() {
         this.big = false;
         this.small = true;
         this.$emit("dragEnd");
      },
      calcShift(i, j) {
         this.shiftX = j;
         this.shiftY = i;
      },
      rotate(i) {
         this.$emit("rotate", i);
      },
   },
};
</script>

<style scoped>
table {
   display: inline-block;
}
button {
   margin-left: 2rem;
}
svg {
   width: 2rem;
   height: 2rem;
}
div {
   margin: 1.5rem 0;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;
}
.qq {
   display: flex;
   flex-direction: row;
}
th {
   width: 2rem;
   height: 2rem;
   padding: 0;
   border: 0.75px solid rgb(49, 43, 43);
   background-color: white;
}
</style>
