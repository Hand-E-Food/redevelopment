import { RestApi } from './api';
import express from 'express';
import * as path from 'path';

const port = 3000;
const htmlPath = path.join(__dirname, 'html');

const app = express();

app.use('/', express.static(htmlPath));
app.get('/', (req, res) => res.sendFile(path.join(htmlPath, 'index.html')));

new RestApi(app, '/api');

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
