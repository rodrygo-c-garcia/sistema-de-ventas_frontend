module.exports = {
  pluginOptions: {
    webpack: {
      // Agrega la siguiente línea
      env: {
        API_KEY: process.env.VUE_APP_API_KEY,
      },
    },
  },
};
