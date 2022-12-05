import Graph from 'model/graph/graph';
import Node from 'model/graph/node';
import ICommand from './icommand';

export default class NodeStopEditTextCommand implements ICommand {
  stoppedNodes: Node[] = [];

  Execute(graph: Graph): void {
    graph.GetNodes().forEach((node) => {
      if (node.editing) {
        node.editing = false;
        this.stoppedNodes.push(node);
      }
    });
  }

  Undo(graph: Graph): void {
    this.stoppedNodes.forEach((node) => {
      // node.editing = true;
    });
  }

  Combine = (command: ICommand): ICommand => {
    return this;
  };

  CanCombine = (command: ICommand): boolean => {
    return false;
  };

  StopsUndo = (): boolean => {
    return false;
  };

  StopsRedo = (): boolean => {
    return true;
  };
}
