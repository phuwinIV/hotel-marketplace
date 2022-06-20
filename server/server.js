import express from 'express';
import { readdirSync } from 'fs';
import cors from 'cors';
import mongoose from 'mongoose';
const morgan = require('morgan');

require('dotenv').config();

const app = express();

// db connection
mongoose
   .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log('DB conected'))
   .catch((err) => console.log('DB ERROR', err));

// middlewareds
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
// route middleware
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is runing in port ${port}`));
