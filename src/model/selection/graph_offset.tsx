import Node from 'model/graph/node';
import Position from 'model/graph/position';

export default class GraphOffset {
  offset: Position = new Position(0, 0);

  dragging: boolean = false;

  GetOffset(node: Node): Position {
    return this.offset;
  }

  StartDragging() {
    this.dragging = true;
  }

  StopDragging() {
    this.dragging = false;
  }
}
