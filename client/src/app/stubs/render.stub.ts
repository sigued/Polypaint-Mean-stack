export class RenderStub {
    createElement() {/** */}
    setAttribute() {/** */}
    removeChild() {/** */}
    appendChild() {/**/}
    listen(target: 'window' | 'document' | 'body' | any, eventName: string, callback: (event: any) => boolean | void) {
        // tslint:disable-next-line: deprecation
        callback(event);
    }
    setStyle() {/** */}
}
