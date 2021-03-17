import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response } from 'express';
import * as path from 'path';
import { RestApi } from './api';

function ensureCookie(req: Request, res: Response, next: NextFunction): void {
    if (!req.cookies.id) {
        let id: number = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        req.cookies.id = id;
    }
    next();
    res.cookie('id', req.cookies.id, {
        httpOnly: true,
        sameSite: 'lax',
    });
}

const port = 3000;
const htmlPath = path.join(__dirname, 'html');

const app = express();

app.use(cookieParser());
app.use(ensureCookie);
app.use('/', express.static(htmlPath));
//app.get('/', (req, res) => res.sendFile(path.join(htmlPath, 'index.html')));

new RestApi(app, '/api');

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
