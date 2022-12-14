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
    graph.selection.Clear();
  }

  Undo(graph: Graph): void {
    graph.RemoveConnection(this.connection);
    graph.selection.Add(this.node1);
    graph.selection.Add(this.node2);
  }

  Combine = (additive: ICommand): ICommand => {
    return this;
  };

  CanCombine = (additive: ICommand): boolean => {
    return false;
  };

  StopsUndo = (): boolean => {
    return true;
  };

  StopsRedo = (): boolean => {
    return true;
  };
}
