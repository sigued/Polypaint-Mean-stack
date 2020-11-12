import { Subject } from 'rxjs';
import { DrawingFile } from '../model/drawingFile.model';

export class DrawingFileServiceStub {
    drawingFileList: DrawingFile[] = new Array<DrawingFile>();
    drawingFileListSubject: Subject<DrawingFile[]> = new Subject<DrawingFile[]>();
    isOnErrorSubject = new Subject<boolean>();
    isOnErrors: false;
    emitDrawingFiles() {
        this.drawingFileListSubject.next(this.drawingFileList);
    }
    emitErrors() {
        this.isOnErrorSubject.next(this.isOnErrors);
    }
    getAllDrawingFiles() {/** */}
    deleteDrawingFile() {/** */}
    addNewDrawingFile(drawingFileName: string, outerHtml: string, tags: string[]) {/** */}
    isLoading() {/** */}
    saveDrawingFileLocal() {/** */}
    validateDrawing() {/** */}
}
