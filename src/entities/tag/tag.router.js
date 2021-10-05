import TagList from "./TagList";
import TagDetail from "./TagDetail";
import TagForm from "./TagForm";

const routes = [
  {
    name: "TagList",
    path: "/tags",
    component: TagList,
    meta: { public: true },
  },

  // /posts/new debe colocarse antes de /posts/:id porque si no vue-router
  // interpreta "new" como si fuera el id.
  //
  // Una forma de evitar este problema es usar una expresión regular para
  // limitar los valores que son interpretados. Por ejemplo, usando el path
  // /posts/:id(\\d+), vue-router espera que :id sea numérico.

  {
    name: "TagCreate",
    path: "/tag/new",
    component: TagForm,
  },
  {
    name: "TagDetail",
    path: "/tags/:id",
    component: TagDetail,
    meta: { public: true },
  },

  {
    name: "TagUpdate",
    path: "/tags/:id/update",
    component: TagForm,
  },
];

export default routes;
