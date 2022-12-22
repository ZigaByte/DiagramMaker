import Node from 'model/graph/node';
import Position from 'model/graph/position';

export default class SelectionBox {
  startPosition: Position = new Position(0, 0);

  size: Position = new Position(0, 0);

  active: boolean = false;

  IsSelected(node: Node): boolean {
    const topLeft = this.GetTopLeft();
    const size = this.GetSize();
    return (
      this.active &&
      topLeft.x <= node.position.x &&
      topLeft.y <= node.position.y &&
      node.position.x < topLeft.x + size.x &&
      node.position.y < topLeft.y + size.y
    );
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
