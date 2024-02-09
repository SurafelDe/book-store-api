import express from 'express';
import router from './routes';
import * as dotenv from "dotenv";

dotenv.config();
const app = express();

const port = process.env.PORT || 4000;

//json
app.use(express.json());

//cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
