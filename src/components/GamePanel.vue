<template>
   <div>
      <h2>Очки: {{ score }}</h2>
      <h3 v-if="gameOver">Игра окончена</h3>
      <button @click="newGame">Новая игра</button>
   </div>
</template>

<script>
export default {
   props: {
      score: Number,
      gameOver: Boolean,
   },
   methods: {
      newGame() {
         this.$emit("newGame");
      },
   },
};
</script>

<style scoped>
div {
   display: flex;
   flex-direction: column;
}
button {
   font-size: 1.2rem;
   padding: 0.5rem;
}
</style>
