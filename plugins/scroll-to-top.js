export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    if (process.client) {
      window.scrollTo(0, 0);
    }
  });
});
