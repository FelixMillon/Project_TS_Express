import express from 'express';
import cors, { CorsOptions } from 'cors';
import { ExpressRouter } from './express-router';
import bodyParser from 'body-parser';

export class ExpressServer {
    private express = express();

    constructor(
        private allowedMainOrigin: string,
        private expressRouter: ExpressRouter,
        private port: string,
    ) {
        this.configureCorsPolicy();
        this.configureBodyParser();
        this.configureRoutes();
    }

    private configureCorsPolicy(): void {
        const corsOptions: CorsOptions = {
            origin: (origin, callback) => {
                const isOriginAllowed =
                    !origin || this.allowedMainOrigin === origin;

                if (isOriginAllowed) {
                    callback(null, true);
                } else {
                    callback(new Error('CORS: Request origin is not allowed'));
                }
            },
        };
        this.express.use(cors(corsOptions));
    }
    private configureBodyParser(): void {
        this.express.use(bodyParser.json());
    }

    bootstrap(): void {
        this.express.listen(this.port, () => {
            console.log(`> Listening on port ${this.port}`);
        });
    }

    private configureRoutes(): void {
        this.express.use('/api', this.expressRouter.router);
    }
}
