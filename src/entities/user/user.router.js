import UserDetail from "./UserDetail";
import UserList from "./UserList";
import UserPosts from "./UserPosts";

const routes = [
  {
    name: "UserList",
    path: "/user",
    component: UserList,
    meta: { public: true },
  },
  {
    name: "UserDetail",
    path: "/profile",
    component: UserDetail,
    meta: { public: true },
  },
  {
    name: "UserPosts",
    path: "/users/:id",
    component: UserPosts,
    meta: { public: true },
  },
];

export default routes;
