import Position from 'model/graph/position';
import Graph from 'model/graph/graph';
import ICommand from './icommand';

export default class DragSelectionCommand implements ICommand {
  offset: Position;

  previousPosition?: Position;

  constructor(offset: Position) {
    this.offset = offset;
    this.previousPosition = undefined;
  }

  // TODO: Make this additive

  Execute(graph: Graph): void {
    if (graph.selection.dragging) {
      this.previousPosition = graph.selection.offset;
      graph.selection.offset = graph.selection.offset.add(this.offset);
    }
  }

  Undo(graph: Graph): void {
    graph.selection.offset = this.previousPosition!;
  }
}
