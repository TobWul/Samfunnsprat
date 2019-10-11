import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import IssueDetail from "./views/IssueDetail";
import PageNotFound from "./views/PageNotFound";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/sak/:issue_id",
      name: "issue",
      component: IssueDetail
    },
    {
      path: "/*",
      component: PageNotFound
    }
  ]
});
