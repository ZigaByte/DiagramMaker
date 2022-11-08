import Position from 'model/graph/position';
import Graph from 'model/graph/graph';
import Node from 'model/graph/node';
import ICommand from './icommand';

export default class MoveNodeCommand implements ICommand {
  position: Position;

  node: Node;

  previousPosition?: Position;

  constructor(node: Node, position: Position) {
    this.node = node;
    this.position = position;
    this.previousPosition = undefined;
  }

  Execute(graph: Graph): void {
    this.previousPosition = this.node.position;
    this.node.position = this.position;
  }

  Undo(graph: Graph): void {
    if (this.previousPosition !== null) {
      this.node.position = this.previousPosition!;
    }
  }
}
