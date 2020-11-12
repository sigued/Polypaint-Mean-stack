import { HttpClient, HttpParams } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SvgElement } from 'src/app/entity/svgElement';
import { DrawingFile } from '../../model/drawingFile.model';

export class DrawingFileService {

  private drawingFileList: DrawingFile[] = new Array<DrawingFile>();
  drawingFileListSubject: Subject<DrawingFile[]> = new Subject<DrawingFile[]>();
  private isOnError = false;
  isOnErrorSubject = new Subject<boolean>();
  private displayLoader$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {
    this.getAllDrawingFiles();
  }

  emitErrors() {
    this.isOnErrorSubject.next(this.isOnError);
  }

  setErrors(isErrors: boolean) {
    this.isOnError = isErrors;
    this.emitErrors();
  }

  emitDrawingFiles() {
    this.drawingFileListSubject.next(this.drawingFileList);
  }

  addToDrawingFileList(drawingFile: DrawingFile) {
    this.drawingFileList.push(drawingFile);
    this.emitDrawingFiles();
  }

  setAllDrawingFileList(drawingFilelist: DrawingFile[]) {
    this.drawingFileList = drawingFilelist;
    this.emitDrawingFiles();
  }

  async getAllDrawingFiles() {
    this.drawingFileList = [];
    this.emitDrawingFiles();
    await this.httpClient.get<any[]>('http://localhost:3000/api/drawings').toPromise().then((res) => {
        for (const item of res) {
          this.drawingFileList.push(new DrawingFile(item._id, item.name, item.outerHtml, JSON.parse(item.tags) as string[],
          item.elementTab as SvgElement[]));
        }
        this.drawingFileListSubject.next(this.drawingFileList);
        this.setErrors(false);
      },
      (error) => {
        this.setErrors(true);
    });
  }

  async addNewDrawingFile(drawingFileName: string, outerHtml: string, tags: string[], elementTab: string) {
    this.displayLoader$.next(true);
    const file = new HttpParams()
    .set('name', drawingFileName)
    .set('outerHtml', outerHtml)
    .set('tags', JSON.stringify(tags))
    .set('elementTab', elementTab);
    await this.httpClient.post<any>('http://localhost:3000/api/drawing', file).toPromise().then((res) => {
      this.addToDrawingFileList(new DrawingFile(res._id, res.name, res.outerHtml, JSON.parse(res.tags) as string[],
      res.elementTab as SvgElement[]));
      this.displayLoader$.next(false);
      this.setErrors(false);
    },
    (error) => {
      this.displayLoader$.next(false);
      this.setErrors(true);
    });
  }

  async updateDrawingFile(drawingFile: DrawingFile) {
    this.displayLoader$.next(true);
    const file = this.drawingFileList[this.drawingFileList.findIndex((drawfile) => drawfile.id === drawingFile.id)];
    file.name = drawingFile.name;
    file.outerHtml = drawingFile.outerHtml;
    file.tags = drawingFile.tags;
    file.elementTab = drawingFile.elementTab;
    const requestParam = new HttpParams()
    .set('name', drawingFile.name)
    .set('outerHtml', drawingFile.outerHtml)
    .set('tags', JSON.stringify(drawingFile.tags))
    .set('elementTab', JSON.stringify(drawingFile.elementTab));
    await this.httpClient.put(`http://localhost:3000/api/drawing/${file.id}`, requestParam).toPromise().then((res) => {
      this.displayLoader$.next(false);
      this.drawingFileList.splice(this.drawingFileList.findIndex((drawfile) => drawfile.id === drawingFile.id), 1);
      this.addToDrawingFileList(file);
      this.setErrors(false);
    },
    (error) => {
      this.displayLoader$.next(false);
      this.setErrors(true);
    });
  }

  async deleteDrawingFile(drawingFile: DrawingFile) {
    this.displayLoader$.next(true);
    const fileId = this.drawingFileList[this.drawingFileList.findIndex((drawfile) => drawfile === drawingFile)].id;
    await this.httpClient.delete(`http://localhost:3000/api/drawing/${fileId}`).toPromise().then((res) => {
      this.displayLoader$.next(false);
      this.drawingFileList.splice(this.drawingFileList.findIndex((drawfile) => drawfile === drawingFile), 1);
      this.drawingFileListSubject.next(this.drawingFileList);
    },
    (error) => {
      this.displayLoader$.next(false);
      this.setErrors(true);
    });
  }

  saveDrawingFileLocal(drawingFileName: string, outerHtml: string,  elementTab: string) {
    const filecontent = outerHtml + 'endofouterhtml' + elementTab;
    const blob = new Blob([filecontent], { type: 'application/text' });
    saveAs(blob, `${drawingFileName}.txt`);
  }

  isLoading(): Observable<boolean> {
    return this.displayLoader$;
  }

  validateDrawing(outerHtml: string) {
    const patt = /^<div _ngcontent/g;
    const patt1 = /<\/svg><\/div>$/g;
    return patt.test(outerHtml) && patt1.test(outerHtml);
  }

}
