import express from 'express';
import api from './routes/api';
import serverRender from './routes/serverRender';
import path from 'path';


const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../dist')));

app.set('views', path.join(__dirname, '../src'));

app.use('/api', api);

app.use('*', serverRender);

const port = 8888;

app.listen(port, () => console.log(`server started，at ${port}`));