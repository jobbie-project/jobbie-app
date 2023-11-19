import path from 'path';
import express from 'express';
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';

const app = express(); // create express app

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: path.join(__dirname, '.env')});

// add middlewares
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('public'));

const baseDir = `${__dirname}/dist/`;
app.get('*', (req, res) => res.sendFile('index.html', {root: baseDir}));

app.use((req, res, next) => {
  console.log('called');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// start express server on port 5000
app.listen(3000, () => {
  console.log(`server started on port ${3000}`);
});
