import Graph from 'model/graph/graph';
import ICommand from './icommand';

export default class SelectNodeCommand implements ICommand {
  nodeId: number;

  select: boolean;

  constructor(nodeId: number, select: boolean) {
    this.nodeId = nodeId;
    this.select = select;
  }

  Execute(graph: Graph): void {
    const node = graph.GetNode(this.nodeId);
    if (node !== undefined) {
      node.selected = this.select;
    }
  }

  Undo(graph: Graph): void {
    const node = graph.GetNode(this.nodeId);
    if (node !== undefined) {
      node.selected = !this.select;
    }
  }
}
