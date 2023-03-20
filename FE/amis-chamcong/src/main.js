import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import { MISAEnum } from "@/js/base/enum";
import { MISAResource } from "@/js/base/resource";

const app = createApp(App)

app.config.globalProperties.$MISAEnum = MISAEnum;
app.config.globalProperties.$MISAResource = MISAResource;
app.use(Toast);
app.use(router).mount("#app");
