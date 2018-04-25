const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('*', (request, response) => {
  response.redirect('/');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening at port ${port}.`);
});
