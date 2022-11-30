import Graph from 'model/graph/graph';
import Node from 'model/graph/node';
import Connection from 'model/graph/connection';
import ICommand from './icommand';

export default class RemoveNodeCommand implements ICommand {
  node: Node;

  connections?: Connection[];

  constructor(node: Node) {
    this.node = node;
    this.connections = undefined;
  }

  Execute(graph: Graph): void {
    this.connections = graph.GetConnectitons(this.node);
    graph.RemoveNode(this.node);
  }

  Undo(graph: Graph): void {
    graph.AddNode(this.node);
    this.connections?.forEach((c) => graph.AddConnection(c));
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
}
