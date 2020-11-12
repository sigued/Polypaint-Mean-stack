import { SvgElement } from '../entity/svgElement';

export class DrawingFile {
  id: string;
  name: string;
  outerHtml: string;
  tags: string[];
  elementTab: SvgElement[];

  constructor(id: string, name: string, outerHtml: string, tags: string[], elementTab: SvgElement[]) {
    this.id = id;
    this.name = name;
    this.outerHtml = outerHtml;
    this.tags = tags;
    this.elementTab = elementTab;
  }
}
