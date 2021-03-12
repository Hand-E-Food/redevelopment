import { Express, Request, Response } from 'express';

export class RestApi {
    public constructor(app: Express, baseUrl: string) {
        app.get(`${baseUrl}/hello`, this.getHello);
    }

    public getHello(request: Request, response: Response) {
        response.send('Hello world, from API!');
    }
}