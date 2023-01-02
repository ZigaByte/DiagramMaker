import Position from 'model/graph/position';
import Graph from 'model/graph/graph';
import Node from 'model/graph/node';
import ICommand from './icommand';

export default class AddNodeCommand implements ICommand {
  position: Position;

  node: Node;

  constructor(position: Position) {
    this.position = position;
    this.node = new Node(-1, this.position, '');
    this.node.editing = true;
  }

  Execute(graph: Graph): void {
    graph.GetNodes().forEach((node) => {
      node.editing = false;
    });
    graph.AddNode(this.node);
  }

  Undo(graph: Graph): void {
    graph.RemoveNode(this.node);
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
