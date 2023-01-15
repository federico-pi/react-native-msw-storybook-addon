module.exports = () => {
  if (process.env.STORYBOOK === '1') {
    return require('./app.storybook.json');
  }

  return require('./app.json');
};
