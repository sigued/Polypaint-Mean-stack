import { Actions } from 'src/app/entity/action';
import { SvgElement } from 'src/app/entity/svgElement';
import { DrawpageService } from '../drawpage.service';

export class UndoRedoCommand {
    private actionModel: Actions;

    constructor(private drawpageService: DrawpageService, ) {
        this.actionModel = Actions.getInstance();
    }

    undoDisabled(): boolean {
        return this.actionModel.actions.length === 0;
    }
    redoDisabled(): boolean {
        return this.actionModel.redoActions.length === 0;
    }

    undo(): void {
        const lastAction = this.actionModel.actions.pop();
        if (lastAction) {
            this.actionModel.redoActions.push(lastAction);
            this.removeElement(lastAction, this.drawpageService.elementTab);
            this.drawpageService.render.removeChild(this.drawpageService.svg, lastAction.element);
            this.drawpageService.deselectAll();
        }
    }

    redo(): void {
        const lastAction = this.actionModel.redoActions.pop();
        if (lastAction) {
            this.actionModel.actions.push(lastAction);
            this.drawpageService.svg.nativeElement.appendChild(lastAction.element);
            this.drawpageService.elementTab.push(lastAction);
        }
    }

    removeElement(element: SvgElement, tab: SvgElement[]) {
        const index: number = tab.indexOf(element);
        if (index !== -1) {
            tab.splice(index, 1);
        }
    }

}
