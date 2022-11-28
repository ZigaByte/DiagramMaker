import Graph from 'model/graph/graph';
import Node from 'model/graph/node';
import ICommand from './icommand';

export default class DeselectAllCommand implements ICommand {
  selectedNodes: Node[] = [];

  Execute(graph: Graph): void {
    this.selectedNodes = graph.selection.GetNodes();
    graph.selection.Clear();
  }

  Undo(graph: Graph): void {
    graph.selection.SetSelection(this.selectedNodes);
  }
}
