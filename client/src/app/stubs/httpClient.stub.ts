import { of } from 'rxjs';

export class HttpClientStub {
    get() {
      const dummyDrawingFiles = [{
        id: '1',
        name: 'testing Angular',
        outerHtml: 'Hello World',
        tags: JSON.stringify(['tt', 'toto']),
        }, {
        id: '2',
        name: 'Hello World2',
        outerHtml: 'testing Angular2',
        tags: JSON.stringify(['tt', 'toto']),
      }];
      return of(dummyDrawingFiles);
    }
    post() {/** */}
    put() {/** */}
    delete() {/** */}
}
