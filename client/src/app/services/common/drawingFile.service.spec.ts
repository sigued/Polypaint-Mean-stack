import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import * as FileSaver from 'file-saver';
import { of, throwError } from 'rxjs';
import { DrawingFile } from 'src/app/model/drawingFile.model';
import { HttpClientStub } from 'src/app/stubs/httpClient.stub';
import { DrawingFileService } from './drawingFile.service';

describe('DrawingFileService', () => {
  let drawingFileService: DrawingFileService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawingFileService, {provide: HttpClient, useClass: HttpClientStub}],
    });
    drawingFileService = TestBed.get(DrawingFileService);
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(drawingFileService).toBeTruthy();
  });

  it('should emit errors', () => {
    spyOn(drawingFileService.isOnErrorSubject, 'next');
    drawingFileService.emitErrors();
    expect(drawingFileService.isOnErrorSubject.next).toHaveBeenCalled();
  });

  it('should set errors', () => {
    spyOn(drawingFileService, 'emitErrors');
    drawingFileService.setErrors(false);
    expect(drawingFileService.emitErrors).toHaveBeenCalled();
  });

  it('should emit drawinFiles', () => {
    spyOn(drawingFileService.drawingFileListSubject, 'next');
    drawingFileService.emitDrawingFiles();
    expect(drawingFileService.drawingFileListSubject.next).toHaveBeenCalled();
  });

  it('should addToDrawingFileList', () => {
    const dummyDrawingFile: DrawingFile = {
      id: '1',
      name: 'testing Angular',
      outerHtml: 'Hello World',
      tags: [],
      elementTab: [],
    };
    spyOn(drawingFileService, 'emitDrawingFiles');
    drawingFileService.addToDrawingFileList(dummyDrawingFile);
    expect(drawingFileService.emitDrawingFiles).toHaveBeenCalled();
  });

  it('should setAllDrawingFileList', () => {
    const dummyDrawingFiles: DrawingFile[] = [{
      id: '1',
      name: 'testing Angular',
      outerHtml: 'Hello World',
      tags: [],
      elementTab: [],
      }, {
      id: '2',
      name: 'Hello World2',
      outerHtml: 'testing Angular2',
      tags: [],
      elementTab: [],
    }];
    spyOn(drawingFileService, 'emitDrawingFiles');
    drawingFileService.setAllDrawingFileList(dummyDrawingFiles);
    expect(drawingFileService.emitDrawingFiles).toHaveBeenCalled();
  });

  it('should retrieve all the drawings from the db via GET', async () => {
    const dummyDrawingFiles = [{
      id: '1',
      name: 'testing Angular',
      outerHtml: 'Hello World',
      tags: JSON.stringify(['tt', 'toto']),
      elementTab: JSON.stringify(['tt', 'toto']),
      }, {
      id: '2',
      name: 'Hello World2',
      outerHtml: 'testing Angular2',
      tags: JSON.stringify(['tt', 'toto']),
      elementTab: JSON.stringify(['tt', 'toto']),
    }];

    spyOn(drawingFileService.drawingFileListSubject, 'next');
    spyOn(httpClient, 'get').and.returnValue(of(dummyDrawingFiles));
    await drawingFileService.getAllDrawingFiles();
    expect(drawingFileService.drawingFileListSubject.next).toHaveBeenCalled();
  });

  it('should set errors when GET is in error', async () => {
    const errors = new Error();
    spyOn(drawingFileService, 'setErrors');
    spyOn(httpClient, 'get').and.returnValue(throwError(errors));
    await drawingFileService.getAllDrawingFiles();
    expect(drawingFileService.setErrors).toHaveBeenCalled();
  });

  it('should add new drawing from the db via POST', async () => {
    const dummyDrawingFile = {
      id: '1',
      name: 'testing Angular',
      outerHtml: 'Hello World',
      tags: JSON.stringify(['tt', 'toto']),
      elementTab: JSON.stringify(['tt', 'toto']),
    };
    const dummyDrawingFile1 = {
      id: '1',
      name: 'testing Angular',
      outerHtml: 'Hello World',
      tags: ['tt', 'toto'],
      elementTab: JSON.stringify(['tt', 'toto']),
    };
    spyOn(httpClient, 'post').and.returnValue(of(dummyDrawingFile));
    spyOn(drawingFileService, 'addToDrawingFileList');
    await drawingFileService.addNewDrawingFile(dummyDrawingFile1.name, dummyDrawingFile1.outerHtml, dummyDrawingFile1.tags,
      dummyDrawingFile1.elementTab);
    expect(drawingFileService.addToDrawingFileList).toHaveBeenCalled();

  });

  it('should set errors when POST is in error', async () => {
    const dummyDrawingFile1 = {
      id: '1',
      name: 'testing Angular',
      outerHtml: 'Hello World',
      tags: ['tt', 'toto'],
      elementTab: JSON.stringify(['tt', 'toto']),
    };
    const errors = new Error();
    spyOn(drawingFileService, 'setErrors');
    spyOn(httpClient, 'post').and.returnValue(throwError(errors));
    await drawingFileService.addNewDrawingFile(dummyDrawingFile1.name, dummyDrawingFile1.outerHtml, dummyDrawingFile1.tags,
      dummyDrawingFile1.elementTab);
    expect(drawingFileService.setErrors).toHaveBeenCalled();
  });

  it('should update drawing from the db via PUT', async () => {
    const dummyDrawingFile: DrawingFile = {
      id: '1',
      name: 'testing Angular',
      outerHtml: 'Hello World',
      tags: [],
      elementTab: [],
    };
    drawingFileService.addToDrawingFileList(dummyDrawingFile);
    spyOn(httpClient, 'put').and.returnValue(of(dummyDrawingFile));
    spyOn(drawingFileService, 'addToDrawingFileList');
    await drawingFileService.updateDrawingFile(dummyDrawingFile);
    expect(drawingFileService.addToDrawingFileList).toHaveBeenCalled();
  });

  it('should set errors when PUT is in error', async () => {
    const dummyDrawingFile: DrawingFile = {
      id: '1',
      name: 'testing Angular',
      outerHtml: 'Hello World',
      tags: [],
      elementTab: [],
    };
    drawingFileService.addToDrawingFileList(dummyDrawingFile);
    const errors = new Error();
    spyOn(drawingFileService, 'setErrors');
    spyOn(httpClient, 'put').and.returnValue(throwError(errors));
    await drawingFileService.updateDrawingFile(dummyDrawingFile);
    expect(drawingFileService.setErrors).toHaveBeenCalled();
  });

  it('should delete drawing from the db via DELETE', async () => {
    const dummyDrawingFile: DrawingFile = {
      id: '1',
      name: 'testing Angular',
      outerHtml: 'Hello World',
      tags: [],
      elementTab: [],
    };
    drawingFileService.addToDrawingFileList(dummyDrawingFile);
    spyOn(httpClient, 'delete').and.returnValue(of(dummyDrawingFile));
    spyOn(drawingFileService.drawingFileListSubject, 'next');
    await drawingFileService.deleteDrawingFile(dummyDrawingFile);
    expect(drawingFileService.drawingFileListSubject.next).toHaveBeenCalled();
  });

  it('should set errors when DELETE is in error', async () => {
    const dummyDrawingFile: DrawingFile = {
      id: '1',
      name: 'testing Angular',
      outerHtml: 'Hello World',
      tags: [],
      elementTab: [],
    };
    drawingFileService.addToDrawingFileList(dummyDrawingFile);
    const errors = new Error();
    spyOn(drawingFileService, 'setErrors');
    spyOn(httpClient, 'delete').and.returnValue(throwError(errors));
    await drawingFileService.deleteDrawingFile(dummyDrawingFile);
    expect(drawingFileService.setErrors).toHaveBeenCalled();
  });

  it('should isLoading', () => {
    drawingFileService.isLoading().subscribe((result) => {
      expect(result).toBe(false);
    });
  });

  it('should have validateDrawing return false', () => {
    expect(drawingFileService.validateDrawing('testN')).toBeFalsy();
  });

  it('should have validateDrawing return true', () => {
    expect(drawingFileService.validateDrawing('<div _ngcontent-fnc</svg></div>')).toBeTruthy();
  });

  it('should save', () => {
    spyOn(FileSaver, 'saveAs');
    drawingFileService.saveDrawingFileLocal('testN', 'TestC', 'test');
    // tslint:disable-next-line: deprecation
    expect(FileSaver.saveAs).toHaveBeenCalled();
  });

});
