import Graph from 'model/graph/graph';
import Position from 'model/graph/position';
import ICommand from './icommand';

export default class GraphStartDragCommand implements ICommand {
  dragging: boolean;

  start_offset?: Position;

  constructor(dragging: boolean) {
    this.dragging = dragging;
  }

  Execute(graph: Graph): void {
    graph.graph_offset.dragging = this.dragging;
    if (this.dragging) {
      this.start_offset = graph.graph_offset.offset;
    }
  }

  Undo(graph: Graph): void {
    graph.graph_offset.dragging = !this.dragging;
    if (this.dragging) {
      graph.graph_offset.offset = this.start_offset!;
    }
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

  StopsRedo = (): boolean => {
    return !this.dragging;
  };
}
