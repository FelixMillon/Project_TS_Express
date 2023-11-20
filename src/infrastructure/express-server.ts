import express from 'express';
import { ExpressRouter } from './express-router';
import bodyParser from 'body-parser';
import cors from 'cors';

export class ExpressServer {
    private express = express();

    constructor(
        private expressRouter: ExpressRouter,
        private port: string,
    ) {
        this.configureCORS();
        this.configureBodyParser();
        this.configureRoutes();
    }

    private configureCORS(): void {
        this.express.use(cors());

        // Ou pour restreindre les origines autorisées :
        // this.express.use(cors({ origin: 'http://localhost:5173' }));
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
