import Graph from 'model/graph/graph';
import Node from 'model/graph/node';
import Connection from 'model/graph/connection';
import ICommand from './icommand';

export default class AddConnectionCommand implements ICommand {
  node1: Node;

  node2: Node;

  connection?: Connection;

  constructor(node1: Node, node2: Node) {
    this.node1 = node1;
    this.node2 = node2;
    this.connection = undefined;
  }

  Execute(graph: Graph): void {
    this.connection = new Connection(this.node1, this.node2);
    graph.AddConnection(this.connection);
  }

  Undo(graph: Graph): void {
    if (this.connection !== undefined) {
      graph.RemoveConnection(this.connection);
    }
  }
}
