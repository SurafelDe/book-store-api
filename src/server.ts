import express from 'express';
import router from './routes/routes';
import * as dotenv from "dotenv";
import cors from 'cors';
import * as swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";


dotenv.config();

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Book Store API",
			version: "1.0.0",
			description: "A simple Express Book Store API",
		},
		servers: [
			{
				url: "http://localhost:4000",
			},
		],
	},
	apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsDoc(options);



const app = express();

const port = process.env.PORT || 4000;

//json
app.use(express.json());

// app.use(cors({
//   origin: '*',
//   allowedHeaders: ['Authorization', 'Content-Type'], // Include Authorization header
// }));
//cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', ['Authorization', 'Content-Type']);
  next();
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
