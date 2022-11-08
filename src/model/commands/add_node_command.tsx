import Position from 'model/graph/position';
import Graph from 'model/graph/graph';
import Node from 'model/graph/node';
import ICommand from './icommand';

export default class AddNodeCommand implements ICommand {
  position: Position;

  node?: Node;

  constructor(position: Position) {
    this.position = position;
    this.node = undefined;
  }

  Execute(graph: Graph): void {
    this.node = new Node(this.position, 'New Node');
    graph.AddNode(this.node);
  }

  Undo(graph: Graph): void {
    if (this.node !== undefined) {
      graph.RemoveNode(this.node);
    }
  }
}
