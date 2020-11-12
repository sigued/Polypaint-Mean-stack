import { SvgElement } from './svgElement';

export class Actions {
    private static instance: Actions;
    actions: SvgElement[];
    redoActions: SvgElement[];

    private constructor() {
        this.actions = [];
        this.redoActions = [];
    }

    static getInstance(): Actions {
        if (!Actions.instance) {
            Actions.instance = new Actions();
        }
        return Actions.instance;
    }
}
