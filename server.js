import express from 'express';
import bodyParser from 'body-parser';
import router from './src/router';
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Example app listening on port 3000!')
});