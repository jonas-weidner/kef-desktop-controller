import Vue from "vue";
import App from "./App.vue";
// @ts-ignore
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css";
import "@/assets/tailwind.css";
import "@/assets/main.css";

Vue.use(Vuesax);

Vue.config.productionTip = false;

declare module "vue/types/vue" {
    interface Vue {
        $vs: Vuesax;
    }
}

new Vue({ render: h => h(App) }).$mount("#app");
