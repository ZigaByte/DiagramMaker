import Graph from 'model/graph/graph';
import Node from 'model/graph/node';
import Connection from 'model/graph/connection';
import ICommand from './icommand';

export default class AddConnectionCommand implements ICommand {
  node1: Node;

  node2: Node;

  connection: Connection;

  constructor(node1: Node, node2: Node) {
    this.node1 = node1;
    this.node2 = node2;
    this.connection = new Connection(-1, node1, node2);
  }

  Execute(graph: Graph): void {
    graph.AddConnection(this.connection);
  }

  Undo(graph: Graph): void {
    graph.RemoveConnection(this.connection);
  }
}
