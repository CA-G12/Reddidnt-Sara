const app = require('./app');

const port = app.get('port');

app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`);
});
