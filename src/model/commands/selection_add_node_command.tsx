import Graph from 'model/graph/graph';
import ICommand from './icommand';

export default class SelectionAddNodeCommand implements ICommand {
  nodeId: number;

  constructor(nodeId: number) {
    this.nodeId = nodeId;
  }

  Execute(graph: Graph): void {
    const node = graph.GetNode(this.nodeId);
    if (node !== undefined) {
      graph.selection.Add(node);
    }
  }

  Undo(graph: Graph): void {
    const node = graph.GetNode(this.nodeId);
    if (node !== undefined) {
      graph.selection.Remove(node);
    }
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
