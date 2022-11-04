import Position from 'model/graph/position';
import Graph from 'model/graph/graph';
import Node from 'model/graph/node';
import ICommand from './icommand';

export default class AddNodeCommand implements ICommand {
  position: Position;

  constructor(position: Position) {
    this.position = position;
  }

  Execute(graph: Graph): void {
    graph.AddNode(new Node(this.position, 'New Node'));
  }

  Undo(graph: Graph): void {}
}
