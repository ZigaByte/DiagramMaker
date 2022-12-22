import Node from 'model/graph/node';
import Position from 'model/graph/position';

export default class SelectionBox {
  selectedNodes: Node[] = [];

  startPosition: Position = new Position(0, 0);

  size: Position = new Position(0, 0);

  active: boolean = false;

  IsSelected(node: Node): boolean {
    // Probably this is done dynamically.
    return this.selectedNodes.includes(node);
  }

  SetActive(active: boolean) {
    this.active = active;
  }

  GetTopLeft() {
    return new Position(
      Math.min(this.startPosition.x, this.startPosition.x + this.size.x),
      Math.min(this.startPosition.y, this.startPosition.y + this.size.y)
    );
  }

  GetSize() {
    return this.size.absolute();
  }
}
