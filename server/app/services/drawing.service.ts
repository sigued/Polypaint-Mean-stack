import {injectable} from 'inversify';
import 'reflect-metadata';
import {Drawing} from '../model/drawing.model';

@injectable()
export class DrawingService {

    constructor() {/** */}

    async getAllDrawing() {
        return Drawing.find()
        .then((drawings) => {
            return drawings;
        })
        .catch((err: Error) => {
            return err;
        });
    }

    async saveNewDrawing(newData: any) {
        const newDrawing = new Drawing(newData);
        return newDrawing.save()
        .then((drawing) => {
            return drawing;
        })
        .catch((err: Error) => {
            return err;
        });
    }

    async deleteDrawing(id: any) {
        return Drawing.findByIdAndDelete(id)
        .then((deleted) => {
            return deleted ? 'Deleted successfully' : 'Drawing not found';
        })
        .catch((err: Error) => {
            return err;
        });
    }

    async updateDrawing(id: any, data: any) {
        return Drawing.findByIdAndUpdate(id, data)
        .then((updated) => {
            return updated ? 'updated successfully' : 'Drawing not found';
        })
        .catch((err: Error) => {
            return err;
        });
    }

}
