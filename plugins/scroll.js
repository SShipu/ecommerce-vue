export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$router.options.scrollBehavior = async (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }

    if (process.client && window) {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const findEl = async (hash, x = 0) => {
      return (
        document.querySelector(hash) ||
        new Promise((resolve) => {
          if (x > 0) {
            return resolve(document.querySelector("#app"));
          }
          setTimeout(() => {
            resolve(findEl(hash, 1));
          }, 300);
        })
      );
    };

    if (to.hash) {
        const el = await findEl(to.hash);
        if (process.client) {
            if ("scrollBehavior" in document.documentElement.style) {
              return window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
            } else {
              return window.scrollTo(0, el.offsetTop);
            }
        }
    }
        return { left: 0, top: 0, behavior: "smooth" };
  };
})
