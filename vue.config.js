const path = require("path");
const PrerenderSPAPlugin = require("prerender-spa-plugin");

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
            @import "@/scss/_variables.scss";
            @import "@/scss/_mixins.scss";
          `
      }
    }
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV !== "production") return;
    return {
      plugins: [
        new PrerenderSPAPlugin(
          // Absolute path to compiled SPA
          path.resolve(__dirname, "dist"),
          // List of routes to prerender
          ["/"],
          {
            // options
          }
        )
      ]
    };
  }
};
