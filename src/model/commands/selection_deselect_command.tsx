import Graph from 'model/graph/graph';
import Node from 'model/graph/node';
import ICommand from './icommand';

export default class SelectionDeselectCommand implements ICommand {
  selectedNodes: Node[] = [];

  Execute(graph: Graph): void {
    this.selectedNodes = graph.selection.GetNodes();
    graph.selection.Clear();
  }

  Undo(graph: Graph): void {
    graph.selection.SetSelection(this.selectedNodes);
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
