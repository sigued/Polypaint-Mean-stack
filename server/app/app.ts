import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import {inject, injectable} from 'inversify';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import { DrawingController } from './controllers/drawing.controller';
import Types from './types';

const MONGO_URL = 'mongodb+srv://projet2990:7k8WbIJXjdMqjt7Y@cluster0-g4pia.mongodb.net/test?retryWrites=true&w=majority';

@injectable()
export class Application {

    private readonly internalError: number = 500;
    app: express.Application;

    constructor(@inject(Types.DrawingController) private drawingController: DrawingController) {
        this.app = express();
        this.config();
        this.setMongoConfig();
        this.bindRoutes();
    }

    private config(): void {
        // Middlewares configuration
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(cookieParser());
        this.app.use(cors());
    }

    private setMongoConfig(): void {
        (mongoose as any).Promise = global.Promise;
        mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    bindRoutes(): void {
        // Notre application utilise le routeur de notre API `Index`
        this.app.use('/api', this.drawingController.router);
        this.errorHandling();
    }

    private errorHandling(): void {
        // When previous handlers have not served a request: path wasn't found
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: Error = new Error('Not Found');
            next(err);
        });

        // development error handler
        // will print stacktrace
        if (this.app.get('env') === 'development') {
            // tslint:disable-next-line:no-any
            this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || this.internalError);
                res.send({
                    message: err.message,
                    error: err,
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user (in production env only)
        // tslint:disable-next-line:no-any
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || this.internalError);
            res.send({
                message: err.message,
                error: {},
            });
        });
    }
}
