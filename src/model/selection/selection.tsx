import Node from 'model/graph/node';
import Position from 'model/graph/position';

export default class Selection {
  selectedNodes: Node[] = [];

  offset: Position = new Position(0, 0);

  dragging: boolean = false;

  IsSelected(node: Node): boolean {
    return this.selectedNodes.includes(node);
  }

  Add(node: Node) {
    if (!this.IsSelected(node)) {
      this.selectedNodes.push(node);
    }
  }

  Remove(node: Node) {
    this.selectedNodes = this.selectedNodes.filter((n) => n !== node);
  }

  Clear() {
    this.selectedNodes = [];
    this.offset = new Position(0, 0);
  }

  SetSelection(selection: Node[]) {
    this.selectedNodes = selection;
  }

  GetNodes(): Node[] {
    return this.selectedNodes;
  }

  IsEmpty(): boolean {
    return this.selectedNodes.length === 0;
  }

  GetOffset(node: Node): Position {
    if (this.IsSelected(node)) {
      return this.offset;
    }
    return new Position(0, 0);
  }

  StartDragging() {
    this.dragging = true;
  }

  StopDragging() {
    this.dragging = false;
  }
}
