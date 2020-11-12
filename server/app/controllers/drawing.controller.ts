import {NextFunction, Request, Response, Router} from 'express';
import {inject, injectable} from 'inversify';

import { DrawingService } from '../services/drawing.service';
import Types from '../types';

@injectable()
export class DrawingController {

    router: Router;

    constructor(@inject(Types.DrawingService) private drawingService: DrawingService) {
        this.configureRouter();
    }

    private configureRouter(): void {
        this.router = Router();

        this.router.post('/drawing',
            async (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                const query: any = await this.drawingService.saveNewDrawing(req.body);
                res.json(query);
            });

        this.router.get('/drawings',
            async (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                const query: any = await this.drawingService.getAllDrawing();
                res.json(query);
            });

        this.router.put('/drawing/:id',
            async (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                const query: any = await this.drawingService.updateDrawing(req.params.id, req.body);
                res.json(query);
            });

        this.router.delete('/drawing/:id',
            async (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                const query: any = await this.drawingService.deleteDrawing(req.params.id);
                res.json(query);
            });
    }
}
