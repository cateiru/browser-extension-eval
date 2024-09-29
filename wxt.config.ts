import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: (config) => {
    const contentSecurityPolicy =
      config.manifestVersion === 3
        ? {
            sandbox: "sandbox allow-scripts; script-src 'self' 'unsafe-eval';",
          }
        : undefined;

    return {
      content_security_policy: contentSecurityPolicy,
    };
  },

  modules: ["@wxt-dev/module-react"],
});
