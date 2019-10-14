import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import VueAnalytics from "vue-analytics";
import IssueDetail from "./views/IssueDetail";
import PageNotFound from "./views/PageNotFound";

Vue.use(Router);

const router = new Router({
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
      name: "pageNotFound",
      component: PageNotFound
    }
  ]
});

Vue.use(VueAnalytics, {
  id: "UA-147736726-1",
  router
});

export default router;
