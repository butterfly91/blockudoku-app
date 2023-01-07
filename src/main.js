import { createApp } from "vue";
import App from "./App.vue";
//import { createPinia } from "pinia";
import TheCell from "./components/UI/TheCell.vue";

import { polyfill } from "mobile-drag-drop";
import { scrollBehaviourDragImageTranslateOverride } from "mobile-drag-drop/scroll-behaviour";

polyfill({
   dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
});

const app = createApp(App);
//const pinia = createPinia();
app.component("TheCell", TheCell);

//app.use(pinia);
app.mount("#app");
