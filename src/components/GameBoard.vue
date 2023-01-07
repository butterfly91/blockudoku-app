<template>
   <table>
      <tr v-for="(n, i) in 9" :key="i">
         <the-cell
            v-for="(m, j) in 9"
            :key="j"
            :class="cellClasses(i, j)"
            @dragenter="dragEnter(i, j)"
            @dragover="dragOver($event)"
            @drop="drop(i, j)"
         ></the-cell>
      </tr>
   </table>
</template>

<script>
export default {
   props: {
      board: Array,
      drag: Array,
   },
   methods: {
      cellClasses(i, j) {
         return {
            top: i % 3 == 0,
            left: j % 3 == 0,
            bottom: i % 3 == 2,
            right: j % 3 == 2,
            filled: this.board[i][j] == 1,
            drag: this.drag[i][j],
            big: true,
         };
      },
      dragEnter(i, j) {
         this.$emit("dragEnter", i, j);
      },
      dragLeave(i, j) {
         this.$emit("dragLeave", i, j);
      },
      dragOver(event) {
         event.preventDefault();
      },
      drop(i, j) {
         this.$emit("pieceDrop", i, j);
      },
   },
};
</script>

<style>
table {
   border-collapse: collapse;
}
</style>
