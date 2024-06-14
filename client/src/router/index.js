import { createRouter, createWebHistory } from "vue-router";
import CreatingClient from "../views/CreatingClient.vue";
import EditingClient from "../views/EditingClient.vue";
import ListClients from "../views/ListClients.vue";
import ClientDetails from "../views/ClientDetails.vue";
import CreatingManager from "../views/CreatingManager.vue";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { title: "Вход" },
  },
  {
    path: "/createclient",
    name: "CreatingClient",
    component: CreatingClient,
    meta: { title: "Добавить клиента" },
  },
  {
    path: "/editingclient",
    name: "EditingClient",
    component: EditingClient,
    meta: { title: "Редактировать клиента" },
  },
  {
    path: "/listclients",
    name: "ListClients",
    component: ListClients,
    meta: { title: "Клиенты" },
  },
  {
    path: "/client/:id",
    name: "ClientDetails",
    component: ClientDetails,
    meta: { title: "Информация о клиенте" },
  },
  {
    path: "/managerAdd",
    name: "CreatingManager",
    component: CreatingManager,
    meta: { title: "Добавить менеджера" },
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

// Глобальная навигационная гвардия для установки заголовка страницы
router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
  next();
});

export default router;
