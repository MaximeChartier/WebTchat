const app = require('../app');

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Chat is waiting for you at http://localhost:${port}`);
});
