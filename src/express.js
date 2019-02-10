import express from 'express';
import routes from './routes'
import bodyParser from 'body-parser'
import errorHandler from './middleware/errorHandler'

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api", routes);
app.use(errorHandler);

export default app;