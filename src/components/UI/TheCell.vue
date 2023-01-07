<template>
   <th></th>
</template>

<style scoped>
th {
   border: 0.5px solid rgb(49, 43, 43);
   background-color: white;
   transition: background-color 0.2s;
}

.big {
   width: 3.5rem;
   height: 3.5rem;
}

.small {
   width: 2.5rem;
   height: 2.5rem;
}

.filled {
   background-color: rgb(179, 179, 232);
}

.drag {
   background-color: rgb(179, 179, 232, 0.5);
}

.top {
   border-top: 1.5px solid rgb(49, 43, 43);
}
.left {
   border-left: 1.5px solid rgb(49, 43, 43);
}
.right {
   border-right: 1.5px solid rgb(49, 43, 43);
}
.bottom {
   border-bottom: 1.5px solid rgb(49, 43, 43);
}
.used {
   background-color: rgb(179, 179, 232, 0.1);
}
.no-border {
   border: 0;
   background-color: rgba(0, 0, 0, 0);
}
</style>
