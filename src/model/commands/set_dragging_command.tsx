import Graph from 'model/graph/graph';
import Position from 'model/graph/position';
import ICommand from './icommand';

export default class SetDraggingCommand implements ICommand {
  dragging: boolean;

  constructor(dragging: boolean) {
    this.dragging = dragging;
  }

  Execute(graph: Graph): void {
    graph.selection.dragging = this.dragging;
    if (!this.dragging) {
      const nodes = graph.selection.GetNodes();
      nodes.forEach((node) => {
        node.position = node.position.add(graph.selection.GetOffset(node));
      });
    }
    graph.selection.offset = new Position(0, 0);
  }

  Undo(graph: Graph): void {
    graph.selection.dragging = !this.dragging;
    if (this.dragging) {
      console.log('Moving back');
      const nodes = graph.selection.GetNodes();
      nodes.forEach((node) => {
        node.position = node.position.sub(graph.selection.GetOffset(node));
      });
    }
    graph.selection.offset = new Position(0, 0);
  }

  Combine = (additive: ICommand): ICommand => {
    return this;
  };

  CanCombine = (additive: ICommand): boolean => {
    return false;
  };

  StopsUndo = (): boolean => {
    return this.dragging;
  };
}
